// @flow strict-local
import { type ElementConfig, type Node, useState } from 'react';
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
  const [isSelect, setIsSelect] = useState(false);

  return (
    <Flex direction="column" width="100%" height="100%">
      <ChartGraph
        accessibilityLabel="test chart"
        visualPatternSelected={props.visualPatternSelected || visualPatternSelected}
        data={props.data}
        description={props.description}
        range={props.range}
        elements={isSelect || !props.selectors ? props.elements : []}
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
        selectors={
          props.selectors
            ? {
                selector: 'TileData',
                data: [
                  {
                    id: '01',
                    color: '01',
                    title: 'Impressions',
                    value: '10M',
                    selected: isSelect,
                    onTap: () => setIsSelect((x) => !x),
                    trend: { value: 29, accessibilityLabel: 'Trending up' },
                  },
                ],
              }
            : undefined
        }
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
    render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
        data={data}
        legend="none"
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
          { type: 'bar', id: 'element_03' },
        ]}
      />,
    );
    expect(screen.getAllByRole('img')).toHaveLength(21);
  });

  it('renders horizontal bar chart', () => {
    render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
        layout="horizontal"
        data={data}
        legend="none"
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
          { type: 'bar', id: 'element_03' },
        ]}
      />,
    );
    expect(screen.getAllByRole('img')).toHaveLength(21);
  });

  it('renders biaxial bar chart', () => {
    render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
        layout="verticalBiaxial"
        data={data}
        legend="none"
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(screen.getAllByRole('img')).toHaveLength(14);
  });

  it('renders biaxial horizontal bar chart', () => {
    render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
        layout="horizontalBiaxial"
        data={data}
        legend="none"
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
      />,
    );
    expect(screen.getAllByRole('img')).toHaveLength(14);
  });

  it('renders stacked bar chart', () => {
    render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
        data={data}
        stacked
        legend="none"
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
          { type: 'bar', id: 'element_03' },
        ]}
      />,
    );
    expect(screen.getAllByRole('img')).toHaveLength(21);
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

  it('renders with selectors', () => {
    const mockonVisualPatternChange = jest.fn<[], void>();

    render(
      <ChartWrap
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
        legend="none"
        onVisualPatternChange={mockonVisualPatternChange}
        data={data}
        elements={[{ type: 'bar', id: 'element_01' }]}
        selectors={{
          selector: 'TileData',
          data: [
            {
              id: '01',
              color: '01',
              title: 'Impressions',
              value: '10M',
              selected: false,
              onTap: () => {},
              trend: { value: 29, accessibilityLabel: 'Trending up' },
            },
          ],
        }}
      />,
    );

    expect(screen.getAllByRole('img')).toHaveLength(1);

    expect(screen.getByText('Impressions')).toBeVisible();

    act(() => {
      screen.getByText('Impressions').click();
    });

    expect(screen.getAllByRole('img')).toHaveLength(8);
  });
});
