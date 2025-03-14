import { ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Box, Flex, useColorScheme, useDefaultLabel } from 'gestalt';
import { TOKEN_COLOR_BORDER_CONTAINER, TOKEN_OPACITY_100 } from 'gestalt-design-tokens';
import BarLabel from './ChartGraph/BarLabel';
import { ChartProvider } from './ChartGraph/ChartGraphContext';
import EmptyBox from './ChartGraph/EmptyBox';
import Header from './ChartGraph/Header';
import LegendIcon from './ChartGraph/LegendIcon';
import renderAxis from './ChartGraph/renderAxis';
import renderElements from './ChartGraph/renderElements';
import renderReferenceAreas from './ChartGraph/renderReferenceAreas';
import TabularDataModal from './ChartGraph/TabularDataModal';
import useCustomTooltip from './ChartGraph/useCustomTooltip';
import useDefaultLegend from './ChartGraph/useDefaultLegend';
import useDefaultTooltip from './ChartGraph/useDefaultTooltip';
import usePatterns, { useHexColor } from './ChartGraph/usePatterns';

interface Indexable {
  index(): number;
}

type Props = {
  // REQUIRED
  /**
   * Label to provide more context around ChartGraph’s content.
   *
   * See the [accessibility guidelines on ARIA attributes](https://gestalt.pinterest.systems/web/chartgraph#ARIA-attributes) to learn more.
   */
  accessibilityLabel: string;
  /**
   * Must be instances of [TagData](https://gestalt.pinterest.systems/web/tagdata) or [TileData](https://gestalt.pinterest.systems/web/tiledata)
   *
   * See the [selector variant](https://gestalt.pinterest.systems/web/chartgraph#Selectors) to learn more.
   */
  children?: ReactNode;
  /**
   * The source data, in which each element is an object. Each object must specify a "name" associated to each category (string value) or timestamp (numberic value) in time series charts.
   *
   * The additional key-values represent one or more series of data presented on ChartGraph for each category or timestamp. A sequence of source data objects generate one or more series of data across categories or timestamps.
   */
  data: ReadonlyArray<{
    // @ts-expect-error - TS2411
    name: string | number;
    // @ts-expect-error - TS2411
    opacity?: 1 | 0.4;
    [key: string]: number;
  }>;
  /**
   * The series elements, bars or lines, of the ChartGraph.
   *
   * See the [combo variants](https://gestalt.pinterest.systems/web/chartgraph#Layout), [color variant](https://gestalt.pinterest.systems/web/chartgraph#Combo), [layout](https://gestalt.pinterest.systems/web/chartgraph#Layout), [color variant](https://gestalt.pinterest.systems/web/chartgraph#Color), [precision in line graphs variant](https://gestalt.pinterest.systems/web/chartgraph#Precision-in-line-graphs) to learn more about configuring bars and lines.
   */
  elements: ReadonlyArray<{
    axis?: 'left' | 'right' | 'bottom' | 'top';
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
    id: string;
    precision?: 'exact' | 'estimate';
    type: 'line' | 'bar';
  }>;
  /**
   * [HelpButton](https://gestalt.pinterest.systems/web/helpbutton) to be placed after the title for to provide supplemental support to the user. See the [header variant](https://gestalt.pinterest.systems/web/chartgraph#Header) to learn more.
   */
  helpButton?: ReactElement;
  /**
   * Callback fired when the Accessibility IconButton in ChartGraph is clicked. ChartGraph's visual patterns is a controlled feature. `onVisualPatternChange` is used to enable/disable visual patterns in ChartGraph.
   *
   * See the [accessibility guidelines on visual patterns](https://gestalt.pinterest.systems/web/chartgraph#Visual-patterns) to learn more.
   */
  onVisualPatternChange: () => void;
  /**
   * ChartGraph's visual patterns is a controlled feature. `visualPatternSelected` manages visual patterns in ChartGraph. When ChartGraph represents a standalone data series that don't require comparison, the Accessibility IconButton can be hidden with "disabled".
   *
   * See the [accessibility guidelines on visual patterns](https://gestalt.pinterest.systems/web/chartgraph#Visual-patterns) to learn more.
   */
  visualPatternSelected: 'disabled' | 'default' | 'visualPattern';
  // OPTIONAL
  /**
   * Description of ChartGraph. Be sure to localize the text.
   *
   * See the [header variant](https://gestalt.pinterest.systems/web/chartgraph#Header) to learn more.
   */
  description?: string;
  /**
   * The start and end values of the axis.
   *
   * See the [range variant](https://gestalt.pinterest.systems/web/chartgraph#Range) to learn more.
   */
  range?:
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
  /**
   * Replaces the labels from `data` in default tooltips, legends, and axis. Use for lacalization.
   *
   * See the [localizations section](https://gestalt.pinterest.systems/web/chartgraph#Localization) to learn more.
   */
  labelMap?: {
    [key: string]: string;
  };
  /**
   * Sets the horizontal or vertical layout of bars and lines and the single or double axis in the chart.
   *
   * See the [layout variant](https://gestalt.pinterest.systems/web/chartgraph#Layout) to learn more.
   */
  layout?: 'horizontal' | 'vertical' | 'horizontalBiaxial' | 'verticalBiaxial';
  /**
   * Displays data about the datasets that are appearing on the chart.
   *
   * See the [legend variant](https://gestalt.pinterest.systems/web/chartgraph#Legend) to learn more.
   */
  legend?: 'auto' | 'none';
  /**
   * Sets non-data visual areas in ChartGraph.
   *
   * See the [reference area variant](https://gestalt.pinterest.systems/web/chartgraph#ReferenceArea) to learn more.
   */
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
  /**
   * Displays a label above the bar.
   *
   * See the [label variant](https://gestalt.pinterest.systems/web/chartgraph#Label) to learn more.
   */
  renderLabel?:
    | 'auto'
    | 'none'
    | ((arg1: { x: number; y: number; value: string; width: number; height: number }) => ReactNode);
  /**
   * Displays data about the datasets on hover over each data point.
   *
   * See the [tooltip variant](https://gestalt.pinterest.systems/web/chartgraph#Tooltip) to learn more.
   */
  renderTooltip?:
    | 'auto'
    | 'none'
    | ((arg1: {
        active: boolean | null | undefined;
        payload: Record<any, any> | null | undefined;
        label: string | number;
      }) => ReactNode);
  /**
   * When set to "true", bars are stacked.
   *
   * See the [stacked bars variant](https://gestalt.pinterest.systems/web/chartgraph#Stacked-bars) to learn more.
   */
  stacked?: boolean;
  /**
   * Title of ChartGraph. Be sure to localize the text.
   *
   * See the [header variant](https://gestalt.pinterest.systems/web/chartgraph#Header) to learn more.
   */
  title: string;
  /**
   * Whether the title should be visible or not. If hidden, the title is still available in the tabular representation modal.
   */
  titleDisplay?: 'visible' | 'hidden';
  /**
   * ChartGraph is responsive. If your ChartGraph's width is below the 576 px breakpoint, ChartGraph will flick and correct the amount of ticks. To prevent that, set initialTicks to 3. ChartGraph above 576 px, don't require this adjusment.
   *
   * See the [color variant](https://gestalt.pinterest.systems/web/chartgraph#Colors) for implementation guidance.
   */
  initialTicks?: 'auto' | 3;
  /**
   * A function for formatting ticks on the axis.
   *
   * Timeseries require the 'timeseries' key for formatting dates in the axis and tooltip. The 'xAxisBottom' overrides 'timeseries' when are both present.
   *
   * See the [tick format variant](https://gestalt.pinterest.systems/web/chartgraph#Tick-format) and [time series variant](https://gestalt.pinterest.systems/web/chartgraph#Time-series) to learn more
   */
  tickFormatter?: {
    timeseries?: (arg1: number) => string | number;
    xAxisTop?: (arg1: number, arg2: number) => string | number;
    xAxisBottom?: (arg1: number, arg2: number) => string | number;
    yAxisRight?: (arg1: number, arg2: number) => string | number;
    yAxisLeft?: (arg1: number, arg2: number) => string | number;
  };
  /**
   * Type of chart.
   * See the [types variant](https://gestalt.pinterest.systems/web/chartgraph#Types) to learn more.
   */
  type?: 'combo' | 'line' | 'bar';
  /**
   * An object representing the zIndex value of the tabular representation modal. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
   */
  modalZIndex?: Indexable;
};

