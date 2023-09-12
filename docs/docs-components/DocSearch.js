// @flow strict
import { Fragment, type Node, type Ref, useCallback, useEffect, useState } from 'react';
import { Box, CompositeZIndex, Icon, IconButton, Tooltip } from 'gestalt';
import { PAGE_HEADER_POPOVER_ZINDEX } from './z-indices.js';

const INPUT_ID = 'algolia-doc-search';

function SearchBox({ popoverZIndex }: {| popoverZIndex?: CompositeZIndex |}) {
  // Icon placement is copied directly from  SearchField
  // Try to maintain consistency w/ SearchField whenever possible
  return (
    <Tooltip inline text="Pro tip: press '/' to quickly access search" zIndex={popoverZIndex}>
      <form className="searchbox">
        <div className="searchbox__wrapper">
          <input
            id={INPUT_ID}
            className="searchbox__input"
            type="search"
            placeholder="Search Gestalt"
            aria-label="Search Gestalt docs"
          />
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                pointerEvents: 'none',
                // Added the following lines for Safari support
                top: '50%',
                transform: 'translateY(-50%)',
              },
            }}
            left
            right
            paddingX={4}
            position="absolute"
          >
            <Icon icon="search" accessibilityLabel="" />
          </Box>
        </div>
      </form>
    </Tooltip>
  );
}

export default function DocSearch({
  anchorRef,
  isMobileSearchExpandedOpen,
  toggleSearchBarOpen,
}: {|
  anchorRef: Ref<typeof IconButton>,
  isMobileSearchExpandedOpen: boolean,
  toggleSearchBarOpen: () => void,
|}): Node {
  const [isCompressedUI, setIsCompressedUI] = useState(
    typeof window !== 'undefined' && window.innerWidth < 1312,
  );
  function handleResize() {
    setIsCompressedUI(window.innerWidth < 1312);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target || event.srcElement;
      const code = event.keyCode || event.which || event.charCode;

      // $FlowIssue[prop-missing] Flow can't find tagName
      const { tagName } = target;

      const algoliaSearchInput = document.querySelector(`#${INPUT_ID}`);
      const algoliaSearchInputIsFocused = document.activeElement === algoliaSearchInput;

      if (tagName === 'INPUT' && algoliaSearchInput && algoliaSearchInputIsFocused) {
        // Escape key
        if (code === 27) {
          algoliaSearchInput.blur();
          if (isCompressedUI && isMobileSearchExpandedOpen) {
            toggleSearchBarOpen();
          }
        }
      }

      // Ignore
      // * isContentEditable === true
      // * <input>, <textarea> and <select>
      // * readOnly === true
      if (
        // $FlowIssue[prop-missing] Flow can't find isContentEditable
        target.isContentEditable ||
        ((tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') &&
          // $FlowIssue[prop-missing] Flow can't find readOnly
          !target.readOnly)
      ) {
        return;
      }

      // Forward Slash `/`
      if (code === 191) {
        if (algoliaSearchInput) {
          if (!isMobileSearchExpandedOpen && isCompressedUI) {
            toggleSearchBarOpen();
          }
          event.preventDefault();
          algoliaSearchInput.focus();
        }
      }
    },
    [isCompressedUI, isMobileSearchExpandedOpen, toggleSearchBarOpen],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const algoliaSearchInput = document.querySelector(`#${INPUT_ID}`);
    if (algoliaSearchInput && isMobileSearchExpandedOpen) {
      algoliaSearchInput.focus();
    }
  }, [isMobileSearchExpandedOpen]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.docsearch) {
      return;
    }
    window.docsearch({
      appId: 'GS3KDMZW6P',
      apiKey: '88c1825a5951ee68c92b4fbf4e85ec7f',
      debug: false, // Set debug to true if you want to keep open and inspect the dropdown
      indexName: 'gestalt',
      inputSelector: `#${INPUT_ID}`,
    });
  }, []);

  return (
    <Fragment>
      <Box
        alignItems="center"
        display={isMobileSearchExpandedOpen ? 'flex' : 'none'}
        lgDisplay="flex"
        flex="shrink"
        marginStart={2}
        mdMarginStart={0}
      >
        <Box flex="grow" paddingX={2}>
          <SearchBox popoverZIndex={PAGE_HEADER_POPOVER_ZINDEX} />
        </Box>
      </Box>

      <Box display="block" lgDisplay="none" marginStart={2}>
        <IconButton
          accessibilityControls="site-settings-dropdown"
          accessibilityExpanded={isMobileSearchExpandedOpen}
          accessibilityHaspopup
          accessibilityLabel="Search Gestalt"
          icon={isMobileSearchExpandedOpen ? 'cancel' : 'search'}
          iconColor="darkGray"
          onClick={toggleSearchBarOpen}
          ref={anchorRef}
          size="sm"
          tooltip={{
            'text': isMobileSearchExpandedOpen ? 'Close search' : 'Search Gestalt',
            'zIndex': PAGE_HEADER_POPOVER_ZINDEX,
          }}
        />
      </Box>
    </Fragment>
  );
}
