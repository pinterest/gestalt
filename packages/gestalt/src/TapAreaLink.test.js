// @flow strict
import { create } from 'react-test-renderer';
import TapAreaLink from './TapAreaLink.js';

describe('TapAreaLink', () => {
  test('renders', () => {
    const component = create(
      <TapAreaLink href="#" rel="nofollow" target="blank">
        TapAreaLink
      </TapAreaLink>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders disabled', () => {
    const component = create(
      <TapAreaLink href="#" disabled rel="nofollow" target="blank">
        TapAreaLink
      </TapAreaLink>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
