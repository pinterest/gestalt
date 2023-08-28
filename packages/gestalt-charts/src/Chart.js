// @flow strict-local
import { Fragment, type Node, useId, useState } from 'react';
import {
  Bar as RechartsBar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line as RechartsLine,
  LineChart,
  ReferenceArea as RechartsReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box, Flex, Label, Switch, Text, useColorScheme } from 'gestalt';
import Marker from './Chart/Marker.js';
import { type DataVisualizationColors } from './Chart/types.js';
import usePatterns from './Chart/usePatterns.js';

type Props = {|
  /**
   * Prop description.
   */
  biaxial?: 'yAxis' | 'xAxis',
  /**
   * Prop description.
   */
  elements: $ReadOnlyArray<{|
    type: 'line' | 'bar',
    axis: 'xAxisBottom' | 'xAxisTop' | 'yAxisLeft' | 'yAxisRight',
    id: string,
    color: DataVisualizationColors,
    stackedId?: string,
  |}>,
  /**
   * Prop description.
   */
  domain?:
    | [
        number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
        number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
      ]
    | {|
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
      |},
  /**
   * Prop description.
   */
  type?: 'composed' | 'line' | 'bar',
  /**
   * Prop description.
   */
  height?: number | string,
  /**
   * Prop description.
   */
  width?: number | string,
  /**
   * Prop description.
   */
  data: $ReadOnlyArray<{|
    name: string,
    [string]: number,
  |}>,
  /**
   * Prop description.
   */
  layout?: 'horizontal' | 'vertical',
  /**
   * Prop description.
   */
  referenceAreas?: $ReadOnlyArray<{|
    id: string,
    isFront: boolean,
    x1: string,
    x2: string,
    y1: number,
    y2: number,
    yAxisId: string,
    stroke: string,
    strokeOpacity: number,
  |}>,
  /**
   * Prop description.
   */
  renderTooltip?: ({| active: ?boolean, payload: ?{ ... }, label: ?string |}) => Node,
  /**
   * Prop description.
   */
  xAxisLabel: string | {| top: string, bottom: string |},
  /**
   * Prop description.
   */
  yAxisLabel: string | {| left: string, right: string |},
|};

/**
 * [Chart](https://gestalt.pinterest.systems/web/chart) component should be used for ... on the page.
 * ![Chart light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Chart.spec.mjs-snapshots/Chart-chromium-darwin.png)
 * ![Chart dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Chart-dark.spec.mjs-snapshots/Chart-dark-chromium-darwin.png)
 */
