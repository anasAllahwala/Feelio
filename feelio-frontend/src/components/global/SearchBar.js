import React from "react";
import { ICONS } from "../../constants";

const SearchBar = React.forwardRef(
  ({ visible, filter, setSearch, search, children }, ref) => {
    return (
      <div ref={ref} className="relative w-1/2">
        <div className="relative w-full flex rounded-md overflow-hidden">
          <input
            type="text"
            value={search}
            className="flex-1 border-0 text-black"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="absolute top-1/2 right-1 transform -translate-y-1/2 p-2 rounded-full border-0 text-gray-700 hover:bg-gray-200"
            onClick={() => filter()}
          >
            <ICONS.SearchIcon size={16} />
          </button>
        </div>
        {visible && (
          <div className="absolute left-0 bg-white w-full text-black mt-1 overflow-hidden rounded-md shadow-md">
            {children}
          </div>
        )}
      </div>
    );
  }
);

export default SearchBar;
