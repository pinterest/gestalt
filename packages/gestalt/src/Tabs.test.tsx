import { create } from 'react-test-renderer';
import Tabs from './Tabs';

describe('<Tabs />', () => {
  test('Adds id when given', () => {
    const instance = create(
      <Tabs
        activeTabIndex={0}
        onChange={() => {}}
        tabs={[
          { text: 'News', href: '#', id: 'news-tab' },
          { text: 'You', href: '#' },
        ]}
      />,
    ).root;

    // eslint-disable-next-line testing-library/await-async-query -- Please fix the next time this file is touched!
    expect(instance.findByProps({ id: 'news-tab' })).toBeDefined();
  });

  test('matches snapshot with default props', () => {
    const tree = create(
      <Tabs
        activeTabIndex={0}
        onChange={() => {}}
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
        ]}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('matches snapshot for size lg', () => {
    const tree = create(
      <Tabs
        activeTabIndex={0}
        onChange={() => {}}
        size="lg"
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
        ]}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('matches snapshot with wrap', () => {
    const tree = create(
      <Tabs
        activeTabIndex={0}
        onChange={() => {}}
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
        ]}
        wrap
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('matches snapshot with dot indicators', () => {
    const tree = create(
      <Tabs
        activeTabIndex={0}
        onChange={() => {}}
        tabs={[
          { text: 'News', href: '#', indicator: 'dot' },
          { text: 'You', href: '#', indicator: 'dot' },
        ]}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
