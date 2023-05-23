// @flow strict
import { render, screen } from '@testing-library/react';
import SelectList from './SelectList.js';

describe('<SelectList />', () => {
  const options = [
    { label: 'option1', value: 'value1' },
    { label: 'option2', value: 'value2' },
    { label: 'option3', value: 'value3' },
  ].map(({ label, value }) => <SelectList.Option key={label} label={label} value={value} />);

  it('renders an error message', () => {
    render(
      <SelectList errorMessage="Error message" id="test" onChange={jest.fn()}>
        {options}
      </SelectList>,
    );

    expect(screen.getByText('Error message')).toBeVisible();
  });

  it('renders a name', () => {
    const { container } = render(
      <SelectList name="select_name" id="select_id" onChange={jest.fn()}>
        {options}
      </SelectList>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('[name="select_name"]')).toBeVisible();
  });

  it('handles errorMessage prop change', () => {
    const handleChange = jest.fn<
      [{| event: SyntheticInputEvent<HTMLSelectElement>, value: string |}],
      void,
    >();
    const { rerender } = render(
      <SelectList id="test" onChange={handleChange}>
        {options}
      </SelectList>,
    );
    expect(() => {
      screen.getByText('Error message');
    }).toThrow('Unable to find an element with the text: Error message');
    rerender(
      <SelectList id="test" onChange={handleChange} errorMessage="Error message">
        {options}
      </SelectList>,
    );
    expect(screen.getByText('Error message')).toBeVisible();
  });

  it('handles disabled', () => {
    const { container } = render(
      <SelectList disabled id="test" onChange={jest.fn()}>
        {options}
      </SelectList>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('select[disabled]')).toBeVisible();
  });

  it('renders a placeholder', () => {
    const { container } = render(
      <SelectList id="test" onChange={jest.fn()} placeholder="option1">
        {options}
      </SelectList>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('option')).toBeDisabled();
  });

  it('handles disabled options', () => {
    const { container } = render(
      <SelectList id="test" onChange={jest.fn()}>
        {options}
        <SelectList.Option disabled label="option4" value="value4" />
      </SelectList>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('option[value="value4"]')).toBeDisabled();
  });

  it('renders a label', () => {
    render(
      <SelectList
        id="test"
        label="Label for the select list"
        onChange={jest.fn()}
        placeholder="option1"
      >
        {options}
      </SelectList>,
    );
    expect(screen.getByText('Label for the select list')).toBeVisible();
  });

  it('renders helper text', () => {
    render(
      <SelectList
        id="test"
        label="Label for the select list"
        helperText="Helper text for the select list"
        onChange={jest.fn()}
        placeholder="option1"
      >
        {options}
      </SelectList>,
    );
    expect(screen.getByText('Helper text for the select list')).toBeVisible();
  });

  it('hides the helper text when an error message is shown', () => {
    render(
      <SelectList
        id="test"
        label="Label for the select list"
        helperText="Helper text for the select list"
        errorMessage="Error message for the select list"
        onChange={jest.fn()}
        placeholder="option1"
      >
        {options}
      </SelectList>,
    );
    expect(() => {
      screen.getByText('Helper text for the select list');
    }).toThrow('Unable to find an element with the text: Helper text for the select list');
  });

  describe('size', () => {
    it('adds a "medium" classname by default', () => {
      const { container } = render(
        <SelectList name="select_name" id="select_id" onChange={jest.fn()}>
          {options}
        </SelectList>,
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.querySelector('.medium')).toBeVisible();
    });

    it('adds a "large" classname when size is set to "lg"', () => {
      const { container } = render(
        <SelectList name="select_name" id="select_id" onChange={jest.fn()} size="lg">
          {options}
        </SelectList>,
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.querySelector('.large')).toBeVisible();
    });
  });

  it('handles disabling option group', () => {
    const { container } = render(
      <SelectList id="optionGroup" label="With option group" onChange={() => {}}>
        {options}
        <SelectList.Group disabled label="Foo group">
          <SelectList.Option label="Foo-option1" value="Foo-value1" />
          <SelectList.Option label="Foo-option2" value="Foo-value2" />
        </SelectList.Group>
      </SelectList>,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('optgroup[label="Foo group"]')).toBeDisabled();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('option[value="Foo-value1"]')).toBeDisabled();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('option[value="Foo-value2"]')).toBeDisabled();
  });
});
