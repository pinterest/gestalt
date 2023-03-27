// @flow strict
import { create } from 'react-test-renderer';
import SheetMobile from './SheetMobile.js';

describe('SheetMobile', () => {
  it('renders', () => {
    const tree = create(<SheetMobile accessibilityLabel="" onDismiss={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(<SheetMobile accessibilityLabel="" onDismiss={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
