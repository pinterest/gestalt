// @flow strict
import { type Element, type Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import IconButton from './IconButton.js';
import icons from './icons/index.js';
import ModuleExpandable from './ModuleExpandable.js';
import ModuleTitle from './ModuleTitle.js';

/**
 * [Module](https://gestalt.pinterest.systems/module) is a container that holds content about one subject. Its contents can be visible at all times, or expand and collapse as individual modules or a group of modules.
 */
export default function Module({
  badgeText,
  children,
  icon,
  iconAccessibilityLabel,
  iconButton,
  id,
  title,
  type = 'info',
}: {|
  //
  /**
   * Add a badge displayed after the title. Will not be displayed if `title` is not provided. Not to be used with `icon` or `iconButton`. Be sure to localize the text.
   *
   * Link: https://gestalt.pinterest.systems/text#static-badge
   */
  badgeText?: string,
  /**
   * Content to display underneath Module title
   *
   * Link: https://gestalt.pinterest.systems/module#static-default
   */
  children?: Node,
  /**
   * Name of icon to display in front of title. Will not be displayed if `title` is not provided. Not to be used with `badgeText` or `iconButton`. For a full list of icons, see [Iconography and SVGs](https://gestalt.pinterest.systems/iconography_and_svgs#Search-icon-library).
   *
   * Link: https://gestalt.pinterest.systems/module#static-icon
   */
  icon?: $Keys<typeof icons>,
  /**
   * Label to provide information about the icon used for screen readers. Can be used in two scenarios: to describe the error icon that appears when `type` is `error`, and to describe the provided `icon` prop when `type` is `info`. Be sure to localize the label.
   *
   * Link: https://gestalt.pinterest.systems/module#static-icon
   */
  iconAccessibilityLabel?: string,
  /**
   * IconButton element to be placed after the `title` for a supplemental Call To Action (CTA). Will not be displayed if `title` is not provided. Not to be used with `badgeText` or `icon`.
   *
   * Link: https://gestalt.pinterest.systems/module#static-iconbutton
   */
  iconButton?: Element<typeof IconButton>,
  /**
   * Unique id to identify this Module
   *
   * Link: https://gestalt.pinterest.systems/module#static-default
   */
  id: string,
  /**
   * Title of this Module. Be sure to localize the text.
   *
   * Link: https://gestalt.pinterest.systems/module#static-default
   */
  title?: string,
  /**
   * If set to `error`, displays error icon and changes title to red text. Be sure to provide an `iconAccessibilityLabel` when set to `error`.
   *
   * Link: https://gestalt.pinterest.systems/module#static-error
   */
  type?: 'error' | 'info',
|}): Node {
  return (
    <Box borderStyle="shadow" id={id} padding={6} rounding={4}>
      <Flex direction="column" gap={6}>
        {title && (
          <ModuleTitle
            badgeText={badgeText}
            icon={icon}
            iconAccessibilityLabel={iconAccessibilityLabel}
            iconButton={iconButton}
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
