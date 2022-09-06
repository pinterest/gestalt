// @flow strict
import { create } from 'react-test-renderer';
import SelectList from './SelectList.js';

const options = [
  { label: 'option1', value: 'value1' },
  { label: 'option2', value: 'value2' },
  { label: 'option3', value: 'value3' },
].map(({ label, value }) => <SelectList.Option key={label} label={label} value={value} />);

describe('SelectList', () => {
  it('renders an error message', () => {
    const component = create(
      <SelectList errorMessage="Error message" id="test" onChange={jest.fn()}>
        {options}
      </SelectList>,
    );

    expect(JSON.stringify(component.toJSON())).toContain('Error message');
  });

  it('Does not render an error message when errorMessage is null', () => {
    const component = create(
      <SelectList id="test" onChange={jest.fn()}>
        {options}
      </SelectList>,
    );
    expect(JSON.stringify(component.toJSON())).not.toContain('Error message');
  });

  it('renders a hidden, disabled placeholder option if placeholder prop is passed', () => {
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

  it('renders a disabled option', () => {
    const component = create(
      <SelectList id="test" onChange={jest.fn()}>
        {options}
        <SelectList.Option disabled label="option4" value="value4" />
      </SelectList>,
    );

    // This rule is for testing-library, not react-test-renderer
    // Apparently the rule only looks for `findBy*` without considering actual usage
    // https://github.com/facebook/react/issues/23093
    // https://github.com/testing-library/eslint-plugin-testing-library/issues/518
    // eslint-disable-next-line testing-library/await-async-query
    expect(component.root.findByProps({ disabled: true }).props).toMatchObject({
      label: 'option4',
    });
  });

  it('renders with typical props', () => {
    const tree = create(
      <SelectList id="test" onChange={jest.fn()}>
        {options}
      </SelectList>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a hidden label', () => {
    const tree = create(
      <SelectList label="testing" labelDisplay="hidden" id="test" onChange={jest.fn()}>
        {options}
      </SelectList>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an option group', () => {
    const tree = create(
      <SelectList id="optionGroup" label="With option group" onChange={() => {}}>
        {options}
        <SelectList.Group label="Foo group">
          <SelectList.Option label="Foo-option1" value="Foo-value1" />
          <SelectList.Option label="Foo-option2" value="Foo-value2" />
        </SelectList.Group>
      </SelectList>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
