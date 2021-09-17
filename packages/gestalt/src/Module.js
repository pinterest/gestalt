// @flow strict
import type { Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import ModuleTitle from './ModuleTitle.js';
import ModuleExpandable from './ModuleExpandable.js';
import type { BaseModuleTitleProps } from './moduleTypes.js';

type Props = {|
  ...BaseModuleTitleProps,
  children?: Node,
  id: string,
|};

/**
 * https://gestalt.pinterest.systems/Module
 */
export default function Module({ children, id, title, type = 'info', ...props }: Props): Node {
  let moduleTitle;
  if (title) {
    if (props.badgeText) {
      moduleTitle = <ModuleTitle badgeText={props.badgeText} title={title} type={type} />;
    } else if (props.icon || props.iconAccessibilityLabel) {
      moduleTitle = (
        <ModuleTitle
          icon={props.icon}
          iconAccessibilityLabel={props.iconAccessibilityLabel}
          title={title}
          type={type}
        />
      );
    } else if (props.iconButton) {
      moduleTitle = <ModuleTitle iconButton={props.iconButton} title={title} type={type} />;
    }
  }

  return (
    <Box borderStyle="shadow" id={id} padding={6} rounding={4}>
      <Flex direction="column" gap={6}>
        {moduleTitle}
        {/* Flex.Item necessary to prevent gap from being applied to each child */}
        <Flex.Item>{children}</Flex.Item>
      </Flex>
    </Box>
  );
}

Module.Expandable = ModuleExpandable;
