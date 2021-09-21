// @flow strict
import { Fragment, type Node, useCallback, useState, useEffect } from 'react';
import Box from './Box.js';
import Divider from './Divider.js';
import ModuleExpandableItem from './ModuleExpandableItem.js';
import { type ModuleExpandableItemBaseProps } from './moduleTypes.js';

function getExpandedId(expandedIndex: ?number): ?number {
  return Number.isFinite(expandedIndex) ? expandedIndex : null;
}

type Props = {|
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  expandedIndex?: ?number,
  id: string,
  items: $ReadOnlyArray<ModuleExpandableItemBaseProps>,
  onExpandedChange?: (?number) => void,
|};

/**
 * https://gestalt.pinterest.systems/Module
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

  useEffect(() => {
    setExpandedId(getExpandedId(expandedIndex));
  }, [expandedIndex, setExpandedId]);

  const onModuleClickedHandler = useCallback(
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
      {items.map((props: ModuleExpandableItemBaseProps, index) => {
        const { children, summary, title, type } = props;

        const commonProps = {
          accessibilityCollapseLabel,
          accessibilityExpandLabel,
          id: `${id}-${index}`,
          isCollapsed: expandedId !== index,
          onModuleClicked: onModuleClickedHandler(index),
          summary,
          title,
          type,
        };

        let moduleExpandableItem;
        if (props.badgeText) {
          moduleExpandableItem = (
            <ModuleExpandableItem {...commonProps} badgeText={props.badgeText}>
              {children}
            </ModuleExpandableItem>
          );
        } else if (props.icon || props.iconAccessibilityLabel) {
          moduleExpandableItem = (
            <ModuleExpandableItem
              {...commonProps}
              icon={props.icon}
              iconAccessibilityLabel={props.iconAccessibilityLabel}
            >
              {children}
            </ModuleExpandableItem>
          );
        } else if (props.iconButton) {
          moduleExpandableItem = (
            <ModuleExpandableItem {...commonProps} iconButton={props.iconButton}>
              {children}
            </ModuleExpandableItem>
          );
        } else {
          moduleExpandableItem = (
            <ModuleExpandableItem {...commonProps}>{children}</ModuleExpandableItem>
          );
        }

        return (
          <Fragment key={index}>
            {index > 0 && <Divider />}
            {moduleExpandableItem}
          </Fragment>
        );
      })}
    </Box>
  );
}
