import "../../firebase/firebase";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import MainForm from "../../components/MainForm/MainForm";
import Library from "../../components/Library/Library";
import "./Home.scss";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import axios from "axios";
import LibraryViews from "../../components/LibraryViews/LibraryViews";

function Home({ libraryViews, setLibraryViews }) {
  const { currentUser, userLoggedIn } = useAuth();
  const [libraryItems, setLibraryItems] = useState([]);
  const [selectAI, setSelectAI] = useState("gpt");
  const [textInput, setTextInput] = useState("");
  const [response, setResponse] = useState({});
  const [isResponseVisible, setIsResponseVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previousInput, setPreviousInput] = useState("");
  const [previousAI, setPreviousAI] = useState("");
  const [itemCollapsed, setItemCollapsed] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const [textInputError, setTextInputError] = useState("");
  const [viewsError, setViewsError] = useState("");

  const db = getFirestore();

  console.log(currentUser);

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

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    console.log("loading", loading);
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

    if (textInput.trim() === previousInput.trim() && selectAI === previousAI) {
      return;
    }
    if (textInput.trim() !== "") {
      setIsSubmitting(true);

      if (selectAI === "gpt") {
        prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Make sure to list each point with a number followed by a period, example: 1. `;
      } else if (selectAI === "gemini") {
        prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Each point should not be longer than 120 characters, excluding a heading for the point if appropriate. Make sure to list each point with a number followed by a period, example: 1. `;
        console.log("gemini was used");
      } else if (selectAI === "perplexity") {
        prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Only provide the points, no confirmation. Make sure to list each point with a number followed by a period, example: 1. `;
        console.log("perplexity was used");
      }

      try {
        const res = await axios
          .post(`http://localhost:8080/response/${selectAI}`, { prompt })
          .then((res) => {
            console.log(res.data);

            const responseColor = selectAI;
            let responseArr = [];
            if (selectAI === "perplexity") {
              responseArr = res.data.choices[0].message.content
                .split(/\d+\./)
                .filter((point) => point.trim() !== "")
                .map((point) => point.trim());
            } else {
              responseArr = res.data
                .split(/\d+\./)
                .filter((point) => point.trim() !== "")
                .map((point) => point.trim());
            }

            setResponse({
              points: responseArr,
              color: responseColor,
              topic: textInput,
              selectedAI: selectAI,
            });

            console.log("loading", loading);
            setIsResponseVisible(true);
            setIsLoading(false);
          });
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
        setPreviousInput(textInput);
      }
    }
  }

  async function handleSaveItem(item) {
    await addDoc(collection(db, "libraryItems"), {
      uid: currentUser.uid,
      ...item,
    });
    qLibItems();

    console.log("submission attempt");
    handleCloseResponse();
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

  function handleCloseResponse() {
    setIsResponseVisible(false);
    setResponse("");
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
                      : "Welcome to gist! Login or create an account to save your responses!"}
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
