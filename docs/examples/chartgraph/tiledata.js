// @flow strict
import { type Node, useState } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const dataA = [
    {
      name: 'A',
      'Impressions': 100,
    },
    {
      name: 'B',
      'Impressions': 200,
    },
    {
      name: 'C',
      'Impressions': 300,
    },
  ];
  const dataB = [
    {
      name: 'A',
      'Engagement': 90,
    },
    {
      name: 'B',
      'Engagement': 180,
    },
    {
      name: 'C',
      'Engagement': 250,
    },
  ];

  const [selectedId, setSelectedId] = useState<void | '01' | '02'>('01');
  const isSelected = (id?: string) => selectedId === id;

  const color = selectedId;

  return (
    <ChartGraph
      accessibilityLabel="Example of Bar chart"
      visualPatternSelected="disabled"
      onVisualPatternChange={() => {}}
      type="bar"
      title="Title"
      legend="none"
      description="Description"
      data={selectedId === '01' ? dataA : dataB}
      initialTicks={3}
      elements={[{ type: 'bar', id: selectedId === '01' ? 'Impressions' : 'Engagement', color }]}
      tileData={[
        {
          id: '01',
          color: '01',
          title: 'Impressions',
          value: '10M',
          selected: isSelected('01'),
          onTap: ({ id }) => {
            // $FlowFixMe[incompatible-call]
            setSelectedId(id);
          },
          trend: { value: 29, accessibilityLabel: 'Trending up' },
        },
        {
          id: '02',
          color: '02',
          title: 'Engagement',
          value: '2M',
          selected: isSelected('02'),
          onTap: ({ id }) => {
            // $FlowFixMe[incompatible-call]
            setSelectedId(id);
          },
          trend: { value: 29, accessibilityLabel: 'Trending up' },
        },
      ]}
    />
  );
}
