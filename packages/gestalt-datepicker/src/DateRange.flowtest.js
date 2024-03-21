// @flow strict-local
import DateRange from './DateRange';

const Valid = (
  <DateRange
    endDateValue={new Date()}
    onCancel={() => {}}
    onEndDateChange={() => {}}
    onEndDateError={() => {}}
    onStartDateChange={() => {}}
    onStartDateError={() => {}}
    onSubmit={() => {}}
    startDateValue={new Date()}
  />
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <DateRange nonexisting={33} />;
