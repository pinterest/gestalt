import { Fragment } from 'react';
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
  range,
  tickFormatter,
  labelMap,
  tickCount,
}: {
  isHorizontalLayout: boolean;
  isHorizontalBiaxialLayout: boolean;
  isVerticalLayout: boolean;
  isVerticalBiaxialLayout: boolean;
  isTimeSeries: boolean;
  range:
    | [
        number | 'auto' | 'dataMin' | 'dataMax' | ((arg1: number) => number),
        number | 'auto' | 'dataMin' | 'dataMax' | ((arg1: number) => number),
      ]
    | {
        xAxisBottom?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg1: number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg1: number) => number),
        ];
        xAxisTop?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg1: number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg1: number) => number),
        ];
        yAxisLeft?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg1: number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg1: number) => number),
        ];
        yAxisRight?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg1: number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg1: number) => number),
        ];
      };
  tickFormatter?: {
    timeseries?: (arg1: number) => string | number;
    xAxisTop?: (arg1: number, arg2: number) => string | number;
    xAxisBottom?: (arg1: number, arg2: number) => string | number;
    yAxisRight?: (arg1: number, arg2: number) => string | number;
    yAxisLeft?: (arg1: number, arg2: number) => string | number;
  };
  labelMap?: {
    [key: string]: string;
  };
  tickCount: 5 | 3;
}) {
  const FONT_STYLE_CATEGORIES = {
    fontSize: TOKEN_FONT_SIZE_100,
    fontFamily: TOKEN_FONT_FAMILY_DEFAULT_LATIN,
    fontWeight: TOKEN_FONT_WEIGHT_NORMAL,
  } as const;

  const FONT_STYLE_VALUES = {
    color: TOKEN_COLOR_TEXT_SUBTLE,
    fontSize: TOKEN_FONT_SIZE_100,
    fontFamily: TOKEN_FONT_FAMILY_DEFAULT_LATIN,
    fontWeight: TOKEN_FONT_WEIGHT_NORMAL,
  } as const;

  const isRtl = typeof document === 'undefined' ? false : document?.dir === 'rtl';

  return (
    <Fragment>
      {isHorizontalLayout && (
        <Fragment>
          {/* @ts-expect-error - TS2769 - No overload matches this call. */}
          <XAxis
            axisLine={false}
            dataKey="name"
            domain={isTimeSeries ? !Array.isArray(range) && range?.xAxisBottom : undefined}
            interval={0}
            orientation="bottom"
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
          {/* @ts-expect-error - TS2769 - No overload matches this call. */}
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
        // @ts-expect-error - TS2769 - No overload matches this call.
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
          {/* @ts-expect-error - TS2769 - No overload matches this call. */}
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
            // @ts-expect-error - TS2322
            style={FONT_STYLE_CATEGORIES}
            tickFormatter={(value: string) => labelMap?.[value] || value}
            tickLine={false}
            type="category"
            // DO NOT SET yAxisId here
          />
        </Fragment>
      )}
      {isVerticalBiaxialLayout && (
        // @ts-expect-error - TS2769 - No overload matches this call.
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
