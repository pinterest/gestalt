// @flow strict
import { create } from 'react-test-renderer';
import ExperimentalOnInteractionProvider from './ExperimentalOnInteractionProvider.js';

describe('ExperimentalOnInteractionProvider', () => {
  it('renders', () => {
    const tree = create(<ExperimentalOnInteractionProvider name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<ExperimentalOnInteractionProvider accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
