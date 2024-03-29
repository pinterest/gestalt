// @flow strict-local
import { Fragment, type Node as ReactNode } from 'react';
import { XAxis, YAxis } from 'recharts';
import {
  TOKEN_COLOR_TEXT_SUBTLE,
  TOKEN_FONT_FAMILY_DEFAULT_LATIN,
  TOKEN_FONT_SIZE_100,
  TOKEN_FONT_WEIGHT_NORMAL,
} from 'gestalt-design-tokens';

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
}): ReactNode {
  const FONT_STYLE_CATEGORIES = {
    fontSize: TOKEN_FONT_SIZE_100,
    fontFamily: TOKEN_FONT_FAMILY_DEFAULT_LATIN,
    fontWeight: TOKEN_FONT_WEIGHT_NORMAL,
  };

  const FONT_STYLE_VALUES = {
    color: TOKEN_COLOR_TEXT_SUBTLE,
    fontSize: TOKEN_FONT_SIZE_100,
    fontFamily: TOKEN_FONT_FAMILY_DEFAULT_LATIN,
    fontWeight: TOKEN_FONT_WEIGHT_NORMAL,
  };

  const isRtl = document?.dir === 'rtl';

  return (
    <Fragment>
      {isHorizontalLayout && (
        <Fragment>
          <XAxis
            axisLine={false}
            dataKey="name"
            domain={isTimeSeries ? !Array.isArray(range) && range?.xAxisBottom : undefined}
            orientation="bottom"
            padding={isTimeSeries && (isBar || isCombo) ? { left: 100, right: 100 } : undefined}
            reversed={isRtl}
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
            tickCount={tickCount}
            tickFormatter={tickFormatter?.yAxisLeft}
            tickLine={false}
            yAxisId="left"
          />
        </Fragment>
      )}
      {isHorizontalBiaxialLayout && (
        <YAxis
          axisLine={false}
          domain={Array.isArray(range) ? range : range?.yAxisLeft}
          orientation={isRtl ? 'left' : 'right'}
          style={FONT_STYLE_VALUES}
          tickCount={tickCount}
          tickFormatter={tickFormatter?.yAxisRight}
          tickLine={false}
          yAxisId="right"
        />
      )}
      {isVerticalLayout && (
        <Fragment>
          <XAxis
            axisLine={false}
            domain={range}
            orientation="bottom"
            reversed={isRtl}
            style={FONT_STYLE_VALUES}
            tickCount={tickCount}
            tickFormatter={tickFormatter?.xAxisBottom}
            tickLine={false}
            type="number"
            xAxisId="bottom"
          />
          <YAxis
            axisLine={false}
            dataKey="name"
            orientation={isRtl ? 'right' : 'left'}
            style={FONT_STYLE_CATEGORIES}
            tickFormatter={(value: string) => labelMap?.[value] || value}
            tickLine={false}
            type="category"
            // DO NOT SET yAxisId here
          />
        </Fragment>
      )}
      {isVerticalBiaxialLayout && (
        <XAxis
          axisLine={false}
          domain={range}
          orientation="top"
          reversed={isRtl}
          style={FONT_STYLE_VALUES}
          tickCount={tickCount}
          tickFormatter={tickFormatter?.xAxisTop}
          tickLine={false}
          type="number"
          xAxisId="top"
        />
      )}
    </Fragment>
  );
}
