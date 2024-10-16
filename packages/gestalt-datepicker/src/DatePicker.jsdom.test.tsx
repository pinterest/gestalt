import { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { DeviceTypeProvider } from 'gestalt';
import DatePicker from './DatePicker';

const initialDate = new Date(2018, 11, 14);

function DatePickerWrap({
  showMonthYearDropdown,
  disableMobileUI,
  label,
}: {
  showMonthYearDropdown?: boolean;
  disableMobileUI?: boolean;
  label?: string;
}) {
  const [date, setDate] = useState<Date | null>(initialDate);

  return (
    <DatePicker
      disableMobileUI={disableMobileUI}
      id="fake_id"
      label={label}
      onChange={({ value }: any) => setDate(value)}
      selectLists={showMonthYearDropdown ? ['year', 'month'] : undefined}
      value={date}
    />
  );
}

describe('DatePicker', () => {
  const mockOnChange = jest.fn<
    [
      {
        event: React.ChangeEvent<HTMLInputElement>;
        value: Date | null;
      },
    ],
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    undefined
  >();

  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    // @ts-expect-error - TS2740 - Type '{ nodeName: string; ownerDocument: Document; }' is missing the following properties from type 'Node': baseURI, childNodes, firstChild, isConnected, and 44 more.
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });

  it('displays TextField with given initial date', () => {
    render(<DatePicker id="fake_id" onChange={() => {}} value={initialDate} />);
    // We only check for selected value upon rendering,
    // because onChange logic is outside DatePicker
    // So initial date value does not change upon firing click event
    expect(screen.getByDisplayValue('12/14/2018')).toBeInTheDocument();
  });

  it('passes clicked date to onChange prop', () => {
    const newDate = new Date(2018, 11, 13);

    render(
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

  test('opens and closes DatePicker popover correctly', async () => {
    render(<DatePickerWrap />);

    // eslint-disable-next-line testing-library/no-unnecessary-act -- We have to wrap the focus event in `act` since it does change the component's internal state
    await act(async () => {
      await fireEvent.focus(screen.getByDisplayValue('12/14/2018'));
    });

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

    // eslint-disable-next-line testing-library/no-unnecessary-act -- We have to wrap the focus event in `act` since it does change the component's internal state
    await act(async () => {
      await fireEvent.focus(screen.getByDisplayValue('12/13/2018'));
    });

    // Test correct render of DatePicker popover
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText('December 2018')).toBeInTheDocument();
  });

  test('accepts entering manual dates', async () => {
    render(<DatePickerWrap />);

    // eslint-disable-next-line testing-library/no-unnecessary-act -- We have to wrap the focus event in `act` since it does change the component's internal state
    await act(async () => {
      fireEvent.focus(screen.getByDisplayValue('12/14/2018'));
    });

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

  test('has year and month select list options', async () => {
    render(<DatePickerWrap showMonthYearDropdown />);

    // eslint-disable-next-line testing-library/no-unnecessary-act -- We have to wrap the focus event in `act` since it does change the component's internal state
    await act(async () => {
      fireEvent.focus(screen.getByDisplayValue('12/14/2018'));
    });
    expect(screen.queryAllByRole('option', { name: 'January' })).toHaveLength(1);
    expect(screen.queryAllByRole('option', { name: '2017' })).toHaveLength(1);
  });

  test('Mobile Datepicker renders', async () => {
    const { baseElement } = render(
      <DeviceTypeProvider deviceType="mobile">
        <DatePickerWrap disableMobileUI={false} label="select" />
      </DeviceTypeProvider>,
    );

    fireEvent.focus(screen.getByDisplayValue('12/14/2018'));

    expect(baseElement).toMatchSnapshot();

    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
