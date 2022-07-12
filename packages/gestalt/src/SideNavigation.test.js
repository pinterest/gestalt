// @flow strict
import { create } from 'react-test-renderer';
import SideNavigation from './SideNavigation.js';
import Box from './Box.js';

describe('SideNavigation', () => {
  it('renders basic Item', () => {
    const tree = create(
      <SideNavigation accessibilityLabel="label">
        <SideNavigation.Item onSelect={() => {}} href="#" item={{ label: 'test', value: 'test' }} />
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Sections', () => {
    const tree = create(
      <SideNavigation accessibilityLabel="label">
        <SideNavigation.Section label="section">
          <SideNavigation.Item
            onSelect={() => {}}
            href="#"
            item={{ label: 'test', value: 'test' }}
          />
        </SideNavigation.Section>
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Icon + Badge/Notification + Counter + Border', () => {
    const tree = create(
      <SideNavigation showBorder accessibilityLabel="label">
        <SideNavigation.Section label="section">
          <SideNavigation.Item
            onSelect={() => {}}
            href="#"
            icon="bell"
            item={{ label: 'test', value: 'test' }}
            badge={{ text: 'New', type: 'info' }}
            counter={{ number: '20', accessibilityLabel: 'You have 20 notifications' }}
          />
          <SideNavigation.Item
            onSelect={() => {}}
            href="#"
            icon="bell"
            item={{ label: 'test', value: 'test' }}
            notificationAccessibilityLabel="You have new messages"
            counter={{ number: '20', accessibilityLabel: 'You have 20 notifications' }}
          />
        </SideNavigation.Section>
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Header + Footer', () => {
    const tree = create(
      <SideNavigation
        accessibilityLabel="label"
        header={<Box height={100} width="100%" color="default" />}
        footer={<Box height={100} width="100%" color="default" />}
      >
        <SideNavigation.Item onSelect={() => {}} href="#" item={{ label: 'test', value: 'test' }} />
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
