import { Fragment, useCallback, useEffect, useId, useMemo, useState } from 'react';
import classnames from 'classnames';
import { TOKEN_SPACE_400 } from 'gestalt-design-tokens';
import getChildrenToArray from './getChildrenToArray';
import SideNavigationGroupContent from './GroupContent';
import Box from '../Box';
import { NestingProvider, useNesting } from '../contexts/NestingProvider';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Flex from '../Flex';
import Heading from '../Heading';
import IconButton from '../IconButton';
import InternalDismissButton from '../sharedSubcomponents/InternalDismissButton';
import styles from '../SideNavigation.css';
import { Props } from '../SideNavigationGroup';
import { NESTING_MARGIN_START_MAP } from '../SideNavigationTopItem';
import TapArea from '../TapArea';

type SideNavigationGroupMobileProps = Props & {
  hasActiveChild: boolean;
};

export default function SideNavigationGroupMobile({
  children,
  badge,
  counter,
  display = 'expandable',
  hasActiveChild = false,
  icon,
  label,
  primaryAction,
  notificationAccessibilityLabel,
}: SideNavigationGroupMobileProps) {
  // Manages PrimaryAction
  const [compression, setCompression] = useState<'compress' | 'none'>('compress');
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // Manages children

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
      <ul className={classnames(styles.ulItem)} id={itemId}>
        {childrenArray}
      </ul>
    ),
    [itemId, childrenArray],
  );

  const [expanded, setExpanded] = useState(false);

  const itemColor = hovered ? 'secondary' : undefined;

  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ readonly '0': "var(--space-400)"; readonly '1': "var(--space-1200)"; readonly '2': "68px"; }'.
  const nestingMargin = NESTING_MARGIN_START_MAP[isTopLevel ? 0 : nestedLevel - 1];

  const paddingStyle = {
    paddingInlineStart: nestingMargin,
    paddingInlineEnd: TOKEN_SPACE_400,
  } as const;

  let topLevelChildrenList;

  if (isTopLevel) {
    topLevelChildrenList = (
      <Fragment>
        <Box height={64} paddingY={2} position="relative">
          <Flex alignItems="center" height="100%" justifyContent="center">
            <Flex.Item flex="none">
              <IconButton
                accessibilityLabel="Go to previous item"
                icon="arrow-back"
                onClick={() => {
                  setHideActiveChildren(true);
                  setSelectedMobileChildren(null);
                }}
                size="lg"
                tooltip={{
                  text: 'Go to previous item',
                  idealDirection: 'up',
                }}
              />
            </Flex.Item>
            <Flex.Item flex="grow">
              <Flex alignItems="center" height="100%" justifyContent="center">
                <Heading lineClamp={1} size="400">
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
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
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
          rounding={2}
          tapStyle={compression}
        >
          <SideNavigationGroupContent
            badge={badge}
            counter={counter}
            display={display}
            expanded={expanded}
            focused={focused}
            hovered={hovered}
            icon={icon}
            itemColor={itemColor}
            itemId={itemId}
            label={label}
            notificationAccessibilityLabel={notificationAccessibilityLabel}
            paddingStyle={paddingStyle}
            primaryAction={primaryAction}
            selectedItemId={selectedItemId}
            setCompression={setCompression}
          />
        </TapArea>
        {expanded ? passedChildren : null}
      </NestingProvider>
    </li>
  );
}
