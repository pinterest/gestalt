// @flow strict-local
import { create } from 'react-test-renderer';
import { Flex, Text } from 'gestalt';
import { Chart } from 'gestalt-charts';

const data = [
  {
    name: 'A',
    'bar_1': 2400,
    'bar_2': 2400,
    'bar_3': 2400,
  },
  {
    name: 'B',
    'bar_1': 2400,
    'bar_2': 2400,
    'bar_3': 2400,
  },
  {
    name: 'C',
    'bar_1': 2400,
    'bar_2': 9800,
    'bar_3': 2400,
  },
  {
    name: 'D',
    'bar_1': 2400,
    'bar_2': 2400,
    'bar_3': 2400,
  },
  {
    name: 'E',
    'bar_1': 2400,
    'bar_2': 2400,
    'bar_3': 2400,
  },
  {
    name: 'F',
    'bar_1': 2400,
    'bar_2': 2400,
    'bar_3': 2400,
  },
  {
    name: 'G',
    'bar_1': 2400,
    'bar_2': 2400,
    'bar_3': 2400,
  },
];

const { ResizeObserver } = window;

describe('Chart', () => {
  beforeEach(() => {
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

  it('renders', () => {
    const tree = create(
      <Flex direction="column" width="100%" height="100%">
        <Chart
          xAxisLabel="axis X"
          yAxisLabel="axis Y"
          type="bar"
          data={data}
          renderTooltip={({ label }) => (
            <Flex direction="column" gap={2}>
              <Text>{label}</Text>
            </Flex>
          )}
          elements={[
            { type: 'bar', id: 'bar_01', color: '01', axis: 'yAxisLeft' },
            { type: 'bar', id: 'bar_02', color: '02', axis: 'yAxisLeft' },
            { type: 'bar', id: 'bar_03', color: '03', axis: 'yAxisLeft' },
          ]}
        />
      </Flex>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
