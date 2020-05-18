// @flow strict
import React from 'react';
import { screen } from '@testing-library/dom';
import { act, render, fireEvent, wait } from '@testing-library/react';
import DatePicker from './DatePicker.js';

describe('DatePicker', () => {
  const mockOnChange = jest.fn();
  const date = new Date(2018, 11, 14);

  // Patch required to fix error document.createRange is not a function:
  // https://stackoverflow.com/questions/60333156/how-to-fix-typeerror-document-createrange-is-not-a-function-error-while-testi
  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });

  it('displays TextField with given initial date', () => {
    act(() => {
      render(
        <DatePicker
          accessibilityLabelNext="fake_accessibilityLabelNext"
          accessibilityLabelPrevious="fake_accessibilityLabelPrevious"
          id="fake_id"
          locale="en-US"
          onChange={mockOnChange}
          placeholder="Select date"
          value={date}
        />
      );
    });
    // We only check for selected value upon rendering,
    // because onChange logic is outside DatePicker
    // So initial date value does not change upon firing click event
    expect(screen.getByDisplayValue('12/14/2018')).toBeInTheDocument();
  });

  it('opens and closes DatePicker flyout', async () => {
    await act(async () => {
      render(
        <DatePicker
          accessibilityLabelNext="fake_accessibilityLabelNext"
          accessibilityLabelPrevious="fake_accessibilityLabelPrevious"
          id="fake_id"
          locale="en-US"
          onChange={mockOnChange}
          placeholder="Select date"
          value={date}
        />
      );

      fireEvent.click(screen.getByRole('button'));

      // Test correct render of DatePicker flyout
      await wait(() => {
        expect(screen.queryByText('December 2018')).toBeInTheDocument();
      });
      // Test that initial passed value is styled as selected
      expect(screen.getByText('14')).toHaveClass(
        'react-datepicker__day react-datepicker__day--014 react-datepicker__day--selected'
      );

      const selectedDay = screen.getByText('13');

      fireEvent.click(selectedDay);

      // Test correct unmount of DatePicker flyout
      expect(screen.queryByText('December 2018')).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button'));

      // Test correct render of DatePicker flyout
      await wait(() => {
        expect(screen.queryByText('December 2018')).toBeInTheDocument();
      });
    });
  });

  it('passes clicked date to onChange prop', async () => {
    const newDate = new Date('2018-12-13T00:00:00.000Z');

    await act(async () => {
      render(
        <DatePicker
          accessibilityLabelNext="fake_accessibilityLabelNext"
          accessibilityLabelPrevious="fake_accessibilityLabelPrevious"
          id="fake_id"
          locale="en-US"
          onChange={mockOnChange}
          placeholder="Select date"
          value={date}
        />
      );

      fireEvent.click(screen.getByRole('button'));

      await wait(() => {
        expect(screen.queryByText('December 2018')).toBeInTheDocument();
      });

      const selectedDay = screen.getByText('13');

      fireEvent.click(selectedDay);

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: newDate })
      );
    });
  });

  it('gets locale data correctl', async () => {
    await act(async () => {
      render(
        <DatePicker
          accessibilityLabelNext="fake_accessibilityLabelNext"
          accessibilityLabelPrevious="fake_accessibilityLabelPrevious"
          id="fake_id"
          locale="es-ES"
          onChange={mockOnChange}
          placeholder="Select date"
          value={date}
        />
      );

      fireEvent.click(screen.getByRole('button'));
      await wait(() => {
        expect(screen.queryByText('diciembre 2018')).toBeInTheDocument();
      });
    });
  });
});
