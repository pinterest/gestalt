// @flow strict
import React, { useState, type Node } from 'react';
import Box from './Box.js';
import IconButton from './IconButton.js';
import Icon from './Icon.js';
import TapArea from './TapArea.js';
import Text from './Text.js';
import styles from './ExpandableModule.css';

type Props = {|
  title: string,
  icon?: string,
  iconAccessibilityLabel?: string,
  summary?: Array<string>,
  isDefaultCollapsed?: boolean,
  children?: Node,
|};

export default function ExpandableModule({
  title,
  icon,
  iconAccessibilityLabel,
  summary,
  isDefaultCollapsed = true,
  children,
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed);

  return (
    <>
      <div className={styles.expandablemodule}>
        <TapArea onTap={() => setIsCollapsed(!isCollapsed)}>
          <Box display="flex">
            <Box display="flex" flex="grow" marginTop={1} marginEnd={6}>
              <Box column={isCollapsed ? 6 : 12} display="flex">
                {icon && (
                  <Box marginEnd={2}>
                    <Icon
                      icon="lock"
                      accessibilityLabel={
                        iconAccessibilityLabel || 'Title icon'
                      }
                      color="darkGray"
                    />
                  </Box>
                )}
                <Text weight="bold" truncate>
                  {title}
                </Text>
              </Box>
              {summary && isCollapsed && (
                <Box column={6}>
                  {summary.map((item, i) => (
                    <Box key={i} paddingY={1}>
                      <Text size="md" truncate>
                        {item}
                      </Text>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
            <Box>
              {children && (
                <IconButton
                  accessibilityLabel="arrow icon to expand or collapse the module"
                  bgColor="white"
                  icon={isCollapsed ? 'arrow-down' : 'arrow-up'}
                  iconColor="darkGray"
                  size="xs"
                />
              )}
            </Box>
          </Box>
        </TapArea>
        {!isCollapsed && <Box marginTop={6}>{children}</Box>}
      </div>
    </>
  );
}
