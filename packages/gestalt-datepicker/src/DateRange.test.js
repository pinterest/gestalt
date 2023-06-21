// @flow strict-local
import { create } from 'react-test-renderer';
import DateRange from './DateRange.js';

describe('DateRange', () => {
  it('renders', () => {
    const tree = create(
      <DateRange
        startDateValue={new Date()}
        endDateValue={new Date()}
        onStartDateChange={() => {}}
        onEndDateChange={() => {}}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an accessibility label', () => {
    const tree = create(
      <DateRange
        startDateValue={new Date()}
        endDateValue={new Date()}
        onStartDateChange={() => {}}
        onEndDateChange={() => {}}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
