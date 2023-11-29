// @flow strict
import { type Element, type Node as ReactNode } from 'react';
import Box from './Box';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import Flex from './Flex';
import IconButton from './IconButton';
import IconButtonLink from './IconButtonLink';
import icons from './icons/index';
import applyModuleDensityStyle from './Module/applyModuleDensity';
import ModuleTitle from './Module/Title';
import ModuleExpandable from './ModuleExpandable';

type BadgeType = {
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'darkWash' | 'lightWash',
};

type Props = {
  /**
   * Add a badge displayed after the title. Will not be displayed if `title` is not provided. Not to be used with `icon` or `iconButton`. Be sure to localize the text. See the [badge variant](https://gestalt.pinterest.systems/web/module#Static-Badge) for more details.
   */
  badge?: BadgeType,
  /**
   * Content to display underneath Module title.
   */
  children?: ReactNode,
  /**
   * Name of icon to display in front of title. Will not be displayed if `title` is not provided. Not to be used with `badge` or `iconButton`. For a full list of icons, see [Iconography and SVGs](https://gestalt.pinterest.systems/foundations/iconography/library#Search-icon-library). See the [icon variant](https://gestalt.pinterest.systems/web/module#Static-Icon) for more details.
   */
  icon?: $Keys<typeof icons>,
  /**
   * Label to provide information about the icon used for screen readers. Can be used in two scenarios: to describe the error icon that appears when `type` is `error`, and to describe the provided `icon` prop when `type` is `info`. Be sure to localize the label. See the [icon variant](https://gestalt.pinterest.systems/web/module#Static-Icon) for more details.
   */
  iconAccessibilityLabel?: string,
  /**
   * IconButton element to be placed after the `title` for a supplemental Call To Action (CTA). Will not be displayed if `title` is not provided. Not to be used with `badge` or `icon`. See the [icon button variant](https://gestalt.pinterest.systems/web/module#Static-IconButton) for more details.
   */
  iconButton?: Element<typeof IconButton | typeof IconButtonLink>,
  /**
   * Unique id to identify this Module
   */
  id: string,
  /**
   * Sets the size of the Module. See the [size variant](https://gestalt.pinterest.systems.com/web/module#size) to learn more.
   */
  size?: 'sm' | 'md' | 'lg',
  /**
   * Title of this Module. Be sure to localize the text.
   */
  title?: string,
  /**
   * If set to `error`, displays error icon and changes title to red text. Be sure to provide an `iconAccessibilityLabel` when set to `error`. See the [error variant](https://gestalt.pinterest.systems/web/module#Static-Error) for more details.
   */
  type?: 'error' | 'info',
};

/**
 * [Module](https://gestalt.pinterest.systems/web/module) is a container that holds content about one subject. Its contents can be visible at all times, or expand and collapse as individual modules or a group of modules.
 *
 * ![Module light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Module.spec.mjs-snapshots/Module-chromium-darwin.png)
 * ![Module dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Module-dark.spec.mjs-snapshots/Module-dark-chromium-darwin.png)
 *
 */
export default function Module({
  badge,
  children,
  icon,
  iconAccessibilityLabel,
  iconButton,
  id,
  title,
  size = 'lg',
  type = 'info',
}: Props): ReactNode {
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  const { gap, padding, rounding } = applyModuleDensityStyle(size);

  return (
    <Box
      borderStyle="shadow"
      color={isDarkMode ? 'elevationFloating' : 'default'}
      id={id}
      padding={padding}
      rounding={rounding}
    >
      <Flex direction="column" gap={{ column: gap, row: 0 }}>
        {title && (
          <ModuleTitle
            badge={badge}
            icon={icon}
            iconAccessibilityLabel={iconAccessibilityLabel}
            iconButton={iconButton}
            title={title}
            type={type}
            size={size}
          />
        )}
        {/* Flex.Item necessary to prevent gap from being applied to each child */}
        <Flex.Item>{children}</Flex.Item>
      </Flex>
    </Box>
  );
}

Module.Expandable = ModuleExpandable;
