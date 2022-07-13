// @flow strict
import { create } from 'react-test-renderer';
import SideNavigation from './SideNavigation.js';
import Box from './Box.js';

describe('SideNavigation', () => {
  it('renders basic Item', () => {
    const tree = create(
      <SideNavigation accessibilityLabel="label">
        <SideNavigation.Item href="#" label="test" />
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Sections', () => {
    const tree = create(
      <SideNavigation accessibilityLabel="label">
        <SideNavigation.Section label="section">
          <SideNavigation.Item href="#" label="test" />
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
            href="#"
            icon="bell"
            label="test"
            badge={{ text: 'New', type: 'info' }}
            counter={{ number: '20', accessibilityLabel: 'You have 20 notifications' }}
          />
          <SideNavigation.Item
            href="#"
            icon="bell"
            label="test"
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
        <SideNavigation.Item href="#" label="test" />
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nested directory', () => {
    const tree = create(
      <SideNavigation accessibilityLabel="Nested items example">
        <SideNavigation.Item
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Reporting"
          icon="ads-stats"
        />
        <SideNavigation.Item
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Conversions"
          icon="replace"
        />
        <SideNavigation.Section label="Audiences">
          <SideNavigation.Item
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="Thanksgiving"
            icon="people"
          />
          <SideNavigation.Group label="Christmas" icon="people">
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="Luxury Christmas"
            />
            <SideNavigation.NestedGroup label="Classic Christmas">
              <SideNavigation.NestedItem
                href="#"
                onClick={({ event }) => event.preventDefault()}
                label="West Coast"
              />
              <SideNavigation.NestedItem
                href="#"
                onClick={({ event }) => event.preventDefault()}
                label="East Coast"
              />
            </SideNavigation.NestedGroup>
            <SideNavigation.NestedGroup label="Alternative Christmas">
              <SideNavigation.NestedItem
                href="#"
                onClick={({ event }) => event.preventDefault()}
                label="West Coast"
              />
              <SideNavigation.NestedItem
                href="#"
                onClick={({ event }) => event.preventDefault()}
                label="East Coast"
              />
            </SideNavigation.NestedGroup>
          </SideNavigation.Group>
          <SideNavigation.Group label="Halloween" icon="people" display="static">
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="East Coast"
            />
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="West Coast"
            />
          </SideNavigation.Group>
        </SideNavigation.Section>
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
