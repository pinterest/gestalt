// @flow strict-local
import { create } from 'react-test-renderer';
import DateRange from './DateRange.js';

describe('DateRange', () => {
  it('renders', () => {
    const tree = create(
      <DateRange
        endDateValue={new Date()}
        onCancel={() => {}}
        onEndDateChange={() => {}}
        onEndDateError={() => {}}
        onStartDateChange={() => {}}
        onStartDateError={() => {}}
        onSubmit={() => {}}
        startDateValue={new Date()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
