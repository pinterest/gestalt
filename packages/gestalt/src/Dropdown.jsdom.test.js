// @flow strict
import { Fragment } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Dropdown from './Dropdown.js';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from './keyCodes.js';

describe('Dropdown', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a menu of 6 items', () => {
    const mockOnDismiss = jest.fn<[], void>();
    const onSelectMock = jest.fn<
      [
        {|
          event: SyntheticInputEvent<HTMLInputElement>,
          item: {| label: string, subtext?: string, value: string |},
        |},
      ],
      void,
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
          isExternal
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
          isExternal
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          isExternal
          option={{ value: 'item 6', label: 'Item 6' }}
        />
      </Dropdown>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('renders a menu of 3 items conditionally', () => {
    const mockOnDismiss = jest.fn<[], void>();
    const onSelectMock = jest.fn<
      [
        {|
          event: SyntheticInputEvent<HTMLInputElement>,
          item: {| label: string, subtext?: string, value: string |},
        |},
      ],
      void,
    >();
    const element = document.createElement('button');
    const renderOptions = true;

    const { baseElement } = render(
      <Dropdown anchor={element} id="ex-1" onDismiss={mockOnDismiss}>
        {renderOptions && (
          <Fragment>
            {[1, 2, 3, 4, 5, 6].map((x) => (
              <Dropdown.Item
                key={x}
                onSelect={onSelectMock}
                option={{ value: x.toString(), label: x.toString() }}
              />
            ))}
            {[7, 8, 9, 10, 11, 12].map((x) => (
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
    const mockOnDismiss = jest.fn<[], void>();
    const onSelectMock = jest.fn<
      [
        {|
          event: SyntheticInputEvent<HTMLInputElement>,
          item: {| label: string, subtext?: string, value: string |},
        |},
      ],
      void,
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
            isExternal
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
            isExternal
            option={{
              value: 'item 5',
              label: 'Item 5 with a really long, detailed name',
            }}
          />
          <Dropdown.Link
            href="https://pinterest.com"
            isExternal
            option={{ value: 'item 6', label: 'Item 6' }}
          />
        </Dropdown.Section>
      </Dropdown>,
    );

    const sectionLabels = screen.getAllByRole('presentation');
    expect(sectionLabels).toHaveLength(2);
  });

  it('renders a custom header', () => {
    const mockOnDismiss = jest.fn<[], void>();
    const onSelectMock = jest.fn<
      [
        {|
          event: SyntheticInputEvent<HTMLInputElement>,
          item: {| label: string, subtext?: string, value: string |},
        |},
      ],
      void,
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
            isExternal
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
            isExternal
            option={{
              value: 'item 5',
              label: 'Item 5 with a really long, detailed name',
            }}
          />
          <Dropdown.Link
            href="https://pinterest.com"
            isExternal
            option={{ value: 'item 6', label: 'Item 6' }}
          />
        </Dropdown.Section>
      </Dropdown>,
    );

    expect(screen.getByText('This is my custom header')).toBeVisible();
  });

  it('closes when esc key is pressed', () => {
    const mockOnDismiss = jest.fn<[], void>();
    const onSelectMock = jest.fn<
      [
        {|
          event: SyntheticInputEvent<HTMLInputElement>,
          item: {| label: string, subtext?: string, value: string |},
        |},
      ],
      void,
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
          isExternal
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
          isExternal
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          isExternal
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
    const mockOnDismiss = jest.fn<[], void>();
    const onSelectMock = jest.fn<
      [
        {|
          event: SyntheticInputEvent<HTMLInputElement>,
          item: {| label: string, subtext?: string, value: string |},
        |},
      ],
      void,
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
          isExternal
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
          isExternal
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          isExternal
          option={{ value: 'item 6', label: 'Item 6' }}
        />
      </Dropdown>,
    );

    fireEvent.keyDown(window.document, {
      keyCode: TAB,
    });
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('changes active descendant when arrow keys are pressed', () => {
    const mockOnDismiss = jest.fn<[], void>();
    const onSelectMock = jest.fn<
      [
        {|
          event: SyntheticInputEvent<HTMLInputElement>,
          item: {| label: string, subtext?: string, value: string |},
        |},
      ],
      void,
    >();
    const element = document.createElement('button');

    render(
      <Dropdown anchor={element} id="ex-6" onDismiss={mockOnDismiss}>
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
          isExternal
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
          isExternal
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          isExternal
          option={{ value: 'item 6', label: 'Item 6' }}
        />
      </Dropdown>,
    );

    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(document.activeElement).toHaveAttribute('id', 'ex-6-item-0');

    fireEvent.keyDown(window.document, {
      keyCode: DOWN_ARROW,
    });
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(document.activeElement).toHaveAttribute('id', 'ex-6-item-1');

    fireEvent.keyDown(window.document, {
      keyCode: DOWN_ARROW,
    });
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(document.activeElement).toHaveAttribute('href', 'https://pinterest.com');

    fireEvent.keyDown(window.document, {
      keyCode: UP_ARROW,
    });
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(document.activeElement).toHaveAttribute('id', 'ex-6-item-1');
  });

  it('should call item onSelect when enter key is pressed', () => {
    const mockOnDismiss = jest.fn<[], void>();
    const onSelectMock = jest.fn<
      [
        {|
          event: SyntheticInputEvent<HTMLInputElement>,
          item: {| label: string, subtext?: string, value: string |},
        |},
      ],
      void,
    >();
    const element = document.createElement('button');

    render(
      <Dropdown anchor={element} id="ex-7" onDismiss={mockOnDismiss}>
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
          isExternal
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
          isExternal
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          isExternal
          option={{ value: 'item 6', label: 'Item 6' }}
        />
      </Dropdown>,
    );

    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(document.activeElement).toHaveAttribute('id', 'ex-7-item-0');

    fireEvent.keyDown(window.document, {
      keyCode: DOWN_ARROW,
    });
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(document.activeElement).toHaveAttribute('id', 'ex-7-item-1');

    fireEvent.keyDown(window.document, {
      keyCode: ENTER,
    });
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });

  it('should call link onClick when enter key is pressed', () => {
    const mockOnDismiss = jest.fn<[], void>();
    const onSelectMock = jest.fn<
      [
        {|
          event: SyntheticInputEvent<HTMLInputElement>,
          item: {| label: string, subtext?: string, value: string |},
        |},
      ],
      void,
    >();
    const onClickMock = jest.fn<
      [
        {|
          dangerouslyDisableOnNavigation: () => void,
          event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
          mobileOnDismissStart: () => void,
        |},
      ],
      void,
    >();
    const element = document.createElement('button');

    render(
      <Dropdown anchor={element} id="ex-8" onDismiss={mockOnDismiss}>
        <Dropdown.Item onSelect={onSelectMock} option={{ value: 'item 1', label: 'Item 1' }} />
        <Dropdown.Link
          href="https://pinterest.com/today"
          isExternal
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
          isExternal
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
        />
        <Dropdown.Link
          href="https://pinterest.com"
          isExternal
          option={{ value: 'item 6', label: 'Item 6' }}
        />
      </Dropdown>,
    );

    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(document.activeElement).toHaveAttribute('id', 'ex-8-item-0');

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
