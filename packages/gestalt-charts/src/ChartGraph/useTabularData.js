// @flow strict-local

const getCompareFn = ({
  filterId,
  filterOrder,
}: {|
  filterId: null | 'series' | 'x' | 'y',
  filterOrder: 'desc' | 'asc',
|}) => {
  if (filterId === 'x' && filterOrder === 'desc') {
    return function compareXDesc(a, b) {
      if (a.xAxis < b.xAxis) {
        return -1;
      }
      if (a.xAxis > b.xAxis) {
        return 1;
      }
      // a must be equal to b
      return 0;
    };
  }

  if (filterId === 'x' && filterOrder === 'asc') {
    return function compareXDesc(a, b) {
      if (a.xAxis > b.xAxis) {
        return -1;
      }
      if (a.xAxis < b.xAxis) {
        return 1;
      }
      // a must be equal to b
      return 0;
    };
  }

  if (filterId === 'y' && filterOrder === 'desc') {
    return function compareXDesc(a, b) {
      if (a.yAxis < b.yAxis) {
        return -1;
      }
      if (a.yAxis > b.yAxis) {
        return 1;
      }
      // a must be equal to b
      return 0;
    };
  }

  if (filterId === 'y' && filterOrder === 'asc') {
    return function compareXDesc(a, b) {
      if (a.yAxis > b.yAxis) {
        return -1;
      }
      if (a.yAxis < b.yAxis) {
        return 1;
      }
      // a must be equal to b
      return 0;
    };
  }

  if (filterId === 'series' && filterOrder === 'desc') {
    return function compareXDesc(a, b) {
      if (a.series < b.series) {
        return -1;
      }
      if (a.series > b.series) {
        return 1;
      }
      // a must be equal to b
      return 0;
    };
  }

  if (filterId === 'series' && filterOrder === 'asc') {
    return function compareXDesc(a, b) {
      if (a.series > b.series) {
        return -1;
      }
      if (a.series < b.series) {
        return 1;
      }
      // a must be equal to b
      return 0;
    };
  }

  return () => {};
};

export default function useTabularData({
  data,
  filterId,
  filterOrder,
  labelMap,
  tickFormatter,
  isHorizontalLayout,
}: {|
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
|}): $ReadOnlyArray<{|
  series: number | string,
  xAxis: number | string,
  yAxis: number | string,
|}> {
  const tabularData = data
    .reduce(
      (
        accumulator: $ReadOnlyArray<
          $ReadOnlyArray<{|
            series: number | string,
            xAxis: number | string,
            yAxis: number | string,
          |}>,
        >,
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

            // return { series: x[0], xAxis: name, yAxis: x[1] };
          })
          .filter((x) => !!x.series);

        return [...accumulator, newValues];
      },
      [],
    )
    .flat();

  const sortedData = tabularData.sort(getCompareFn({ filterId, filterOrder }));

  const translated = sortedData.map((item) => {
    const newObj = { ...item };
    if (tickFormatter?.timeseries && isHorizontalLayout) {
      newObj.xAxis = tickFormatter.timeseries(item.xAxis);
    }
    if (tickFormatter?.timeseries && !isHorizontalLayout) {
      newObj.yAxis = tickFormatter.timeseries(item.yAxis);
    }
    return newObj;
  });

  return translated;
}
