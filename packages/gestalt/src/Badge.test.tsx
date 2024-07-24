import { create } from 'react-test-renderer';
import Badge from './Badge';

it('Badge renders', () => {
  const component = create(<Badge text="Badge" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render with proper styling', () => {
  const instance = create(<Badge text="Badge" type="success" />).root;
  const { className } = instance.find((element: any) => element.type === 'div').props;

  expect(className).toContain('success');
});

it('should render with a wash', () => {
  const instance = create(<Badge text="Badge" type="lightWash" />).root;
  const { className } = instance.find((element: any) => element.type === 'div').props;

  expect(className).toContain('lightWash');
});

it('validate data test id', () => {
  const component = create(<Badge dataTestId="test" text="Badge" type="lightWash" />).root;
  expect(
    component
      .findAll((element) => element.type === 'div')
      .filter((node) => node.props['data-test-id'] === 'test'),
  ).toHaveLength(1);
});
