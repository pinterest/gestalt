import React = require('react');

/**
 * =========================================================
 * ====================== GESTALT PACKAGE DEPENDENCIES =====================
 * =========================================================
 */

/**
 * =========================================================
 * ====================== SHARED UTILS =====================
 * =========================================================
 */

type Node = React.ReactNode;

type AbstractEventHandler<T extends React.SyntheticEvent<HTMLElement> | Event, U = {}> = (
  arg: U & {
    readonly event: T;
  },
) => void;

type ReactForwardRef<T, P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

/**
 * =========================================================
 * ====================== SHARED TYPED =====================
 * =========================================================
 */

/**
 * =========================================================
 * =============== COMPONENT API INTERFACES  ===============
 * =========================================================
 */

export interface ChartGraphProps {
  accessibilityLabel: string;
  data: ReadonlyArray<{ [k: string | number]: number | undefined }>; // TO BE FIXED
  elements: ReadonlyArray<{
    type: 'line' | 'bar';
    axis?: 'left' | 'right' | 'bottom' | 'top';
    id: string;
    color?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
    precision?: 'exact' | 'estimate';
  }>;
  onVisualPatternChange: () => void;
  visualPatternSelected: 'disabled' | 'default' | 'visualPattern';
  description?: string;
  initialTicks?: 'auto' | 3;
  layout?: 'horizontal' | 'vertical' | 'horizontalBiaxial' | 'verticalBiaxial';
  labelMap?: { [k: string]: string };
  legend?: 'auto' | 'none';
  range?:
    | [
        number | 'auto' | 'dataMin' | 'dataMax' | ((arg0: number) => number),
        number | 'auto' | 'dataMin' | 'dataMax' | ((arg0: number) => number),
      ]
    | {
        xAxisBottom?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg0: number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg0: number) => number),
        ];
        xAxisTop?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg0: number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg0: number) => number),
        ];

        yAxisLeft?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg0: number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg0: number) => number),
        ];

        yAxisRight?: [
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg0: number) => number),
          number | 'auto' | 'dataMin' | 'dataMax' | ((arg0: number) => number),
        ];
      };
  referenceAreas?: ReadonlyArray<{
    id: string;
    label: string;
    x1: string | number;
    x2: string | number;
    y1: string | number;
    y2: string | number;
    yAxisId: string;
    style?: 'default';
  }>;
  renderTooltip?:
    | 'auto'
    | 'none'
    | ((args: {
        active: boolean | undefined;
        payload?: { [propName: string]: any };
        label: string | number;
      }) => Node);
  selectors?:
    | {
        selector: 'TileData';
        data: ReadonlyArray<{
          [propName: string]: any // TO BE FIXED
        }>;
      }
    | {
        selector: 'TagData';
        data: ReadonlyArray<{
          [propName: string]: any // TO BE FIXED
        }>;
      };
  stacked?: boolean;
  tickFormatter?: {
    timeseries?: (arg0: number) => string | number;
    xAxisTop?: (arg0: number, arg1: number) => string | number;
    xAxisBottom?: (arg0: number, arg1: number) => string | number;
    yAxisRight?: (arg0: number, arg1: number) => string | number;
    yAxisLeft?: (arg0: number, arg1: number) => string | number;
  };
  title?: string;
  type?: 'combo' | 'line' | 'bar';
}

/**
 * =========================================================
 * ========================= INDEX =========================
 * =========================================================
 */

/**
 * https://gestalt.pinterest.systems/web/daterange
 */
export let ChartGraph: React.FunctionComponent<ChartGraphProps>;
