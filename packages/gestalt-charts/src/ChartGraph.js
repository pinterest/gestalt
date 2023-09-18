// @flow strict-local
import { Fragment, type Node, useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box, Flex, TileData, useColorScheme, useDefaultLabel } from 'gestalt';
import { ChartProvider } from './ChartGraph/ChartGraphContext.js';
import EmptyBox from './ChartGraph/EmptyBox.js';
import Header from './ChartGraph/Header.js';
import LegendIcon from './ChartGraph/LegendIcon.js';
import renderElements from './ChartGraph/renderElements.js';
import renderReferenceAreas from './ChartGraph/renderReferenceAreas.js';
import useCustomTooltip from './ChartGraph/useCustomTooltip.js';
import useDefaultLegend from './ChartGraph/useDefaultLegend.js';
import useDefaultTooltip from './ChartGraph/useDefaultTooltip.js';
import usePatterns, { useHexColor } from './ChartGraph/usePatterns.js';

type Props = {|
  // REQUIRED
  /**
   * Label to provide more context around ChartGraph’s content.
   * See the [accessibility guidelines on ARIA attributes](https://gestalt.pinterest.systems/web/chartgraph#ARIA-attributes) to learn more.
   */
  accessibilityLabel: string,
  /**
   * The source data, in which each element is an object. Each object must specify a "name" associated to each category (string value) or timestamp (numberic value) in time series charts.
   * The additional key-values represent one or more series of data presented on ChartGraph for each category or timestamp. A sequence of source data objects generate one or more series of data across categories or timestamps.
   * See the [controlled component variant](https://gestalt.pinterest.systems/web/chartgraph#Controlled-component) to learn more about implementing the `data` prop.
   */
  data: $ReadOnlyArray<{|
    name: string | number,
    [string]: number,
  |}>,
  /**
   * The series elements, bars or lines, of the ChartGraph. See the [color variant](https://gestalt.pinterest.systems/web/chartgraph#Layout), [precision variant](https://gestalt.pinterest.systems/web/chartgraph#Precision), and [layout] to learn more about configuring bars and lines.
   */
  elements: $ReadOnlyArray<{|
    type: 'line' | 'bar',
    axis?: 'left' | 'right' | 'bottom' | 'top',
    id: string,
    color?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12',
    precision?: 'exact' | 'estimate',
  |}>,
  /**
   * Callback fired when the Accessibility IconButton in ChartGraph is clicked. ChartGraph's visual patterns is a controlled feature. `onVisualPatternChange` is used to enable/disable visual patterns in ChartGraph.
   * See the [accessibility guidelines on visual patterns](https://gestalt.pinterest.systems/web/chartgraph#Visual-patterns) to learn more.
   */
  onVisualPatternChange: () => void,
  /**
   * ChartGraph's visual patterns is a controlled feature. `visualPatternSelected` manages visual patterns in ChartGraph. When ChartGraph represents a standalone data series that don't require comparison, the Accessibility IconButton can be hidden with "disabled".
   * See the [accessibility guidelines on visual patterns](https://gestalt.pinterest.systems/web/chartgraph#Visual-patterns) to learn more.
   */
  visualPatternSelected: 'disabled' | 'default' | 'accessible',
  // OPTIONAL
  /**
   * Description of ChartGraph. Be sure to localize the text.
   * See the [title variant](https://gestalt.pinterest.systems/web/chartgraph#Title-and-description) to learn more.
   */
  description?: string,
  /**
   * The start and end values of the axis.
   */
  range?:
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
   * Replaces the labels from `data` in default tooltips, legends, and axis. Use for lacalization.
   * See the [localizations section](https://gestalt.pinterest.systems/web/chartgraph#Localization) to learn more.
   */
  labelMap?: {| [string]: string |},
  /**
   * Sets the horizontal or vertical layout of bars and lines and the single or double axis in the chart.
   * See the [layout variant](https://gestalt.pinterest.systems/web/chartgraph#Layout) to learn more.
   */
  layout?: 'horizontal' | 'vertical' | 'horizontalBiaxial' | 'verticalBiaxial',
  /**
   * Displays data about the datasets that are appearing on the chart.
   * See the [legend variant](https://gestalt.pinterest.systems/web/chartgraph#Legend) to learn more.
   */
  legend?: 'auto' | 'none' | 'complete',
  /**
   * Sets non-data visual areas in ChartGraph.
   * See the [reference area variant](https://gestalt.pinterest.systems/web/chartgraph#ReferenceArea) to learn more.
   */
  referenceAreas?: $ReadOnlyArray<{|
    id: string,
    label: string,
    x1: string | number,
    x2: string | number,
    y1: string | number,
    y2: string | number,
    yAxisId: string,
    style?: 'default',
  |}>,
  /**
   * Displays data about the datasets on hover over each data point.
   * See the [tooltip variant](https://gestalt.pinterest.systems/web/chartgraph#Tooltip) to learn more.
   */
  renderTooltip?:
    | 'auto'
    | 'none'
    | (({| active: ?boolean, payload: ?{ ... }, label: string | number |}) => Node),
  /**
   * When set to "true", bars are stacked.
   * See the [grouped and stacked bars variant](https://gestalt.pinterest.systems/web/chartgraph#Grouped-and-Stacked-bars) to learn more.
   */
  stacked?: boolean,
  /**
   * Title of ChartGraph. Be sure to localize the text.
   * See the [title variant](https://gestalt.pinterest.systems/web/chartgraph#Title-and-description) to learn more.
   */
  title?: string,
  /**
   * ChartGraph is responsive. If your ChartGraph's width is below the 576 px breakpoint, ChartGraph will flick and correct the amount of ticks. To prevent that, set initialTicks to 3. ChartGraph above 576 px, don't require this adjusment.
   */
  initialTicks?: 'auto' | 3,
  /**
   * The formatter function for ticks on time series. It should only be used to set date format on time series ticks.
   * See the [timeseries variant](https://gestalt.pinterest.systems/web/chartgraph#Time-series) and the [tick formatter variant](https://gestalt.pinterest.systems/web/chartgraph#Tick-format) to learn more.
   *
   * timeseries: When set to "true", ChartGraph presents data points graphed in time order.
   * See the [timeseries variant](https://gestalt.pinterest.systems/web/chartgraph#Time-series) to learn more.
   */
  tickFormatter?: {|
    timeseries?: (number) => string | number,
    xAxisTop?: (number, number) => string | number,
    xAxisBottom?: (number, number) => string | number,
    yAxisRight?: (number, number) => string | number,
    yAxisLeft?: (number, number) => string | number,
  |},
  /**
   * Open slot for TileData. See the [TileData variant](https://gestalt.pinterest.systems/web/chartgraph#TileData) to learn more.

   */
  tileData?: $ReadOnlyArray<{|
    color?: $ElementType<React$ElementConfig<typeof TileData>, 'color'>,
    disabled?: $ElementType<React$ElementConfig<typeof TileData>, 'disabled'>,
    id?: $ElementType<React$ElementConfig<typeof TileData>, 'id'>,
    onTap?: $ElementType<React$ElementConfig<typeof TileData>, 'onTap'>,
    selected?: $ElementType<React$ElementConfig<typeof TileData>, 'selected'>,
    showCheckbox?: $ElementType<React$ElementConfig<typeof TileData>, 'showCheckbox'>,
    tooltip?: $ElementType<React$ElementConfig<typeof TileData>, 'tooltip'>,
    title: $ElementType<React$ElementConfig<typeof TileData>, 'title'>,
    trend?: $ElementType<React$ElementConfig<typeof TileData>, 'trend'>,
    trendSentiment?: $ElementType<React$ElementConfig<typeof TileData>, 'trendSentiment'>,
    value: $ElementType<React$ElementConfig<typeof TileData>, 'value'>,
  |}>,
  /**
   * Type of chart.
   * See the [types variant](https://gestalt.pinterest.systems/web/chartgraph#Types) to learn more.
   */
  type?: 'combo' | 'line' | 'bar',
|};

/**
 * [ChartGraph](https://gestalt.pinterest.systems/web/chartgraph) is used for displaying various types of graphs plotted on an x and y axis. It makes it easier to identify and understand patterns over time across different categories, enabling people to make informed decisions quickly.
 * ![ChartGraph light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ChartGraph.spec.mjs-snapshots/ChartGraph-chromium-darwin.png)
 * ![ChartGraph dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ChartGraph-dark.spec.mjs-snapshots/ChartGraph-dark-chromium-darwin.png)
 */
function ChartGraph({
  accessibilityLabel,
  visualPatternSelected,
  data,
  description,
  initialTicks = 'auto',
  range = [0, 'auto'],
  elements,
  layout: externalLayout = 'vertical',
  labelMap,
  legend = 'auto',
  onVisualPatternChange,
  stacked,
  tickFormatter,
  tileData,
  title,
  type = 'combo',
  referenceAreas = [],
  renderTooltip = 'auto',
}: Props): Node {
  // CONTANTS
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

  const SMALL_BREAKPOINT = 576;
  const TICK_SPACE = 48;

  const LAYOUT_MAP = {
    'horizontal': 'vertical',
    'vertical': 'horizontal',
    'horizontalBiaxial': 'verticalBiaxial',
    'verticalBiaxial': 'horizontalBiaxial',
  };

  // STATE
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);

  // We need to know the legend height, because the ResponsiveContainer includes the legend within the provided height
  const [legendHeight, setLegendHeight] = useState(legend === 'none' ? 0 : 20);
  const [internalHeight, setInternalHeight] = useState(0);

  // HOOKS
  const hexColor = useHexColor();
  const patterns = usePatterns();
  const { name: colorSchemeName } = useColorScheme();
  const { accessibilityLabelPrefixText } = useDefaultLabel('ChartGraph');

  // ASSERTIONS
  const isDarkMode = colorSchemeName === 'darkMode';

  // This is needed to keep the layout in sync with Recharts where vertical/horizontal is inversed to our ChartGraph API.
  // Internally we match Recharts for easier development and comoprehension of Recharts docs
  const layout = LAYOUT_MAP[externalLayout];

  const isVertical = ['vertical', 'verticalBiaxial'].includes(layout);
  const isHorizontal = ['horizontal', 'horizontalBiaxial'].includes(layout);
  const isVerticalBiaxial = layout === 'verticalBiaxial';
  const isHorizontalBiaxial = layout === 'horizontalBiaxial';

  const isBar = type === 'bar';
  const isLine = type === 'line';
  const isComposed = type === 'combo';
  const isTimeSeries = tickFormatter?.timeseries !== undefined;

  const threeTicksDimension = 3 * TICK_SPACE;
  const fiveTicksDimension = 5 * TICK_SPACE;

  // We need a "true" to initialize with 5 ticks except when initialTicks === 3, then we need 3 ticks.
  const initializer = initialTicks === 'auto';
  // If chartWidth ===  0, we want to use the initial values to prevent chart fickering when width is calculated
  const isAboveBreakpoint = chartWidth ? chartWidth >= SMALL_BREAKPOINT : initializer;
  const fixChartDimension = isAboveBreakpoint ? fiveTicksDimension : threeTicksDimension;

  const tickCount = isAboveBreakpoint ? 5 : 3;
  const horizontalMargin = isHorizontalBiaxial ? 20 : 10;
  const verticalMargin = 5;

  // This is a rough estimate of when bars get to thin to be rounded. It's impossible to calculate from the bar component itself as we cannot  access the ref or use wrappers on Recharts component.
  const individualBarWidthEstimate =
    (isHorizontal ? chartWidth : chartHeight - legendHeight) / (2 * data.length) / elements.length -
    (isHorizontal ? horizontalMargin : verticalMargin);

  useEffect(() => {
    const responsiveHeight = isHorizontal ? fixChartDimension + legendHeight : fiveTicksDimension;
    setInternalHeight(responsiveHeight);
  }, [fixChartDimension, legendHeight, fiveTicksDimension, isHorizontal]);

  // CONDITIONAL VARIABLES
  let legendVerticalAlign = 'bottom';
  let legendAlign = 'left';

  if (isVerticalBiaxial && legend === 'auto') {
    legendVerticalAlign = 'top';
    legendAlign = 'right';
  }

  let ChartType = ComposedChart;

  if (isBar) {
    ChartType = BarChart;
  }
  if (isLine) {
    ChartType = LineChart;
  }
  // SUBCOMPONENTS
  const chartElements = useMemo(
    () =>
      renderElements({
        elements,
        stacked,
        hexColor,
        layout,
        visualPatternSelected,
        isHorizontal,
        // Interim true, until we have number
        isBarRounded:
          Math.sign(individualBarWidthEstimate) === -1 ? true : individualBarWidthEstimate > 10,
      }),
    [
      elements,
      hexColor,
      stacked,
      layout,
      visualPatternSelected,
      isHorizontal,
      individualBarWidthEstimate,
    ],
  );

  const referenceAreasElements = useMemo(
    () => renderReferenceAreas({ referenceAreas }),
    [referenceAreas],
  );

  const referenceAreaSummary = referenceAreas
    ? referenceAreas.map(({ label, style }) => ({
        label,
        style,
      }))
    : null;

  const customTooltip = useCustomTooltip({
    isDarkMode,
    renderTooltip,
  });

  const defaultTooltip = useDefaultTooltip({ isDarkMode, labelMap, tickFormatter, isTimeSeries });

  const defaultLegend = useDefaultLegend({
    isHorizontalBiaxial,
    isVerticalBiaxial,
    height: chartHeight,
    legend,
    labelMap,
    setLegendHeight,
    referenceAreaSummary,
  });

  return (
    <ChartProvider decal={visualPatternSelected}>
      <Box
        width={isHorizontal ? '100%' : undefined}
        display="flex"
        direction="column"
        color="default"
        padding={4}
      >
        {visualPatternSelected !== 'disabled' || title ? (
          <Header
            readyToRender={chartWidth > 0}
            title={title}
            description={description}
            onVisualPatternChange={onVisualPatternChange}
            visualPatternSelected={visualPatternSelected}
          />
        ) : null}
        {tileData ? (
          <Box marginBottom={4}>
            <Flex gap={2}>
              {tileData.map((tile) => (
                <TileData
                  key={tile.id}
                  id={tile.id}
                  title={tile.title}
                  value={tile.value}
                  selected={tile.selected}
                  onTap={tile.onTap}
                  trend={tile.trend}
                  disabled={tile.disabled}
                  showCheckbox={tile.showCheckbox}
                  tooltip={tile.tooltip}
                  trendSentiment={tile.trendSentiment}
                />
              ))}
            </Flex>
          </Box>
        ) : null}
        <div className="_gestalt" style={{ width: '100%', height: '100%', maxWidth: 960 }}>
          <ResponsiveContainer
            debounce={150}
            onResize={(width, height) => {
              setChartHeight(height);
              setChartWidth(width);
            }}
            minWidth="100%"
            width="100%"
            minHeight={internalHeight}
            height={internalHeight}
          >
            <ChartType
              title={`${accessibilityLabelPrefixText}. ${accessibilityLabel}`}
              {...(isBar || isComposed ? { barCategoryGap: '25%' } : {})}
              data={data}
              layout={isVertical ? 'vertical' : 'horizontal'}
              margin={{
                top: 10,
                right: 5,
                bottom: isVerticalBiaxial && legend === 'auto' ? 20 : 10,
                left: 5,
              }}
            >
              {patterns}
              <CartesianGrid
                stroke="var(--color-border-container)"
                horizontal={isVertical ? false : undefined}
                vertical={isVertical ? undefined : false}
              />
              {isHorizontal ? (
                <Fragment>
                  <XAxis
                    padding={
                      isTimeSeries && (isBar || isComposed) ? { left: 100, right: 100 } : undefined
                    }
                    axisLine={false}
                    dataKey="name"
                    domain={isTimeSeries ? !Array.isArray(range) && range?.xAxisBottom : undefined}
                    orientation="bottom"
                    {...(isTimeSeries ? { scale: 'time' } : {})}
                    style={FONT_STYLE_CATEGORIES}
                    tickFormatter={
                      isTimeSeries
                        ? tickFormatter?.xAxisBottom || tickFormatter?.timeseries
                        : (value: string) => labelMap?.[value] || value
                    }
                    tickLine={false}
                    type={isTimeSeries ? 'number' : 'category'}
                    // DO NOT SET xAxisId here
                  />
                  <YAxis
                    axisLine={false}
                    domain={Array.isArray(range) ? range : range.yAxisLeft}
                    orientation="left"
                    style={FONT_STYLE_VALUES}
                    tickLine={false}
                    tickCount={tickCount}
                    yAxisId="left"
                    tickFormatter={tickFormatter?.yAxisLeft}
                  />
                </Fragment>
              ) : null}
              {isHorizontalBiaxial ? (
                <YAxis
                  axisLine={false}
                  domain={Array.isArray(range) ? range : range.yAxisLeft}
                  orientation="right"
                  style={FONT_STYLE_VALUES}
                  tickLine={false}
                  tickCount={tickCount}
                  yAxisId="right"
                  tickFormatter={tickFormatter?.yAxisRight}
                />
              ) : null}
              {isVertical ? (
                <Fragment>
                  <XAxis
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
                    orientation="left"
                    tickFormatter={(value: string) => labelMap?.[value] || value}
                    // DO NOT SET yAxisId here
                  />
                </Fragment>
              ) : null}
              {isVerticalBiaxial ? (
                <XAxis
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
              ) : null}
              {renderTooltip === 'none' ? (
                <Tooltip isAnimationActive={false} content={<EmptyBox />} />
              ) : (
                <Tooltip
                  cursor={{ fill: 'rgba(0, 0, 0, var(--opacity-100))' }}
                  isAnimationActive={false}
                  content={renderTooltip === 'auto' ? defaultTooltip : customTooltip}
                />
              )}
              <Legend
                verticalAlign={legendVerticalAlign}
                align={legendAlign}
                iconSize={16}
                iconType="square"
                content={legend === 'auto' ? defaultLegend : <EmptyBox />}
              />
              {referenceAreas ? referenceAreasElements : null}
              {chartElements}
            </ChartType>
          </ResponsiveContainer>
        </div>
      </Box>
    </ChartProvider>
  );
}

ChartGraph.LegendIcon = LegendIcon;

export default ChartGraph;
