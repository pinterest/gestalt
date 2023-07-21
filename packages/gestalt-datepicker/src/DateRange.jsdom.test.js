// @flow strict-local
import { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { id } from 'date-fns/locale';
import DateRange from './DateRange.js';

function DateRangeWrap({
  initialStartDate,
  initialEndDate,
  localeData,
  onEndDateChange,
  onStartDateChange,
}: {|
  initialStartDate?: Date,
  initialEndDate?: Date,
  localeData?: $ElementType<React$ElementConfig<typeof DateRange>, 'localeData'>,
  onEndDateChange?: $ElementType<React$ElementConfig<typeof DateRange>, 'onEndDateChange'>,
  onStartDateChange?: $ElementType<React$ElementConfig<typeof DateRange>, 'onStartDateChange'>,
|}) {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate ?? null);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate ?? null);

  return (
    <DateRange
      endDateValue={endDate}
      localeData={localeData}
      onCancel={() => {}}
      onEndDateChange={({ value }) => {
        onEndDateChange?.({ value });
        setEndDate(value);
      }}
      onEndDateError={() => {}}
      onStartDateChange={({ value }) => {
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
        initialStartDate={new Date('December 16, 1995 03:24:00')}
        initialEndDate={new Date('December 17, 1995 03:24:00')}
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
        initialStartDate={new Date('December 16, 1995 03:24:00')}
        initialEndDate={new Date('December 17, 1995 03:24:00')}
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
        initialStartDate={new Date('December 16, 1995 03:24:00')}
        initialEndDate={new Date('December 17, 1995 03:24:00')}
      />,
    );

    expect(screen.getAllByPlaceholderText('MM / DD / YYYY')).toHaveLength(2);
    expect(screen.getByDisplayValue('12 / 16 / 1995')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12 / 17 / 1995')).toBeInTheDocument();

    const startSelectedDay = screen.getAllByText('13')[0];

    // eslint-disable-next-line testing-library/no-unnecessary-act -- We have to wrap the focus event in `act` since it does change the component's internal state
    await act(async () => {
      fireEvent.click(startSelectedDay);
    });

    expect(screen.getByDisplayValue('12 / 13 / 1995')).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();

    const endSelectedDay = screen.getAllByText('13')[1];

    // eslint-disable-next-line testing-library/no-unnecessary-act -- We have to wrap the focus event in `act` since it does change the component's internal state
    await act(async () => {
      fireEvent.click(endSelectedDay);
    });

    expect(screen.getByDisplayValue('12 / 13 / 1995')).toBeInTheDocument();
    expect(screen.getByDisplayValue('01 / 13 / 1996')).toBeInTheDocument();
  });

  it('handles events correctly', async () => {
    const onEndDateChangeMock = jest.fn<
      [
        {|
          value: Date | null,
        |},
      ],
      void,
    >();
    const onStartDateChangeMock = jest.fn<
      [
        {|
          value: Date | null,
        |},
      ],
      void,
    >();

    const initialStartDate = new Date('December 16, 1995 03:24:00');
    const initialEndDate = new Date('December 17, 1995 03:24:00');
    const selectedStartDate = new Date('December 13, 1995 03:24:00');
    const selectedEndDate = new Date('January 13, 1996 03:24:00');

    render(
      <DateRangeWrap
        initialStartDate={initialStartDate}
        initialEndDate={initialEndDate}
        onEndDateChange={onEndDateChangeMock}
        onStartDateChange={onStartDateChangeMock}
      />,
    );

    const startSelectedDay = screen.getAllByText('13')[0];

    // eslint-disable-next-line testing-library/no-unnecessary-act -- We have to wrap the focus event in `act` since it does change the component's internal state
    await act(async () => {
      fireEvent.click(startSelectedDay);
    });

    const endSelectedDay = screen.getAllByText('13')[1];

    // eslint-disable-next-line testing-library/no-unnecessary-act -- We have to wrap the focus event in `act` since it does change the component's internal state
    await act(async () => {
      fireEvent.click(endSelectedDay);
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
