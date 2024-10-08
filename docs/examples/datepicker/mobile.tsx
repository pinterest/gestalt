import { useState } from 'react';
import { DeviceTypeProvider } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  const [dateValue, setDateValue] = useState<Date | null>(new Date(1985, 6, 4));
  return (
    <DeviceTypeProvider deviceType="mobile">
      <DatePicker
        id="main"
        label="Select a date"
        onChange={({ value }) => setDateValue(value)}
        value={dateValue}
      />
    </DeviceTypeProvider>
  );
}
