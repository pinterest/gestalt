import { ReactNode } from 'react';
import { Bar as RechartsBar, LabelList, Line as RechartsLine, Rectangle } from 'recharts';
import BarLabel from './BarLabel';
import renderGraphPoint from './renderGraphPoint';
import { DataVisualizationColors } from './types';

const colorMap = {
  '0': '01',
  '1': '02',
  '2': '03',
  '3': '04',
  '4': '05',
  '5': '06',
  '6': '07',
  '7': '08',
  '8': '09',
  '9': '10',
  '10': '11',
  '11': '12',
} as const;

type Props = {
  stacked: boolean | null | undefined;
  elements: ReadonlyArray<{
    type: 'line' | 'bar';
    axis?: 'left' | 'right' | 'bottom' | 'top';
    id: string;
    color?:
      | '01'
      | '02'
      | '03'
      | '04'
      | '05'
      | '06'
      | '07'
      | '08'
      | '09'
      | '10'
      | '11'
      | '12'
      | 'neutral';
    precision?: 'exact' | 'estimate';
  }>;
  layout: 'horizontal' | 'vertical' | 'horizontalBiaxial' | 'verticalBiaxial';
  hexColor: (arg1: DataVisualizationColors) => string;
  visualPatternSelected: 'visualPattern' | 'default' | 'disabled';
  isHorizontalLayout: boolean;
  isBarRounded: boolean;
  isDarkMode: boolean;
  renderLabel?:
    | 'auto'
    | 'none'
    | ((arg1: {
        x: number;
        y: number;
        value: string;
        width: number;
        height: number;
        name: string;
        index: number;
      }) => ReactNode);
};

export default function renderElements({
  elements = [],
  layout,
  stacked,
  hexColor,
  visualPatternSelected,
  isHorizontalLayout,
  isBarRounded,
  isDarkMode,
  renderLabel,
}: Props): ReadonlyArray<ReactNode> {
  const { length } = elements;
  const lastElementPos = length > 1 ? length - 1 : 1;
  const squaredRadius: [number, number, number, number] = [0, 0, 0, 0];
  const roundedRadius: [number, number, number, number] = ['vertical', 'verticalBiaxial'].includes(
    layout,
  )
    ? [0, 4, 4, 0]
    : [4, 4, 0, 0];

  return elements.map((values, idx) => {
    // @ts-expect-error - TS7053
    const defaultColor = colorMap[idx];
    const isBarElement = values.type === 'bar';
    const isLineElement = values.type === 'line';

    const opacityValue = isDarkMode ? 0.6 : 0.4;

    const renderCustomizedLabel = ({
      x,
      y,
      width,
      value,
      height,
      name,
      index,
    }: {
      x: number;
      y: number;
      value: string;
      width: number;
      height: number;
      name: string;
      index: number;
    }) =>
      renderLabel !== 'none' &&
      renderLabel !== 'auto' &&
      renderLabel?.({ x, y, width, value, height, name, index });

    const renderDefaultLabel = (props: {
      x: number;
      y: number;
      value: string;
      width: number;
      height: number;
    }) => (
      <BarLabel
        height={props.height}
        layout={isHorizontalLayout ? 'vertical' : 'horizontal'}
        value={props.value}
        width={props.width}
        x={props.x}
        y={props.y}
      />
    );

    // Recharts doesn't recognize wrappers on their components, therefore, needs to be build within ChartGraph
    if (isBarElement) {
      return (
        <RechartsBar
          key={values.id}
          barSize="50%"
          dataKey={values.id}
          fill={
            visualPatternSelected === 'visualPattern'
              ? `url(#pattern-${values.color || defaultColor})`
              : hexColor(values.color || defaultColor)
          }
          isAnimationActive={false}
          // @ts-expect-error - TS2769 - No overload matches this call.
          // eslint-disable-next-line react/no-unstable-nested-components
          shape={({ height, ...props }) => (
            <Rectangle
              {...props}
              height={stacked && idx !== 0 && height > 0 ? height - 2 : height}
              opacity={props.payload.opacity === 0.4 ? opacityValue : undefined}
              radius={
                (lastElementPos !== idx && stacked) || !isBarRounded ? squaredRadius : roundedRadius
              }
            />
          )}
          stackId={stacked ? 'stacked' : undefined}
          {...(isHorizontalLayout
            ? { yAxisId: values.axis || 'left' }
            : { xAxisId: values.axis || 'bottom' })}
          stroke={hexColor(values.color || defaultColor)}
        >
          {renderLabel === 'none' ? undefined : (
            <LabelList
              // @ts-expect-error - TS2769
              content={renderLabel === 'auto' ? renderDefaultLabel : renderCustomizedLabel}
              dataKey={values.id}
              position={isHorizontalLayout ? 'top' : 'right'}
            />
          )}
        </RechartsBar>
      );
    }

    // Recharts doesn't recognize wrappers on their components, therefore, needs to be build within ChartGraph
    if (isLineElement) {
      let strokeDasharray: string | number;

      if (visualPatternSelected === 'visualPattern' && values.precision !== 'estimate') {
        strokeDasharray = 0; // '0' is necessary to communicate in the payload
      }
      if (values.precision === 'estimate') {
        strokeDasharray = '8 8';
      }

      const graphPoint = renderGraphPoint({
        color: values.color || defaultColor,
        active: false,
      });

      return (
        <RechartsLine
          key={values.id}
          activeDot={false}
          dataKey={values.id}
          // @ts-expect-error - TS2769
          dot={visualPatternSelected === 'visualPattern' ? graphPoint : false}
          isAnimationActive={false}
          legendType="line"
          stroke={hexColor(values.color || defaultColor)}
          // @ts-expect-error - TS2454
          strokeDasharray={strokeDasharray}
          strokeWidth={values.precision === 'estimate' ? 2 : 3}
          type={values.precision === 'estimate' ? 'monotone' : undefined}
          {...(isHorizontalLayout
            ? { yAxisId: values.axis || 'left' }
            : { xAxisId: values.axis || 'bottom' })}
        />
      );
    }

    return null;
  });
}
