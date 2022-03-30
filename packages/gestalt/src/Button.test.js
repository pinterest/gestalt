// @flow strict
import { create } from 'react-test-renderer';
import Button from './Button.js';
import Icon from './Icon.js';

describe('<Button />', () => {
  test('Custom color', () => {
    const instance = create(<Button color="transparent" text="Hello World" />).root;
    expect(instance.find((element) => element.type === 'div').props.className).toContain(
      'transparent',
    );
  });
  test('Disabled state', () => {
    const instance = create(<Button color="red" disabled text="Hello World" />).root;
    const { className } = instance.find((element) => element.type === 'div').props;
    expect(className).toContain('disabled');
    expect(className).not.toContain('red');
  });

  test('iconEnd', () => {
    const instance = create(<Button color="white" iconEnd="arrow-down" text="Menu" />).root;
    expect(instance.findByType(Icon).props.icon).toBe('arrow-down');
  });
  test('Custom white text color on transparent background', () => {
    const instance = create(<Button color="transparentWhiteText" text="Hello World" />).root;
    expect(instance.findAll((element) => element.type === 'div')[1].props.className).toContain(
      'inverseText',
    );
  });

  test('Default darkGray text color on transparent background', () => {
    const instance = create(<Button color="transparent" text="Hello World" />).root;
    expect(instance.findAll((element) => element.type === 'div')[1].props.className).toContain(
      'defaultText',
    );
  });

  test('accessibilityControls', () => {
    const instance = create(<Button text="Hello World" accessibilityControls="another-element" />)
      .root;
    expect(instance.find((element) => element.type === 'button').props['aria-controls']).toContain(
      'another-element',
    );
  });

  test('accessibilityExpanded', () => {
    const instance = create(<Button text="Hello World" accessibilityExpanded />).root;
    expect(instance.find((element) => element.type === 'button').props['aria-expanded']).toBe(true);
  });

  test('accessibilityHaspopup', () => {
    const instance = create(<Button text="Hello World" accessibilityHaspopup />).root;
    expect(instance.find((element) => element.type === 'button').props['aria-haspopup']).toBe(true);
  });

  test('accessibilityLabel', () => {
    const instance = create(<Button text="Hello World" accessibilityLabel="hello" />).root;
    expect(instance.find((element) => element.type === 'button').props['aria-label']).toContain(
      'hello',
    );
  });
});
