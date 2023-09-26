// @flow strict-local
import { type Node } from 'react';
import { Table, Text } from 'gestalt';

export default function useTabularData({
  data,
}: {|
  data: $ReadOnlyArray<{|
    name: string | number,
    [string]: number,
  |}>,
|}): Node {
  const tabularData = data
    .reduce((accumulator, currentValue) => {
      const { name } = currentValue;
      return [
        ...accumulator,
        Object.entries(currentValue)
          .map((x) => {
            if (x[0] === 'name') {
              return false;
            }
            return { series: x[0], xAxis: name, yAxis: x[1] };
          })
          .filter(Boolean),
      ];
    }, [])
    .flat();

  return tabularData.map(({ series, xAxis, yAxis }) => (
    <Table.Row key={`id-${series}-${xAxis}-${yAxis}`}>
      <Table.Cell>
        <Text>{series}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text size="200">{xAxis}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text size="200">{yAxis}</Text>
      </Table.Cell>
    </Table.Row>
  ));
}
