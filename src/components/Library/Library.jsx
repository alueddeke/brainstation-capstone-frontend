import "../../firebase/firebase";

import LibraryListItem from "../LibraryListItem/LibraryListItem";
import "./Library.scss";

function Library({ qLibItems, libraryItems, handleItemClick, viewsError }) {
  return (
    <section className="library">
      <div className="library__header-container">
        <h2 className="library__header">library:</h2>
      </div>

      {libraryItems.length === 0 ? (
        <div className="library__empty-list">
          <h3>Save a response to add +</h3>
        </div>
      ) : (
        <ul className="library__list">
          {libraryItems.map((listItem, index) => (
            <LibraryListItem
              key={index}
              handleItemClick={handleItemClick}
              listItem={listItem}
              viewsError={viewsError}
              qLibItems={qLibItems}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default Library;
