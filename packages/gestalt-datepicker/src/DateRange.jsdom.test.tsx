import { ComponentProps, useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { enUS, id, Locale } from 'date-fns/locale';
import DateRange from './DateRange';

function DateRangeWrap({
  initialStartDate,
  initialEndDate,
  localeData,
  onDateChange,
}: {
  initialStartDate?: Date;
  initialEndDate?: Date;
  localeData?: Locale;
  onDateChange?: ComponentProps<typeof DateRange>['onDateChange'];
}) {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate ?? null);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate ?? null);

  return (
    <DateRange
      dateValue={{ startDate, endDate }}
      localeData={localeData}
      onCancel={() => {}}
      onDateChange={(newStartDate, newEndDate) => {
        onDateChange?.({ value: newStartDate.value }, { value: newEndDate.value });
        setStartDate(newStartDate.value);
        setEndDate(newEndDate.value);
      }}
      onDateError={{ startDate: () => {}, endDate: () => {} }}
      onSubmit={() => {}}
    />
  );
}

function TwoDateRangeWrap({
  initialStartDate,
  initialEndDate,
  initialCompEndDate,
  initialCompStartDate,
  localeData,
}: {
  initialStartDate?: Date;
  initialEndDate?: Date;
  initialCompStartDate?: Date;
  initialCompEndDate?: Date;
  localeData?: Locale;
}) {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate ?? null);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate ?? null);
  const [compStartDate, setCompStartDate] = useState<Date | null>(initialCompStartDate ?? null);
  const [compEndDate, setCompEndDate] = useState<Date | null>(initialCompEndDate ?? null);

  return (
    <DateRange
      dateValue={{ startDate, endDate }}
      localeData={localeData}
      onCancel={() => {}}
      onDateChange={(newStartDate, newEndDate) => {
        setStartDate(newStartDate.value);
        setEndDate(newEndDate.value);
      }}
      onDateError={{ startDate: () => {}, endDate: () => {} }}
      onSecondaryDateChange={(newStartDate, newEndDate) => {
        setCompStartDate(newStartDate.value);
        setCompEndDate(newEndDate.value);
      }}
      onSubmit={() => {}}
      secondaryDateValue={{ startDate: compStartDate, endDate: compEndDate }}
    />
  );
}

