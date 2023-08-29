// @flow strict
import { type Element, Fragment, type Node, useCallback, useEffect, useState } from 'react';
import Box from './Box.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import Divider from './Divider.js';
import IconButton from './IconButton.js';
import icons from './icons/index.js';
import ModuleExpandableItem from './Module/ExpandableItem.js';

function getExpandedId(expandedIndex: ?number): ?number {
  return Number.isFinite(expandedIndex) ? expandedIndex : null;
}

type BadgeType = {|
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'darkWash' | 'lightWash',
|};

type Props = {|
  /**
   * Label used to communicate to screen readers which module will be collapsed when interacting with the title button. Should be something clear, like "Collapse Security Policies Module". Be sure to localize the label. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   *
   */
  accessibilityCollapseLabel: string,
  /**
   * Label used to communicate to screen readers which module will be expanded when interacting with the title button. Should be something clear, like "Expand Security Policies Module". Be sure to localize the label. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   */
  accessibilityExpandLabel: string,
  /**
   * The 0-based index indicating the item that should currently be expanded. This must be updated via `onExpandedChange` to ensure the correct item is expanded. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   */
  expandedIndex?: ?number,
  /**
   * Unique id to identify this Module. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   */
  id: string,
  /**
   * Array of modules displayed in a stack. Only one item can be expanded at a time. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   */
  items: $ReadOnlyArray<{|
    badge?: BadgeType,
    children?: Node,
    icon?: $Keys<typeof icons>,
    iconAccessibilityLabel?: string,
    iconButton?: Element<typeof IconButton>,
    summary?: $ReadOnlyArray<string>,
    title: string,
    type?: 'error' | 'info',
  |}>,
  /**
   * Callback executed whenever any module item is expanded or collapsed. It receives the index of the currently expanded module, or null if none are expanded. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   */
  onExpandedChange?: (?number) => void,
|};

/**
 * Use [Module.Expandable](https://gestalt.pinterest.systems/web/module) if your module requires expanding and collapsing content.
 */
export default function ModuleExpandable({
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  expandedIndex,
  id,
  items,
  onExpandedChange,
}: Props): Node {
  const [expandedId, setExpandedId] = useState<?number>(getExpandedId(expandedIndex));

  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  useEffect(() => {
    setExpandedId(getExpandedId(expandedIndex));
  }, [expandedIndex, setExpandedId]);

  const buildOnModuleClickHandler = useCallback(
    (index: number) =>
      (isExpanded: boolean): void => {
        if (onExpandedChange) {
          onExpandedChange(isExpanded ? null : index);
        }
        setExpandedId(isExpanded ? null : index);
      },
    [onExpandedChange],
  );

  return (
    <Box borderStyle="shadow" color={isDarkMode ? 'elevationFloating' : 'default'} rounding={4}>
      {items.map(
        (
          { badge, children, icon, iconAccessibilityLabel, iconButton, summary, title, type },
          index,
        ) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            {index > 0 && <Divider />}
            <ModuleExpandableItem
              accessibilityCollapseLabel={accessibilityCollapseLabel}
              accessibilityExpandLabel={accessibilityExpandLabel}
              badge={badge}
              icon={icon}
              iconAccessibilityLabel={iconAccessibilityLabel}
              iconButton={iconButton}
              id={`${id}-${index}`}
              isCollapsed={expandedId !== index}
              onModuleClicked={buildOnModuleClickHandler(index)}
              summary={summary}
              title={title}
              type={type}
            >
              {children}
            </ModuleExpandableItem>
          </Fragment>
        ),
      )}
    </Box>
  );
}

ModuleExpandable.displayName = 'Module.Expandable';
