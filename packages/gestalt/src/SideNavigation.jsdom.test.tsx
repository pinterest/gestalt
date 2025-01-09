import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeviceTypeProvider from './contexts/DeviceTypeProvider';
import Dropdown from './Dropdown';
import SideNavigation from './SideNavigation';

describe('SideNavigation desktop', () => {
  function Component({
    display,
    expanded,
  }: {
    display?: 'static' | 'expandable';
    expanded?: boolean;
  }) {
    return (
      <SideNavigation accessibilityLabel="example1" dismissButton={{ onDismiss: () => {} }}>
        <SideNavigation.Group
          counter={{ number: '123', accessibilityLabel: '123 counter' }}
          display={display}
          expanded={expanded}
          label="Group item"
          primaryAction={{
            onClick: ({ event }: any) => {
              event.preventDefault();
            },
            tooltip: { text: 'More options', accessibilityLabel: 'More options label' },
            dropdownItems: [
              <Dropdown.Item
                key="edit"
                onSelect={() => {}}
                option={{ value: 'Edit', label: 'Edit' }}
              />,
              <Dropdown.Item
                key="trash"
                onSelect={() => {}}
                option={{ value: 'Delete', label: 'Delete' }}
              />,
            ],
          }}
        >
          <SideNavigation.NestedItem
            href="#"
            label="test"
            onClick={({ event }: any) => event.preventDefault()}
          />
        </SideNavigation.Group>
        <SideNavigation.TopItem
          counter={{ number: '321', accessibilityLabel: '321 counter' }}
          href="#"
          label="Top item"
          onClick={({ event }: any) => event.preventDefault()}
          primaryAction={{
            onClick: ({ event }: any) => {
              event.preventDefault();
            },
            tooltip: {
              text: 'More options nested',
              accessibilityLabel: 'More options nested label',
            },
            dropdownItems: [
              <Dropdown.Item
                key="edit"
                onSelect={() => {}}
                option={{ value: 'Edit', label: 'Edit' }}
              />,
              <Dropdown.Item
                key="trash"
                onSelect={() => {}}
                option={{ value: 'Delete', label: 'Delete' }}
              />,
            ],
          }}
        />
      </SideNavigation>
    );
  }

  test('renders correctly on hover', () => {
    render(<Component />);

    // BEFORE HOVERING
    expect(
      screen.getByText('Group item', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('123', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.queryByLabelText('More options label', {
        exact: true,
      }),
    ).toBeNull();

    expect(
      screen.getByText('Top item', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('321', {
        exact: true,
      }),
    ).toBeVisible();

    // ON HOVER
    fireEvent.mouseEnter(screen.getByText('Group item'));

    expect(
      screen.getByText('Group item', {
        exact: true,
      }),
    ).toBeVisible();

    expect(screen.queryByText('123')).toBeNull();

    expect(
      screen.getByLabelText('More options label', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.queryByText('More options', {
        exact: true,
      }),
    ).toBeNull();

    expect(
      screen.getByText('Top item', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('321', {
        exact: true,
      }),
    ).toBeVisible();

    fireEvent.mouseEnter(
      screen.getByLabelText('More options label', {
        exact: true,
      }),
    );

    expect(
      screen.getByText('More options', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('renders correctly on focus', async () => {
    render(<Component />);

    // BEFORE FOCUSING
    expect(
      screen.getByText('Group item', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('123', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.queryByLabelText('More options label', {
        exact: true,
      }),
    ).toBeNull();

    expect(document.body).toHaveFocus();

    // ON FOCUS
    await userEvent.tab();

    expect(
      screen.getByRole('button'),
    ).toHaveFocus();

    expect(
      screen.getByText('Group item', {
        exact: true,
      }),
    ).toBeVisible();

    expect(screen.queryByText('123')).toBeNull();

    expect(
      screen.getByLabelText('More options label', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.queryByText('More options', {
        exact: true,
      }),
    ).toBeNull();

    await userEvent.tab();

    expect(
      screen.queryByText('More options', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('renders display static correctly', () => {
    render(<Component display="static" />);

    expect(
      screen.getByText('test', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('renders display expandable correctly', () => {
    render(<Component />);

    expect(
      screen.queryByText('test', {
        exact: true,
      }),
    ).toBeNull();
  });

  test('renders display expandableExpanded correctly', () => {
    render(<Component display="expandable" expanded />);

    expect(
      screen.getByText('test', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('renders primaryAction dropdown correctly on click', () => {
    render(<Component />);

    fireEvent.mouseEnter(screen.getByText('Group item'));

    expect(screen.queryByText('Edit')).toBeNull();

    fireEvent.click(screen.getByLabelText('More options label'));

    expect(
      screen.getByText('Edit', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('renders primaryAction dropdown correctly on enter', async () => {
    render(<Component />);

    expect(document.body).toHaveFocus();

    await userEvent.tab();

    await userEvent.tab();

    expect(
      screen.getByLabelText('More options label', {
        exact: true,
      }),
    ).toHaveFocus();

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();

    await userEvent.keyboard('[Enter]');

    expect(
      screen.getByText('Edit', {
        exact: true,
      }),
    ).toBeInTheDocument();
  });
});

describe('SideNavigation mobile', () => {
  function Component() {
    return (
      <DeviceTypeProvider deviceType="mobile">
        <SideNavigation accessibilityLabel="example2" dismissButton={{ onDismiss: () => {} }}>
          <SideNavigation.Group
            counter={{ number: '123', accessibilityLabel: '123 counter' }}
            label="Group item"
            primaryAction={{
              onClick: ({ event }: any) => {
                event.preventDefault();
              },
              tooltip: { text: 'More options', accessibilityLabel: 'More options label' },
              dropdownItems: [
                <Dropdown.Item
                  key="edit"
                  onSelect={() => {}}
                  option={{ value: 'Edit', label: 'Edit' }}
                />,
                <Dropdown.Item
                  key="trash"
                  onSelect={() => {}}
                  option={{ value: 'Delete', label: 'Delete' }}
                />,
              ],
            }}
          >
            <SideNavigation.NestedItem
              href="#"
              label="test"
              onClick={({ event }: any) => event.preventDefault()}
            />
          </SideNavigation.Group>
          <SideNavigation.TopItem
            counter={{ number: '321', accessibilityLabel: '321 counter' }}
            href="#"
            label="Top item"
            onClick={({ event }: any) => event.preventDefault()}
            primaryAction={{
              onClick: ({ event }: any) => {
                event.preventDefault();
              },
              tooltip: {
                text: 'More options nested',
                accessibilityLabel: 'More options nested label',
              },
              dropdownItems: [
                <Dropdown.Item
                  key="edit"
                  onSelect={() => {}}
                  option={{ value: 'Edit', label: 'Edit' }}
                />,
                <Dropdown.Item
                  key="trash"
                  onSelect={() => {}}
                  option={{ value: 'Delete', label: 'Delete' }}
                />,
              ],
            }}
          />
        </SideNavigation>
      </DeviceTypeProvider>
    );
  }

  test('renders correctly on hover', () => {
    render(<Component />);

    expect(
      screen.getByText('Group item', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('123', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('Top item', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('321', {
        exact: true,
      }),
    ).toBeVisible();

    expect(screen.queryByText('More options')).toBeNull();

    fireEvent.mouseEnter(screen.getByText('Group item'));

    expect(
      screen.getByText('Group item', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('123', {
        exact: true,
      }),
    ).toBeVisible();

    expect(screen.queryByText('More options')).toBeNull();

    fireEvent.mouseEnter(screen.getByLabelText('More options label'));

    expect(screen.getByText('More options')).toBeVisible();
  });

  test('renders correctly on focus', async () => {
    render(<Component />);

    expect(
      screen.getByText('Group item', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('123', {
        exact: true,
      }),
    ).toBeVisible();

    expect(screen.getByLabelText('More options label')).toBeVisible();

    await userEvent.tab();

    await userEvent.tab();

    expect(
      screen.getByText('Group item', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('123', {
        exact: true,
      }),
    ).toBeVisible();

    expect(
      screen.getByText('More options', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('renders primaryAction dropdown correctly on click', () => {
    render(<Component />);

    fireEvent.mouseEnter(screen.getByText('Group item'));

    expect(screen.queryByText('Edit')).toBeNull();

    fireEvent.click(screen.getByLabelText('More options label'));

    expect(
      screen.getByText('Edit', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('renders primaryAction dropdown correctly on enter', async () => {
    render(<Component />);

    await userEvent.tab();

    await userEvent.tab();

    expect(
      screen.getByLabelText('More options label', {
        exact: true,
      }),
    ).toHaveFocus();

    expect(screen.queryByText('Edit')).toBeNull();

    await userEvent.keyboard('[Enter]');

    expect(
      screen.getByText('Edit', {
        exact: true,
      }),
    ).toBeVisible();
  });
});
