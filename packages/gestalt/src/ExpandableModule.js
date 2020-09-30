// @flow strict
import React, { useState, type Node } from 'react';
import Box from './Box.js';
import Divider from './Divider.js';
import ExpandableModuleBase from './ExpandableModuleBase.js';
import styles from './ExpandableModule.css';

type Props = {|
  items: Array<{|
    title: string,
    icon?: string,
    iconAccessibilityLabel?: string,
    hasError?: boolean,
    summary?: Array<string>,
    children?: Node,
  |}>,
|};

export default function ExpandableModule({ items }: Props): Node {
  const [expandedId, setExpandedId] = useState(-1);

  return (
    <div className={styles.expandablemodule}>
      {items.map(({ icon, title, hasError, summary, children }, index) => (
        <React.Fragment key={index}>
          <Box padding={6}>
            <ExpandableModuleBase
              title={title}
              summary={summary}
              icon={icon}
              isCollapsed={expandedId !== index}
              hasError={hasError}
              onModuleClicked={isExpanded =>
                setExpandedId(isExpanded ? -1 : index)
              }
            >
              {children}
            </ExpandableModuleBase>
          </Box>
          {index !== items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
}
