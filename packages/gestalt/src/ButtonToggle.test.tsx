import { create } from 'react-test-renderer';
import ButtonToggle from './ButtonToggle';
import Icon from './Icon';

describe('<ButtonToggle />', () => {
  test('Custom color', () => {
    const instance = create(
      <ButtonToggle color="transparent" selected={false} text="Hello World" />,
    ).root;
    expect(instance.find((element: any) => element.type === 'div').props.className).toContain(
      'transparent',
    );
  });
  test('Disabled state', () => {
    const instance = create(
      <ButtonToggle color="red" disabled selected={false} text="Save" />,
    ).root;
    const { className } = instance.find((element: any) => element.type === 'div').props;
    expect(className).toContain('disabled');
    expect(className).not.toContain('red');
  });

  test('iconStart', async () => {
    const instance = create(
      <ButtonToggle color="transparent" iconStart="sparkle" selected={false} text="Default" />,
    ).root;

    // eslint-disable-next-line testing-library/await-async-query -- False positive due to 'findBy' prefix, findByType does not return a Promise!
    const icon = instance.findByType(Icon);
    expect(icon.props.icon).toBe('sparkle');
  });

  test('Default darkGray text color on transparent background', () => {
    const instance = create(
      <ButtonToggle color="transparent" selected={false} text="Hello World" />,
    ).root;
    expect(
      instance.findAll((element: any) => element.type === 'div')[3]?.props.className,
    ).toContain('default');
  });

  test('accessibilityControls', () => {
    const instance = create(
      <ButtonToggle accessibilityControls="another-element" selected={false} text="Hello World" />,
    ).root;
    expect(
      instance.find((element: any) => element.type === 'button').props['aria-controls'],
    ).toContain('another-element');
  });

  test('accessibilityLabel', () => {
    const instance = create(
      <ButtonToggle accessibilityLabel="hello" selected={false} text="Hello World" />,
    ).root;
    expect(
      instance.find((element: any) => element.type === 'button').props['aria-label'],
    ).toContain('hello');
  });
});