describe('DateRange', () => {
  it('renders correctly with no default dates with locale', () => {
    render(
      <DateRangeWrap
        initialEndDate={new Date('December 17, 1995 03:24:00')}
        initialStartDate={new Date('December 16, 1995 03:24:00')}
        localeData={id}
      />,
    );

    expect(screen.getAllByPlaceholderText('DD / MM / YYYY')).toHaveLength(2);
    expect(screen.getByDisplayValue('16 / 12 / 1995')).toBeInTheDocument();
    expect(screen.getByDisplayValue('17 / 12 / 1995')).toBeInTheDocument();
    expect(screen.getByText('Desember 1995')).toBeInTheDocument();
    expect(screen.getByText('Januari 1996')).toBeInTheDocument();
  });

  it('renders correctly with default dates', () => {
    render(
      <DateRangeWrap
        initialEndDate={new Date('December 17, 1995 03:24:00')}
        initialStartDate={new Date('December 16, 1995 03:24:00')}
      />,
    );

    expect(screen.getByDisplayValue('12 / 16 / 1995')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12 / 17 / 1995')).toBeInTheDocument();
    expect(screen.getByText('December 1995')).toBeInTheDocument();
    expect(screen.getByText('January 1996')).toBeInTheDocument();
  });

  it('handles new selection', async () => {
    render(
      <DateRangeWrap
        initialEndDate={new Date('December 17, 1995 03:24:00')}
        initialStartDate={new Date('December 16, 1995 03:24:00')}
      />,
    );

    expect(screen.getAllByPlaceholderText('MM / DD / YYYY')).toHaveLength(2);
    expect(screen.getByDisplayValue('12 / 16 / 1995')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12 / 17 / 1995')).toBeInTheDocument();

    const startSelectedDay = screen.getAllByText('13')[0];

    await act(async () => {
      if (startSelectedDay) {
        fireEvent.click(startSelectedDay);
      }
    });

    expect(screen.getByDisplayValue('12 / 13 / 1995')).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();

    const endSelectedDay = screen.getAllByText('13')[1];

    await act(async () => {
      if (endSelectedDay) {
        fireEvent.click(endSelectedDay);
      }
    });

    expect(screen.getByDisplayValue('12 / 13 / 1995')).toBeInTheDocument();
    expect(screen.getByDisplayValue('01 / 13 / 1996')).toBeInTheDocument();
  });

  it('handles events correctly', async () => {
    const onDateChangeMock = jest.fn<
      [
        {
          value: Date | null;
        },
        {
          value: Date | null;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();

    const initialStartDate = new Date('December 16, 1995 03:24:00');
    const initialEndDate = new Date('December 17, 1995 03:24:00');
    const selectedStartDate = new Date('December 13, 1995 03:24:00');
    const selectedEndDate = new Date('January 13, 1996 03:24:00');

    render(
      <DateRangeWrap
        initialEndDate={initialEndDate}
        initialStartDate={initialStartDate}
        onDateChange={onDateChangeMock}
      />,
    );

    const startSelectedDay = screen.getAllByText('13')[0];

    await act(async () => {
      if (startSelectedDay) {
        fireEvent.click(startSelectedDay);
      }
    });

    const endSelectedDay = screen.getAllByText('13')[1];

    await act(async () => {
      if (endSelectedDay) {
        fireEvent.click(endSelectedDay);
      }
    });

    expect(onDateChangeMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ value: selectedStartDate }),
      expect.objectContaining({ value: null }),
    );

    expect(onDateChangeMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ value: selectedStartDate }),
      expect.objectContaining({ value: selectedEndDate }),
    );
  });

  it('displays two date ranges', () => {
    const initialStartDate = new Date('December 16, 1995 03:24:00');
    const initialEndDate = new Date('December 17, 1995 03:24:00');
    const initialCompStartDate = new Date('December 16, 1996 03:24:00');
    const initialCompEndDate = new Date('December 17, 1996 03:24:00');
    render(
      <TwoDateRangeWrap
        initialCompEndDate={initialCompEndDate}
        initialCompStartDate={initialCompStartDate}
        initialEndDate={initialEndDate}
        initialStartDate={initialStartDate}
        localeData={id}
      />,
    );
    expect(screen.getAllByPlaceholderText('DD / MM / YYYY')).toHaveLength(4);
    expect(screen.getByDisplayValue('16 / 12 / 1995')).toBeInTheDocument();
    expect(screen.getByDisplayValue('17 / 12 / 1995')).toBeInTheDocument();
    expect(screen.getByDisplayValue('16 / 12 / 1996')).toBeInTheDocument();
    expect(screen.getByDisplayValue('17 / 12 / 1996')).toBeInTheDocument();
    expect(screen.getByText('Desember 1995')).toBeInTheDocument();
    expect(screen.getByText('Januari 1996')).toBeInTheDocument();
  });

  it('updates both date ranges', async () => {
    const initialStartDate = new Date('September 2, 2024 03:24:00');
    const initialEndDate = new Date('September 3, 2024 03:24:00');
    render(
      <TwoDateRangeWrap
        initialEndDate={initialEndDate}
        initialStartDate={initialStartDate}
        localeData={enUS}
      />,
    );

    const startDateButton = screen.getByRole('option', {
      name: /choose wednesday, september 11th, 2024/i,
    });
    await userEvent.click(startDateButton);
    expect(screen.getByDisplayValue('09 / 11 / 2024')).toBeInTheDocument();

    const endDateButton = screen.getByRole('option', {
      name: /choose thursday, september 12th, 2024/i,
    });
    await userEvent.click(endDateButton);
    expect(screen.getByDisplayValue('09 / 12 / 2024')).toBeInTheDocument();

    const dateInputs = screen.getAllByPlaceholderText('MM / DD / YYYY');
    const secondaryStartDateInput = dateInputs.find((input) =>
      input.id.includes('datefield-start-secondary'),
    );
    if (secondaryStartDateInput) await userEvent.click(secondaryStartDateInput);

    const secondaryStartDateButton = screen.getByRole('option', {
      name: /choose tuesday, october 8th, 2024/i,
    });
    await userEvent.click(secondaryStartDateButton);
    expect(screen.getByDisplayValue('10 / 08 / 2024')).toBeInTheDocument();

    const secondaryEndDateButton = screen.getByRole('option', {
      name: /choose wednesday, october 9th, 2024/i,
    });
    await userEvent.click(secondaryEndDateButton);
    expect(screen.getByDisplayValue('10 / 09 / 2024')).toBeInTheDocument();
  });

  it('renders apply and cancel buttons', () => {
    render(
      <DateRange
        dateValue={{ startDate: new Date(), endDate: new Date() }}
        onCancel={() => {}}
        onDateChange={() => {}}
        onDateError={{ startDate: () => {}, endDate: () => {} }}
        onSubmit={() => {}}
      />,
    );
    expect(screen.getByRole('button', { name: /cancel/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /apply/i })).toBeVisible();
  });

  it('not renders apply and cancel buttons if event handlers are not present', () => {
    render(
      <DateRange
        dateValue={{ startDate: new Date(), endDate: new Date() }}
        onDateChange={() => {}}
        onDateError={{ startDate: () => {}, endDate: () => {} }}
      />,
    );
    expect(screen.queryByRole('button', { name: /cancel/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /apply/i })).toBeNull();
  });

  it('add readonly attribute to date inputs if readOnly prop is true', () => {
    const props = {
      dateValue: {
        startDate: new Date('September 2, 2024 03:24:00'),
        endDate: new Date('September 3, 2024 03:24:00'),
      },
      onDateChange: () => {},
      onDateError: { startDate: () => {}, endDate: () => {} },
    };

    const { rerender } = render(<DateRange {...props} />);

    const startDateInput = screen.getByDisplayValue('09 / 02 / 2024');
    const endDateInput = screen.getByDisplayValue('09 / 03 / 2024');

    expect(startDateInput).not.toHaveAttribute('readonly');
    expect(endDateInput).not.toHaveAttribute('readonly');

    rerender(<DateRange {...props} readOnly />);

    expect(startDateInput).toHaveAttribute('readonly');
    expect(endDateInput).toHaveAttribute('readonly');
  });

  it('highlights secondary date range with correct class', () => {
    const initialStartDate = new Date('December 10, 2024 03:24:00');
    const initialEndDate = new Date('December 11, 2024 03:24:00');
    const initialCompStartDate = new Date('December 16, 2024 03:24:00');
    const initialCompEndDate = new Date('December 17, 2024 03:24:00');
    render(
      <TwoDateRangeWrap
        initialCompEndDate={initialCompEndDate}
        initialCompStartDate={initialCompStartDate}
        initialEndDate={initialEndDate}
        initialStartDate={initialStartDate}
        localeData={enUS}
      />,
    );

    const firstDay = screen.getByRole('option', {
      name: /choose monday, december 16th, 2024/i,
    });
    const secondDay = screen.getByRole('option', {
      name: /choose tuesday, december 17th, 2024/i,
    });
    expect(firstDay).toHaveClass('react-datepicker__day--in-range-secondary');
    expect(secondDay).toHaveClass('react-datepicker__day--in-range-secondary');
  });
});
