import { useState } from "react";
import axios from "axios";
import "./MainForm.scss";

function MainForm() {
  const [selectAI, setSelectAI] = useState("gpt");
  const [textInput, setTextInput] = useState("");
  const [response, setResponse] = useState("");

  //GPT
  // const gptAPI_KEY = "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";

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("submited");

    let prompt = "";

    //checks if input is empty - maybe put a check to see if this is a word
    //add error state if no input/not real word
    if (textInput.trim() !== "") {
      if (selectAI === "gpt") {
        prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. Make sure to list each point with a number followed by a period, example: 1. `;
        console.log(prompt);
      } else if (selectAI === "gemini") {
        // gemini prompt - maybe make this friendly to highlight "nonharmful"
      } else if (selectAI === "perplexity") {
        // perplexity prompt
      }

      try {
        const res = await axios
          .post("http://localhost:8080/response", { prompt })
          .then((res) => {
            setResponse(res.data);
          });

        // setResponse(response.data.choices[0].text);
      } catch (err) {
        console.error(err);
      }
    }
  }
  const renderPoints = () => {
    if (!response) return null;
    return response
      .split(/\d+\./)
      .filter((point) => point.trim() !== "")
      .map((point, index) => (
        <p key={index}>{`${index + 1}. ${point.trim()}`}</p>
      ));
  };

  return (
    <div className="main-form__container">
      <form className="main-form" onSubmit={handleSubmit}>
        <div className="main-form__radio-container">
          <div className="radio-button-container">
            <label htmlFor="gpt">ChatGpt</label>
            <input
              type="radio"
              id="gpt"
              name="gpt"
              value="gpt"
              checked={selectAI === "gpt"}
              onChange={() => setSelectAI("gpt")}
            />
          </div>
          <div className="radio-button-container">
            <label htmlFor="gemini">Google Gemini</label>
            <input
              type="radio"
              id="gemini"
              name="gemini"
              value="gemini"
              checked={selectAI === "gemini"}
              onChange={() => setSelectAI("gemini")}
            />
          </div>
          <div className="radio-button-container">
            <label htmlFor="perplexity">Perplexity</label>
            <input
              type="radio"
              id="perplexity"
              name="perplexity"
              value="perplexity"
              checked={selectAI === "perplexity"}
              onChange={() => setSelectAI("perplexity")}
            />
          </div>
        </div>
        <input
          type="text"
          className="main-form__text-input"
          placeholder="Enter topic..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <div className="main-form__submit-container">
          <button className="main-form__submit button">Get the gist</button>
        </div>
      </form>
      <div className="response__container">
        {renderPoints()}
        {/* <p className="response__point">
          1. Physiotherapy is a form of physical therapy that helps restore
          movement and function in the body through various manual techniques,
          exercises, and education.
        </p>
        <p className="response__point">
          2. Physiotherapists are trained healthcare professionals who assess,
          diagnose, and treat conditions affecting the muscles, bones, joints,
          and nervous system.
        </p>
        <p className="response__point">
          3. Common reasons for seeking physiotherapy include sports injuries,
          chronic pain, post-surgery rehabilitation, and conditions like
          arthritis or stroke.
        </p>
        <p className="response__point">
          4. Treatment may involve hands-on techniques such as massage,
          mobilization, and stretching, as well as personalized exercise
          programs to improve strength, flexibility, and balance.
        </p>
        <p className="response__point">
          5. Physiotherapy aims to reduce pain, restore movement, and improve
          overall quality of life for individuals of all ages and fitness
          levels.
        </p> */}
        <div className="response__bottom">
          <div className="response__buttons-container">
            <button className=" response__close">close</button>
            <button className="button response__save">save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainForm;
