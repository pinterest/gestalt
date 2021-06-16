// @flow strict
import { create } from 'react-test-renderer';
import ComboBox from './ComboBox.js';

test('Checkbox indeterminate', () => {
  const tree = create(
    <ComboBox
      accessibilityClearButtonLabel="Clear options"
      id="ComboBox"
      noResultText="No Result"
      options={[{ value: '1', subtext: 'subtext' }]}
    />,
  );
  expect(tree).toMatchSnapshot();
});
