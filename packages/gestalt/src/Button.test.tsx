import { create } from 'react-test-renderer';
import Button from './Button';
import Icon from './Icon';

describe('<Button />', () => {
  test('Custom color', () => {
    const instance = create(<Button color="transparent" text="Hello World" />).root;
    expect(instance.find((element: any) => element.type === 'div').props.className).toContain(
      'transparent',
    );
  });
  test('Disabled state', () => {
    const instance = create(<Button color="red" disabled text="Hello World" />).root;
    const { className } = instance.find((element: any) => element.type === 'div').props;
    expect(className).toContain('disabled');
    expect(className).not.toContain('red');
  });

  test('iconEnd', () => {
    const instance = create(<Button color="white" iconEnd="arrow-down" text="Menu" />).root;
    // eslint-disable-next-line testing-library/await-async-query -- Please fix the next time this file is touched!
    expect(instance.findByType(Icon).props.icon).toBe('arrow-down');
  });

  it('iconStart', () => {
    const instance = create(
      <Button accessibilityLabel="hello" iconStart="sparkle" text="Hello World" />,
    ).root;
    expect(instance.find((element: any) => element.type === 'svg')).not.toBeNull();
  });

  test('Custom white text color on transparent background', () => {
    const instance = create(<Button color="transparentWhiteText" text="Hello World" />).root;
    expect(
      instance.findAll((element: any) => element.type === 'div')[1]?.props.className,
    ).toContain('inverse');
  });

  test('Default darkGray text color on transparent background', () => {
    const instance = create(<Button color="transparent" text="Hello World" />).root;
    expect(
      instance.findAll((element: any) => element.type === 'div')[1]?.props.className,
    ).toContain('default');
  });

  test('accessibilityControls', () => {
    const instance = create(
      <Button accessibilityControls="another-element" text="Hello World" />,
    ).root;
    expect(
      instance.find((element: any) => element.type === 'button').props['aria-controls'],
    ).toContain('another-element');
  });

  test('accessibilityExpanded', () => {
    const instance = create(<Button accessibilityExpanded text="Hello World" />).root;
    expect(instance.find((element: any) => element.type === 'button').props['aria-expanded']).toBe(
      true,
    );
  });

  test('accessibilityHaspopup', () => {
    const instance = create(<Button accessibilityHaspopup text="Hello World" />).root;
    expect(instance.find((element: any) => element.type === 'button').props['aria-haspopup']).toBe(
      true,
    );
  });

  test('accessibilityLabel', () => {
    const instance = create(<Button accessibilityLabel="hello" text="Hello World" />).root;
    expect(
      instance.find((element: any) => element.type === 'button').props['aria-label'],
    ).toContain('hello');
  });
});
