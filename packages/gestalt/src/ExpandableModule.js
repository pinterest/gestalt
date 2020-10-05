// @flow strict
import React, { useState, type Node } from 'react';
import Box from './Box.js';
import Divider from './Divider.js';
import ExpandableModuleBase from './ExpandableModuleBase.js';
import icons from './icons/index.js';
import styles from './ExpandableModule.css';

type Props = {|
  items: Array<{|
    title: string,
    icon?: $Keys<typeof icons>,
    iconAccessibilityLabel?: string,
    tapAccessibilityLabel: string,
    summary?: Array<string>,
    type?: 'error' | 'info',
    children?: Node,
  |}>,
|};

export default function ExpandableModule({ items }: Props): Node {
  const [expandedId, setExpandedId] = useState(-1);

  return (
    <div className={styles.expandableModule}>
      {items.map(
        (
          {
            icon,
            iconAccessibilityLabel,
            tapAccessibilityLabel,
            title,
            type,
            summary,
            children,
          },
          index
        ) => (
          <React.Fragment key={index}>
            <Box padding={6}>
              <ExpandableModuleBase
                title={title}
                summary={summary}
                icon={icon}
                iconAccessibilityLabel={iconAccessibilityLabel}
                tapAccessibilityLabel={tapAccessibilityLabel}
                isCollapsed={expandedId !== index}
                type={type || 'info'}
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
    </div>
  );
}
