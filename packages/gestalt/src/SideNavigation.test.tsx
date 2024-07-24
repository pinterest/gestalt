import { create } from 'react-test-renderer';
import Box from './Box';
import SideNavigation from './SideNavigation';

describe('SideNavigation', () => {
  it('renders basic Item', () => {
    const tree = create(
      <SideNavigation accessibilityLabel="label">
        <SideNavigation.TopItem href="#" label="test" />
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Sections', () => {
    const tree = create(
      <SideNavigation accessibilityLabel="label">
        <SideNavigation.Section label="section">
          <SideNavigation.TopItem href="#" label="test" />
        </SideNavigation.Section>
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Icon + Badge/Notification + Counter + Border', () => {
    const tree = create(
      <SideNavigation accessibilityLabel="label" showBorder>
        <SideNavigation.Section label="section">
          <SideNavigation.TopItem
            badge={{ text: 'New', type: 'info' }}
            counter={{ number: '20', accessibilityLabel: 'You have 20 notifications' }}
            href="#"
            icon="bell"
            label="test"
          />
          <SideNavigation.TopItem
            counter={{ number: '20', accessibilityLabel: 'You have 20 notifications' }}
            href="#"
            icon="bell"
            label="test"
            notificationAccessibilityLabel="You have new messages"
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
        footer={<Box color="default" height={100} width="100%" />}
        header={<Box color="default" height={100} width="100%" />}
      >
        <SideNavigation.TopItem href="#" label="test" />
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders expandable nested directory', () => {
    const tree = create(
      <SideNavigation accessibilityLabel="Nested items example">
        <SideNavigation.TopItem
          href="#"
          icon="ads-stats"
          label="Reporting"
          onClick={({ event }: any) => event.preventDefault()}
        />
        <SideNavigation.TopItem
          href="#"
          icon="replace"
          label="Conversions"
          onClick={({ event }: any) => event.preventDefault()}
        />
        <SideNavigation.Section label="Audiences">
          <SideNavigation.TopItem
            href="#"
            icon="people"
            label="Thanksgiving"
            onClick={({ event }: any) => event.preventDefault()}
          />
          <SideNavigation.Group icon="people" label="Christmas">
            <SideNavigation.NestedItem
              href="#"
              label="Luxury Christmas"
              onClick={({ event }: any) => event.preventDefault()}
            />
            <SideNavigation.NestedGroup label="Classic Christmas">
              <SideNavigation.NestedItem
                href="#"
                label="West Coast"
                onClick={({ event }: any) => event.preventDefault()}
              />
              <SideNavigation.NestedItem
                href="#"
                label="East Coast"
                onClick={({ event }: any) => event.preventDefault()}
              />
            </SideNavigation.NestedGroup>
            <SideNavigation.NestedGroup label="Alternative Christmas">
              <SideNavigation.NestedItem
                href="#"
                label="West Coast"
                onClick={({ event }: any) => event.preventDefault()}
              />
              <SideNavigation.NestedItem
                href="#"
                label="East Coast"
                onClick={({ event }: any) => event.preventDefault()}
              />
            </SideNavigation.NestedGroup>
          </SideNavigation.Group>
          <SideNavigation.Group icon="people" label="Halloween">
            <SideNavigation.NestedItem
              href="#"
              label="East Coast"
              onClick={({ event }: any) => event.preventDefault()}
            />
            <SideNavigation.NestedItem
              href="#"
              label="West Coast"
              onClick={({ event }: any) => event.preventDefault()}
            />
          </SideNavigation.Group>
        </SideNavigation.Section>
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders static group', () => {
    const tree = create(
      <SideNavigation accessibilityLabel="Static items example">
        <SideNavigation.Group display="static" icon="people" label="Christmas">
          <SideNavigation.NestedItem
            href="#"
            label="Luxury Christmas"
            onClick={({ event }: any) => event.preventDefault()}
          />
          <SideNavigation.NestedGroup display="static" label="Classic Christmas">
            <SideNavigation.NestedItem
              href="#"
              label="West Coast"
              onClick={({ event }: any) => event.preventDefault()}
            />
            <SideNavigation.NestedItem
              href="#"
              label="East Coast"
              onClick={({ event }: any) => event.preventDefault()}
            />
          </SideNavigation.NestedGroup>
        </SideNavigation.Group>
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders expanded group', () => {
    const tree = create(
      <SideNavigation accessibilityLabel="Nested items example">
        <SideNavigation.Group display="expandable" expanded icon="people" label="Christmas">
          <SideNavigation.NestedItem
            href="#"
            label="Luxury Christmas"
            onClick={({ event }: any) => event.preventDefault()}
          />
          <SideNavigation.NestedGroup display="expandable" expanded label="Classic Christmas">
            <SideNavigation.NestedItem
              href="#"
              label="West Coast"
              onClick={({ event }: any) => event.preventDefault()}
            />
            <SideNavigation.NestedItem
              href="#"
              label="East Coast"
              onClick={({ event }: any) => event.preventDefault()}
            />
          </SideNavigation.NestedGroup>
        </SideNavigation.Group>
      </SideNavigation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders elements with dataTestId', () => {
    const component = create(
      <SideNavigation accessibilityLabel="Static items example">
        <SideNavigation.Group
          dataTestId="group-test-id"
          display="static"
          icon="people"
          label="Christmas"
        >
          <SideNavigation.NestedItem
            href="#"
            label="Luxury Christmas"
            onClick={({ event }: any) => event.preventDefault()}
          />
          <SideNavigation.NestedGroup display="static" label="Classic Christmas">
            <SideNavigation.NestedItem
              href="#"
              label="West Coast"
              onClick={({ event }: any) => event.preventDefault()}
            />
            <SideNavigation.NestedItem
              href="#"
              label="East Coast"
              onClick={({ event }: any) => event.preventDefault()}
            />
          </SideNavigation.NestedGroup>
        </SideNavigation.Group>
      </SideNavigation>,
    );
    const testInstance = component.root;
    const groupElement = testInstance.find(
      (instance: any) => instance.props['data-test-id'] === 'group-test-id',
    );
    expect(groupElement).not.toBeNull();
  });

  it('SideNavigation renders elements with dataTestId', () => {
    const idName = 'data-test-id-csoft';
    const component = create(
      <SideNavigation accessibilityLabel="Static items example" dataTestId={idName}>
        <SideNavigation.Group display="static" icon="people" label="Christmas">
          <SideNavigation.NestedItem
            href="#"
            label="Luxury Christmas"
            onClick={({ event }: any) => event.preventDefault()}
          />
          <SideNavigation.NestedGroup display="static" label="Classic Christmas">
            <SideNavigation.NestedItem
              href="#"
              label="West Coast"
              onClick={({ event }: any) => event.preventDefault()}
            />
            <SideNavigation.NestedItem
              href="#"
              label="East Coast"
              onClick={({ event }: any) => event.preventDefault()}
            />
          </SideNavigation.NestedGroup>
        </SideNavigation.Group>
      </SideNavigation>,
    ).root;

    expect(
      component.findAll((element: any) => element.type === 'nav')[0].props['data-test-id'],
    ).toContain(idName);
  });
});
