import { useState } from "react";
import axios from "axios";
import "./MainForm.scss";

function MainForm() {
  const [selectAI, setSelectAI] = useState("gpt");
  const [textInput, setTextInput] = useState("");
  const [response, setResponse] = useState("");

  //GPT
  const gptAPI_KEY = "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";

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("submit");

    let prompt = "";

    //checks if input is empty - maybe put a check to see if this is a word
    //add error state if no input/not real word
    if (textInput.trim() !== "") {
      if (selectAI === "gpt") {
        prompt = `What are the 5 most important points to know if you were to talk about ${textInput} in a conversation? Make each point concise and easy to understand. `;
        console.log(prompt);
      } else if (selectAI === "gemini") {
        // gemini prompt - maybe make this friendly to highlight "nonharmful"
      } else if (selectAI === "perplexity") {
        // perplexity prompt
      }

      try {
        const res = await axios.post(
          "https://api.openai.com/v1/completions",
          {
            model: "gpt-3.5-turbo", //this can be adjusted, research models
            prompt: prompt,
            max_tokens: 50, // size of response
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${gptAPI_KEY}`, //looks like api key is your token
            },
          }
        );
        console.log(res.data);
        // setResponse(response.data.choices[0].text);
      } catch (err) {
        console.error(err);
      }

      //.ok means response status code is a 200
      //if its not a 200,
      //   if (response.ok) {
      //     const data = await response.json();
      //     setResponse(data.choices[0].text);
      //   } else {
      //     console.error("Failed to make API request");
      //   }
    }
  }

  return (
    <>
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
        <button className="main-form__submit">Get the gist</button>
      </form>
      <div className="response-container">{response && <p>{response}</p>}</div>
    </>
  );
}

export default MainForm;
