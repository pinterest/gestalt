import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { af, hu, type Locale } from 'date-fns/locale';
import DateField from './DateField';

const initialDate = new Date(2018, 11, 14);

function DatePickerWrap({
  errorMessage,
  localeData,
  readOnly,
  disabled,
}: {
  errorMessage?: string;
  disabled?: boolean;
  readOnly?: boolean;
  localeData?: Locale;
}) {
  const [date, setDate] = useState<Date | null>(initialDate);

  return (
    <DateField
      disabled={disabled}
      errorMessage={errorMessage}
      helperText="Enter your date of birth"
      id="mainExample"
      label="Date of birth"
      localeData={localeData}
      name="test"
      onChange={({ value }: any) => setDate(value)}
      onClearInput={() => setDate(null)}
      onError={() => {}}
      readOnly={readOnly}
      value={date}
    />
  );
}

describe('DatePicker', () => {
  it('renders correctly with set date', () => {
    render(<DatePickerWrap />);

    expect(screen.getByPlaceholderText('MM / DD / YYYY')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12 / 14 / 2018')).toBeInTheDocument();
    expect(screen.getByText('Date of birth')).toBeInTheDocument();
    expect(screen.getByText('Enter your date of birth')).toBeInTheDocument();
  });

  it('renders correctly with error', () => {
    render(<DatePickerWrap errorMessage="Please, select a valid birth date" />);

    expect(screen.queryByText('Enter your date of birth')).not.toBeInTheDocument();
    expect(screen.getByText('Please, select a valid birth date')).toBeInTheDocument();
  });

  it('renders correctly and clears data', () => {
    render(<DatePickerWrap errorMessage="Please, select a valid birth date" />);

    expect(screen.getByDisplayValue('12 / 14 / 2018')).toBeInTheDocument();
    const clearButton = screen.getByLabelText('Clear date');

    fireEvent.click(clearButton);

    expect(screen.queryByDisplayValue('12 / 14 / 2018')).not.toBeInTheDocument();
  });

  it('renders correctly disabled', () => {
    render(<DatePickerWrap disabled />);

    const textfield = screen.getByDisplayValue('12 / 14 / 2018');

    expect(textfield).toBeInTheDocument();
    expect(textfield).toBeDisabled();
    expect(screen.queryByLabelText('Clear date')).not.toBeInTheDocument();
  });

  it('renders correctly readonly', () => {
    render(<DatePickerWrap readOnly />);

    const textfield = screen.getByDisplayValue('12 / 14 / 2018');
    expect(textfield).toBeInTheDocument();
    expect(textfield).not.toBeDisabled();
    expect(screen.queryByLabelText('Clear date')).not.toBeInTheDocument();
  });

  it('renders correctly with MUI supported locale', () => {
    render(<DatePickerWrap localeData={hu} />);

    expect(screen.getByPlaceholderText('ÉÉÉÉ. HH. NN .')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2018. 12. 14 .')).toBeInTheDocument();
  });

  it('renders correctly with non-MUI, locally supported locale', () => {
    render(<DatePickerWrap localeData={af} />);

    expect(screen.getByPlaceholderText('JJJJ / MM / DD')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2018 / 12 / 14')).toBeInTheDocument();
  });
});
