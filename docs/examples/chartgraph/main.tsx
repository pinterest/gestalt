import { FixedZIndex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const data = [
    {
      'name': 0,
      'totalSpend': 483.031257,
      'formattedDate': 'Mar 4',
      'formattedDateShort': 'Mar 4, 12:00 AM (UTC)',
      'date': '2025-03-04T00:00:00.000Z',
      'showIntervalOnXAxis': true,
      'totalSpendFormatted': '$483',
    },
    {
      'name': 1,
      'totalSpend': 512.685398,
      'formattedDate': '1:00 AM',
      'formattedDateShort': 'Mar 4, 1:00 AM (UTC)',
      'date': '2025-03-04T01:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$513',
    },
    {
      'name': 2,
      'totalSpend': 600.981313,
      'formattedDate': '2:00 AM',
      'formattedDateShort': 'Mar 4, 2:00 AM (UTC)',
      'date': '2025-03-04T02:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$601',
    },
    {
      'name': 3,
      'totalSpend': 547.214005,
      'formattedDate': '3:00 AM',
      'formattedDateShort': 'Mar 4, 3:00 AM (UTC)',
      'date': '2025-03-04T03:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$547',
    },
    {
      'name': 4,
      'totalSpend': 489.703595,
      'formattedDate': '4:00 AM',
      'formattedDateShort': 'Mar 4, 4:00 AM (UTC)',
      'date': '2025-03-04T04:00:00.000Z',
      'showIntervalOnXAxis': true,
      'totalSpendFormatted': '$490',
    },
    {
      'name': 5,
      'totalSpend': 420.505765,
      'formattedDate': '5:00 AM',
      'formattedDateShort': 'Mar 4, 5:00 AM (UTC)',
      'date': '2025-03-04T05:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$421',
    },
    {
      'name': 6,
      'totalSpend': 288.634428,
      'formattedDate': '6:00 AM',
      'formattedDateShort': 'Mar 4, 6:00 AM (UTC)',
      'date': '2025-03-04T06:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$289',
    },
    {
      'name': 7,
      'totalSpend': 189.011683,
      'formattedDate': '7:00 AM',
      'formattedDateShort': 'Mar 4, 7:00 AM (UTC)',
      'date': '2025-03-04T07:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$189',
    },
    {
      'name': 8,
      'totalSpend': 121.201872,
      'formattedDate': '8:00 AM',
      'formattedDateShort': 'Mar 4, 8:00 AM (UTC)',
      'date': '2025-03-04T08:00:00.000Z',
      'showIntervalOnXAxis': true,
      'totalSpendFormatted': '$121',
    },
    {
      'name': 9,
      'totalSpend': 103.858721,
      'formattedDate': '9:00 AM',
      'formattedDateShort': 'Mar 4, 9:00 AM (UTC)',
      'date': '2025-03-04T09:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$104',
    },
    {
      'name': 10,
      'totalSpend': 115.262585,
      'formattedDate': '10:00 AM',
      'formattedDateShort': 'Mar 4, 10:00 AM (UTC)',
      'date': '2025-03-04T10:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$115',
    },
    {
      'name': 11,
      'totalSpend': 182.740537,
      'formattedDate': '11:00 AM',
      'formattedDateShort': 'Mar 4, 11:00 AM (UTC)',
      'date': '2025-03-04T11:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$183',
    },
    {
      'name': 12,
      'totalSpend': 284.727574,
      'formattedDate': '12:00 PM',
      'formattedDateShort': 'Mar 4, 12:00 PM (UTC)',
      'date': '2025-03-04T12:00:00.000Z',
      'showIntervalOnXAxis': true,
      'totalSpendFormatted': '$285',
    },
    {
      'name': 13,
      'totalSpend': 336.484758,
      'formattedDate': '1:00 PM',
      'formattedDateShort': 'Mar 4, 1:00 PM (UTC)',
      'date': '2025-03-04T13:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$336',
    },
    {
      'name': 14,
      'totalSpend': 394.073601,
      'formattedDate': '2:00 PM',
      'formattedDateShort': 'Mar 4, 2:00 PM (UTC)',
      'date': '2025-03-04T14:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$394',
    },
    {
      'name': 15,
      'totalSpend': 453.56102,
      'formattedDate': '3:00 PM',
      'formattedDateShort': 'Mar 4, 3:00 PM (UTC)',
      'date': '2025-03-04T15:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$454',
    },
    {
      'name': 16,
      'totalSpend': 418.084545,
      'formattedDate': '4:00 PM',
      'formattedDateShort': 'Mar 4, 4:00 PM (UTC)',
      'date': '2025-03-04T16:00:00.000Z',
      'showIntervalOnXAxis': true,
      'totalSpendFormatted': '$418',
    },
    {
      'name': 17,
      'totalSpend': 454.60126,
      'formattedDate': '5:00 PM',
      'formattedDateShort': 'Mar 4, 5:00 PM (UTC)',
      'date': '2025-03-04T17:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$455',
    },
    {
      'name': 18,
      'totalSpend': 460.926791,
      'formattedDate': '6:00 PM',
      'formattedDateShort': 'Mar 4, 6:00 PM (UTC)',
      'date': '2025-03-04T18:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$461',
    },
    {
      'name': 19,
      'totalSpend': 504.717764,
      'formattedDate': '7:00 PM',
      'formattedDateShort': 'Mar 4, 7:00 PM (UTC)',
      'date': '2025-03-04T19:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$505',
    },
    {
      'name': 20,
      'totalSpend': 704.432954,
      'formattedDate': '8:00 PM',
      'formattedDateShort': 'Mar 4, 8:00 PM (UTC)',
      'date': '2025-03-04T20:00:00.000Z',
      'showIntervalOnXAxis': true,
      'totalSpendFormatted': '$704',
    },
    {
      'name': 21,
      'totalSpend': 811.798855,
      'formattedDate': '9:00 PM',
      'formattedDateShort': 'Mar 4, 9:00 PM (UTC)',
      'date': '2025-03-04T21:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$812',
    },
    {
      'name': 22,
      'totalSpend': 846.303174,
      'formattedDate': '10:00 PM',
      'formattedDateShort': 'Mar 4, 10:00 PM (UTC)',
      'date': '2025-03-04T22:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$846',
    },
    {
      'name': 23,
      'totalSpend': 826.89691,
      'formattedDate': '11:00 PM',
      'formattedDateShort': 'Mar 4, 11:00 PM (UTC)',
      'date': '2025-03-04T23:00:00.000Z',
      'showIntervalOnXAxis': false,
      'totalSpendFormatted': '$827',
    },
  ];

  const chartData = data.map(({ name, totalSpend }) => ({ name, totalSpend }));

  const axisData = {};

  data.forEach(({ name, totalSpend, formattedDate, showIntervalOnXAxis }) => {
    axisData[name] = { totalSpend, formattedDate, showIntervalOnXAxis };
  });

  return (
    <ChartGraph
      accessibilityLabel="Clicks compared to conversions (example)"
      data={chartData}
      elements={[{ type: 'line', id: 'totalSpend', axis: 'left' }]}
      layout="vertical"
      modalZIndex={new FixedZIndex(11)}
      onVisualPatternChange={() => {}}
      range={{
        xAxisBottom: ['auto', 'auto'],
      }}
      tickFormatter={{
        timeseries: (idx) => idx,
        xAxisBottom: (idx) => axisData[idx].showIntervalOnXAxis ? axisData[idx].formattedDate : "",
      }}
      title="Clicks compared to conversions"
      type="line"
      visualPatternSelected="disabled"
    />
  );
}
