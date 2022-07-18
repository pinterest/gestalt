// @flow strict
import { type Node, useEffect } from 'react';
import { Box, CompositeZIndex, Icon, Tooltip } from 'gestalt';

function filterKeyboardEvent(event: KeyboardEvent) {
  const target = event.target || event.srcElement;

  // $FlowIssue[prop-missing] Flow can't find tagName
  const { tagName } = target;

  // Ignore
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

export default function DocSearch({ popoverZIndex }: {| popoverZIndex?: CompositeZIndex |}): Node {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.docsearch) {
      return;
    }
    window.docsearch({
      appId: 'GS3KDMZW6P',
      apiKey: '88c1825a5951ee68c92b4fbf4e85ec7f',
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
    <Tooltip inline text="Pro tip: press '/' to quickly access search" zIndex={popoverZIndex}>
      <form className="searchbox">
        <div className="searchbox__wrapper">
          <input
            id="algolia-doc-search"
            className="searchbox__input"
            type="search"
            placeholder="Search Gestalt"
            aria-label="Search Gestalt docs"
          />
          <Box position="absolute" top left marginTop={3} marginStart={4}>
            <Icon icon="search" accessibilityLabel="" size="16" color="default" />
          </Box>
        </div>
      </form>
    </Tooltip>
  );
}
