import { useAuth } from "../../contexts/authContext";
import logoBlack from "../../assets/icons/gist_logo_blk.svg";
import Tooltip from "@mui/material/Tooltip";
import UpdateResponse from "../UpdateResponse/UpdateResponse";

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
  textInputError,
  setResponse,
  setSelections,
  selections,
}) {
  const { userLoggedIn } = useAuth();

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
                onChange={() => {
                  setSelections({ ...selections, gpt: !selections.gpt });
                }}
                type="checkbox"
                checked={selections.gpt}
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
                onChange={() => {
                  setSelections({ ...selections, gemini: !selections.gemini });
                }}
                type="checkbox"
                checked={selections.gemini}
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
                onChange={() => {
                  setSelections({
                    ...selections,
                    perplexity: !selections.perplexity,
                  });
                }}
                type="checkbox"
                checked={selections.perplexity}
              />
            </div>
          </Tooltip>
        </div>

        {textInputError && (
          <span className="main-form__error">{textInputError}</span>
        )}
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

      <div
        className={
          loading ? "loading__container" : "loading__container--invisible"
        }
      >
        <img src={logoBlack} alt="logo black" className="logo-black" />
        <p className="loading__text">Loading ...</p>
      </div>

      <div className="response__array-container">
        {Array.isArray(response) &&
          response.map((res, index) => (
            <div
              className={`response__container response__container--${res.color}`}
              key={index}
            >
              <div className="response-data">
                <h4>
                  <i>{res.topic} </i> by {res.selectedAI}
                </h4>
                {res.points &&
                  res.points.length > 0 &&
                  res.points.map((point, index) => (
                    <UpdateResponse
                      key={index}
                      index={index}
                      point={point}
                      responseObject={res}
                      setResponse={setResponse}
                      response={response}
                    />
                  ))}
                <div className="response__bottom">
                  <div className="response__buttons-container">
                    <button
                      className="response__close"
                      onClick={() => handleCloseResponse(res.id)}
                    >
                      close
                    </button>
                    {userLoggedIn ? (
                      <button
                        className="button response__save response__save--login"
                        onClick={() => handleSaveItem(res)}
                        disabled={!userLoggedIn}
                      >
                        save
                      </button>
                    ) : (
                      <Tooltip
                        title="Sign up or login to save responses!"
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
                          onClick={() => handleSaveItem(res)}
                          disabled={!userLoggedIn}
                        >
                          save
                        </button>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MainForm;
