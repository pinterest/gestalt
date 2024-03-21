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
      <TextField id="test" onBlur={jest.fn()} onChange={jest.fn()} onFocus={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with error', () => {
    const tree = create(
      <TextField
        errorMessage="error message"
        id="test"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with enterKeyHint', () => {
    const tree = create(
      <TextField
        id="test"
        mobileEnterKeyHint="go"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with hasError', () => {
    const tree = create(
      <TextField hasError id="test" onBlur={jest.fn()} onChange={jest.fn()} onFocus={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with disabled', () => {
    const tree = create(
      <TextField disabled id="test" onBlur={jest.fn()} onChange={jest.fn()} onFocus={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with readOnly', () => {
    const tree = create(
      <TextField id="test" onBlur={jest.fn()} onChange={jest.fn()} onFocus={jest.fn()} readOnly />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with name', () => {
    const tree = create(
      <TextField
        id="test"
        name="email"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with maxLength character counter', () => {
    const tree = create(
      <TextField
        id="test"
        maxLength={{
          characterCount: 20,
          errorAccessibilityLabel: 'Exceeded',
        }}
        name="maxLength"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with autocomplete', () => {
    const tree = create(
      <TextField
        autoComplete="email"
        id="test"
        name="email"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with tags', () => {
    const tree = create(
      <TextField
        id="test"
        name="email"
        onChange={jest.fn()}
        tags={[
          <Tag
            key="a"
            accessibilityRemoveIconLabel="Remove email tag"
            onRemove={() => {}}
            text="a@pinterest.com"
          />,
          <Tag
            key="b"
            accessibilityRemoveIconLabel="Remove email tag"
            onRemove={() => {}}
            text="b@pinterest.com"
          />,
          <Tag
            key="c"
            accessibilityRemoveIconLabel="Remove email tag"
            onRemove={() => {}}
            text="c@pinterest.com"
          />,
        ]}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
