// @flow strict-local
import { Fragment, type Node } from 'react';
import { XAxis, YAxis } from 'recharts';

export default function renderAxis({
  isHorizontalLayout,
  isHorizontalBiaxialLayout,
  isVerticalLayout,
  isTimeSeries,
  isVerticalBiaxialLayout,
  isBar,
  isCombo,
  range,
  tickFormatter,
  labelMap,
  tickCount,
}: {
  isHorizontalLayout: boolean,
  isHorizontalBiaxialLayout: boolean,
  isVerticalLayout: boolean,
  isVerticalBiaxialLayout: boolean,
  isTimeSeries: boolean,
  isBar: boolean,
  isCombo: boolean,
  range:
    | [
        number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
        number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
      ]
    | {
        xAxisBottom?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
        ],
        xAxisTop?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
        ],

        yAxisLeft?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
        ],

        yAxisRight?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
        ],
      },
  tickFormatter?: {
    timeseries?: (number) => string | number,
    xAxisTop?: (number, number) => string | number,
    xAxisBottom?: (number, number) => string | number,
    yAxisRight?: (number, number) => string | number,
    yAxisLeft?: (number, number) => string | number,
  },
  labelMap?: { [string]: string },
  tickCount: 5 | 3,
}): Node {
  const FONT_STYLE_CATEGORIES = {
    fontSize: 'var(--font-size-100)',
    fontFamily: 'var(--font-family-default-latin)',
    fontWeight: 'var(--font-weight-normal)',
  };

  const FONT_STYLE_VALUES = {
    color: 'var(--color-text-subtle)',
    fontSize: 'var(--font-size-100)',
    fontFamily: 'var(--font-family-default-latin)',
    fontWeight: 'var(--font-weight-normal)',
  };

  const isRtl = document?.dir === 'rtl';

  return (
    <Fragment>
      {isHorizontalLayout && (
        <Fragment>
          <XAxis
            reversed={isRtl}
            padding={isTimeSeries && (isBar || isCombo) ? { left: 100, right: 100 } : undefined}
            axisLine={false}
            dataKey="name"
            domain={isTimeSeries ? !Array.isArray(range) && range?.xAxisBottom : undefined}
            orientation="bottom"
            scale={isTimeSeries ? 'time' : undefined}
            style={FONT_STYLE_CATEGORIES}
            tickFormatter={
              isTimeSeries
                ? tickFormatter?.xAxisBottom || tickFormatter?.timeseries
                : (value: string) => labelMap?.[value] || value
            }
            tickLine={false}
            type={isTimeSeries ? 'number' : 'category'}
            // DO NOT SET xAxisId here (it breaks the component, opaque behavior from Recharts)
          />
          <YAxis
            axisLine={false}
            domain={Array.isArray(range) ? range : range?.yAxisLeft}
            orientation={isRtl ? 'right' : 'left'}
            style={FONT_STYLE_VALUES}
            tickLine={false}
            tickCount={tickCount}
            yAxisId="left"
            tickFormatter={tickFormatter?.yAxisLeft}
          />
        </Fragment>
      )}
      {isHorizontalBiaxialLayout && (
        <YAxis
          axisLine={false}
          domain={Array.isArray(range) ? range : range?.yAxisLeft}
          orientation={isRtl ? 'left' : 'right'}
          style={FONT_STYLE_VALUES}
          tickLine={false}
          tickCount={tickCount}
          yAxisId="right"
          tickFormatter={tickFormatter?.yAxisRight}
        />
      )}
      {isVerticalLayout && (
        <Fragment>
          <XAxis
            reversed={isRtl}
            axisLine={false}
            domain={range}
            type="number"
            orientation="bottom"
            style={FONT_STYLE_VALUES}
            tickLine={false}
            tickCount={tickCount}
            xAxisId="bottom"
            tickFormatter={tickFormatter?.xAxisBottom}
          />
          <YAxis
            axisLine={false}
            dataKey="name"
            type="category"
            style={FONT_STYLE_CATEGORIES}
            tickLine={false}
            orientation={isRtl ? 'right' : 'left'}
            tickFormatter={(value: string) => labelMap?.[value] || value}
            // DO NOT SET yAxisId here
          />
        </Fragment>
      )}
      {isVerticalBiaxialLayout && (
        <XAxis
          reversed={isRtl}
          axisLine={false}
          domain={range}
          orientation="top"
          style={FONT_STYLE_VALUES}
          tickLine={false}
          tickCount={tickCount}
          type="number"
          xAxisId="top"
          tickFormatter={tickFormatter?.xAxisTop}
        />
      )}
    </Fragment>
  );
}
