// @flow strict
import type { Node } from 'react';
import React, { useEffect, useState } from "react";
import { SearchField } from 'gestalt';

function filterKeyboardEvent(event: KeyboardEvent) {
  const target = event.target || event.srcElement;

  // $FlowIssue[prop-missing] Flow can't find tagName
  const { tagName } = target;

  // Ingore
  // * isContentEditable === true
  // * <input>, <textarea> and <select>
  // * readOnly === true
  return (
    // $FlowIssue[prop-missing] Flow can't find isContentEditable
    target.isContentEditable ||
    ((tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') &&
      // $FlowIssue[prop-missing] Flow can't find readOnly
      !target.readOnly)
  );
}

function handleKeyDown(event: KeyboardEvent) {
  if (filterKeyboardEvent(event)) {
    return;
  }

  const code = event.keyCode || event.which || event.charCode;

  // Forward Slash `/`
  if (code === 191) {
    const algoliaSearchInput = document.querySelector('#algolia-doc-search');
    if (algoliaSearchInput) {
      event.preventDefault();
      algoliaSearchInput.focus();
    }
  }
}

export default function DocSearch(): Node {
  const [value, setValue] = React.useState('');
  useEffect(() => {
    if (typeof window === 'undefined' || !window.docsearch) {
      return;
    }
    window.docsearch({
      apiKey: 'a22bd809b2fb174c5defd3c0f44cab8c',
      debug: false, // Set debug to true if you want to keep open and inspect the dropdown
      indexName: 'gestalt',
      inputSelector: '#algolia-doc-search',
    });
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, []);

  return (
    <form className="searchbox">
      <div className="searchbox__wrapper">
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          id="algolia-doc-search"
          onChange={({value}) => setValue(value)}
          placeholder="Search the docs"
          value={value}
          size="sm"
        />
      </div>
    </form>
  );
}
