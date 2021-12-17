// @flow strict
import { Fragment, type Node, useCallback, useState, useEffect, type Element } from 'react';
import Box from './Box.js';
import Divider from './Divider.js';
import ModuleExpandableItem from './ModuleExpandableItem.js';
import icons from './icons/index.js';
import IconButton from './IconButton.js';

function getExpandedId(expandedIndex: ?number): ?number {
  return Number.isFinite(expandedIndex) ? expandedIndex : null;
}

/**
 * https://gestalt.pinterest.systems/module
 */
export default function ModuleExpandable({
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  expandedIndex,
  id,
  items,
  onExpandedChange,
}: {|
  accessibilityCollapseLabel: string,
  accessibilityExpandLabel: string,
  expandedIndex?: ?number,
  id: string,
  items: $ReadOnlyArray<{|
    badgeText?: string,
    children?: Node,
    icon?: $Keys<typeof icons>,
    iconAccessibilityLabel?: string,
    iconButton?: Element<typeof IconButton>,
    summary?: $ReadOnlyArray<string>,
    title: string,
    type?: 'error' | 'info',
  |}>,
  onExpandedChange?: (?number) => void,
|}): Node {
  const [expandedId, setExpandedId] = useState<?number>(getExpandedId(expandedIndex));

  useEffect(() => {
    setExpandedId(getExpandedId(expandedIndex));
  }, [expandedIndex, setExpandedId]);

  const buildOnModuleClickHandler = useCallback(
    (index: number) => (isExpanded: boolean): void => {
      if (onExpandedChange) {
        onExpandedChange(isExpanded ? null : index);
      }
      setExpandedId(isExpanded ? null : index);
    },
    [onExpandedChange],
  );

  return (
    <Box borderStyle="shadow" rounding={4}>
      {items.map(
        (
          { badgeText, children, icon, iconAccessibilityLabel, iconButton, summary, title, type },
          index,
        ) => (
          <Fragment key={index}>
            {index > 0 && <Divider />}
            <ModuleExpandableItem
              accessibilityCollapseLabel={accessibilityCollapseLabel}
              accessibilityExpandLabel={accessibilityExpandLabel}
              badgeText={badgeText}
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
