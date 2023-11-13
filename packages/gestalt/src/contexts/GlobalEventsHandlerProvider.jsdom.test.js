// @flow strict
import { useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import DeviceTypeProvider from './DeviceTypeProvider';
import GlobalEventsHandlerProvider from './GlobalEventsHandlerProvider';
import SheetMobile from '../SheetMobile';
import * as useReducedMotionHook from '../useReducedMotion';

jest.mock('../useReducedMotion');

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
      screen.getByLabelText('Dismiss bottom sheet').click();
    });

    expect(onClose).toHaveBeenCalled();
  });
});
