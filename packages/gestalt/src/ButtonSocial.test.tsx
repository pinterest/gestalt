import { create } from 'react-test-renderer';
import ButtonSocial from './ButtonSocial';

describe('ButtonSocial', () => {
  test('Renders email service', () => {
    const tree = create(
      <ButtonSocial service="email" type="continue" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Renders apple service with login', () => {
    const tree = create(
      <ButtonSocial service="email" type="login" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
