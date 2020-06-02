// @flow strict
import React, { useState, useEffect } from 'react';
import './DocSearch.css';

export default function DocSearch() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (window.docsearch) {
      window.docsearch({
        apiKey: 'a22bd809b2fb174c5defd3c0f44cab8c',
        indexName: 'gestalt',
        inputSelector: '#algolia-doc-search',
        // TODO update
        debug: true, // Set debug to true if you want to inspect the dropdown
      });
    } else {
      setEnabled(false);
    }
  }, []);

  return enabled ? (
    <form className="searchbox">
      <div className="searchbox__wrapper">
        <input
          id="algolia-doc-search"
          className="searchbox__input"
          type="search"
          placeholder="Search"
          aria-label="Search docs"
        />
      </div>
    </form>
  ) : null;
}
