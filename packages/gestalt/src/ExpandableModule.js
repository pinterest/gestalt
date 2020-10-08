// @flow strict
import React, { useState, type Node } from 'react';
import Box from './Box.js';
import Divider from './Divider.js';
import ExpandableModuleBase from './ExpandableModuleBase.js';
import icons from './icons/index.js';

type Props = {|
  id: string,
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  items: Array<{|
    title: string,
    icon?: $Keys<typeof icons>,
    iconAccessibilityLabel?: string,
    summary?: Array<string>,
    type?: 'error' | 'info',
    children?: Node,
  |}>,
|};

export default function ExpandableModule({
  id,
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  items,
}: Props): Node {
  const [expandedId, setExpandedId] = useState(-1);

  return (
    <Box rounding={2} borderStyle="shadow">
      {items.map(
        (
          { icon, iconAccessibilityLabel, title, type, summary, children },
          index
        ) => (
          <React.Fragment key={index}>
            <Box padding={6}>
              <ExpandableModuleBase
                id={`${id}-${index}`}
                title={title}
                icon={icon}
                iconAccessibilityLabel={iconAccessibilityLabel}
                summary={summary}
                isCollapsed={expandedId !== index}
                type={type}
                accessibilityExpandLabel={accessibilityExpandLabel}
                accessibilityCollapseLabel={accessibilityCollapseLabel}
                onModuleClicked={isExpanded =>
                  setExpandedId(isExpanded ? -1 : index)
                }
              >
                {children}
              </ExpandableModuleBase>
            </Box>
            {index !== items.length - 1 && <Divider />}
          </React.Fragment>
        )
      )}
    </Box>
  );
}
