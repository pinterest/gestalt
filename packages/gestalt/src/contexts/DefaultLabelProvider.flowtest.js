// @flow strict
import DefaultLabelProvider, {
  fallbackLabels,
  useDefaultLabelContext,
} from './DefaultLabelProvider.js';

const Valid = <DefaultLabelProvider labels={fallbackLabels}>Test</DefaultLabelProvider>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <DefaultLabelProvider nonexisting={33} />;

function TestComponent() {
  const { accessibilityHidePasswordLabel, accessibilityShowPasswordLabel } =
    useDefaultLabelContext('TextField');

  return null;
}

function TestFailComponent() {
  // $FlowExpectedError[prop-missing]
  const { foo } = useDefaultLabelContext('Foo');

  return null;
}
