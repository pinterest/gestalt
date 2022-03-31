// @flow strict
import { create } from 'react-test-renderer';
import Badge from './Badge.js';

it('Badge renders', () => {
  const component = create(<Badge text="Badge" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render with proper styling', () => {
  const instance = create(<Badge text="Badge" type="success" />).root;
  const { className } = instance.find((element) => element.type === 'div').props;

  expect(className).toContain('successBase');
});

it('should render with a wash', () => {
  const instance = create(<Badge text="Badge" type="lightWash" />).root;
  const { className } = instance.find((element) => element.type === 'div').props;

  expect(className).toContain('lightWash');
});
