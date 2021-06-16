// @flow strict
import { Fragment, type Node, useState, useEffect } from 'react';
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

  return (
    <Box borderStyle="shadow" rounding={4}>
      {items.map(
        ({ badgeText, children, icon, iconAccessibilityLabel, summary, title, type }, index) => (
          <Fragment key={index}>
            {index > 0 && <Divider />}

            <ModuleExpandableItem
              accessibilityCollapseLabel={accessibilityCollapseLabel}
              accessibilityExpandLabel={accessibilityExpandLabel}
              badgeText={badgeText}
              icon={icon}
              iconAccessibilityLabel={iconAccessibilityLabel}
              id={`${id}-${index}`}
              isCollapsed={expandedId !== index}
              onModuleClicked={(isExpanded) => {
                if (onExpandedChange) {
                  onExpandedChange(isExpanded ? null : index);
                }
                setExpandedId(isExpanded ? null : index);
              }}
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
