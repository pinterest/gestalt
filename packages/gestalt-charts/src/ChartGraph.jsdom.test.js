// @flow strict-local
import { type ElementConfig, type Node, useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import { Box, Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

// Mock needed here do to https://stackoverflow.com/questions/73117667/writing-unit-tests-with-react-testing-library-for-recharts
jest.mock('recharts', () => {
  // $FlowFixMe[unclear-type]
  const OriginalModule = jest.requireActual<any>('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: {| children: Node |}) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

const data = [
  {
    name: 'A',
    'element_01': 100,
    'element_02': 200,
    'element_03': 300,
  },
  {
    name: 'B',
    'element_01': 100,
    'element_02': 200,
    'element_03': 300,
  },
  {
    name: 'C',
    'element_01': 100,
    'element_02': 200,
    'element_03': 300,
  },
  {
    name: 'D',
    'element_01': 100,
    'element_02': 200,
    'element_03': 300,
  },
  {
    name: 'E',
    'element_01': 100,
    'element_02': 200,
    'element_03': 300,
  },
  {
    name: 'F',
    'element_01': 100,
    'element_02': 200,
    'element_03': 300,
  },
  {
    name: 'G',
    'element_01': 100,
    'element_02': 200,
    'element_03': 300,
  },
];

const { ResizeObserver } = window;

type Props = {|
  ...ElementConfig<typeof ChartGraph>,
  accessibilityLabel?: string, // eslint-disable-line react/no-unused-prop-types
  visualPatternSelected?: ?'accessible' | 'default' | 'disabled',
  onVisualPatternChange?: () => void,
|};

function ChartWrap(props: Props) {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  return (
    <Flex direction="column" width="100%" height="100%">
      <ChartGraph
        accessibilityLabel="test chart"
        visualPatternSelected={props.visualPatternSelected || visualPatternSelected}
        data={props.data}
        description={props.description}
        range={props.range}
        elements={props.elements}
        layout={props.layout}
        legend={props.legend}
        onVisualPatternChange={
          props.onVisualPatternChange ||
          (() =>
            setVisualPatternSelected((value) =>
              value === 'accessible' ? 'default' : 'accessible',
            ))
        }
        labelMap={props.labelMap}
        tickFormatter={props.tickFormatter}
        title={props.title}
        type={props.type}
        referenceAreas={props.referenceAreas}
        variant={props.variant}
      />
    </Flex>
  );
}

describe('ChartGraph', () => {
  beforeEach(() => {
    // Mock needed here to prevent error "The width(800) and height(800) are both fixed numbers, maybe you don't need to use a ResponsiveContainer.""
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    delete window.ResizeObserver;
    // $FlowFixMe[underconstrained-implicit-instantiation]
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });

  it('renders bar chart', () => {
    const { container } = render(
      <ChartWrap
        type="bar"
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders bar with pattern chart', () => {
    const { container } = render(
      <ChartWrap
        type="bar"
        visualPatternSelected="accessible"
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders stacked bar chart', () => {
    const { container } = render(
      <ChartWrap
        type="bar"
        data={data}
        stacked
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders exact & precise line chart', () => {
    const { container } = render(
      <ChartWrap
        type="line"
        data={data}
        elements={[
          { type: 'line', id: 'element_01', precision: 'exact' },
          { type: 'line', id: 'element_02', precision: 'estimate' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders exact & precise with pattern line chart', () => {
    const { container } = render(
      <ChartWrap
        type="line"
        visualPatternSelected="accessible"
        data={data}
        elements={[
          { type: 'line', id: 'element_01', precision: 'exact' },
          { type: 'line', id: 'element_02', precision: 'estimate' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders combo chart', () => {
    const { container } = render(
      <ChartWrap
        type="combo"
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'line', id: 'element_02' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders reference area', () => {
    const { container } = render(
      <ChartWrap
        type="combo"
        referenceAreas={[
          {
            id: 'ExampleBD',
            label: 'ExampleBD',
            x1: 'B',
            x2: 'D',
            yAxisId: 'left',
            y1: 2000,
            y2: 2500,
          },
        ]}
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'line', id: 'element_02' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders time series chart', () => {
    const { container } = render(
      <Box width={300} height={300}>
        <ChartWrap
          type="line"
          range={{ xAxisBottom: ['auto', 'auto'] }}
          data={[0, 1, 2, 3, 4, 5]
            .map((x) => [{ name: new Date(2023, x, 1).getTime(), 'value01': 1000, 'value02': 100 }])
            .flat()}
          elements={[
            { type: 'line', id: 'element_01' },
            { type: 'line', id: 'element_02' },
          ]}
          variant="timeseries"
          tickFormatter={{
            xAxisBottom: (date) =>
              `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
                date,
              )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
          }}
        />
      </Box>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with x/y axis', () => {
    render(
      <ChartWrap
        type="bar"
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
          { type: 'bar', id: 'element_03' },
        ]}
      />,
    );
    expect(screen.getByText('A')).toBeVisible();
    expect(screen.getByText('B')).toBeVisible();
    expect(screen.getByText('C')).toBeVisible();
    expect(screen.getByText('D')).toBeVisible();
    expect(screen.getByText('E')).toBeVisible();
    expect(screen.getByText('F')).toBeVisible();
    expect(screen.getByText('G')).toBeVisible();

    expect(screen.getByText(0)).toBeVisible();
    expect(screen.getByText(150)).toBeVisible();
    expect(screen.queryAllByText(300)[0]).toBeVisible();
  });

  it('renders with translations', () => {
    render(
      <ChartWrap
        type="bar"
        title="Title"
        description="Description"
        labelMap={{ A: 'translatedA', element_01: 'translated01' }}
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(screen.queryAllByText('translatedA')[0]).toBeVisible();
    expect(screen.queryAllByText('translated01')[0]).toBeVisible();
  });

  it('renders with title & description', () => {
    render(
      <ChartWrap
        type="bar"
        title="Title"
        description="Description"
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(screen.getByText('Title')).toBeVisible();
    expect(screen.getByText('Description')).toBeVisible();
  });

  it('renders with legend', () => {
    render(
      <ChartWrap
        type="bar"
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(screen.getByText('element_01')).toBeVisible();
    expect(screen.getByText('element_02')).toBeVisible();
  });

  it('renders with no legend', () => {
    render(
      <ChartWrap
        type="bar"
        legend="none"
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(screen.queryByText('element_01')).not.toBeInTheDocument();
    expect(screen.queryByText('element_02')).not.toBeInTheDocument();
  });

  it('renders with accessibility button', () => {
    const mockonVisualPatternChange = jest.fn<[], void>();
    render(
      <ChartWrap
        type="bar"
        legend="none"
        onVisualPatternChange={mockonVisualPatternChange}
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(screen.getByRole('button')).toBeVisible();
    act(() => {
      screen.getByRole('button').click();
    });
    expect(mockonVisualPatternChange).toHaveBeenCalled();
  });
});
