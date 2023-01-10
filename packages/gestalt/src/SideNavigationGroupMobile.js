// @flow strict
import { Fragment, useState, useCallback, useEffect, useMemo, useId, type Node } from 'react';
import classnames from 'classnames';
import styles from './SideNavigation.css';
import TapArea from './TapArea.js';
import Flex from './Flex.js';
import Heading from './Heading.js';
import IconButton from './IconButton.js';
import InternalDismissButton from './InternalDismissButton.js';
import Box from './Box.js';
import { useNesting, NestingProvider } from './contexts/NestingProvider.js';
import { NESTING_MARGIN_START_MAP } from './SideNavigationTopItem.js';
import getChildrenToArray from './SideNavigation/getChildrenToArray.js';
import { useSideNavigation } from './contexts/SideNavigationProvider.js';
import SideNavigationGroupContent from './SideNavigationGroupContent.js';
import { type Props } from './SideNavigationGroup.js';

type SideNavigationGroupMobileProps = {| ...Props, hasActiveChild: boolean |};

export default function SideNavigationGroupMobile({
  children,
  badge,
  counter,
  display = 'expandable',
  hasActiveChild = false,
  icon,
  label,
  notificationAccessibilityLabel,
}: SideNavigationGroupMobileProps): Node {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const itemId = useId();

  const { nestedLevel } = useNesting();

  const {
    dismissButton,
    selectedItemId,
    setSelectedItemId,
    setSelectedMobileChildren,
    hideActiveChildren,
    setHideActiveChildren,
  } = useSideNavigation();

  const isTopLevel = nestedLevel === 0;

  const childrenArray = getChildrenToArray({
    children,
    filterLevel: 'nested',
  });

  const childrenList = useMemo(
    () => (
      <ul id={itemId} className={classnames(styles.ulItem)}>
        {childrenArray}
      </ul>
    ),
    [itemId, childrenArray],
  );

  const itemColor = hovered ? 'secondary' : undefined;

  const nestingMargin = NESTING_MARGIN_START_MAP[isTopLevel ? 0 : nestedLevel - 1];

  const paddingStyle = {
    paddingInlineStart: nestingMargin,
    paddingInlineEnd: '16px',
  };

  let topLevelChildrenList;

  if (isTopLevel) {
    topLevelChildrenList = (
      <Fragment>
        <Box position="relative" height={64} paddingY={2}>
          <Flex height="100%" alignItems="center" justifyContent="center">
            <Flex.Item flex="none">
              <IconButton
                size="lg"
                accessibilityLabel="Go to previous item"
                icon="arrow-back"
                tooltip={{
                  text: 'Go to previous item',
                  idealDirection: 'up',
                }}
                onClick={() => {
                  setHideActiveChildren(true);
                  setSelectedMobileChildren(null);
                }}
              />
            </Flex.Item>
            <Flex.Item flex="grow">
              <Flex height="100%" alignItems="center" justifyContent="center">
                <Heading size="400" lineClamp={1}>
                  {label}
                </Heading>
              </Flex>
            </Flex.Item>
            <Flex.Item flex="none">
              <InternalDismissButton
                accessibilityControls={dismissButton?.id}
                accessibilityLabel={dismissButton?.accessibilityLabel || ''}
                onClick={() => dismissButton?.onDismiss()}
              />
            </Flex.Item>
          </Flex>
        </Box>
        {childrenList}
      </Fragment>
    );
  }

  const passedChildren = isTopLevel ? topLevelChildrenList : childrenList;

  const elevateChildrenToParent = useCallback(
    () =>
      setSelectedMobileChildren(
        <NestingProvider componentName="SideNavigation" maxNestedLevels={2}>
          {passedChildren}
        </NestingProvider>,
      ),
    [passedChildren, setSelectedMobileChildren],
  );

  useEffect(() => {
    if (isTopLevel && hasActiveChild && !hideActiveChildren) {
      elevateChildrenToParent();
    } else if (hasActiveChild && !hideActiveChildren) {
      setExpanded(true);
    }
  }, [isTopLevel, hasActiveChild, hideActiveChildren, itemId, elevateChildrenToParent]);

  return (
    <li className={classnames(styles.liItem)}>
      <NestingProvider componentName="SideNavigation" maxNestedLevels={2}>
        <TapArea
          accessibilityControls={display === 'expandable' ? itemId : undefined}
          accessibilityExpanded={display === 'expandable' ? expanded : undefined}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          rounding={2}
          tapStyle="compress"
          onTap={() => {
            if (isTopLevel) {
              elevateChildrenToParent();
            } else {
              setExpanded((value) => {
                if (!value) setSelectedItemId(itemId);
                return !value;
              });
            }
          }}
        >
          <SideNavigationGroupContent
            itemColor={itemColor}
            expanded={expanded}
            selectedItemId={selectedItemId}
            itemId={itemId}
            paddingStyle={paddingStyle}
            icon={icon}
            label={label}
            badge={badge}
            notificationAccessibilityLabel={notificationAccessibilityLabel}
            counter={counter}
            display={display}
          />
        </TapArea>
        {expanded ? passedChildren : null}
      </NestingProvider>
    </li>
  );
}
