// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Flex from './Flex.js';
import Divider from './Divider.js';
import Heading from './Heading.js';
import IconButton from './IconButton.js';
import styles from './SideNavigation.css';
import useGetChildrenToArray from './useGetChildrenToArray.js';
import { useSideNavigation } from './contexts/SideNavigationProvider.js';
import { type Props } from './SideNavigation.js';

export default function SideNavigationMobile({
  accessibilityLabel,
  children,
  footer,
  header,
  title,
  dismissButton,
}: Props): Node {
  const navigationChildren = useGetChildrenToArray({ children, filterLevel: 'main' });

  const { selectedMobileChildren } = useSideNavigation();

  return (
    selectedMobileChildren ?? (
      <Box
        width="100%"
        height="100%"
        as="nav"
        aria-label={accessibilityLabel}
        padding={2}
        color="default"
        dangerouslySetInlineStyle={{ __style: { paddingBottom: 24 } }}
        overflow="scroll"
      >
        <Box height={64} paddingY={2} marginStart={1}>
          <Flex height="100%" alignItems="center" justifyContent="center">
            <Flex.Item flex="grow">
              <Flex height="100%" alignItems="center" justifyContent="start">
                <Heading size="400" lineClamp={1}>
                  {title}
                </Heading>
              </Flex>
            </Flex.Item>
            <Flex.Item flex="none">
              <IconButton
                size="lg"
                accessibilityLabel={dismissButton?.accessibilityLabel || ''}
                icon="cancel"
                tooltip={dismissButton?.tooltip}
                onClick={() => dismissButton?.onDismiss()}
              />
            </Flex.Item>
          </Flex>
        </Box>
        <Flex direction="column" gap={4}>
          {header ? (
            <Flex direction="column" gap={4}>
              <Box paddingX={4}>{header}</Box>
              <Divider />
            </Flex>
          ) : null}
          <ul className={classnames(styles.ulItem)}>{navigationChildren}</ul>
          {footer ? (
            <Flex direction="column" gap={4}>
              <Divider />
              <Box paddingX={4}>{footer}</Box>
            </Flex>
          ) : null}
        </Flex>
      </Box>
    )
  );
}
