// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { TileData } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
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
      data={selectedId === '01' ? dataA : dataB}
      description="Description"
      elements={[
        {
          type: 'bar',
          id: selectedId === '01' ? 'Impressions' : 'Engagement',
          color: getColor(selectedId || '01'),
        },
      ]}
      initialTicks={3}
      legend="none"
      onVisualPatternChange={() => {}}
      title="Title"
      type="bar"
      visualPatternSelected="disabled"
    >
      <TileData
        color="01"
        id="01"
        onTap={({ id }) => setSelectedId(id)}
        selected={isSelected('01')}
        title="Impressions"
        trend={{ value: 29, accessibilityLabel: 'Trending up' }}
        value="10M"
      />
      <TileData
        color="02"
        id="02"
        onTap={({ id }) => setSelectedId(id)}
        selected={isSelected('02')}
        title="Engagement"
        trend={{ value: 29, accessibilityLabel: 'Trending up' }}
        value="2M"
      />
    </ChartGraph>
  );
}
