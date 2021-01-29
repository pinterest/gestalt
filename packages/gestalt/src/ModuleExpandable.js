// @flow strict
import React, { useState, useEffect, type Node } from 'react';
import Box from './Box.js';
import Divider from './Divider.js';
import ModuleExpandableItem from './ModuleExpandableItem.js';
import { type ExpandableBaseProps } from './moduleTypes.js';

export default function ModuleExpandable({
  id,
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  expandedIndex,
  onExpandedChange,
  items,
}: ExpandableBaseProps): Node {
  const [expandedId, setExpandedId] = useState<?number>(
    Number.isFinite(expandedIndex) ? expandedIndex : null,
  );

  useEffect(() => {
    setExpandedId(Number.isFinite(expandedIndex) ? expandedIndex : null);
  }, [expandedIndex, setExpandedId]);

  return (
    <Box rounding={2} borderStyle="shadow">
      {items.map(({ icon, iconAccessibilityLabel, title, type, summary, children }, index) => (
        <React.Fragment key={index}>
          <Box>
            <ModuleExpandableItem
              id={`${id}-${index}`}
              title={title}
              icon={icon}
              iconAccessibilityLabel={iconAccessibilityLabel}
              summary={summary}
              isCollapsed={expandedId !== index}
              type={type}
              accessibilityExpandLabel={accessibilityExpandLabel}
              accessibilityCollapseLabel={accessibilityCollapseLabel}
              onModuleClicked={(isExpanded) => {
                if (onExpandedChange) {
                  onExpandedChange(isExpanded ? null : index);
                }
                setExpandedId(isExpanded ? null : index);
              }}
            >
              {children}
            </ModuleExpandableItem>
          </Box>
          {index !== items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  );
}
