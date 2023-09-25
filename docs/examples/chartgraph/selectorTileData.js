// @flow strict
import { type Node, useState } from 'react';
import { TileData } from 'gestalt';
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

  const [selectedId, setSelectedId] = useState<?string>('01');
  const isSelected = (id?: string) => selectedId === id;

  const getColor: (string) =>
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
    | '12' = (value) => {
    const colorMap = {
      '01': '01',
      '02': '02',
      '03': '03',
      '04': '04',
      '05': '05',
      '06': '06',
      '07': '07',
      '08': '08',
      '09': '09',
      '10': '10',
      '11': '11',
      '12': '12',
    };

    return colorMap[value];
  };

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
      elements={[
        {
          type: 'bar',
          id: selectedId === '01' ? 'Impressions' : 'Engagement',
          color: getColor(selectedId || '01'),
        },
      ]}
    >
      <TileData
        id="01"
        color="01"
        title="Impressions"
        value="10M"
        selected={isSelected('01')}
        onTap={({ id }) => setSelectedId(id)}
        trend={{ value: 29, accessibilityLabel: 'Trending up' }}
      />
      <TileData
        id="02"
        color="02"
        title="Engagement"
        value="2M"
        selected={isSelected('02')}
        onTap={({ id }) => setSelectedId(id)}
        trend={{ value: 29, accessibilityLabel: 'Trending up' }}
      />
    </ChartGraph>
  );
}
