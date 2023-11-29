// @flow strict
import { create } from 'react-test-renderer';
import Tag from './Tag';
import TextField from './TextField';

describe('TextField', () => {
  it('Renders an FormErrorMessage if an error message is passed in', () => {
    const component = create(
      <TextField errorMessage="Error message" id="test" onChange={jest.fn()} />,
    );
    expect(JSON.stringify(component.toJSON())).toContain('Error message');
  });

  it('Does not render an FormErrorMessage when errorMessage is null', () => {
    const component = create(<TextField id="test" onChange={jest.fn()} />);
    expect(JSON.stringify(component.toJSON())).not.toContain('Error message');
  });

  it('TextField normal', () => {
    const tree = create(
      <TextField id="test" onChange={jest.fn()} onFocus={jest.fn()} onBlur={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with error', () => {
    const tree = create(
      <TextField
        errorMessage="error message"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with enterKeyHint', () => {
    const tree = create(
      <TextField
        id="test"
        mobileEnterKeyHint="go"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with hasError', () => {
    const tree = create(
      <TextField hasError id="test" onChange={jest.fn()} onFocus={jest.fn()} onBlur={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with disabled', () => {
    const tree = create(
      <TextField disabled id="test" onChange={jest.fn()} onFocus={jest.fn()} onBlur={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with readOnly', () => {
    const tree = create(
      <TextField readOnly id="test" onChange={jest.fn()} onFocus={jest.fn()} onBlur={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with name', () => {
    const tree = create(
      <TextField
        name="email"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with maxLength character counter', () => {
    const tree = create(
      <TextField
        name="maxLength"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
        maxLength={{
          characterCount: 20,
          errorAccessibilityLabel: 'Exceeded',
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with autocomplete', () => {
    const tree = create(
      <TextField
        autoComplete="email"
        name="email"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with tags', () => {
    const tree = create(
      <TextField
        name="email"
        id="test"
        onChange={jest.fn()}
        tags={[
          <Tag
            key="a"
            text="a@pinterest.com"
            onRemove={() => {}}
            accessibilityRemoveIconLabel="Remove email tag"
          />,
          <Tag
            key="b"
            text="b@pinterest.com"
            onRemove={() => {}}
            accessibilityRemoveIconLabel="Remove email tag"
          />,
          <Tag
            key="c"
            text="c@pinterest.com"
            onRemove={() => {}}
            accessibilityRemoveIconLabel="Remove email tag"
          />,
        ]}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
