// @flow strict
import { type Node } from 'react';
import InternalLabel from './Label/InternalLabel.js';

type Props = {
  /**
   * The content of the label, typically [Text](https://gestalt.pinterest.systems/web/text) or similar.
   */
  children?: Node,
  /**
   * Unique id of the element this label is describing.
   */
  htmlFor: string,
};

/**
 * Use the [Label](https://gestalt.pinterest.systems/web/label) component to connect a label with a form component in an accessible way.
 *
 * ![Label light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Label.spec.mjs-snapshots/Label-chromium-darwin.png)
 * ![Label dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Label-dark.spec.mjs-snapshots/Label-dark-chromium-darwin.png)
 *
 */
export default function Label({ children, htmlFor }: Props): Node {
  return <InternalLabel htmlFor={htmlFor}>{children}</InternalLabel>;
}
