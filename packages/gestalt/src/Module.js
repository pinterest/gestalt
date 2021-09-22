// @flow strict
import type { Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import ModuleTitle from './ModuleTitle.js';
import ModuleExpandable from './ModuleExpandable.js';
import type { PublicModuleProps } from './moduleTypes.js';

/**
 * https://gestalt.pinterest.systems/Module
 */
export default function Module({ children, id, title, type, ...props }: PublicModuleProps): Node {
  return (
    <Box borderStyle="shadow" id={id} padding={6} rounding={4}>
      <Flex direction="column" gap={6}>
        {title && (
          <ModuleTitle
            badgeText={props.badgeText ? props.badgeText : undefined}
            icon={props.icon ? props.icon : undefined}
            iconAccessibilityLabel={
              props.iconAccessibilityLabel ? props.iconAccessibilityLabel : undefined
            }
            iconButton={props.iconButton ? props.iconButton : undefined}
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
