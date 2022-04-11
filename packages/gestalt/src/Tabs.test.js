// @flow strict
import { create } from 'react-test-renderer';
import Tabs from './Tabs.js';

describe('<Tabs />', () => {
  // TODO: we no longer support this, but we should
  // eslint-disable-next-line jest/no-commented-out-tests
  // test('Only add aria-selected to the active tab', () => {
  //   const instance = create(
  //     <Tabs
  //       tabs={[
  //         { text: 'News', href: '#' },
  //         { text: 'You', href: '#' },
  //         { text: 'Messages', href: '#' },
  //       ]}
  //       activeTabIndex={0}
  //       onChange={() => {}}
  //     />,
  //   ).root;
  //   const tabs = instance.findAllByType(TabWithForwardRef);

  //   expect(tabs[0].props['aria-selected']).toEqual(true);
  //   expect(tabs[1].props['aria-selected']).toEqual(false);
  //   expect(tabs[2].props['aria-selected']).toEqual(false);
  // });

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
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('matches snapshot with wrap', () => {
    const tree = create(
      <Tabs
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
        wrap
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('matches snapshot with dot indicators', () => {
    const tree = create(
      <Tabs
        tabs={[
          { text: 'News', href: '#', indicator: 'dot' },
          { text: 'You', href: '#', indicator: 'dot' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
