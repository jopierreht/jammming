import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import styles from "../styles/SearchBar.module.css"; // Import the CSS module

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for a song, artist, or album..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;