function Chart({
  biaxial,
  domain = [0, 'auto'],
  layout = 'horizontal',
  type = 'composed',
  height = 400,
  width = '100%',
  data,
  referenceAreas = [],
  elements,
  renderTooltip,
  xAxisLabel,
  yAxisLabel,
}: Props): Node {
  const [decalPattern, setDecalPattern] = useState(false);

  const id = useId();

  const theme = useColorScheme();

  const hexColor = (vizColor: DataVisualizationColors) =>
    theme[`colorDataVisualization${vizColor}`];

  const patterns = usePatterns();

  // eslint-disable-next-line react/no-unstable-nested-components
  function CustomTooltip({
    active,
    payload,
    label,
  }: {|
    active: boolean,
    payload: { ... },
    label: string,
  |}) {
    return (
      <Box maxWidth={300} padding={4} borderStyle="shadow" color="default" rounding={4}>
        {renderTooltip?.({ active, payload, label })}
      </Box>
    );
  }

  const isBar = type === 'bar';
  const isLine = type === 'line';
  const isVertical = layout === 'vertical';
  const isHorizontal = layout === 'horizontal';

  let ChartType = ComposedChart;

  if (isBar) {
    ChartType = BarChart;
  }

  if (isLine) {
    ChartType = LineChart;
  }

  const chartElements = elements.map((values) => {
    const isBarElement = values.type === 'bar';
    const isLineElement = values.type === 'line';

    // Recharts doesn't recognize wrappers on their components
    if (isBarElement) {
      return (
        <RechartsBar
          barSize={20}
          dataKey={values.id}
          fill={decalPattern ? `url(#pattern-${values.color})` : hexColor(values.color)}
          isAnimationActive={false}
          key={values.id}
          stackId={values.stackedId}
          {...(values.axis.startsWith('xAxis')
            ? { xAxisId: values.axis.slice(5).toLowerCase() }
            : { yAxisId: values.axis.slice(5).toLowerCase() })}
        />
      );
    }

    if (isLineElement) {
      return (
        <RechartsLine
          dataKey={values.id}
          isAnimationActive={false}
          key={values.id}
          stroke={hexColor(values.color)}
          {...(values.axis.startsWith('xAxis')
            ? { xAxisId: values.axis.slice(5).toLowerCase() }
            : { yAxisId: values.axis.slice(5).toLowerCase() })}
        />
      );
    }

    return null;
  });

  const referenceAreasElements: $ReadOnlyArray<Node> = referenceAreas.map((values) => (
    // Recharts doesn't recognize wrappers on their components
    <RechartsReferenceArea
      key={values.id}
      isFront={values.isFront}
      x1={values.x1}
      x2={values.x2}
      y1={values.y1}
      y2={values.y2}
      yAxisId={values.yAxisId}
      stroke={values.stroke}
      strokeOpacity={values.strokeOpacity}
    />
  ));

  return (
    <Flex direction="column" gap={2}>
      <Flex alignItems="center" gap={2}>
        <Label htmlFor={id}>
          <Text size="200">Decal pattern</Text>
        </Label>
        <Switch
          id={id}
          onChange={() => setDecalPattern((currVal) => !currVal)}
          switched={decalPattern}
        />
      </Flex>
      <div className="_gestalt">
        <ResponsiveContainer width={width} height={height}>
          <ChartType
            accessibilityLayer={isHorizontal}
            data={data}
            layout={isVertical ? 'vertical' : 'horizontal'}
            margin={
              isVertical
                ? {
                    top: 20,
                    bottom: 20,
                  }
                : {}
            }
          >
            {patterns}
            <CartesianGrid stroke="#f5f5f5" />

            {isHorizontal ? (
              <Fragment>
                <XAxis
                  dataKey="name"
                  label={
                    xAxisLabel?.bottom || xAxisLabel
                      ? {
                          value: xAxisLabel?.bottom ? xAxisLabel?.bottom : xAxisLabel,
                          position: 'insideBottomLeft',
                          offset: -5,
                        }
                      : undefined
                  }
                  orientation="bottom"
                  scale="auto"
                  type="category"
                  xAxisId="bottom"
                />
                <YAxis
                  domain={Array.isArray(domain) ? domain : domain.yAxisLeft}
                  label={
                    yAxisLabel?.left || yAxisLabel
                      ? {
                          value: yAxisLabel?.left ? yAxisLabel.left : yAxisLabel,
                          angle: -90,
                          position: 'insideLeft',
                        }
                      : undefined
                  }
                  orientation="left"
                  scale="auto"
                  type="number"
                  yAxisId="left"
                />
              </Fragment>
            ) : null}
            {isVertical ? (
              <Fragment>
                <XAxis
                  domain={Array.isArray(domain) ? domain : domain.xAxisBottom}
                  label={
                    xAxisLabel?.bottom || xAxisLabel
                      ? {
                          value: xAxisLabel?.bottom ? xAxisLabel.bottom : xAxisLabel,
                          position: 'insideBottomLeft',
                          offset: -5,
                        }
                      : undefined
                  }
                  orientation="bottom"
                  scale="auto"
                  type="number"
                  xAxisId="bottom"
                />
                <YAxis
                  dataKey="name"
                  label={
                    yAxisLabel?.left || yAxisLabel
                      ? {
                          value: yAxisLabel?.left ? yAxisLabel.left : yAxisLabel,
                          angle: -90,
                          position: 'insideLeft',
                        }
                      : undefined
                  }
                  orientation="left"
                  scale="band"
                  type="category"
                  yAxisId="left"
                />
              </Fragment>
            ) : null}
            {isHorizontal && biaxial === 'yAxis' ? (
              <YAxis
                label={
                  yAxisLabel?.right || yAxisLabel
                    ? {
                        value: yAxisLabel?.right ? yAxisLabel.right : yAxisLabel,
                        angle: -90,
                        position: 'insideRight',
                      }
                    : undefined
                }
                domain={Array.isArray(domain) ? domain : domain.yAxisRight}
                orientation="right"
                scale="auto"
                type="category"
                yAxisId="right"
              />
            ) : null}
            {isVertical && biaxial === 'xAxis' ? (
              <XAxis
                label={
                  xAxisLabel?.top || yAxisLabel
                    ? {
                        value: xAxisLabel?.top ? xAxisLabel?.top : xAxisLabel,
                        position: 'insideTop',
                      }
                    : undefined
                }
                domain={Array.isArray(domain) ? domain : domain.xAxisTop}
                orientation="top"
                scale="auto"
                type="number"
                xAxisId="top"
              />
            ) : null}

            {/*  $FlowFixMe[prop-missing]  */}
            <Tooltip content={<CustomTooltip />} />
            <Legend
              align="end"
              iconSize={16}
              iconType="square"
              margin={{ top: 50, left: 0, right: 0, bottom: 0 }}
            />
            {referenceAreas ? referenceAreasElements : null}
            {chartElements}
          </ChartType>
        </ResponsiveContainer>
      </div>
    </Flex>
  );
}

Chart.Marker = Marker;

export default Chart;
