import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import Box from '../Box';

type Props = {
  children?: ReactNode;
  footer?: ReactNode;
  padding?: 'default' | 'none';
  header: ReactNode;
};

export default function ContentContainer({ children, header, footer, padding }: Props) {
  const [showTopShadow, setShowTopShadow] = useState(false);

  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const contentRef = useRef<HTMLElement | null | undefined>(null);

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
    <Box direction="column" display="flex" position="relative" width="100%">
      <Box
        borderStyle={showTopShadow ? 'raisedTopShadow' : undefined}
        fit
        padding={4}
        position="relative"
      >
        {header}
      </Box>

      <Box
        ref={contentRef}
        flex="grow"
        onScroll={updateShadows}
        overflow="auto"
        paddingX={padding === 'none' ? 0 : 4}
        paddingY={2}
      >
        {children}
      </Box>

      {Boolean(footer) && (
        <Box
          borderStyle={showBottomShadow ? 'raisedBottomShadow' : undefined}
          fit
          position="relative"
        >
          <Box padding={4}>{footer}</Box>
        </Box>
      )}
    </Box>
  );
}
