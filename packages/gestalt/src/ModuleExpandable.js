// @flow strict
import React, { useState, type Node } from 'react';
import Box from './Box.js';
import Divider from './Divider.js';
import ModuleExpandableItem from './ModuleExpandableItem.js';
import { type ExpandableBaseProps } from './moduleTypes.js';

export default function ModuleExpandable({
  id,
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  expandedId,
  setExpandedId,
  items,
}: Props): Node {
  const [localExpandedId, setLocalExpandedId] = useState(null);
  const expId = expandedId || localExpandedId;
  const setExpId = setExpandedId || setLocalExpandedId;

  return (
    <Box rounding={2} borderStyle="shadow">
      {items.map(
        (
          { icon, iconAccessibilityLabel, title, type, summary, children },
          index
        ) => (
          <React.Fragment key={index}>
            <Box>
              <ModuleExpandableItem
                id={`${id}-${index}`}
                title={title}
                icon={icon}
                iconAccessibilityLabel={iconAccessibilityLabel}
                summary={summary}
                isCollapsed={expId !== `${id}-${index}`}
                type={type}
                accessibilityExpandLabel={accessibilityExpandLabel}
                accessibilityCollapseLabel={accessibilityCollapseLabel}
                onModuleClicked={(isExpanded) => {
                  setExpId(isExpanded ? null : `${id}-${index}`);
                }}
              >
                {children}
              </ModuleExpandableItem>
            </Box>
            {index !== items.length - 1 && <Divider />}
          </React.Fragment>
        )
      )}
    </Box>
  );
}
