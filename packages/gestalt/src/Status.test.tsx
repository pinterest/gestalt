import { create } from 'react-test-renderer';
import Link from './Link';
import Status from './Status';
import Text from './Text';

describe('Status', () => {
  it('renders with basic title', () => {
    const tree = create(<Status title="Unstarted" type="unstarted" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with dataTestId', () => {
    const component = create(<Status dataTestId="test" title="Unstarted" type="unstarted" />).root;
    expect(
      component
        .findAll((element) => element.type === 'div')
        .filter((node) => node.props['data-test-id'] === 'test'),
    ).toHaveLength(1);
  });

  it('renders with rich title', () => {
    const tree = create(
      <Status
        title={
          <Text>
            <Link accessibilityLabel="label" href="http://www.pinterest.com">
              Title
            </Link>
          </Text>
        }
        type="unstarted"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with title and subtext', () => {
    const tree = create(
      <Status subtext="some subtext" title="Unstarted" type="unstarted" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with accessibilityLabel', () => {
    const tree = create(
      <Status accessibilityLabel="some accessibilityLabel" type="unstarted" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
