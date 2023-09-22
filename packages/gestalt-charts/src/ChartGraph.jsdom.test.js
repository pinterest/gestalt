// @flow strict-local
import { type ElementConfig, type Node, useState } from 'react';
import { create } from 'react-test-renderer';
import { act, render, screen } from '@testing-library/react';
import { Flex, HelpButton } from 'gestalt';
import ChartGraph from './ChartGraph.js';

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
  visualPatternSelected?: ?'visualPattern' | 'default' | 'disabled',
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
        helpButton={props.helpButton}
        onVisualPatternChange={
          props.onVisualPatternChange ||
          (() =>
            setVisualPatternSelected((value) =>
              value === 'visualPattern' ? 'default' : 'visualPattern',
            ))
        }
        labelMap={props.labelMap}
        tickFormatter={props.tickFormatter}
        title={props.title}
        type={props.type}
        referenceAreas={props.referenceAreas}
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
    const { baseElement } = render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders bar with pattern chart', () => {
    const { baseElement } = render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
        visualPatternSelected="visualPattern"
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders stacked bar chart', () => {
    const { baseElement } = render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
        data={data}
        stacked
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders exact & precise line chart', () => {
    const { baseElement } = render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="line"
        data={data}
        elements={[
          { type: 'line', id: 'element_01', precision: 'exact' },
          { type: 'line', id: 'element_02', precision: 'estimate' },
        ]}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders exact & precise with pattern line chart', () => {
    const { baseElement } = render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="line"
        visualPatternSelected="visualPattern"
        data={data}
        elements={[
          { type: 'line', id: 'element_01', precision: 'exact' },
          { type: 'line', id: 'element_02', precision: 'estimate' },
        ]}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders combo chart', () => {
    const { baseElement } = render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="combo"
        data={data}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'line', id: 'element_02' },
        ]}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders reference area', () => {
    const { baseElement } = render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
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
    expect(baseElement).toMatchSnapshot();
  });

  it('renders with x/y axis', () => {
    render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
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

  it('renders with full header: title, description, helpbutton, switches', () => {
    render(
      <ChartWrap
        type="bar"
        title="Title"
        description="Description"
        data={data}
        helpButton={
          <HelpButton
            accessibilityLabel="Test label helpbutton"
            accessibilityPopoverLabel="Test"
            text="Test"
          />
        }
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(screen.getByText('Title')).toBeVisible();
    expect(screen.getByText('Description')).toBeVisible();
    expect(screen.getByLabelText('Test label helpbutton')).toBeVisible();
    expect(screen.getByLabelText('Visual pattern view')).toBeVisible();
  });

  it('renders with legend', () => {
    render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
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
        title="ChartGraph"
        titleDisplay="hidden"
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
        title="ChartGraph"
        titleDisplay="hidden"
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
