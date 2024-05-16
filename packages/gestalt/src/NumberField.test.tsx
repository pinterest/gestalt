import { create } from 'react-test-renderer';
import NumberField from './NumberField';

describe('NumberField', () => {
  it('Renders an FormErrorMessage if an error message is passed in', () => {
    const component = create(
      <NumberField errorMessage="Error message" id="test" onChange={jest.fn()} />,
    );
    expect(JSON.stringify(component.toJSON())).toContain('Error message');
  });

  it('Does not render an FormErrorMessage when errorMessage is null', () => {
    const component = create(<NumberField id="test" onChange={jest.fn()} />);
    expect(JSON.stringify(component.toJSON())).not.toContain('Error message');
  });

  it('NumberField normal', () => {
    const tree = create(
      <NumberField id="test" onBlur={jest.fn()} onChange={jest.fn()} onFocus={jest.fn()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('NumberField with error', () => {
    const tree = create(
      <NumberField
        errorMessage="error message"
        id="test"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('NumberField with enterKeyHint', () => {
    const tree = create(
      <NumberField
        id="test"
        mobileEnterKeyHint="go"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('NumberField with name', () => {
    const tree = create(
      <NumberField
        id="test"
        name="email"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('NumberField with autocomplete', () => {
    const tree = create(
      <NumberField
        autoComplete="on"
        id="test"
        name="email"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
