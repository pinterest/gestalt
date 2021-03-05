// @flow strict
import React, { type Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import ModuleTitle from './ModuleTitle.js';
import ModuleExpandable from './ModuleExpandable.js';
import { type BaseModuleProps } from './moduleTypes.js';

type Props = {|
  ...BaseModuleProps,
  id: string,
|};

export default function Module({
  children,
  icon,
  iconAccessibilityLabel,
  id,
  title,
  type = 'info',
}: Props): Node {
  return (
    <Box borderStyle="shadow" id={id} padding={6} rounding={4}>
      <Flex direction="column" gap={6}>
        {title && (
          <ModuleTitle
            icon={icon}
            iconAccessibilityLabel={iconAccessibilityLabel}
            title={title}
            type={type}
          />
        )}

        {/* Flex.Item necessary to prevent gap from being applied to each child */}
        <Flex.Item>{children}</Flex.Item>
      </Flex>
    </Box>
  );
}

Module.Expandable = ModuleExpandable;
