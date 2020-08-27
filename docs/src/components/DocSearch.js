// @flow strict
import React, { useEffect, type Node } from 'react';
import './DocSearch.css';

export default function DocSearch(): Node {
  useEffect(() => {
    window.docsearch({
      apiKey: 'a22bd809b2fb174c5defd3c0f44cab8c',
      debug: true, // Set debug to true if you want to keep open and inspect the dropdown
      indexName: 'gestalt',
      inputSelector: '#algolia-doc-search',
    });
  }, []);

  return (
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
  );
}
