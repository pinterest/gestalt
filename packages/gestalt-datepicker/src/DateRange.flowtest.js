// @flow strict-local
import DateRange from './DateRange.js';

const Valid = (
  <DateRange
    startDateValue={new Date()}
    endDateValue={new Date()}
    onStartDateChange={() => {}}
    onEndDateChange={() => {}}
    onStartDateError={() => {}}
    onEndDateError={() => {}}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <DateRange nonexisting={33} />;
