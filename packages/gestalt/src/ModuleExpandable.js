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
  expandedIdx?: ?number,
  items: $ReadOnlyArray<{|
    title: string,
    icon?: $Keys<typeof icons>,
    iconAccessibilityLabel?: string,
    summary?: $ReadOnlyArray<string>,
    type?: 'error' | 'info',
    children?: Node,
  |}>,
|};

export default function ModuleExpandable({
  id,
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  expandedIdx,
  items,
}: Props): Node {
  const [localExpandedId, setLocalExpandedId] = useState(
    expandedIdx ? `${id}-${expandedIdx}` : null
  );

  useEffect(() => {
    setLocalExpandedId(
      expandedIdx || expandedIdx === 0 ? `${id}-${expandedIdx}` : null
    );
  }, [id, expandedIdx, setLocalExpandedId]);

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
