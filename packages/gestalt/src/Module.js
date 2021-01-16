// @flow strict
import React, { type Node } from 'react';
import Box from './Box.js';
import { type BaseProps } from './moduleTypes.js';
import ModuleTitle from './ModuleTitle.js';
import ModuleExpandable from './ModuleExpandable.js';

export default function Module({
  children,
  id,
  icon,
  iconAccessibilityLabel,
  title,
  type = 'info',
}: BaseProps): Node {
  return (
    <Box id={id} rounding={2} borderStyle="shadow" direction="column">
      {title && (
        <Box padding={6} display="flex">
          <ModuleTitle
            type={type}
            title={title}
            icon={icon}
            iconAccessibilityLabel={iconAccessibilityLabel}
          />
        </Box>
      )}
      <Box marginTop={title ? -6 : 0} padding={6}>
        {children}
      </Box>
    </Box>
  );
}

Module.Expandable = ModuleExpandable;
