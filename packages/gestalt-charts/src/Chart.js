// @flow strict-local
import { type Node, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box, Flex, Label, Switch, Text, useColorScheme } from 'gestalt';

type DataVisualizationColors =
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
  | '12';

type Props = {|
  biaxial: boolean,
  type: 'line' | 'bar',
  /**
   * Prop description.
   */
  data?: $ReadOnlyArray<{ ... }>,
  renderTooltip: ({| active: ?boolean, payload: ?{ ... }, label: ?string |}) => Node,
|};

/**
 * [Chart](https://gestalt.pinterest.systems/web/chart) component should be used for ... on the page.
 * ![Chart light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Chart.spec.mjs-snapshots/Chart-chromium-darwin.png)
 * ![Chart dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Chart-dark.spec.mjs-snapshots/Chart-dark-chromium-darwin.png)
 */
function Chart({ biaxial, type, data, renderTooltip }: Props): Node {
  const theme = useColorScheme();
  const hexColor = (vizColor: DataVisualizationColors) =>
    theme[`colorDataVisualization${vizColor}`];
  const [switched, setSwitched] = useState(false);

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
        {renderTooltip({ active, payload, label })}
      </Box>
    );
  }

  if (type === 'line') {
    return (
      <Flex direction="column" width="100%" height="100%">
        <Flex alignItems="center" gap={2}>
          <Label htmlFor="introExample">
            <Text>Decal pattern</Text>
          </Label>

          <Switch
            id="introExample"
            onChange={() => setSwitched((currVal) => !currVal)}
            switched={switched}
          />
        </Flex>
        <div style={{ width: '100%', height: '100%' }} className="_gestalt">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart accessibilityLayer width={500} height={400} data={data}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              {biaxial ? <YAxis yAxisId="right" orientation="right" /> : null}
              {/*  $FlowFixMe[prop-missing]  */}
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line yAxisId="left" dataKey="bar1" stroke={hexColor('01')} />
              <Line yAxisId="left" dataKey="bar2" stroke={hexColor('02')} />
              <Line yAxisId={biaxial ? 'right' : 'left'} dataKey="bar3" stroke={hexColor('03')} />
              <ReferenceArea
                isFront
                x1="B"
                x2="E"
                yAxisId="left"
                y1={1000}
                y2={2000}
                stroke="red"
                strokeOpacity={0.3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Flex>
    );
  }
  if (type === 'bar') {
    return (
      <Flex direction="column" width="100%" height="100%">
        <Flex alignItems="center" gap={2}>
          <Label htmlFor="introExample">
            <Text>Decal pattern</Text>
          </Label>

          <Switch
            id="introExample"
            onChange={() => setSwitched((currVal) => !currVal)}
            switched={switched}
          />
        </Flex>
        <div style={{ width: '100%', height: '100%' }} className="_gestalt">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart accessibilityLayer width={500} height={400} data={data}>
              <defs>
                <pattern id="pattern-A" width="10" height="10" patternUnits="userSpaceOnUse">
                  <polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2" fill={hexColor('01')} />
                </pattern>
                <pattern
                  id="pattern-B"
                  width="4"
                  height="4"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <rect width="2" height="4" fill={hexColor('02')} />
                </pattern>
                <pattern
                  id="pattern-C"
                  width="4"
                  height="4"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(135)"
                >
                  <rect width="2" height="4" fill={hexColor('03')} />
                </pattern>
              </defs>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              {biaxial ? <YAxis yAxisId="right" orientation="right" /> : null}
              {/*  $FlowFixMe[prop-missing]  */}
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceArea
                isFront
                x1="A"
                x2="B"
                y1={2400}
                y2={9800}
                yAxisId="left"
                stroke="red"
                strokeOpacity={0.3}
              />
              <Bar
                yAxisId="left"
                dataKey="bar1"
                barSize={20}
                fill={switched ? 'url(#pattern-A)' : hexColor('01')}
              />
              <Bar
                yAxisId="left"
                dataKey="bar2"
                barSize={20}
                fill={switched ? 'url(#pattern-B)' : hexColor('02')}
              />
              <Bar
                yAxisId={biaxial ? 'right' : 'left'}
                dataKey="bar3"
                barSize={20}
                fill={switched ? 'url(#pattern-C)' : hexColor('03')}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Flex>
    );
  }
}

export default Chart;
