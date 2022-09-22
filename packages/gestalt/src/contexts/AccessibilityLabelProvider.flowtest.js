// @flow strict
import AccessibilityLabelProvider, {
  fallbackLabels,
  useAccessibilityLabelContext,
} from './AccessibilityLabelProvider.js';

const Valid = <AccessibilityLabelProvider value={fallbackLabels}>Test</AccessibilityLabelProvider>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <AccessibilityLabelProvider nonexisting={33} />;

function TestComponent() {
  const { accessibilityHidePasswordLabel, accessibilityShowPasswordLabel } =
    useAccessibilityLabelContext('TextField');

  return null;
}

function TestFailComponent() {
  // $FlowExpectedError[prop-missing]
  const { foo } = useAccessibilityLabelContext('Foo');

  return null;
}
