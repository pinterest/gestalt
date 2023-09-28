// @flow strict-local
import { useDefaultLabel } from 'gestalt';

export type TransformedTabularDataType = $ReadOnlyArray<{|
  series: string,
  xAxis: number | string,
  yAxis: number,
|}>;

type UseBuildCsvDataProps = ({|
  transformedTabularData: TransformedTabularDataType,
  isHorizontalLayout: boolean,
|}) => string;

export const useBuildCsvData: UseBuildCsvDataProps = ({
  transformedTabularData,
  isHorizontalLayout,
}) => {
  const { tableSeriesText, tableXAxisText, tableYAxisText } = useDefaultLabel('ChartGraph');

  return `${tableSeriesText},${isHorizontalLayout ? tableXAxisText : tableYAxisText},${
    isHorizontalLayout ? tableYAxisText : tableXAxisText
  }\n${transformedTabularData
    .map((x) => Object.values(x))
    .map((e) => e.join(','))
    .join('\n')}`;
};

type ElementType = {| series: string, xAxis: string, yAxis: string |};

const getCompareFn = ({
  filterId,
  filterOrder,
}: {|
  filterId: null | 'series' | 'x' | 'y',
  filterOrder: 'desc' | 'asc',
|}) =>
  function compareXDesc(a: ElementType, b: ElementType) {
    let aValue = a.xAxis;
    let bValue = b.xAxis;

    if (filterId === 'y') {
      aValue = a.yAxis;
      bValue = b.yAxis;
    }

    if (filterId === 'series') {
      aValue = a.series;
      bValue = b.series;
    }

    if (filterOrder === 'desc' ? aValue < bValue : aValue > bValue) {
      return -1;
    }
    if (filterOrder === 'desc' ? aValue > bValue : aValue < bValue) {
      return 1;
    }
    // a must be equal to b
    return 0;
  };

type UseTabularDataProps = ({|
  data: $ReadOnlyArray<{|
    name: string | number,
    [string]: number,
  |}>,
  filterId: null | 'series' | 'x' | 'y',
  filterOrder: 'desc' | 'asc',
  tickFormatter?: {|
    timeseries?: (number) => string | number,
    xAxisTop?: (number, number) => string | number,
    xAxisBottom?: (number, number) => string | number,
    yAxisRight?: (number, number) => string | number,
    yAxisLeft?: (number, number) => string | number,
  |},
  labelMap?: {| [string]: string |},
  isHorizontalLayout: boolean,
|}) => TransformedTabularDataType;

const useTabularData: UseTabularDataProps = ({
  data,
  filterId,
  filterOrder,
  labelMap,
  tickFormatter,
  isHorizontalLayout,
}) => {
  const transformedTabularData = data
    // $FlowFixMe[incompatible-call] We can't reconcile this
    .reduce(
      (
        accumulator: $ReadOnlyArray<TransformedTabularDataType>,
        currentValue: {|
          name: string | number,
          [string]: number,
        |},
      ) => {
        const { name } = currentValue;

        const newValues = Object.entries(currentValue)
          .map((x) => {
            if (x[0] === 'name') {
              return {};
            }
            return {
              series: labelMap ? labelMap[x[0]] : x[0],
              xAxis: labelMap && typeof name === 'string' ? labelMap[name] : name,
              yAxis: x[1],
            };
          })
          .filter((x) => !!x.series);

        return [...accumulator, newValues];
      },
      [],
    )
    .flat();

  const sortedData = transformedTabularData.sort(getCompareFn({ filterId, filterOrder }));

  const localizedData = sortedData.map((item) => {
    const newObj = { ...item };
    if (tickFormatter?.timeseries && isHorizontalLayout) {
      newObj.xAxis = tickFormatter.timeseries(item.xAxis);
    }
    if (tickFormatter?.timeseries && !isHorizontalLayout) {
      newObj.yAxis = tickFormatter.timeseries(item.yAxis);
    }
    return newObj;
  });

  return localizedData;
};

export default useTabularData;
