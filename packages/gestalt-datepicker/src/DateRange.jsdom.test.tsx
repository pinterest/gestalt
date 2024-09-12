import { ComponentProps, useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { id, Locale } from 'date-fns/locale';
import DateRange from './DateRange';

function DateRangeWrap({
  initialStartDate,
  initialEndDate,
  localeData,
  onEndDateChange,
  onStartDateChange,
}: {
  initialStartDate?: Date;
  initialEndDate?: Date;
  localeData?: Locale;
  onEndDateChange?: ComponentProps<typeof DateRange>['onEndDateChange'];
  onStartDateChange?: ComponentProps<typeof DateRange>['onStartDateChange'];
}) {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate ?? null);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate ?? null);

  return (
    <DateRange
      endDateValue={endDate}
      localeData={localeData}
      onCancel={() => {}}
      onEndDateChange={({ value }: any) => {
        onEndDateChange?.({ value });
        setEndDate(value);
      }}
      onEndDateError={() => {}}
      onStartDateChange={({ value }: any) => {
        onStartDateChange?.({ value });
        setStartDate(value);
      }}
      onStartDateError={() => {}}
      onSubmit={() => {}}
      startDateValue={startDate}
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
    const onEndDateChangeMock = jest.fn<
      [
        {
          value: Date | null;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const onStartDateChangeMock = jest.fn<
      [
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
        onEndDateChange={onEndDateChangeMock}
        onStartDateChange={onStartDateChangeMock}
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

    expect(onStartDateChangeMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ value: selectedStartDate }),
    );

    expect(onStartDateChangeMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ value: selectedStartDate }),
    );

    expect(onEndDateChangeMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ value: null }),
    );

    expect(onEndDateChangeMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ value: selectedEndDate }),
    );
  });
});
