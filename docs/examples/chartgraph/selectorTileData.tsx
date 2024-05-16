import { ReactNode, useState } from 'react';
import { TileData } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
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

  const [selectedId, setSelectedId] = useState<string | null | undefined>('01');
  const isSelected = (id?: string) => selectedId === id;

  const getColor: (
    arg1: string,
  ) => '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' = (
    value,
  ) => {
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
    } as const;

    // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly '01': "01"; readonly '02': "02"; readonly '03': "03"; readonly '04': "04"; readonly '05': "05"; readonly '06': "06"; readonly '07': "07"; readonly '08': "08"; readonly '09': "09"; readonly '10': "10"; readonly '11': "11"; readonly '12': "12"; }'.
    return colorMap[value];
  };

  return (
    <ChartGraph
      accessibilityLabel="Example of Bar chart"
      // @ts-expect-error - TS2322 - Type '{ name: string; Impressions: number; }[] | { name: string; Engagement: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
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
