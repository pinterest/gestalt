// @flow strict-local
import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nProvider } from 'gestalt';
import DatePicker from './DatePicker.js';

const translations = {
  TextField: {
    accessibilityHidePasswordLabel: 'Hide password',
    accessibilityShowPasswordLabel: 'Show password',
  },
};

function renderComp(comp) {
  return render(<I18nProvider value={translations}>{comp}</I18nProvider>);
}

describe('DatePicker', () => {
  const mockOnChange = jest.fn();
  const initialDate = new Date(2018, 11, 14);

  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });

  it('displays TextField with given initial date', () => {
    renderComp(<DatePicker id="fake_id" onChange={() => {}} value={initialDate} />);
    // We only check for selected value upon rendering,
    // because onChange logic is outside DatePicker
    // So initial date value does not change upon firing click event
    expect(screen.getByDisplayValue('12/14/2018')).toBeInTheDocument();
  });

  it('passes clicked date to onChange prop', () => {
    const newDate = new Date(2018, 11, 13);

    renderComp(
      <DatePicker
        id="fake_id"
        onChange={mockOnChange}
        placeholder="Select date"
        value={initialDate}
      />,
    );

    fireEvent.focus(screen.getByDisplayValue('12/14/2018'));

// eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText('December 2018')).toBeInTheDocument();

    const selectedDay = screen.getByText('13');

    fireEvent.click(selectedDay);

    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ value: newDate }));
  });

  test('opens and closes DatePicker popover correctly', () => {
    function DatePickerWrap() {
      const [date, setDate] = useState(initialDate);

      return <DatePicker id="fake_id" onChange={(e) => setDate(e.value)} value={date} />;
    }

    renderComp(<DatePickerWrap />);

    fireEvent.focus(screen.getByDisplayValue('12/14/2018'));

    // Test correct render of DatePicker popover
// eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText('December 2018')).toBeInTheDocument();
    // Test that initial passed value is styled as selected
    expect(screen.getByText('14')).toHaveClass(
      'react-datepicker__day react-datepicker__day--014 react-datepicker__day--selected',
    );

    const selectedDay = screen.getByText('13');

    fireEvent.click(selectedDay);

    // Test correct unmount of DatePicker popover
    expect(screen.getByDisplayValue('12/13/2018')).toBeInTheDocument();

    fireEvent.focus(screen.getByDisplayValue('12/13/2018'));

    // Test correct render of DatePicker popover
// eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText('December 2018')).toBeInTheDocument();
  });

  test('accepts entering manual dates', () => {
    function DatePickerWrap() {
      const [date, setDate] = useState(initialDate);

      return <DatePicker id="fake_id" onChange={(e) => setDate(e.value)} value={date} />;
    }

    renderComp(<DatePickerWrap />);

    fireEvent.focus(screen.getByDisplayValue('12/14/2018'));

    const selectedInput = screen.getByDisplayValue('12/14/2018');

    fireEvent.change(selectedInput, { target: { value: '12/13/2018' } });

    // Test correct unmount of DatePicker popover
    expect(screen.getByDisplayValue('12/13/2018')).toBeInTheDocument();

    fireEvent.focus(screen.getByDisplayValue('12/13/2018'));

    // Test correct render of DatePicker popover
// eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText('December 2018')).toBeInTheDocument();

    expect(screen.getByText('13')).toHaveClass(
      'react-datepicker__day react-datepicker__day--013 react-datepicker__day--selected',
    );
  });
});
