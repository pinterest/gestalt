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
    const component = create(
      <Status title="Unstarted" type="unstarted" dataTestId="some-test-id" />,
    );
    const testInstance = component.root;
    const tooltipElement = testInstance.find(
      (instance: any) => instance.props['data-test-id'] === 'some-test-id',
    );
    expect(tooltipElement).not.toBeNull();
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
