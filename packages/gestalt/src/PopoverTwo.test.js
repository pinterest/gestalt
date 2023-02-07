// @flow strict
import { create } from 'react-test-renderer';
import PopoverTwo from './PopoverTwo.js';

describe('PopoverTwo', () => {
  it('renders', () => {
    const tree = create(<PopoverTwo name="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<PopoverTwo accessibilityLabel="Test Accessibility Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
