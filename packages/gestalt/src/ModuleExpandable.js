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
  onExpandChange?: (?number) => void,
|};

export default function ModuleExpandable({
  id,
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  expandedIndex,
  items,
  onExpandChange,
}: Props): Node {
  const [localExpandedId, setLocalExpandedId] = useState(
    expandedIndex ? `${id}-${expandedIndex}` : null
  );

  useEffect(() => {
    setLocalExpandedId(
      expandedIndex || expandedIndex === 0 ? `${id}-${expandedIndex}` : null
    );
  }, [id, expandedIndex, setLocalExpandedId]);

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
                isCollapsed={localExpandedId !== `${id}-${index}`}
                type={type}
                accessibilityExpandLabel={accessibilityExpandLabel}
                accessibilityCollapseLabel={accessibilityCollapseLabel}
                onModuleClicked={(isExpanded) => {
                  if (onExpandChange) {
                    onExpandChange(isExpanded ? null : index);
                  }
                  setLocalExpandedId(isExpanded ? null : `${id}-${index}`);
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
