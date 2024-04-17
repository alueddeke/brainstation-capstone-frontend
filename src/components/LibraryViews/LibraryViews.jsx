import LibraryViewSingle from "../LibraryViewSingle/LibraryViewSingle";
import backIcon from "../../assets/icons/circle-arrow-left-solid.svg";
import "./LibraryViews.scss";

function LibraryViews({
  libraryViews,
  setLibraryViews,
  qLibItems,
  currentUser,
}) {
  function handleCloseViews() {
    setLibraryViews([]);
  }
  return (
    <div className="library-views__wrapper">
      <div className="library-views__top">
        <img
          src={backIcon}
          alt="back icon"
          onClick={handleCloseViews}
          className="library-views__back-icon"
        />
        <h1 className="library-views__top-header">These are your responses</h1>
      </div>
      <section className="library-views">
        <div className="library-views__singles-container">
          {libraryViews.map((view, index) => (
            <LibraryViewSingle
              key={index}
              view={view}
              setLibraryViews={setLibraryViews}
              qLibItems={qLibItems}
              currentUser={currentUser}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default LibraryViews;
