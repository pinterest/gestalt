import { ComponentProps, ReactNode, useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import { Flex, HelpButton, TileData } from 'gestalt';
import ChartGraph from './ChartGraph';

// Mock needed here do to https://stackoverflow.com/questions/73117667/writing-unit-tests-with-react-testing-library-for-recharts
jest.mock('recharts', () => {
  // @ts-expect-error - TS2558 - Expected 0 type arguments, but got 1.
  const OriginalModule = jest.requireActual<any>('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: ReactNode }) => (
      <OriginalModule.ResponsiveContainer height={800} width={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

const data1 = [
  {
    name: 'A',
    element_01: 100,
  },
  {
    name: 'B',
    element_01: 100,
  },
  {
    name: 'C',
    element_01: 100,
  },
  {
    name: 'D',
    element_01: 100,
  },
  {
    name: 'E',
    element_01: 100,
  },
  {
    name: 'F',
    element_01: 100,
  },
  {
    name: 'G',
    element_01: 100,
  },
];

const data2 = [
  {
    name: 'A',
    element_01: 100,
    element_02: 200,
  },
  {
    name: 'B',
    element_01: 100,
    element_02: 200,
  },
  {
    name: 'C',
    element_01: 100,
    element_02: 200,
  },
  {
    name: 'D',
    element_01: 100,
    element_02: 200,
  },
  {
    name: 'E',
    element_01: 100,
    element_02: 200,
  },
  {
    name: 'F',
    element_01: 100,
    element_02: 200,
  },
  {
    name: 'G',
    element_01: 100,
    element_02: 200,
  },
];

const data3 = [
  {
    name: 'A',
    element_01: 100,
    element_02: 200,
    element_03: 300,
  },
  {
    name: 'B',
    element_01: 100,
    element_02: 200,
    element_03: 300,
  },
  {
    name: 'C',
    element_01: 100,
    element_02: 200,
    element_03: 300,
  },
  {
    name: 'D',
    element_01: 100,
    element_02: 200,
    element_03: 300,
  },
  {
    name: 'E',
    element_01: 100,
    element_02: 200,
    element_03: 300,
  },
  {
    name: 'F',
    element_01: 100,
    element_02: 200,
    element_03: 300,
  },
  {
    name: 'G',
    element_01: 100,
    element_02: 200,
    element_03: 300,
  },
];

const { ResizeObserver } = window;

type Props = ComponentProps<typeof ChartGraph> & {
  accessibilityLabel?: string; // eslint-disable-line react/no-unused-prop-types,
  visualPatternSelected?: 'visualPattern' | null | undefined | 'default' | 'disabled';
  onVisualPatternChange?: () => void;
};

function ChartWrap(props: Props) {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');
  const [isSelect, setIsSelect] = useState(false);

  return (
    <Flex direction="column" height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="test chart"
        data={props.data}
        description={props.description}
        elements={isSelect || !props.children ? props.elements : []}
        helpButton={props.helpButton}
        labelMap={props.labelMap}
        layout={props.layout}
        legend={props.legend}
        onVisualPatternChange={
          props.onVisualPatternChange ||
          (() =>
            setVisualPatternSelected((value: any) =>
              value === 'visualPattern' ? 'default' : 'visualPattern',
            ))
        }
        range={props.range}
        referenceAreas={props.referenceAreas}
        tickFormatter={props.tickFormatter}
        title={props.title}
        type={props.type}
        visualPatternSelected={props.visualPatternSelected || visualPatternSelected}
      >
        {props.children ? (
          <TileData
            color="01"
            id="01"
            onTap={() => setIsSelect((x: any) => !x)}
            selected={isSelect}
            title="Impressions"
            trend={{ value: 29, accessibilityLabel: 'Trending up' }}
            value="10M"
          />
        ) : undefined}
      </ChartGraph>
    </Flex>
  );
}

describe('ChartGraph', () => {
  beforeEach(() => {
    // Mock needed here to prevent error "The width(800) and height(800) are both fixed numbers, maybe you don't need to use a ResponsiveContainer.""
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    // @ts-expect-error - TS2790 - The operand of a 'delete' operator must be optional.
    delete window.ResizeObserver;
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

  it('renders with x/y axis', () => {
    render(
      <ChartWrap
        // @ts-expect-error - TS2322 - Type '{ name: string; element_01: number; element_02: number; element_03: number; }[]' is not assignable to type 'readonly { [key: string]: number; name: string | number; }[]'.
        data={data3}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
          { type: 'bar', id: 'element_03' },
        ]}
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
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
        // @ts-expect-error - TS2322 - Type '{ name: string; element_01: number; element_02: number; }[]' is not assignable to type 'readonly { [key: string]: number; name: string | number; }[]'.
        data={data2}
        description="Description"
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
        labelMap={{ A: 'translatedA', element_01: 'translated01' }}
        title="Title"
        type="bar"
      />,
    );
    expect(screen.queryAllByText('translatedA')[0]).toBeVisible();
    expect(screen.queryAllByText('translated01')[0]).toBeVisible();
  });

  it('renders with full header: title, description, helpbutton, switches', () => {
    render(
      <ChartWrap
        // @ts-expect-error - TS2322 - Type '{ name: string; element_01: number; element_02: number; }[]' is not assignable to type 'readonly { [key: string]: number; name: string | number; }[]'.
        data={data2}
        description="Description"
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
        helpButton={
          <HelpButton
            accessibilityLabel="Test label helpbutton"
            accessibilityPopoverLabel="Test"
            text="Test"
          />
        }
        title="Title"
        type="bar"
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
        // @ts-expect-error - TS2322 - Type '{ name: string; element_01: number; element_02: number; }[]' is not assignable to type 'readonly { [key: string]: number; name: string | number; }[]'.
        data={data2}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
      />,
    );
    expect(screen.getByText('element_01')).toBeVisible();
    expect(screen.getByText('element_02')).toBeVisible();
  });

  it('renders with no legend', () => {
    render(
      <ChartWrap
        // @ts-expect-error - TS2322 - Type '{ name: string; element_01: number; element_02: number; }[]' is not assignable to type 'readonly { [key: string]: number; name: string | number; }[]'.
        data={data2}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
        legend="none"
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
      />,
    );
    expect(screen.queryByText('element_01')).not.toBeInTheDocument();
    expect(screen.queryByText('element_02')).not.toBeInTheDocument();
  });

  it('renders with accessibility button', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockonVisualPatternChange = jest.fn<[], undefined>();
    render(
      <ChartWrap
        // @ts-expect-error - TS2322 - Type '{ name: string; element_01: number; element_02: number; }[]' is not assignable to type 'readonly { [key: string]: number; name: string | number; }[]'.
        data={data2}
        elements={[
          { type: 'bar', id: 'element_01' },
          { type: 'bar', id: 'element_02' },
        ]}
        legend="none"
        onVisualPatternChange={mockonVisualPatternChange}
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
      />,
    );
    expect(screen.getByLabelText('Tabular representation')).toBeVisible();
    expect(screen.getByLabelText('Visual pattern view')).toBeVisible();

    act(() => {
      screen.getAllByRole('button')[1]?.click();
    });
    expect(mockonVisualPatternChange).toHaveBeenCalled();
  });

  it('renders with selectors', () => {
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockonVisualPatternChange = jest.fn<[], undefined>();

    render(
      <ChartWrap
        // @ts-expect-error - TS2322 - Type '{ name: string; element_01: number; }[]' is not assignable to type 'readonly { [key: string]: number; name: string | number; }[]'.
        data={data1}
        elements={[{ type: 'bar', id: 'element_01' }]}
        legend="none"
        onVisualPatternChange={mockonVisualPatternChange}
        title="ChartGraph"
        titleDisplay="hidden"
        type="bar"
      >
        <TileData
          color="01"
          id="01"
          onTap={() => {}}
          selected={false}
          title="Impressions"
          trend={{ value: 29, accessibilityLabel: 'Trending up' }}
          value="10M"
        />
      </ChartWrap>,
    );

    expect(screen.getByText('Impressions')).toBeVisible();
  });
});
