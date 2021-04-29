// @flow strict
import { create } from 'react-test-renderer';
import Fieldset from './Fieldset.js';

describe('Fieldset', () => {
  it('renders', () => {
    const tree = create(<Fieldset name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<Fieldset accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
