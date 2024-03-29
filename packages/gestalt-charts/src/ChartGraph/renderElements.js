// @flow strict-local
import { type Node as ReactNode } from 'react';
import { Bar as RechartsBar, Line as RechartsLine, Rectangle } from 'recharts';
import renderGraphPoint from './renderGraphPoint';
import { type DataVisualizationColors } from './types';

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
};

type Props = {
  stacked: ?boolean,
  elements: $ReadOnlyArray<{
    type: 'line' | 'bar',
    axis?: 'left' | 'right' | 'bottom' | 'top',
    id: string,
    color?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12',
    precision?: 'exact' | 'estimate',
  }>,
  layout: 'horizontal' | 'vertical' | 'horizontalBiaxial' | 'verticalBiaxial',
  hexColor: (DataVisualizationColors) => string,
  visualPatternSelected: 'visualPattern' | 'default' | 'disabled',
  isHorizontalLayout: boolean,
  isBarRounded: boolean,
};

export default function renderElements({
  elements = [],
  layout,
  stacked,
  hexColor,
  visualPatternSelected,
  isHorizontalLayout,
  isBarRounded,
}: Props): $ReadOnlyArray<ReactNode> {
  const { length } = elements;
  const lastElementPos = length > 1 ? length - 1 : 1;
  const squaredRadius = [0, 0, 0, 0];
  const roundedRadius = ['vertical', 'verticalBiaxial'].includes(layout)
    ? [0, 4, 4, 0]
    : [4, 4, 0, 0];

  return elements.map((values, index) => {
    const defaultColor = colorMap[index];
    const isBarElement = values.type === 'bar';
    const isLineElement = values.type === 'line';

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
          // eslint-disable-next-line react/no-unstable-nested-components
          shape={({ height, ...props }) => (
            <Rectangle
              {...props}
              height={stacked && index !== 0 && height > 0 ? height - 2 : height}
              radius={
                (lastElementPos !== index && stacked) || !isBarRounded
                  ? squaredRadius
                  : roundedRadius
              }
            />
          )}
          stackId={stacked ? 'stacked' : undefined}
          {...(isHorizontalLayout
            ? { yAxisId: values.axis || 'left' }
            : { xAxisId: values.axis || 'bottom' })}
          stroke={hexColor(values.color || defaultColor)}
        />
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
          dot={visualPatternSelected === 'visualPattern' ? graphPoint : false}
          isAnimationActive={false}
          legendType="line"
          stroke={hexColor(values.color || defaultColor)}
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
