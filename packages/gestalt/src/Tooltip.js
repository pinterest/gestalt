// @flow strict
import { type Node } from 'react';
import InternalTooltip from './Tooltip/InternalTooltip.js';
import { type Indexable } from './zIndex.js';

type Props = {
  /**
   * Label to provide more context around the Tooltip’s function or purpose. By default `text` is used but this prop allows you to override it. Learn more about when to override it in the [Accessibility](https://gestalt.pinterest.systems/web/tooltip#Labels) section.
   */
  accessibilityLabel?: string,
  /**
   * The anchor element, usually [Icon Button](https://gestalt.pinterest.systems/web/iconbutton), that triggers Tooltip on hover or focus.
   */
  children: Node,
  /**
   * Specifies the preferred position of Tooltip relative to its anchor element. See the [ideal direction](https://gestalt.pinterest.systems/web/tooltip#Ideal-direction) variant to learn more.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  /**
   * Properly positions Tooltip relative to an inline element, such as [Icon Button](https://gestalt.pinterest.systems/web/iconbutton) using the inline property. See the [inline](https://gestalt.pinterest.systems/web/tooltip#Inline) variant to learn more.
   */
  inline?: boolean,
  /**
   * Displays a link at the bottom of Tooltip. See the [link](https://gestalt.pinterest.systems/web/tooltip#Link) variant to learn more.
   */
  link?: Node,
  /**
   * The text shown in Tooltip to describe its anchor element. See [localization ](https://gestalt.pinterest.systems/web/tooltip#Localization) to learn more.
   */
  text: string,
  /**
   * Specifies the stacking order of Tooltip along the z-axis in the current stacking context. See the [z-index](https://gestalt.pinterest.systems/web/tooltip#Z-index) variant to learn more.
   */
  zIndex?: Indexable,
};

/**
 * [Tooltip](https://gestalt.pinterest.systems/web/tooltip) is a floating text label that succinctly describes the function of an interactive element, typically [Icon Button](https://gestalt.pinterest.systems/web/iconbutton). It’s displayed continuously as long as the user hovers over or focuses on the element.
 *
 * **NOTE** Planning to use Tooltip with IconButton? Use [IconButton's built-in tooltip](https://gestalt.pinterest.systems/web/iconbutton#With-Tooltip) instead. **NOTE**
 *
 * ![Tooltip light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tooltip.spec.mjs-snapshots/Tooltip-chromium-darwin.png)
 * ![Tooltip dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tooltip-dark.spec.mjs-snapshots/Tooltip-dark-chromium-darwin.png)
 */
export default function Tooltip({
  accessibilityLabel,
  children,
  link,
  idealDirection = 'down',
  inline,
  text,
  zIndex,
}: Props): Node {
  return (
    <InternalTooltip
      accessibilityLabel={accessibilityLabel}
      link={link}
      idealDirection={idealDirection}
      inline={inline}
      text={text}
      zIndex={zIndex}
    >
      {children}
    </InternalTooltip>
  );
}

Tooltip.displayName = 'Tooltip';
