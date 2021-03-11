// @flow strict
import { fireEvent, render, screen } from '@testing-library/react';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from './keyCodes.js';
import Dropdown from './Dropdown.js';

describe('Dropdown', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a menu of 6 items', () => {
    const mockOnDismiss = jest.fn();
    const handleSelectMock = jest.fn();
    const element = document.createElement('button');

    const { baseElement } = render(
      <Dropdown id="ex-1" anchor={element} onDismiss={mockOnDismiss}>
        <Dropdown.Item
          handleSelect={handleSelectMock}
          option={{ value: 'item 1', label: 'Item 1' }}
        />
        <Dropdown.Item
          handleSelect={handleSelectMock}
          option={{
            value: 'item 2',
            label: 'Item 2 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          isExternal
          href="https://pinterest.com"
          option={{
            value: 'item 3',
            label: 'External Item 3 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          handleSelect={handleSelectMock}
          badgeText="New"
          option={{ value: 'item 4', label: 'Item 4' }}
        />
        <Dropdown.Item
          isExternal
          badgeText="New"
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
          href="https://pinterest.com"
        />
        <Dropdown.Item
          isExternal
          option={{ value: 'item 6', label: 'Item 6' }}
          href="https://pinterest.com"
        />
      </Dropdown>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders dropdown sections', () => {
    const mockOnDismiss = jest.fn();
    const handleSelectMock = jest.fn();
    const element = document.createElement('button');

    render(
      <Dropdown id="ex-2" anchor={element} onDismiss={mockOnDismiss}>
        <Dropdown.Section label="Section 1">
          <Dropdown.Item
            handleSelect={handleSelectMock}
            option={{ value: 'item 1', label: 'Item 1' }}
          />
          <Dropdown.Item
            handleSelect={handleSelectMock}
            option={{
              value: 'item 2',
              label: 'Item 2 with a really long, detailed, complex name',
            }}
          />
        </Dropdown.Section>
        <Dropdown.Section label="Section 2">
          <Dropdown.Item
            isExternal
            href="https://pinterest.com"
            option={{
              value: 'item 3',
              label: 'External Item 3 with a really long, detailed, complex name',
            }}
          />
          <Dropdown.Item
            handleSelect={handleSelectMock}
            badgeText="New"
            option={{ value: 'item 4', label: 'Item 4' }}
          />
          <Dropdown.Item
            isExternal
            badgeText="New"
            option={{
              value: 'item 5',
              label: 'Item 5 with a really long, detailed name',
            }}
            href="https://pinterest.com"
          />
          <Dropdown.Item
            isExternal
            option={{ value: 'item 6', label: 'Item 6' }}
            href="https://pinterest.com"
          />
        </Dropdown.Section>
      </Dropdown>,
    );
    const sectionLabels = screen.getAllByRole('presentation');

    expect(sectionLabels).toHaveLength(2);
  });
  it('renders a custom header', () => {
    const mockOnDismiss = jest.fn();
    const handleSelectMock = jest.fn();
    const element = document.createElement('button');

    render(
      <Dropdown
        id="ex-3"
        anchor={element}
        onDismiss={mockOnDismiss}
        headerContent={<p>This is my custom header</p>}
      >
        <Dropdown.Section label="Section 1">
          <Dropdown.Item
            handleSelect={handleSelectMock}
            option={{ value: 'item 1', label: 'Item 1' }}
          />
          <Dropdown.Item
            handleSelect={handleSelectMock}
            option={{
              value: 'item 2',
              label: 'Item 2 with a really long, detailed, complex name',
            }}
          />
        </Dropdown.Section>
        <Dropdown.Section label="Section 2">
          <Dropdown.Item
            isExternal
            href="https://pinterest.com"
            option={{
              value: 'item 3',
              label: 'External Item 3 with a really long, detailed, complex name',
            }}
          />
          <Dropdown.Item
            handleSelect={handleSelectMock}
            badgeText="New"
            option={{ value: 'item 4', label: 'Item 4' }}
          />
          <Dropdown.Item
            isExternal
            badgeText="New"
            option={{
              value: 'item 5',
              label: 'Item 5 with a really long, detailed name',
            }}
            href="https://pinterest.com"
          />
          <Dropdown.Item
            isExternal
            option={{ value: 'item 6', label: 'Item 6' }}
            href="https://pinterest.com"
          />
        </Dropdown.Section>
      </Dropdown>,
    );

    expect(screen.getByText('This is my custom header')).toBeVisible();
  });
  it('closes when ESC key is pressed', () => {
    const mockOnDismiss = jest.fn();
    const handleSelectMock = jest.fn();
    const element = document.createElement('button');
    render(
      <Dropdown id="ex-4" anchor={element} onDismiss={mockOnDismiss}>
        <Dropdown.Item
          handleSelect={handleSelectMock}
          option={{ value: 'item 1', label: 'Item 1' }}
        />
        <Dropdown.Item
          handleSelect={handleSelectMock}
          option={{
            value: 'item 2',
            label: 'Item 2 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          isExternal
          href="https://pinterest.com"
          option={{
            value: 'item 3',
            label: 'External Item 3 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          handleSelect={handleSelectMock}
          badgeText="New"
          option={{ value: 'item 4', label: 'Item 4' }}
        />
        <Dropdown.Item
          isExternal
          badgeText="New"
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
          href="https://pinterest.com"
        />
        <Dropdown.Item
          isExternal
          option={{ value: 'item 6', label: 'Item 6' }}
          href="https://pinterest.com"
        />
      </Dropdown>,
    );
    fireEvent.keyDown(window.document, {
      keyCode: ESCAPE,
    });

    expect(mockOnDismiss).toHaveBeenCalled();
  });
  it('closes when TAB key is pressed', () => {
    const mockOnDismiss = jest.fn();
    const handleSelectMock = jest.fn();
    const element = document.createElement('button');
    render(
      <Dropdown id="ex-5" anchor={element} onDismiss={mockOnDismiss}>
        <Dropdown.Item
          handleSelect={handleSelectMock}
          option={{ value: 'item 1', label: 'Item 1' }}
        />
        <Dropdown.Item
          handleSelect={handleSelectMock}
          option={{
            value: 'item 2',
            label: 'Item 2 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          isExternal
          href="https://pinterest.com"
          option={{
            value: 'item 3',
            label: 'External Item 3 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          handleSelect={handleSelectMock}
          badgeText="New"
          option={{ value: 'item 4', label: 'Item 4' }}
        />
        <Dropdown.Item
          isExternal
          badgeText="New"
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
          href="https://pinterest.com"
        />
        <Dropdown.Item
          isExternal
          option={{ value: 'item 6', label: 'Item 6' }}
          href="https://pinterest.com"
        />
      </Dropdown>,
    );
    fireEvent.keyDown(window.document, {
      keyCode: TAB,
    });

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('changes active descendant when arrow keys are pressed', () => {
    const mockOnDismiss = jest.fn();
    const handleSelectMock = jest.fn();
    const element = document.createElement('button');
    render(
      <Dropdown id="ex-6" anchor={element} onDismiss={mockOnDismiss}>
        <Dropdown.Item
          handleSelect={handleSelectMock}
          option={{ value: 'item 1', label: 'Item 1' }}
        />
        <Dropdown.Item
          handleSelect={handleSelectMock}
          option={{
            value: 'item 2',
            label: 'Item 2 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          isExternal
          href="https://pinterest.com"
          option={{
            value: 'item 3',
            label: 'External Item 3 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          handleSelect={handleSelectMock}
          badgeText="New"
          option={{ value: 'item 4', label: 'Item 4' }}
        />
        <Dropdown.Item
          isExternal
          badgeText="New"
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
          href="https://pinterest.com"
        />
        <Dropdown.Item
          isExternal
          option={{ value: 'item 6', label: 'Item 6' }}
          href="https://pinterest.com"
        />
      </Dropdown>,
    );

    expect(document.activeElement).toHaveAttribute('id', 'ex-6-item-0');

    fireEvent.keyDown(window.document, {
      keyCode: DOWN_ARROW,
    });

    expect(document.activeElement).toHaveAttribute('id', 'ex-6-item-1');

    fireEvent.keyDown(window.document, {
      keyCode: DOWN_ARROW,
    });

    expect(document.activeElement).toHaveAttribute('id', 'ex-6-item-2');

    fireEvent.keyDown(window.document, {
      keyCode: UP_ARROW,
    });

    expect(document.activeElement).toHaveAttribute('id', 'ex-6-item-1');
  });

  it('should call handleSelect when enter key is pressed', () => {
    const mockOnDismiss = jest.fn();
    const handleSelectMock = jest.fn();
    const element = document.createElement('button');
    render(
      <Dropdown id="ex-7" anchor={element} onDismiss={mockOnDismiss}>
        <Dropdown.Item
          handleSelect={handleSelectMock}
          option={{ value: 'item 1', label: 'Item 1' }}
        />
        <Dropdown.Item
          handleSelect={handleSelectMock}
          option={{
            value: 'item 2',
            label: 'Item 2 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          isExternal
          href="https://pinterest.com"
          option={{
            value: 'item 3',
            label: 'External Item 3 with a really long, detailed, complex name',
          }}
        />
        <Dropdown.Item
          handleSelect={handleSelectMock}
          badgeText="New"
          option={{ value: 'item 4', label: 'Item 4' }}
        />
        <Dropdown.Item
          isExternal
          badgeText="New"
          option={{
            value: 'item 5',
            label: 'Item 5 with a really long, detailed name',
          }}
          href="https://pinterest.com"
        />
        <Dropdown.Item
          isExternal
          option={{ value: 'item 6', label: 'Item 6' }}
          href="https://pinterest.com"
        />
      </Dropdown>,
    );

    expect(document.activeElement).toHaveAttribute('id', 'ex-7-item-0');

    fireEvent.keyDown(window.document, {
      keyCode: DOWN_ARROW,
    });

    expect(document.activeElement).toHaveAttribute('id', 'ex-7-item-1');

    fireEvent.keyDown(window.document, {
      keyCode: ENTER,
    });

    expect(handleSelectMock).toHaveBeenCalledTimes(1);
  });
});
