// @flow strict
import { type Node } from 'react';
import { I18nProvider } from 'gestalt';

const translations = {
  ComboBox: {
    accessibilityClearButtonLabel: 'Clear input',
  },
  TextField: {
    accessibilityHidePasswordLabel: 'Hide password',
    accessibilityShowPasswordLabel: 'Show password',
  },
};

type Props = {| children: Node |};

export default function DocsI18nProvider({ children }: Props): Node {
  return <I18nProvider value={translations}>{children}</I18nProvider>;
}
