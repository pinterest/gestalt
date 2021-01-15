// @flow strict
import React, { useState, useEffect, type Node } from 'react';
import Box from './Box.js';
import Divider from './Divider.js';
import ModuleExpandableBase from './ModuleExpandableBase.js';
import icons from './icons/index.js';

type Props = {|
  id: string,
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  expandedIndex?: ?number,
  items: $ReadOnlyArray<{|
    title: string,
    icon?: $Keys<typeof icons>,
    iconAccessibilityLabel?: string,
    summary?: $ReadOnlyArray<string>,
    type?: 'error' | 'info',
    children?: Node,
  |}>,
  onExpandedChange?: (?number) => void,
|};

export default function ModuleExpandable({
  id,
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  expandedIndex,
  onExpandedChange,
  items,
}: Props): Node {
  const [expandedId, setExpandedId] = useState(expandedIndex || null);

  useEffect(() => {
    setExpandedId(expandedIndex || expandedIndex === 0 ? expandedIndex : null);
  }, [expandedIndex, setExpandedId]);

  return (
    <Box rounding={2} borderStyle="shadow">
      {items.map(
        (
          { icon, iconAccessibilityLabel, title, type, summary, children },
          index
        ) => (
          <React.Fragment key={index}>
            <Box>
              <ModuleExpandableBase
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
              </ModuleExpandableBase>
            </Box>
            {index !== items.length - 1 && <Divider />}
          </React.Fragment>
        )
      )}
    </Box>
  );
}
