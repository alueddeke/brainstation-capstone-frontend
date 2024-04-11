import "../../firebase/firebase";
import {
  getFirestore,
  setDoc,
  doc,
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

const db = getFirestore();

function Home() {
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
  const [libraryViews, setLibraryViews] = useState([]);

  const db = getFirestore();

  async function qLibItems() {
    const items = [];
    const q = query(
      collection(db, "libraryItems"),
      where("uid", "==", currentUser.uid)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      items.push({ ...doc.data(), isCollapsed: true });
    });
    setLibraryItems(items);
  }
  useEffect(() => {
    qLibItems();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    let prompt = "";

    if (textInput.trim() === previousInput.trim() && selectAI === previousAI) {
      return;
    }
    if (textInput.trim() !== "") {
      setIsSubmitting(true);
      // console.log(selectAI);
      if (selectAI === "gpt") {
        prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Make sure to list each point with a number followed by a period, example: 1. `;
        // console.log(prompt);
      } else if (selectAI === "gemini") {
        prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Make sure to list each point with a number followed by a period, example: 1. `;
        console.log("gemini was used");
        // console.log("prompt:", prompt);
      } else if (selectAI === "perplexity") {
        prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Only provide the points, no confirmation. Make sure to list each point with a number followed by a period, example: 1. `;
        console.log("perplexity was used");
        // console.log("prompt:", prompt);
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

            setIsResponseVisible(true);
          });
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
        setPreviousInput(textInput);
      }
    }
  }

  //not working
  async function handleSaveItem(item) {
    await addDoc(collection(db, "libraryItems"), {
      uid: currentUser.uid,
      ...item,
    });
    qLibItems();

    // const newLibraryItem = {
    //   id: Math.random(),
    //   ...item,
    //   isCollapsed: true,
    // };
    // console.log({ newLibraryItem });
    // setLibraryItems((prevLibraryItems) => [
    //   ...prevLibraryItems,
    //   newLibraryItem,
    // ]);
    // const collectionRef = db.collection("LibraryItems");
    // const firebaseData = newLibraryItem;
    // const name = newLibraryItem.topic;

    // const saveDataToFirestore = async () => {
    //   await collectionRef.add(firebaseData).then((docRef) => {
    //     console.log("document added with ID: ", docRef);
    //   });
    // };
    // saveDataToFirestore();
    console.log("submission attempt");
    handleCloseResponse();
  }

  //working?
  // function handleSaveItem(item) {
  //   const newLibraryItem = {
  //     id: Math.random(),
  //     ...item,
  //     isCollapsed: true,
  //   };
  //   console.log({ newLibraryItem });
  //   setLibraryItems((prevLibraryItems) => [
  //     ...prevLibraryItems,
  //     newLibraryItem,
  //   ]);
  //   const firebaseData = newLibraryItem;

  //   console.log(firebaseData);

  //   const saveDataToFirestore = async () => {
  //     const docRef = await addDoc(collection(db, "myCollection"), {
  //       libraryItem: firebaseData,
  //     });
  //   };
  //   saveDataToFirestore();
  //   handleCloseResponse();
  // }

  function handleSelectAIChange(value) {
    setPreviousAI(selectAI);
    setSelectAI(value);
  }

  function handleItemClick(id) {
    const clickedItem = libraryItems.find((item) => item.id === id);
    console.log(clickedItem);
    if (clickedItem) {
      const newLibraryItems = libraryItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
          };
        }
        return item;
      });

      setLibraryViews((prevLibraryViews) => [...prevLibraryViews, clickedItem]);
      setLibraryItems(newLibraryItems);
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
                  handleItemClick={handleItemClick}
                  libraryItems={libraryItems}
                  setLibraryItems={setLibraryItems}
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
                    setIsResponseVisible={setIsResponseVisible}
                    setIsSubmitting={setIsSubmitting}
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
