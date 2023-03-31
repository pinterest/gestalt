// @flow strict
import { type Node, useCallback, useState, useEffect, useRef } from 'react';
import Box from '../Box.js';

type Props = {|
  children?: Node,
  footer?: Node,
  padding?: 'default' | 'none',
  header: Node,
|};

export default function ContentContainer({ children, header, footer, padding }: Props): Node {
  const [showTopShadow, setShowTopShadow] = useState(false);

  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const contentRef = useRef<?HTMLElement>(null);

  const updateShadows = useCallback(() => {
    const target = contentRef.current;
    if (!target) return;

    const hasVerticalScrollbar = target?.clientHeight < target?.scrollHeight;
    setShowTopShadow(hasVerticalScrollbar && target.scrollTop > 0);
    setShowBottomShadow(
      hasVerticalScrollbar && target.offsetHeight + target.scrollTop < target.scrollHeight,
    );
  }, []);

  useEffect(() => {
    updateShadows();
  }, [updateShadows]);

  useEffect(() => {
    // When SheetMobile is full page displayed in mobile browser, the body scroll is still accessible. Here we disable to just allow the scrolling within Modal
    if (!!window && window.body?.style?.overflow) {
      window.body.style.overflow = 'hidden';
    }
    return () => {
      if (!!window && window.body?.style?.overflow) {
        window.body.style.overflow = 'auto';
      }
    };
  }, []);

  useEffect(() => {
    window?.addEventListener('resize', updateShadows);
    return () => {
      window?.removeEventListener('resize', updateShadows);
    };
  }, [updateShadows]);

  return (
    <Box position="relative" display="flex" direction="column" width="100%">
      <Box
        padding={4}
        borderStyle={showTopShadow ? 'raisedTopShadow' : undefined}
        position="relative"
        fit
      >
        {header}
      </Box>

      <Box
        paddingX={padding === 'none' ? 0 : 4}
        paddingY={2}
        flex="grow"
        overflow="auto"
        onScroll={updateShadows}
        ref={contentRef}
      >
        {children}
      </Box>

      {Boolean(footer) && (
        <Box
          borderStyle={showBottomShadow ? 'raisedBottomShadow' : undefined}
          position="relative"
          fit
        >
          <Box padding={4}>{footer}</Box>
        </Box>
      )}
    </Box>
  );
}
