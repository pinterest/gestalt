// @flow strict
import { Fragment, type Node, useEffect, useRef } from 'react';
import classnames from 'classnames';
import getChildrenToArray from './getChildrenToArray.js';
import borderStyles from '../Borders.css';
import Box from '../Box.js';
import { useSideNavigation } from '../contexts/SideNavigationProvider.js';
import Divider from '../Divider.js';
import Flex from '../Flex.js';
import Heading from '../Heading.js';
import InternalDismissButton from '../shared/InternalDismissButton.js';
import styles from '../SideNavigation.css';
import { type Props as SideNavigationProps } from '../SideNavigation.js';

type Props = {| ...SideNavigationProps, id: string |};

export default function SideNavigationMobile({
  accessibilityLabel,
  children,
  footer,
  header,
  id,
  mobileTitle,
  dismissButton,
  showBorder,
}: Props): Node {
  const dismissButtonRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  const navigationChildren = getChildrenToArray({ children, filterLevel: 'main' });

  const { selectedMobileChildren } = useSideNavigation();

  useEffect(() => {
    if (dismissButtonRef.current) {
      dismissButtonRef.current.focus();
    }
  }, [dismissButtonRef]);

  return (
    <Box width="100%" height="100%" as="nav" aria-label={accessibilityLabel} id={id}>
      <div
        className={showBorder ? classnames(borderStyles.borderRight, styles.fullHeight) : undefined}
      >
        <Box
          padding={2}
          dangerouslySetInlineStyle={{ __style: { paddingBottom: 24 } }}
          color="default"
        >
          {selectedMobileChildren ?? (
            <Fragment>
              <Box height={64} paddingY={2}>
                <Flex height="100%" alignItems="center" justifyContent="center">
                  <Flex.Item flex="grow">
                    <Flex height="100%" alignItems="center" justifyContent="start">
                      <Heading size="400" lineClamp={1}>
                        {mobileTitle}
                      </Heading>
                    </Flex>
                  </Flex.Item>
                  <Flex.Item flex="none">
                    <InternalDismissButton
                      accessibilityLabel={dismissButton?.accessibilityLabel || ''}
                      accessibilityControls={id}
                      onClick={() => dismissButton?.onDismiss()}
                      ref={dismissButtonRef}
                    />
                  </Flex.Item>
                </Flex>
              </Box>
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
            </Fragment>
          )}
        </Box>
      </div>
    </Box>
  );
}
