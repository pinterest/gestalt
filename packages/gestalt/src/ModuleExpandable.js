// @flow strict
import { Fragment, type Node, useCallback, useState, useEffect } from 'react';
import Box from './Box.js';
import Divider from './Divider.js';
import ModuleExpandableItem from './ModuleExpandableItem.js';
import { type ModuleExpandableItemBaseProps } from './moduleTypes.js';

function getExpandedId(expandedIndex: ?number): ?number {
  return Number.isFinite(expandedIndex) ? expandedIndex : null;
}

type ModuleExpandableRowProps = {|
  ...ModuleExpandableItemBaseProps,
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  expandedId: ?number,
  id: string,
  index: number,
  onExpandedChange?: (?number) => void,
  setExpandedId: (?number) => void,
  shouldDisplayDivider: boolean,
|};

type Props = {|
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  expandedIndex?: ?number,
  id: string,
  items: $ReadOnlyArray<ModuleExpandableItemBaseProps>,
  onExpandedChange?: (?number) => void,
|};

function ModuleExpandableRow({
  accessibilityCollapseLabel,
  accessibilityExpandLabel,
  children,
  expandedId,
  id,
  index,
  onExpandedChange,
  setExpandedId,
  shouldDisplayDivider,
  summary,
  title,
  type,
  ...props
}: ModuleExpandableRowProps): Node {
  const onModuleClicked = useCallback(
    (isExpanded: boolean): void => {
      if (onExpandedChange) {
        onExpandedChange(isExpanded ? null : index);
      }
      setExpandedId(isExpanded ? null : index);
    },
    [index, onExpandedChange, setExpandedId],
  );
  const isCollapsed = expandedId !== index;
  const moduleItemId = `${id}-${index}`;

  let moduleExpandableItem;
  if (props.badgeText) {
    moduleExpandableItem = (
      <ModuleExpandableItem
        accessibilityCollapseLabel={accessibilityCollapseLabel}
        accessibilityExpandLabel={accessibilityExpandLabel}
        badgeText={props.badgeText}
        id={moduleItemId}
        isCollapsed={isCollapsed}
        onModuleClicked={onModuleClicked}
        summary={summary}
        title={title}
        type={type}
      >
        {children}
      </ModuleExpandableItem>
    );
  } else if (props.icon || props.iconAccessibilityLabel) {
    moduleExpandableItem = (
      <ModuleExpandableItem
        accessibilityCollapseLabel={accessibilityCollapseLabel}
        accessibilityExpandLabel={accessibilityExpandLabel}
        icon={props.icon}
        iconAccessibilityLabel={props.iconAccessibilityLabel}
        id={moduleItemId}
        isCollapsed={isCollapsed}
        onModuleClicked={onModuleClicked}
        summary={summary}
        title={title}
        type={type}
      >
        {children}
      </ModuleExpandableItem>
    );
  } else if (props.iconButton) {
    moduleExpandableItem = (
      <ModuleExpandableItem
        accessibilityCollapseLabel={accessibilityCollapseLabel}
        accessibilityExpandLabel={accessibilityExpandLabel}
        iconButton={props.iconButton}
        id={moduleItemId}
        isCollapsed={isCollapsed}
        onModuleClicked={onModuleClicked}
        summary={summary}
        title={title}
        type={type}
      >
        {children}
      </ModuleExpandableItem>
    );
  }

  return (
    <Fragment>
      {shouldDisplayDivider && <Divider />}
      {moduleExpandableItem}
    </Fragment>
  );
}

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

  return (
    <Box borderStyle="shadow" rounding={4}>
      {items.map((props: ModuleExpandableItemBaseProps, index) => (
        <ModuleExpandableRow
          {...props}
          accessibilityExpandLabel={accessibilityExpandLabel}
          accessibilityCollapseLabel={accessibilityCollapseLabel}
          expandedId={expandedId}
          key={index}
          id={id}
          index={index}
          onExpandedChange={onExpandedChange}
          setExpandedId={setExpandedId}
          shouldDisplayDivider={index > 0}
        />
      ))}
    </Box>
  );
}
