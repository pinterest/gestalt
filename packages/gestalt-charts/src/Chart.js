// @flow strict-local
import { Children, type Node, useId, useState } from 'react';
import {
  Bar as RechartsBar,
  BarChart,
  CartesianGrid,
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
import Bar from './Chart/Bar.js';
import Line from './Chart/Line.js';
import { type DataVisualizationColors } from './Chart/types.js';
import usePatterns from './Chart/usePatterns.js';

type Props = {|
  biaxial?: boolean,
  type: 'line' | 'bar',
  /**
   * Prop description.
   */
  children: Node,
  height?: number | string,
  width?: number | string,
  data: $ReadOnlyArray<{|
    name: string,
    [string]: number,
  |}>,
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
  renderTooltip?: ({| active: ?boolean, payload: ?{ ... }, label: ?string |}) => Node,
|};

/**
 * [Chart](https://gestalt.pinterest.systems/web/chart) component should be used for ... on the page.
 * ![Chart light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Chart.spec.mjs-snapshots/Chart-chromium-darwin.png)
 * ![Chart dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Chart-dark.spec.mjs-snapshots/Chart-dark-chromium-darwin.png)
 */
function Chart({
  biaxial = false,
  children,
  type = 'bar',
  height = 400,
  width = '100%',
  data,
  referenceAreas = [],
  renderTooltip,
}: Props): Node {
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
  const ChartType = type === 'line' ? LineChart : BarChart;
  const [decalPattern, setDecalPattern] = useState(false);
  const id = useId();
  const theme = useColorScheme();
  const hexColor = (vizColor: DataVisualizationColors) =>
    theme[`colorDataVisualization${vizColor}`];
  const patterns = usePatterns();

  // $FlowFixMe
  const chartElements = Children.toArray<Node>(children).map((child: any) => {
    const isBar = child.type.name === 'Bar';
    const isLine = child.type.name === 'Line';

    if (isBar) {
      return (
        <RechartsBar
          key={child.props.id}
          yAxisId={child.props.yAxis}
          dataKey={child.props.id}
          barSize={20}
          fill={decalPattern ? `url(#pattern-${child.props.color})` : hexColor(child.props.color)}
        />
      );
    }

    if (isLine) {
      return (
        <RechartsLine
          key={child.props.id}
          yAxisId={child.props.yAxis}
          dataKey={child.props.id}
          stroke={hexColor(child.props.color)}
        />
      );
    }

    return null;
  });

  const referenceAreasElements: $ReadOnlyArray<Node> = referenceAreas.map((values) => (
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
          <ChartType accessibilityLayer data={data}>
            {patterns}
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            {biaxial ? <YAxis yAxisId="right" orientation="right" /> : null}
            {/*  $FlowFixMe[prop-missing]  */}
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {referenceAreas ? referenceAreasElements : null}
            {chartElements}
          </ChartType>
        </ResponsiveContainer>
      </div>
    </Flex>
  );
}

Chart.Bar = Bar;
Chart.Line = Line;

export default Chart;
