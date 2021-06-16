// @flow strict
import type { Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import ModuleTitle from './ModuleTitle.js';
import ModuleExpandable from './ModuleExpandable.js';
import { type BaseModuleTitleProps } from './moduleTypes.js';

type Props = {|
  ...BaseModuleTitleProps,
  children?: Node,
  id: string,
|};

/**
 * https://gestalt.pinterest.systems/Module
 */
export default function Module({
  badgeText,
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
            badgeText={badgeText}
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
