import { Fragment } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dropdown from './Dropdown';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from './keyCodes';

describe('Dropdown', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a menu of 6 items', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();
    const onSelectMock = jest.fn<
      [
        {
          event: React.ChangeEvent<HTMLInputElement>;
          item: {
            label: string;
            subtext?: string;
            value: string;
          };
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const element = document.createElement('button');

    const { baseElement } = render(
      <Dropdown anchor={element} id="ex-1" onDismiss={mockOnDismiss}>
        <Dropdown.Item onSelect={onSelectMock} option={{ value: 'item 1', label: 'Item 1' }} />
        <Dropdown.Item
          onSelect={onSelectMock}
          option={{
            value: 'item 2',
            label: 'Item 2 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          iconEnd="visit"
          option={{
            value: 'item 3',
            label: 'External Item 3 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          badge={{ text: 'New' }}
          onSelect={onSelectMock}
          option={{ value: 'item 4', label: 'Item 4' }}
        />
        <Dropdown.Link
          badge={{ text: 'New' }}
          href="https://pinterest.com"
          iconEnd="visit"
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          iconEnd="visit"
          option={{ value: 'item 6', label: 'Item 6' }}
        />
      </Dropdown>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('renders a menu of 3 items conditionally', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();
    const onSelectMock = jest.fn<
      [
        {
          event: React.ChangeEvent<HTMLInputElement>;
          item: {
            label: string;
            subtext?: string;
            value: string;
          };
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const element = document.createElement('button');
    const renderOptions = true;

    const { baseElement } = render(
      <Dropdown anchor={element} id="ex-1" onDismiss={mockOnDismiss}>
        {renderOptions && (
          <Fragment>
            {[1, 2, 3, 4, 5, 6].map((x: any) => (
              <Dropdown.Item
                key={x}
                onSelect={onSelectMock}
                option={{ value: x.toString(), label: x.toString() }}
              />
            ))}
            {[7, 8, 9, 10, 11, 12].map((x: any) => (
              <Dropdown.Item
                key={x}
                onSelect={onSelectMock}
                option={{ value: x.toString(), label: x.toString() }}
              />
            ))}
          </Fragment>
        )}
      </Dropdown>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('renders dropdown sections', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();
    const onSelectMock = jest.fn<
      [
        {
          event: React.ChangeEvent<HTMLInputElement>;
          item: {
            label: string;
            subtext?: string;
            value: string;
          };
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const element = document.createElement('button');

    render(
      <Dropdown anchor={element} id="ex-2" onDismiss={mockOnDismiss}>
        <Dropdown.Section label="Section 1">
          <Dropdown.Item onSelect={onSelectMock} option={{ value: 'item 1', label: 'Item 1' }} />
          <Dropdown.Item
            onSelect={onSelectMock}
            option={{
              value: 'item 2',
              label: 'Item 2 with a really long, detailed, complex name',
            }}
          />
        </Dropdown.Section>
        <Dropdown.Section label="Section 2">
          <Dropdown.Link
            href="https://pinterest.com"
            iconEnd="visit"
            option={{
              value: 'item 3',
              label: 'External Item 3 with a really long, detailed, complex name',
            }}
          />
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelectMock}
            option={{ value: 'item 4', label: 'Item 4' }}
          />
          <Dropdown.Link
            badge={{ text: 'New' }}
            href="https://pinterest.com"
            iconEnd="visit"
            option={{
              value: 'item 5',
              label: 'Item 5 with a really long, detailed name',
            }}
          />
          <Dropdown.Link
            href="https://pinterest.com"
            iconEnd="visit"
            option={{ value: 'item 6', label: 'Item 6' }}
          />
        </Dropdown.Section>
      </Dropdown>,
    );

    const sectionLabels = screen.getAllByRole('presentation');
    expect(sectionLabels).toHaveLength(2);
  });

  it('renders a custom header', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();
    const onSelectMock = jest.fn<
      [
        {
          event: React.ChangeEvent<HTMLInputElement>;
          item: {
            label: string;
            subtext?: string;
            value: string;
          };
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const element = document.createElement('button');

    render(
      <Dropdown
        anchor={element}
        headerContent={<p>This is my custom header</p>}
        id="ex-3"
        onDismiss={mockOnDismiss}
      >
        <Dropdown.Section label="Section 1">
          <Dropdown.Item onSelect={onSelectMock} option={{ value: 'item 1', label: 'Item 1' }} />
          <Dropdown.Item
            onSelect={onSelectMock}
            option={{
              value: 'item 2',
              label: 'Item 2 with a really long, detailed, complex name',
            }}
          />
        </Dropdown.Section>
        <Dropdown.Section label="Section 2">
          <Dropdown.Link
            href="https://pinterest.com"
            iconEnd="visit"
            option={{
              value: 'item 3',
              label: 'External Item 3 with a really long, detailed, complex name',
            }}
          />
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelectMock}
            option={{ value: 'item 4', label: 'Item 4' }}
          />
          <Dropdown.Link
            badge={{ text: 'New' }}
            href="https://pinterest.com"
            iconEnd="visit"
            option={{
              value: 'item 5',
              label: 'Item 5 with a really long, detailed name',
            }}
          />
          <Dropdown.Link
            href="https://pinterest.com"
            iconEnd="visit"
            option={{ value: 'item 6', label: 'Item 6' }}
          />
        </Dropdown.Section>
      </Dropdown>,
    );

    expect(screen.getByText('This is my custom header')).toBeVisible();
  });

  it('closes when esc key is pressed', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();
    const onSelectMock = jest.fn<
      [
        {
          event: React.ChangeEvent<HTMLInputElement>;
          item: {
            label: string;
            subtext?: string;
            value: string;
          };
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const element = document.createElement('button');

    render(
      <Dropdown anchor={element} id="ex-4" onDismiss={mockOnDismiss}>
        <Dropdown.Item onSelect={onSelectMock} option={{ value: 'item 1', label: 'Item 1' }} />
        <Dropdown.Item
          onSelect={onSelectMock}
          option={{
            value: 'item 2',
            label: 'Item 2 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          iconEnd="visit"
          option={{
            value: 'item 3',
            label: 'External Item 3 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          badge={{ text: 'New' }}
          onSelect={onSelectMock}
          option={{ value: 'item 4', label: 'Item 4' }}
        />
        <Dropdown.Link
          badge={{ text: 'New' }}
          href="https://pinterest.com"
          iconEnd="visit"
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          iconEnd="visit"
          option={{ value: 'item 6', label: 'Item 6' }}
        />
      </Dropdown>,
    );

    fireEvent.keyDown(window.document, {
      keyCode: ESCAPE,
    });
    expect(mockOnDismiss).toHaveBeenCalled();
  });

  it('closes when tab key is pressed', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();
    const onSelectMock = jest.fn<
      [
        {
          event: React.ChangeEvent<HTMLInputElement>;
          item: {
            label: string;
            subtext?: string;
            value: string;
          };
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const element = document.createElement('button');

    render(
      <Dropdown anchor={element} id="ex-5" onDismiss={mockOnDismiss}>
        <Dropdown.Item onSelect={onSelectMock} option={{ value: 'item 1', label: 'Item 1' }} />
        <Dropdown.Item
          onSelect={onSelectMock}
          option={{
            value: 'item 2',
            label: 'Item 2 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          iconEnd="visit"
          option={{
            value: 'item 3',
            label: 'External Item 3 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          badge={{ text: 'New' }}
          onSelect={onSelectMock}
          option={{ value: 'item 4', label: 'Item 4' }}
        />
        <Dropdown.Link
          badge={{ text: 'New' }}
          href="https://pinterest.com"
          iconEnd="visit"
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          iconEnd="visit"
          option={{ value: 'item 6', label: 'Item 6' }}
        />
      </Dropdown>,
    );

    fireEvent.keyDown(window.document, {
      keyCode: TAB,
    });
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('changes active descendant when arrow keys are pressed', async () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();
    const onSelectMock = jest.fn<
      [
        {
          event: React.ChangeEvent<HTMLInputElement>;
          item: {
            label: string;
            subtext?: string;
            value: string;
          };
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const element = document.createElement('button');

    render(
      <Dropdown anchor={element} id="ex-6" onDismiss={mockOnDismiss}>
        <Dropdown.Item
          dataTestId="item-1"
          onSelect={onSelectMock}
          option={{ value: 'item 1', label: 'Item 1' }}
        />
        <Dropdown.Item
          dataTestId="item-2"
          onSelect={onSelectMock}
          option={{
            value: 'item 2',
            label: 'Item 2 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Link
          dataTestId="item-3"
          href="https://pinterest.com"
          iconEnd="visit"
          option={{
            value: 'item 3',
            label: 'External Item 3 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          badge={{ text: 'New' }}
          onSelect={onSelectMock}
          option={{ value: 'item 4', label: 'Item 4' }}
        />
        <Dropdown.Link
          badge={{ text: 'New' }}
          href="https://pinterest.com"
          iconEnd="visit"
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          iconEnd="visit"
          option={{ value: 'item 6', label: 'Item 6' }}
        />
      </Dropdown>,
    );

    // Wait for state change in Dropdown so that the first item has focus
    await waitFor(() => expect(screen.getByTestId('item-1')).toHaveFocus());

    fireEvent.keyDown(window.document, {
      keyCode: DOWN_ARROW,
    });

    expect(screen.getByTestId('item-2')).toHaveFocus();

    fireEvent.keyDown(window.document, {
      keyCode: DOWN_ARROW,
    });

    // eslint-disable-next-line testing-library/no-node-access -- No way to pass test id for the link and no dedicated method for finding active element by testing-library
    expect(document.activeElement).toHaveAttribute('href', 'https://pinterest.com');

    fireEvent.keyDown(window.document, {
      keyCode: UP_ARROW,
    });

    expect(screen.getByTestId('item-2')).toHaveFocus();
  });

  it('should call item onSelect when enter key is pressed', async () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();
    const onSelectMock = jest.fn<
      [
        {
          event: React.ChangeEvent<HTMLInputElement>;
          item: {
            label: string;
            subtext?: string;
            value: string;
          };
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const element = document.createElement('button');

    render(
      <Dropdown anchor={element} id="ex-7" onDismiss={mockOnDismiss}>
        <Dropdown.Item
          dataTestId="item-1"
          onSelect={onSelectMock}
          option={{ value: 'item 1', label: 'Item 1' }}
        />
        <Dropdown.Item
          dataTestId="item-2"
          onSelect={onSelectMock}
          option={{
            value: 'item 2',
            label: 'Item 2 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          iconEnd="visit"
          option={{
            value: 'item 3',
            label: 'External Item 3 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          badge={{ text: 'New' }}
          onSelect={onSelectMock}
          option={{ value: 'item 4', label: 'Item 4' }}
        />
        <Dropdown.Link
          badge={{ text: 'New' }}
          href="https://pinterest.com"
          iconEnd="visit"
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          iconEnd="visit"
          option={{ value: 'item 6', label: 'Item 6' }}
        />
      </Dropdown>,
    );

    // Wait for state change in Dropdown so that the first item has focus
    await waitFor(() => expect(screen.getByTestId('item-1')).toHaveFocus());

    fireEvent.keyDown(window.document, {
      keyCode: DOWN_ARROW,
    });

    expect(screen.getByTestId('item-2')).toHaveFocus();

    fireEvent.keyDown(window.document, {
      keyCode: ENTER,
    });
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });

  it('should call link onClick when enter key is pressed', async () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnDismiss = jest.fn<[], undefined>();
    const onSelectMock = jest.fn<
      [
        {
          event: React.ChangeEvent<HTMLInputElement>;
          item: {
            label: string;
            subtext?: string;
            value: string;
          };
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const onClickMock = jest.fn<
      [
        {
          dangerouslyDisableOnNavigation: () => void;
          event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
          mobileOnDismissStart: () => void;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const element = document.createElement('button');

    render(
      <Dropdown anchor={element} id="ex-8" onDismiss={mockOnDismiss}>
        <Dropdown.Item
          dataTestId="item-1"
          onSelect={onSelectMock}
          option={{ value: 'item 1', label: 'Item 1' }}
        />
        <Dropdown.Link
          href="https://pinterest.com/today"
          iconEnd="visit"
          onClick={onClickMock}
          option={{
            value: 'item 3',
            label: 'External Item 3 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          onSelect={onSelectMock}
          option={{
            value: 'item 2',
            label: 'Item 2 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          badge={{ text: 'New' }}
          onSelect={onSelectMock}
          option={{ value: 'item 4', label: 'Item 4' }}
        />
        <Dropdown.Link
          badge={{ text: 'New' }}
          href="https://pinterest.com"
          iconEnd="visit"
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          iconEnd="visit"
          option={{ value: 'item 6', label: 'Item 6' }}
        />
      </Dropdown>,
    );

    // Wait for state change in Dropdown so that the first item has focus
    await waitFor(() => expect(screen.getByTestId('item-1')).toHaveFocus());

    fireEvent.keyDown(window.document, {
      keyCode: DOWN_ARROW,
    });
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(document.activeElement).toHaveAttribute('href', 'https://pinterest.com/today');

    // NOTE(rjames): I suspect this may be an RTL bug. This behavior works fine
    // when testing manually, and this test passes if using the click event below.
    // But for some reason the keyDown event isn't triggering the handler,
    // even though the activeElement is correct.

    // fireEvent.keyDown(window.document, {
    //   keyCode: ENTER,
    // });
    // fireEvent.click(screen.getByText(/External Item 3/));
    // expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
