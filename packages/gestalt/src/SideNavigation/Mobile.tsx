import { Fragment, useEffect, useRef } from 'react';
import classnames from 'classnames';
import getChildrenToArray from './getChildrenToArray';
import borderStyles from '../Borders.css';
import Box from '../Box';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Divider from '../Divider';
import Flex from '../Flex';
import Heading from '../Heading';
import InternalDismissButton from '../sharedSubcomponents/InternalDismissButton';
import { Props as SideNavigationProps } from '../SideNavigation';
import styles from '../SideNavigation.css';

type Props = SideNavigationProps & {
  id: string;
};

export default function SideNavigationMobile({
  accessibilityLabel,
  children,
  dataTestId,
  footer,
  header,
  id,
  mobileTitle,
  dismissButton,
  showBorder,
}: Props) {
  const dismissButtonRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  const navigationChildren = getChildrenToArray({
    children,
    filterLevel: 'main',
  });

  const { selectedMobileChildren } = useSideNavigation();

  useEffect(() => {
    if (dismissButtonRef.current) {
      dismissButtonRef.current.focus();
    }
  }, [dismissButtonRef]);

  return (
    <Box aria-label={accessibilityLabel} as="nav" height="100%" id={id} width="100%">
      <div
        className={showBorder ? classnames(borderStyles.borderRight, styles.fullHeight) : undefined}
        data-test-id={dataTestId}
      >
        <Box
          color="default"
          dangerouslySetInlineStyle={{ __style: { paddingBottom: 24 } }}
          padding={2}
        >
          {selectedMobileChildren ?? (
            <Fragment>
              <Box height={64} paddingY={2}>
                <Flex alignItems="center" height="100%" justifyContent="center">
                  <Flex.Item flex="grow">
                    <Flex alignItems="center" height="100%" justifyContent="start">
                      <Heading lineClamp={1} size="400">
                        {mobileTitle}
                      </Heading>
                    </Flex>
                  </Flex.Item>
                  <Flex.Item flex="none">
                    <InternalDismissButton
                      // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
                      ref={dismissButtonRef}
                      accessibilityControls={id}
                      accessibilityLabel={dismissButton?.accessibilityLabel || ''}
                      onClick={() => dismissButton?.onDismiss()}
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
