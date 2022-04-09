// @flow strict
import { create } from 'react-test-renderer';
import SelectList from './SelectList.js';

const options = [
  { label: 'option1', value: 'value1' },
  { label: 'option2', value: 'value2' },
  { label: 'option3', value: 'value3' },
].map(({ label, value }) => <SelectList.Option key={label} label={label} value={value} />);

describe('SelectList', () => {
  it('Renders an FormErrorMessage if an error message is passed in', () => {
    const component = create(
      <SelectList errorMessage="Error message" id="test" onChange={jest.fn()}>
        {options}
      </SelectList>,
    );

    expect(JSON.stringify(component.toJSON())).toContain('Error message');
  });

  it('Does not render an FormErrorMessage when errorMessage is null', () => {
    const component = create(
      <SelectList id="test" onChange={jest.fn()}>
        {options}
      </SelectList>,
    );
    expect(JSON.stringify(component.toJSON())).not.toContain('Error message');
  });

  it('Renders a hidden, disabled placeholder option if placeholder prop is passed', () => {
    const component = create(
      <SelectList id="test" onChange={jest.fn()} placeholder="Placeholder text">
        {options}
      </SelectList>,
    );
    // eslint-disable-next-line testing-library/await-async-query -- Please fix the next time this file is touched!
    expect(component.root.findByProps({ hidden: true, disabled: true }).children).toEqual([
      'Placeholder text',
    ]);
  });

  it('Renders a disabled option if options includes disabled option', () => {
    const component = create(
      <SelectList id="test" onChange={jest.fn()}>
        {options}
        <SelectList.Option disabled label="label4" value="value4" />
      </SelectList>,
    );
    // eslint-disable-next-line testing-library/await-async-query -- Please fix the next time this file is touched!
    expect(component.root.findByProps({ disabled: true }).children).toEqual(['option4']);
  });

  it('SelectList normal', () => {
    const tree = create(
      <SelectList id="test" onChange={jest.fn()}>
        {options}
      </SelectList>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('SelectList with a hidden label', () => {
    const tree = create(
      <SelectList label="testing" labelDisplay="hidden" id="test" onChange={jest.fn()}>
        {options}
      </SelectList>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
