// @flow strict
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeviceTypeProvider from './contexts/DeviceTypeProvider.js';
import Dropdown from './Dropdown.js';
import SideNavigation from './SideNavigation.js';

describe('SideNavigation desktop', () => {
  function Component() {
    return (
      <SideNavigation accessibilityLabel="example1" dismissButton={{ onDismiss: () => {} }}>
        <SideNavigation.Group
          label="Group item"
          counter={{ number: '123', accessibilityLabel: '123 counter' }}
          primaryAction={{
            onClick: ({ event }) => {
              event.preventDefault();
            },
            tooltip: { text: 'More options', accessibilityLabel: 'More options label' },
            dropdownItems: [
              <Dropdown.Item
                key="edit"
                option={{ value: 'Edit', label: 'Edit' }}
                onSelect={() => {}}
              />,
              <Dropdown.Item
                key="trash"
                option={{ value: 'Delete', label: 'Delete' }}
                onSelect={() => {}}
              />,
            ],
          }}
        >
          <SideNavigation.NestedItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="test"
          />
        </SideNavigation.Group>
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Top item"
          primaryAction={{
            onClick: ({ event }) => {
              event.preventDefault();
            },
            tooltip: {
              text: 'More options nested',
              accessibilityLabel: 'More options nested label',
            },
            dropdownItems: [
              <Dropdown.Item
                key="edit"
                option={{ value: 'Edit', label: 'Edit' }}
                onSelect={() => {}}
              />,
              <Dropdown.Item
                key="trash"
                option={{ value: 'Delete', label: 'Delete' }}
                onSelect={() => {}}
              />,
            ],
          }}
          counter={{ number: '321', accessibilityLabel: '321 counter' }}
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
      screen.getByRole('button', {
        exact: true,
      }),
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

    expect(screen.queryByText('Edit')).toBeNull();

    await userEvent.keyboard('[Enter]');

    expect(
      screen.getByText('Edit', {
        exact: true,
      }),
    ).toBeVisible();
  });
});

describe('SideNavigation mobile', () => {
  function Component() {
    return (
      <DeviceTypeProvider deviceType="mobile">
        <SideNavigation accessibilityLabel="example2" dismissButton={{ onDismiss: () => {} }}>
          <SideNavigation.Group
            label="Group item"
            counter={{ number: '123', accessibilityLabel: '123 counter' }}
            primaryAction={{
              onClick: ({ event }) => {
                event.preventDefault();
              },
              tooltip: { text: 'More options', accessibilityLabel: 'More options label' },
              dropdownItems: [
                <Dropdown.Item
                  key="edit"
                  option={{ value: 'Edit', label: 'Edit' }}
                  onSelect={() => {}}
                />,
                <Dropdown.Item
                  key="trash"
                  option={{ value: 'Delete', label: 'Delete' }}
                  onSelect={() => {}}
                />,
              ],
            }}
          >
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="test"
            />
          </SideNavigation.Group>
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="Top item"
            primaryAction={{
              onClick: ({ event }) => {
                event.preventDefault();
              },
              tooltip: {
                text: 'More options nested',
                accessibilityLabel: 'More options nested label',
              },
              dropdownItems: [
                <Dropdown.Item
                  key="edit"
                  option={{ value: 'Edit', label: 'Edit' }}
                  onSelect={() => {}}
                />,
                <Dropdown.Item
                  key="trash"
                  option={{ value: 'Delete', label: 'Delete' }}
                  onSelect={() => {}}
                />,
              ],
            }}
            counter={{ number: '321', accessibilityLabel: '321 counter' }}
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
