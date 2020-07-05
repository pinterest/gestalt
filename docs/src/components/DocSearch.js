// @flow strict
import React, { useState, useEffect } from 'react';
import './DocSearch.css';

export default function DocSearch() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Disable search locally
    // Search results would otherwise always redirect to gestalt.netlify.app
    if (
      window.docsearch &&
      window.location &&
      window.location.host.includes('gestalt.netlify.app')
    ) {
      window.docsearch({
        apiKey: 'a22bd809b2fb174c5defd3c0f44cab8c',
        debug: false, // Set debug to true if you want to inspect the dropdown
        indexName: 'gestalt',
        inputSelector: '#algolia-doc-search',
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
