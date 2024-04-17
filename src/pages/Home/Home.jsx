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

    //check if previous selections array was the same
    // if (
    //   textInput.trim() === previousInput.trim()
    // ) {
    //   setTextInputError(
    //     "Change your selections or your topic to get the gist!"
    //   );
    //   setIsLoading(false);
    //   return;
    // }
    if (textInput.trim() !== "") {
      setIsSubmitting(true);

      arrayResponses = Object.entries(selections)
        .filter(([key, value]) => {
          return value;
        })
        .map(([key]) => {
          console.log("key:", key);
          if (key === "gpt") {
            prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Make sure to list each point with a number followed by a period, example: 1. `;
          } else if (key === "gemini") {
            prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Each point should not be longer than 120 characters, excluding a heading for the point if appropriate. Make sure to list each point with a number followed by a period, example: 1. `;
            console.log("gemini was used");
          } else if (key === "perplexity") {
            prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Only provide the points, no confirmation. Make sure to list each point with a number followed by a period, example: 1. `;
            console.log("perplexity was used");
          }

          // Create a Promise for each Axios request
          return new Promise(async (resolve, reject) => {
            try {
              console.log("key", key);
              const res = await axios.post(
                `http://localhost:8080/response/${key}`,
                { prompt }
              );

              resolve(res); // Resolve the Promise with the Axios response
            } catch (err) {
              console.error(err);
              reject(err); // Reject the Promise if there's an error
            } finally {
              setIsSubmitting(false);
              setPreviousInput(textInput);
            }
          });
        });
      Promise.all(arrayResponses)
        .then((responses) => {
          const keyResponsePairs = Object.entries(selections)
            .filter(([key, value]) => value) // Keep only truthy values
            .map(([key]) => key); // Extract keys

          const transformedResponses = responses.map((response, index) => {
            const key = keyResponsePairs[index]; // Get the key for the current response
            const responseColor = key; // Assuming you want to use the key as the color
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

          console.log("Transformed Responses:", transformedResponses);
          setIsLoading(false);
          setPreviousInput(textInput);
          setTextInput("");
          setResponse(transformedResponses);
          setSelections({ gpt: false, gemini: false, perplexity: false });
        })
        .catch((error) => {
          console.error("Error in one of the requests:", error);
          // Handle error here
        });
    }
  }

  // Wait for all Promises to resolve
  //     Promise.all(arrayResponses)
  //       .then((responses) => {
  //         // console.log("responses", responses);
  //         const transformedResponses = responses.map((response, index) => {
  //           const key = Object.keys(selections)[index]; // Get the key for the current response
  //           // console.log("key conversion:", key);
  //           // console.log(`Data for response ${index + 1}:`, response.data);

  //           const responseColor = key; // Assuming you want to use the key as the color
  //           const responseId = uuidv4();
  //           let responseArr = [];
  //           // if (key === "perplexity") {
  //           //   console.log(
  //           //     "perplexity",
  //           //     response.data.choices[0].message.content
  //           //   );
  //           //   responseArr = response.data.choices[0].message.content
  //           //     .split(/\d+\./)
  //           //     .filter((point) => point.trim() !== "")
  //           //     .map((point) => point.trim());
  //           // } else {
  //           responseArr = response.data
  //             .split(/\d+\./)
  //             .filter((point) => point.trim() !== "")
  //             .map((point) => point.trim());
  //           //}

  //           return {
  //             color: responseColor,
  //             selectedAI: key,
  //             topic: textInput,
  //             points: responseArr,
  //             id: responseId,
  //           };
  //         });

  //         // Now you have an array of transformed responses
  //         console.log("Transformed Responses:", transformedResponses);
  //         setIsLoading(false);
  //         // Assuming you want to set this array in state

  //         setPreviousInput(textInput);
  //         setTextInput("");
  //         setResponse(transformedResponses);
  //         setSelections({ gpt: false, gemini: false, perplexity: false });
  //       })
  //       .catch((error) => {
  //         console.error("Error in one of the requests:", error);
  //         // Handle error here
  //       });
  //   }
  // }

  async function handleSaveItem(res) {
    console.log("test");
    await addDoc(collection(db, "libraryItems"), {
      uid: currentUser.uid,
      // uid: res.id,
      ...res,
    });
    qLibItems();
    console.log("test2");
    console.log("submission attempt");
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
        setViewsError("You are already viewing max amount of items");
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
      <div
        className={
          userLoggedIn
            ? "content-wrapper__sections"
            : "content-wrapper__logged-out"
        }
      >
        <div className={userLoggedIn ? "content-wrapper__left" : ""}>
          <div className="main__content-container">
            {userLoggedIn && (
              <div className="main__content-container">
                <Library
                  qLibItems={qLibItems}
                  handleItemClick={handleItemClick}
                  libraryItems={libraryItems}
                  viewsError={viewsError}
                />
              </div>
            )}
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
