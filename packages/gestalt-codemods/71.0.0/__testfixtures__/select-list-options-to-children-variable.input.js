// @flow strict
import { SelectList } from 'gestalt';

const options = [
  { label: 'Algeria', value: 'algeria' },
  { label: 'Belgium', value: 'belgium' },
  { label: 'Canada', value: 'canada' },
  { label: 'Denmark', value: 'denmark' },
  { label: 'Egypt', value: 'egypt' },
  { label: 'France', value: 'france' },
];

export default function TestBox() {
  return (
    <SelectList
      disabled={false}
      id="split-select-list"
      name="split-select-list"
      onChange={() => {}}
      options={options}
      size="lg"
      value=""
    />
  );
}
