// @flow strict
import renderer from 'react-test-renderer';
import InternalLabel from './InternalLabel.js';

test('InternalLabel renders', () => {
  const component = renderer.create(<InternalLabel htmlFor="email">Email</InternalLabel>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('InternalLabel renders with label hidden', () => {
  const component = renderer.create(
    <InternalLabel _labelDisplay="hidden" htmlFor="email">
      Email
    </InternalLabel>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
