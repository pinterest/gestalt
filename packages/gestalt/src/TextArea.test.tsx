import {create} from 'react-test-renderer';
import Tag from './Tag';
import TextArea from './TextArea';

describe('TextArea', () => {
  it('Renders an FormErrorMessage if an error message is passed in', () => {
    const component = create(
      <TextArea errorMessage="Error message" id="test" onChange={jest.fn()} />,
    );
    expect(JSON.stringify(component.toJSON())).toContain('Error message');
  });

  it('Does not render an FormErrorMessage when errorMessage is null', () => {
    const component = create(<TextArea id="test" onChange={jest.fn()} />);
    expect(JSON.stringify(component.toJSON())).not.toContain('Error message');
  });

  it('TextArea normal', () => {
    const tree = create(
      <TextArea id="test" onBlur={jest.fn()} onChange={jest.fn()} onFocus={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextArea with error', () => {
    const tree = create(
      <TextArea
        errorMessage="error message"
        id="test"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextArea with hasError', () => {
    const tree = create(
      <TextArea hasError id="test" onBlur={jest.fn()} onChange={jest.fn()} onFocus={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with maxLength character counter', () => {
    const tree = create(
      <TextArea
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

  it('TextArea with readOnly', () => {
    const tree = create(
      <TextArea id="test" onBlur={jest.fn()} onChange={jest.fn()} onFocus={jest.fn()} readOnly />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextArea with disabled', () => {
    const tree = create(
      <TextArea disabled id="test" onBlur={jest.fn()} onChange={jest.fn()} onFocus={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextArea with rows', () => {
    const tree = create(<TextArea id="test" onChange={jest.fn()} rows={5} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders tags when supplied', () => {
    const tree = create(
      <TextArea
        id="test"
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
