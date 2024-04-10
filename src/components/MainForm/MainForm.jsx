import { useState } from "react";
import { useAuth } from "../../contexts/authContext";

import "./MainForm.scss";

function MainForm({
  handleSubmit,
  handleSaveItem,
  handleCloseResponse,
  selectAI,
  handleSelectAIChange,
  textInput,
  setTextInput,
  response,
  setIsResponseVisible,
  isSubmitting,
}) {
  const { userLoggedIn } = useAuth();
  const { points, color, selectedAI } = response;

  // removing the topic

  // console.log("mainForm", response);

  const renderedPoints = points
    ? points.map((point, index) => (
        <p key={index}>{`${index + 1}. ${point}`}</p>
      ))
    : null;

  function handleOpen() {
    setIsResponseVisible(true);
  }

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
              onChange={() => handleSelectAIChange("gpt")}
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
              onChange={() => handleSelectAIChange("gemini")}
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
              onChange={() => handleSelectAIChange("perplexity")}
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
          <button
            className="main-form__submit button"
            onClick={handleOpen}
            disabled={isSubmitting}
          >
            Get the gist
          </button>
        </div>
      </form>
      {/* eventually only display response container if there is response */}

      {points && points.length > 0 && (
        <div className={`response__container response__container--${color}`}>
          <h4>This was a {selectedAI} response</h4>
          {renderedPoints}
          <div className="response__bottom">
            <div className="response__buttons-container">
              <button
                className=" response__close"
                onClick={handleCloseResponse}
              >
                close
              </button>
              <button
                className=" response__close"
                onClick={handleCloseResponse}
              >
                edit
              </button>
              <button
                className="button response__save"
                onClick={() => handleSaveItem(response)}
                disabled={!userLoggedIn}
              >
                save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainForm;