/**
 * [ChartGraph](https://gestalt.pinterest.systems/web/chartgraph) is used for displaying various types of graphs plotted on an x and y axis. It makes it easier to identify and understand patterns over time across different categories, enabling people to make informed decisions quickly.
 * ![ChartGraph light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ChartGraph.spec.ts-snapshots/ChartGraph-chromium-darwin.png)
 * ![ChartGraph dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ChartGraph-dark.spec.ts-snapshots/ChartGraph-dark-chromium-darwin.png)
 */
function ChartGraph({
  accessibilityLabel,
  visualPatternSelected,
  data,
  description,
  initialTicks = 'auto',
  range = [0, 'auto'],
  helpButton,
  elements,
  layout: externalLayout = 'vertical',
  labelMap,
  legend = 'auto',
  modalZIndex,
  onVisualPatternChange,
  stacked,
  tickFormatter,
  children,
  titleDisplay = 'visible',
  title,
  type = 'bar',
  referenceAreas = [],
  renderTooltip = 'auto',
  renderLabel = 'none',
}: Props) {
  // CONSTANTS

  const SMALL_BREAKPOINT = 576;
  const TICK_SPACE = 48;

  const LAYOUT_MAP = {
    horizontal: 'vertical',
    vertical: 'horizontal',
    horizontalBiaxial: 'verticalBiaxial',
    verticalBiaxial: 'horizontalBiaxial',
  } as const;

  // STATE
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);
  const [showTabularDataModal, setShowTabularDataModal] = useState(false);

  // We need to know the legend height, because the ResponsiveContainer includes the legend within the provided height
  const [legendHeight, setLegendHeight] = useState(legend === 'none' ? 0 : 20);
  const [internalHeight, setInternalHeight] = useState(0);

  // HOOKS
  const hexColor = useHexColor();
  const patterns = usePatterns();
  const { colorSchemeName } = useColorScheme();
  const { accessibilityLabelPrefixText } = useDefaultLabel('ChartGraph');

  // ASSERTIONS
  const isDarkMode = colorSchemeName === 'darkMode';

  // This is needed to keep the layout in sync with Recharts where vertical/horizontal is inversed to our ChartGraph API.
  // Internally we match Recharts for easier development and comoprehension of Recharts docs
  const layout = LAYOUT_MAP[externalLayout];

  const isRtl = typeof document === 'undefined' ? false : document?.dir === 'rtl';

  const isVerticalLayout = ['vertical', 'verticalBiaxial'].includes(layout);
  const isHorizontalLayout = ['horizontal', 'horizontalBiaxial'].includes(layout);
  const isVerticalBiaxialLayout = layout === 'verticalBiaxial';
  const isHorizontalBiaxialLayout = layout === 'horizontalBiaxial';

  const isBar = type === 'bar';
  const isLine = type === 'line';
  const isCombo = type === 'combo';
  const isTimeSeries = tickFormatter?.timeseries !== undefined;

  const threeTicksDimension = 3 * TICK_SPACE;
  const fiveTicksDimension = 5 * TICK_SPACE;

  // We need a "true" to initialize with 5 ticks except when initialTicks === 3, then we need 3 ticks.
  const initializer = initialTicks === 'auto';
  // If chartWidth ===  0, we want to use the initial values to prevent chart fickering when width is calculated
  const isAboveBreakpoint = chartWidth ? chartWidth >= SMALL_BREAKPOINT : initializer;
  const fixChartDimension = isAboveBreakpoint ? fiveTicksDimension : threeTicksDimension;

  const tickCount = isAboveBreakpoint ? 5 : 3;
  const horizontalMargin = isHorizontalBiaxialLayout ? 20 : 10;
  const verticalMargin = 5;

  // This is a rough estimate of when bars get to thin to be rounded. It's impossible to calculate from the bar component itself as we cannot  access the ref or use wrappers on Recharts component.
  const individualBarWidthEstimate =
    (isHorizontalLayout ? chartWidth : chartHeight - legendHeight) /
      (2 * data.length) /
      elements.length -
    (isHorizontalLayout ? horizontalMargin : verticalMargin);

  useEffect(() => {
    const responsiveHeight = isHorizontalLayout
      ? fixChartDimension + legendHeight
      : fiveTicksDimension;
    setInternalHeight(responsiveHeight);
  }, [fixChartDimension, legendHeight, fiveTicksDimension, isHorizontalLayout]);

  // HELPERS
  const toggleTabularDataModal: () => void = useCallback(
    () => setShowTabularDataModal((value) => !value),
    [],
  );

  // CONDITIONAL VARIABLES
  let legendVerticalAlign = 'bottom';
  let legendAlign = 'left';

  if (isVerticalBiaxialLayout) {
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
        isHorizontalLayout,
        // Interim true, until we have number
        isBarRounded:
          Math.sign(individualBarWidthEstimate) === -1 ? true : individualBarWidthEstimate > 10,
        isDarkMode,
        renderLabel,
      }),
    [
      elements,
      hexColor,
      stacked,
      layout,
      visualPatternSelected,
      isHorizontalLayout,
      individualBarWidthEstimate,
      isDarkMode,
      renderLabel,
    ],
  );

  const referenceAreasElements = useMemo(
    () => renderReferenceAreas({ referenceAreas }),
    [referenceAreas],
  );

  const axisElements = useMemo(
    () =>
      renderAxis({
        isHorizontalLayout,
        isHorizontalBiaxialLayout,
        isVerticalLayout,
        isTimeSeries,
        isVerticalBiaxialLayout,
        range,
        tickFormatter,
        labelMap,
        tickCount,
      }),
    [
      isHorizontalLayout,
      isHorizontalBiaxialLayout,
      isVerticalLayout,
      isTimeSeries,
      isVerticalBiaxialLayout,
      range,
      tickFormatter,
      labelMap,
      tickCount,
    ],
  );

  const referenceAreaSummary = useMemo(
    () =>
      referenceAreas
        ? referenceAreas.map(({ label, style }) => ({
            label,
            style,
          }))
        : null,
    [referenceAreas],
  );

  const customTooltip = useCustomTooltip({
    isDarkMode,
    renderTooltip,
  });

  const defaultTooltip = useDefaultTooltip({
    isDarkMode,
    isRtl,
    labelMap,
    tickFormatter,
    isTimeSeries,
  });

  const defaultLegend = useDefaultLegend({
    isHorizontalBiaxialLayout,
    isVerticalBiaxialLayout,
    isRtl,
    height: chartHeight,
    labelMap,
    setLegendHeight,
    referenceAreaSummary,
  });

  return (
    <ChartProvider decal={visualPatternSelected}>
      <Box
        color="default"
        direction="column"
        display="flex"
        padding={4}
        width={isHorizontalLayout ? '100%' : undefined}
      >
        <Header
          description={description}
          helpButton={helpButton}
          onVisualPatternChange={onVisualPatternChange}
          readyToRender={chartWidth > 0}
          showTabularData={showTabularDataModal}
          title={title}
          titleDisplay={titleDisplay}
          toggleTabularDataModal={toggleTabularDataModal}
        />

        {children ? (
          <Box marginBottom={4}>
            <Flex gap={2}>{children}</Flex>
          </Box>
        ) : null}
        <div style={{ direction: 'ltr' }}>
          <Box height="100%" maxWidth={960} width="100%">
            <ResponsiveContainer
              debounce={150}
              height={internalHeight}
              minHeight={internalHeight}
              minWidth="100%"
              onResize={(width, height) => {
                setChartHeight(height);
                setChartWidth(width);
              }}
              width="100%"
            >
              <ChartType
                title={`${accessibilityLabelPrefixText}. ${accessibilityLabel}`}
                {...(isBar || isCombo ? { barCategoryGap: '25%' } : {})}
                // @ts-expect-error - TS4104 - The type 'readonly { [key: string]: number; name: string | number; }[]' is 'readonly' and cannot be assigned to the mutable type 'any[]'.
                data={data}
                layout={isVerticalLayout ? 'vertical' : 'horizontal'}
                margin={{
                  top: 10,
                  right: 5,
                  bottom: isVerticalBiaxialLayout ? 20 : 10,
                  left: 5,
                }}
              >
                {/* Patterns cannot be moved into a Patterns subcomponent as Recharts doesn't recognize the wrapper component */}
                {patterns}
                <CartesianGrid
                  horizontal={isVerticalLayout ? false : undefined}
                  stroke={TOKEN_COLOR_BORDER_CONTAINER}
                  vertical={isVerticalLayout ? undefined : false}
                />
                {/* Axis cannot be moved into an Axis subcomponent as Recharts doesn't recognize the wrapper component */}
                {axisElements}
                {renderTooltip === 'none' ? (
                  <Tooltip content={<EmptyBox />} isAnimationActive={false} />
                ) : (
                  <Tooltip
                    // @ts-expect-error - TS2769 - No overload matches this call.
                    content={renderTooltip === 'auto' ? defaultTooltip : customTooltip}
                    cursor={{ fill: `rgb(0 0 0 / ${TOKEN_OPACITY_100}` }}
                    isAnimationActive={false}
                  />
                )}
                {/* @ts-expect-error - TS2769 - No overload matches this call. */}
                <Legend
                  align={legendAlign}
                  content={
                    legend === 'auto' || isVerticalBiaxialLayout || isHorizontalBiaxialLayout ? (
                      defaultLegend
                    ) : (
                      <EmptyBox />
                    )
                  }
                  iconSize={16}
                  iconType="square"
                  verticalAlign={legendVerticalAlign}
                />
                {referenceAreas && referenceAreasElements}
                {chartElements}
              </ChartType>
            </ResponsiveContainer>
          </Box>
        </div>
      </Box>
      {showTabularDataModal ? (
        <TabularDataModal
          data={data}
          isHorizontalLayout={isHorizontalLayout}
          labelMap={labelMap}
          modalZIndex={modalZIndex}
          tickFormatter={tickFormatter}
          title={title}
          toggleTabularDataModal={toggleTabularDataModal}
        />
      ) : null}
    </ChartProvider>
  );
}

ChartGraph.LegendIcon = LegendIcon;
ChartGraph.Label = BarLabel;

ChartGraph.displayName = 'ChartGraph';

export default ChartGraph;
