// @flow strict
import { type Node as ReactNode, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Collapser from './Collapser';
import getChildrenToArray from './getChildrenToArray';
import borderStyles from '../Borders.css';
import Box from '../Box';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Divider from '../Divider';
import Flex from '../Flex';
import { type Props as SideNavigationProps } from '../SideNavigation';
import styles from '../SideNavigation.css';

type Props = { ...SideNavigationProps };

export default function NavigationContent({
  accessibilityLabel,
  children,
  footer,
  header,
  showBorder,
  collapsible,
}: Props): ReactNode {
  const navigationChildren = getChildrenToArray({
    children,
    filterLevel: 'main',
  });

  const { collapsed } = useSideNavigation();
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const element = scrollContainer.current;
    const scrollHandler = () => setIsScrolled(!!element?.scrollTop);

    element?.addEventListener('scroll', scrollHandler);

    return () => element?.removeEventListener('scroll', scrollHandler);
  }, []);

  if (collapsible) window.temp1 = navigationChildren;

  return (
    <Box height="100%" as="nav" aria-label={accessibilityLabel} color="default">
      <div
        ref={scrollContainer}
        className={showBorder ? classnames(borderStyles.borderRight, styles.fullHeight) : undefined}
      >
        {collapsible && <Collapser shadow={isScrolled} />}

        <Box
          padding={2}
          dangerouslySetInlineStyle={{
            __style: {
              paddingBottom: 24,
              minWidth: collapsed ? undefined : 280,
              // width: collapsed ? 40 : 280,
            },
          }}
        >
          <Flex direction="column" gap={{ column: 4, row: 0 }}>
            {header ? (
              <Flex direction="column" gap={{ column: 4, row: 0 }}>
                <Box paddingX={4}>{header}</Box>
                <Divider />
              </Flex>
            ) : null}
            <ul className={classnames(styles.ulItem)}>{navigationChildren}</ul>
            {footer ? (
              <Flex direction="column" gap={{ column: 4, row: 0 }}>
                <Divider />
                <Box paddingX={4}>{footer}</Box>
              </Flex>
            ) : null}
          </Flex>
        </Box>
      </div>
    </Box>
  );
}
