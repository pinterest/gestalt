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
    const commonProps = { title, type };
    if (props.badgeText) {
      moduleTitle = <ModuleTitle {...commonProps} badgeText={props.badgeText} />;
    } else if (props.icon || props.iconAccessibilityLabel) {
      moduleTitle = (
        <ModuleTitle
          {...commonProps}
          icon={props.icon}
          iconAccessibilityLabel={props.iconAccessibilityLabel}
        />
      );
    } else if (props.iconButton) {
      moduleTitle = <ModuleTitle {...commonProps} iconButton={props.iconButton} />;
    } else {
      moduleTitle = <ModuleTitle {...commonProps} />;
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
