// @flow strict
import I18nProvider, { defaultTranslations, useI18nContext } from './I18nProvider.js';

const Valid = <I18nProvider value={defaultTranslations}>Test</I18nProvider>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <I18nProvider nonexisting={33} />;

function TestComponent() {
  const { accessibilityHidePasswordLabel, accessibilityShowPasswordLabel } =
    useI18nContext('TextField');

  return null;
}
