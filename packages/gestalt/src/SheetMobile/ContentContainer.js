// @flow strict
import { type Node as ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import Box from '../Box';

type Props = {
  children?: ReactNode,
  footer?: ReactNode,
  padding?: 'default' | 'none',
  header: ReactNode,
};

export default function ContentContainer({ children, header, footer, padding }: Props): ReactNode {
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
