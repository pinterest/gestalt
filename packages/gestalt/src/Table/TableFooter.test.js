// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import TableFooter from './TableFooter.js';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <TableFooter>
        <div>footer table row</div>
      </TableFooter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
