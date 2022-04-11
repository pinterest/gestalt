// @flow strict
import { render } from '@testing-library/react';
import SelectList from './SelectList.js';

describe('<SelectList />', () => {
  const options = [
    { label: 'option1', value: 'value1' },
    { label: 'option2', value: 'value2' },
    { label: 'option3', value: 'value3' },
  ];

  it('Renders an FormErrorMessage if an error message is passed in', () => {
    const { getByText } = render(
      <SelectList errorMessage="Error message" id="test" onChange={jest.fn()} options={options} />,
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getByText('Error message')).toBeVisible();
  });

  it('SelectList with name', () => {
    const { container } = render(
      <SelectList name="select_name" id="select_id" onChange={jest.fn()} options={options} />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(container.querySelector('[name="select_name"]')).toBeVisible();
  });

  it('SelectList with errorMessage prop change', () => {
    const handleChange = jest.fn();
    const { getByText, rerender } = render(
      <SelectList id="test" onChange={handleChange} options={options} />,
    );
    expect(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
      getByText('Error message');
    }).toThrow('Unable to find an element with the text: Error message');
    rerender(
      <SelectList
        id="test"
        onChange={handleChange}
        options={options}
        errorMessage="Error message"
      />,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getByText('Error message')).toBeVisible();
  });

  it('SelectList with disabled', () => {
    const { container } = render(
      <SelectList disabled id="test" onChange={jest.fn()} options={options} />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(container.querySelector('select[disabled]')).toBeVisible();
  });

  it('SelectList with placeholder', () => {
    const { container } = render(
      <SelectList
        id="test"
        onChange={jest.fn()}
        options={options}
        placeholder={options[0].label}
      />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(container.querySelector('option')).toBeDisabled();
  });

  it('SelectList with disabled options', () => {
    const { container } = render(
      <SelectList
        id="test"
        onChange={jest.fn()}
        options={[...options, { label: 'option4', value: 'value4', disabled: true }]}
      />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(container.querySelector('option[value="value4"]')).toBeDisabled();
  });

  it('shows a label for the select list', () => {
    const { getByText } = render(
      <SelectList
        id="test"
        label="Label for the select list"
        onChange={jest.fn()}
        options={options}
        placeholder={options[0].label}
      />,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getByText('Label for the select list')).toBeVisible();
  });

  it('shows helper text for the select list', () => {
    const { getByText } = render(
      <SelectList
        id="test"
        label="Label for the select list"
        helperText="Helper text for the select list"
        onChange={jest.fn()}
        options={options}
        placeholder={options[0].label}
      />,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getByText('Helper text for the select list')).toBeVisible();
  });

  it('hides the helper text for the select list when an error message is shown', () => {
    const { getByText } = render(
      <SelectList
        id="test"
        label="Label for the select list"
        helperText="Helper text for the select list"
        errorMessage="Error message for the select list"
        onChange={jest.fn()}
        options={options}
        placeholder={options[0].label}
      />,
    );
    expect(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
      getByText('Helper text for the select list');
    }).toThrow('Unable to find an element with the text: Helper text for the select list');
  });

  it('adds a "medium" classname by default', () => {
    const { container } = render(
      <SelectList name="select_name" id="select_id" onChange={jest.fn()} options={options} />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(container.querySelector('.medium')).toBeVisible();
  });

  it('adds a "large" classname when size is set to "lg"', () => {
    const { container } = render(
      <SelectList
        name="select_name"
        id="select_id"
        onChange={jest.fn()}
        options={options}
        size="lg"
      />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(container.querySelector('.large')).toBeVisible();
  });
});
