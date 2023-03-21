// @flow strict
import { SelectList } from 'gestalt';

export default function TestBox() {
  return (
    <SelectList
      disabled={false}
      id="split-select-list"
      name="split-select-list"
      onChange={() => {}}
      size="lg"
      value="">{[
        { label: 'Algeria', value: 'algeria' },
        { label: 'Belgium', value: 'belgium' },
        { label: 'Canada', value: 'canada' },
        { label: 'Denmark', value: 'denmark' },
        { label: 'Egypt', value: 'egypt' },
        { label: 'France', value: 'france' }
      ].map(item => <SelectList.Option key={item.label} {...item} />)}</SelectList>
  );
}
