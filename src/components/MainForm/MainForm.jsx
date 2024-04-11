import { useAuth } from "../../contexts/authContext";
import logoBlack from "../../assets/icons/gist_logo_blk.svg";
import Tooltip from "@mui/material/Tooltip";

import "./MainForm.scss";

function MainForm({
  loading,
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

  console.log(loading);

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
          <Tooltip
            title="
            Versatile LLM from OpenAi, the go-to option for any user"
            placement="top-end"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -6],
                    },
                  },
                ],
              },
            }}
            arrow
          >
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
          </Tooltip>
          <Tooltip
            title="
            Formerly Bard, Google's response to ChatGpt"
            placement="top"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -6],
                    },
                  },
                ],
              },
            }}
            arrow
          >
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
          </Tooltip>
          <Tooltip
            title="
           Ready to handle up-to-date requests"
            placement="top-start"
            arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -6],
                    },
                  },
                ],
              },
            }}
          >
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
          </Tooltip>
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

      <div
        className={
          loading ? "loading__container" : "loading__container--invisible"
        }
      >
        <img src={logoBlack} alt="logo black" className="logo-black" />
        <p className="loading__text">Loading ...</p>
      </div>

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

              {userLoggedIn ? (
                <button
                  className="button response__save response__save--login"
                  onClick={() => handleSaveItem(response)}
                  disabled={!userLoggedIn}
                >
                  save
                </button>
              ) : (
                <Tooltip
                  title="
          Sign up or login to save responses!"
                  placement="top-start"
                  arrow
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -3],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <button
                    className="button response__save response__save--logout"
                    onClick={() => handleSaveItem(response)}
                    disabled={!userLoggedIn}
                  >
                    save
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainForm;
