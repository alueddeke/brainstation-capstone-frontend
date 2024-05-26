import "../../firebase/firebase";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  arrayRemove,
} from "firebase/firestore";
import MainForm from "../../components/MainForm/MainForm";
import Library from "../../components/Library/Library";
import "./Home.scss";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import axios from "axios";
import LibraryViews from "../../components/LibraryViews/LibraryViews";
import { v4 as uuidv4 } from "uuid";

function Home({ libraryViews, setLibraryViews }) {
  const { currentUser, userLoggedIn } = useAuth();
  const [libraryItems, setLibraryItems] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [isResponseVisible, setIsResponseVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previousInput, setPreviousInput] = useState("");
  const [itemCollapsed, setItemCollapsed] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const [textInputError, setTextInputError] = useState("");
  const [viewsError, setViewsError] = useState("");
  const [response, setResponse] = useState([]);
  const [previousSelections, setPreviousSelections] = useState({});
  const [selections, setSelections] = useState({
    gpt: false,
    gemini: false,
    perplexity: false,
  });

  const [selectAI, setSelectAI] = useState("gpt");

  const db = getFirestore();

  // async function qLibItems() {
  //   console.log("items retrieved from local storage");
  //   const storedItems = localStorage.getItem("libraryItems");
  //   const items = [];

  //   if (storedItems) {
  //     // Parse the stored JSON back into an object
  //     const allItems = JSON.parse(storedItems);

  //     // Transform items into the expected format
  //     for (const id in allItems) {
  //       items.push({
  //         ...allItems[id],
  //         isCollapsed: true,
  //         id: id, // Using the key from the object as the ID
  //       });
  //     }
  //   }

  //   // Update your application state with the items
  //   setLibraryItems(items);
  // }

  // useEffect(() => {
  //   qLibItems();
  // }, []);

  async function qLibItems() {
    const items = [];
    const q = query(
      collection(db, "libraryItems"),
      where("uid", "==", currentUser.uid)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      items.push({ ...doc.data(), isCollapsed: true, id: doc.id });
    });
    setLibraryItems(items);
  }

  useEffect(() => {
    qLibItems();
  }, []);

  let arrayResponses = [];
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setResponse([]);
    let prompt = "";

    setTextInputError("");
    if (textInput.length < 2) {
      setTextInputError("Your topic needs to be longer to get the gist");
      setIsLoading(false);
      return false;
    } else if (textInput.length > 50) {
      setTextInputError("Your topic is too long to get the gist");
      setIsLoading(false);
      return false;
    }

    if (textInput.trim() !== "") {
      setIsSubmitting(true);

      arrayResponses = Object.entries(selections)
        .filter(([key, value]) => {
          return value;
        })
        .map(([key]) => {
          if (key === "gpt") {
            prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Make sure to list each point with a number followed by a period, example: 1. `;
          } else if (key === "gemini") {
            prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Each point should not be longer than 120 characters, excluding a heading for the point if appropriate. Make sure to list each point with a number followed by a period, example: 1. `;
          } else if (key === "perplexity") {
            prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Only provide the points, no confirmation. Make sure to list each point with a number followed by a period, example: 1. `;
          }

          return new Promise(async (resolve, reject) => {
            try {
              const res = await axios.post(
                `http://localhost:8080/response/${key}`,
                { prompt }
              );

              resolve(res);
            } catch (err) {
              console.error(err);
              reject(err);
            } finally {
              setIsSubmitting(false);
              setPreviousInput(textInput);
            }
          });
        });
      Promise.all(arrayResponses)
        .then((responses) => {
          const keyResponsePairs = Object.entries(selections)
            .filter(([key, value]) => value)
            .map(([key]) => key);

          const transformedResponses = responses.map((response, index) => {
            const key = keyResponsePairs[index];
            const responseColor = key;
            const responseId = uuidv4();
            let responseArr = [];

            responseArr = response.data
              .split(/\d+\./)
              .filter((point) => point.trim() !== "")
              .map((point) => point.trim());

            return {
              color: responseColor,
              selectedAI: key,
              topic: textInput,
              points: responseArr,
              id: responseId,
            };
          });

          setIsLoading(false);
          setPreviousInput(textInput);
          setTextInput("");
          setResponse(transformedResponses);
          setSelections({ gpt: false, gemini: false, perplexity: false });
        })
        .catch((error) => {
          console.error("Error in one of the requests:", error);
        });
    }
  }

  // async function handleSaveItem(res) {
  //   console.log("saving to local storage");
  //   const itemId = res.id || uuidv4();

  //   // Retrieve existing items from local storage
  //   const items = JSON.parse(localStorage.getItem("libraryItems") || "{}");

  //   // Add the new item to the local storage object
  //   items[itemId] = {
  //     ...res,
  //   };

  //   // Save the updated items back to local storage
  //   localStorage.setItem("libraryItems", JSON.stringify(items));

  //   // Simulate a query update if necessary (this might not be needed if your UI doesn't require immediate update)
  //   qLibItems();

  //   // Handle close response (assuming you want to keep this functionality)
  //   handleCloseResponse(itemId);
  //   console.log({ libraryItems });
  // }

  async function handleSaveItem(res) {
    await addDoc(collection(db, "libraryItems"), {
      uid: currentUser.uid,

      ...res,
    });
    qLibItems();

    handleCloseResponse(res.id);
  }

  function handleSelectAIChange(value) {
    setPreviousAI(selectAI);
    setSelectAI(value);
  }
  function handleItemClick(id) {
    const clickedItem = libraryItems.find((item) => item.id === id);
    if (clickedItem) {
      const itemExists = libraryViews.some((item) => item.id === id);
      if (libraryViews.length === 3) {
        setViewsError("You are already viewing the maximum number of items");
      } else {
        setViewsError("");
      }
      if (!itemExists && libraryViews.length < 3) {
        setLibraryViews((prevLibraryViews) => [
          ...prevLibraryViews,
          clickedItem,
        ]);
      }
    }
  }

  function handleCloseResponse(id) {
    const updatedResponseArray = response.filter((res) => res.id !== id);
    setIsResponseVisible(false);
    setResponse(updatedResponseArray);
  }

  return (
    <div className="content-wrapper">
      <div className="content-wrapper__sections">
        <div className="content-wrapper__left">
          <div className="main__content-container">
            <div className="main__content-container">
              <Library
                qLibItems={qLibItems}
                handleItemClick={handleItemClick}
                libraryItems={libraryItems}
                viewsError={viewsError}
              />
            </div>
          </div>
        </div>
        <div
          className={
            userLoggedIn
              ? "content-wrapper__right"
              : "content-wrapper__logged-out"
          }
        >
          {libraryViews.length > 0 ? (
            <main className="main__content-container">
              <LibraryViews
                libraryViews={libraryViews}
                setLibraryViews={setLibraryViews}
                viewsError={viewsError}
                qLibItems={qLibItems}
                currentUser={currentUser}
              />
            </main>
          ) : (
            <>
              <div className="home__header-wrapper">
                <div className="home__header-container">
                  <h1>
                    {userLoggedIn
                      ? `Hello ${
                          currentUser.displayName
                            ? currentUser.displayName
                            : currentUser.email
                        }, welcome back!`
                      : "Welcome to gist! Select your AI model, enter a topic and get the gist!"}
                  </h1>
                </div>
              </div>

              <div className="main__content-container">
                <main className="main">
                  <MainForm
                    handleSubmit={handleSubmit}
                    handleSaveItem={handleSaveItem}
                    handleCloseResponse={handleCloseResponse}
                    selectAI={selectAI}
                    handleSelectAIChange={handleSelectAIChange}
                    textInput={textInput}
                    setTextInput={setTextInput}
                    response={response}
                    loading={loading}
                    setIsResponseVisible={setIsResponseVisible}
                    setIsSubmitting={setIsSubmitting}
                    textInputError={textInputError}
                    setResponse={setResponse}
                    selections={selections}
                    setSelections={setSelections}
                  />
                </main>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
