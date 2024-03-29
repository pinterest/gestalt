// @flow strict
import {
  Fragment,
  type Node as ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Box, FixedZIndex, Icon, IconButton, Tooltip } from 'gestalt';

const INPUT_ID = 'algolia-doc-search';

function SearchBox({ popoverZIndex }: { popoverZIndex?: FixedZIndex }) {
  // Icon placement is copied directly from  SearchField
  // Try to maintain consistency w/ SearchField whenever possible
  return (
    <Tooltip inline text="Pro tip: press '/' to quickly access search" zIndex={popoverZIndex}>
      <form className="searchbox">
        <div className="searchbox__wrapper">
          <input
            aria-label="Search Gestalt docs"
            className="searchbox__input"
            id={INPUT_ID}
            placeholder="Search Gestalt"
            type="search"
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
            paddingX={4}
            position="absolute"
            right
          >
            <Icon accessibilityLabel="" icon="search" />
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
}: {
  anchorRef: Ref<typeof IconButton>,
  isMobileSearchExpandedOpen: boolean,
  toggleSearchBarOpen: () => void,
}): ReactNode {
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
        flex="shrink"
        lgDisplay="flex"
        marginStart={2}
        mdMarginStart={0}
      >
        <Box flex="grow" paddingX={2}>
          <SearchBox popoverZIndex={new FixedZIndex(11)} />
        </Box>
      </Box>

      <Box display="block" lgDisplay="none" marginStart={2}>
        <IconButton
          ref={anchorRef}
          accessibilityControls="site-settings-dropdown"
          accessibilityExpanded={isMobileSearchExpandedOpen}
          accessibilityHaspopup
          accessibilityLabel="Search Gestalt"
          icon={isMobileSearchExpandedOpen ? 'cancel' : 'search'}
          iconColor="darkGray"
          onClick={toggleSearchBarOpen}
          size="sm"
          tooltip={{
            text: isMobileSearchExpandedOpen ? 'Close search' : 'Search Gestalt',
            zIndex: new FixedZIndex(11),
          }}
        />
      </Box>
    </Fragment>
  );
}
