import { ReactNode } from 'react';
import InternalLabel from './Label/InternalLabel';

type Props = {
  /**
   * The content of the label, typically [Text](https://gestalt.pinterest.systems/web/text) or similar.
   */
  children?: ReactNode;
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Unique id of the element this label is describing.
   */
  htmlFor: string;
};

/**
 * Use the [Label](https://gestalt.pinterest.systems/web/label) component to connect a label with a form component in an accessible way.
 *
 * ![Label light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Label.spec.ts-snapshots/Label-chromium-darwin.png)
 * ![Label dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Label-dark.spec.ts-snapshots/Label-dark-chromium-darwin.png)
 *
 */
export default function Label({ children, dataTestId, htmlFor }: Props) {
  return (
    <InternalLabel dataTestId={dataTestId} htmlFor={htmlFor}>
      {children}
    </InternalLabel>
  );
}

Label.displayName = 'Label';
