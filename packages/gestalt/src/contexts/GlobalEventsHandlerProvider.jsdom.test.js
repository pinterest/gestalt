// @flow strict
import { useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import SheetMobile from '../SheetMobile.js';
import * as useReducedMotionHook from '../useReducedMotion.js';
import DeviceTypeProvider from './DeviceTypeProvider.js';
import GlobalEventsHandlerProvider from './GlobalEventsHandlerProvider.js';

jest.mock('../useReducedMotion.js');

describe('Dropdown.Item', () => {
  const useReducedMotionMock = jest.spyOn(useReducedMotionHook, 'default');

  beforeEach(() => {
    useReducedMotionMock.mockReturnValue(true);
  });

  const onOpen = jest.fn<[], void>();
  const onClose = jest.fn<[], void>();

  function TesterWrap() {
    const [open, setOpen] = useState(true);

    return (
      <GlobalEventsHandlerProvider
        sheetMobileHandlers={{
          onOpen,
          onClose,
        }}
      >
        <DeviceTypeProvider deviceType="mobile">
          {open ? (
            <SheetMobile heading="test" subHeading="test" onDismiss={() => setOpen(false)} />
          ) : null}
        </DeviceTypeProvider>
      </GlobalEventsHandlerProvider>
    );
  }

  test('calls onSelect when Item clicked', () => {
    render(<TesterWrap />);

    expect(onOpen).toHaveBeenCalled();
    act(() => {
      screen.getByLabelText('Close bottom sheet').click();
    });

    expect(onClose).toHaveBeenCalled();
  });
});
