// @flow strict
import React, { type Node } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import Text from './Text.js';
import { type BaseProps } from './ModuleTypes.js';
import ModuleExpandable from './ModuleExpandable.js';

export default function Module({
  children,
  id,
  icon,
  iconAccessibilityLabel,
  title,
  type = 'info',
}: BaseProps): Node {
  const MODULE_TYPE_ATTRIBUTES = {
    info: {
      icon,
      color: 'darkGray',
    },
    error: {
      icon: 'workflow-status-problem',
      color: 'red',
    },
  };
  return (
    <Box id={id} rounding={2} borderStyle="shadow" direction="column">
      {title && (
        <Box padding={6} display="flex">
          {MODULE_TYPE_ATTRIBUTES[type].icon && (
            <Box marginEnd={2}>
              <Icon
                icon={MODULE_TYPE_ATTRIBUTES[type].icon}
                accessibilityLabel={iconAccessibilityLabel || ''}
                color={MODULE_TYPE_ATTRIBUTES[type].color}
              />
            </Box>
          )}
          <Text
            weight="bold"
            truncate
            color={MODULE_TYPE_ATTRIBUTES[type].color}
          >
            {title}
          </Text>
        </Box>
      )}
      <Box marginTop={title ? -6 : 0} padding={6}>
        {children}
      </Box>
    </Box>
  );
}

Module.Expandable = ModuleExpandable;
