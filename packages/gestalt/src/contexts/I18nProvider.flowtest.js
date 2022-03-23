// @flow strict
import I18nProvider, { initialContext, useI18nContext } from './I18nProvider.js';

const Valid = <I18nProvider value={initialContext}>Test</I18nProvider>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <I18nProvider nonexisting={33} />;

function TestComponent() {
  const { accessibilityHidePasswordLabel, accessibilityShowPasswordLabel } = useI18nContext(
    'TextField',
  );

  return null;
}

function TestFailComponent() {
  // $FlowExpectedError[prop-missing]
  const { foo } = useI18nContext('Foo');

  return null;
}
