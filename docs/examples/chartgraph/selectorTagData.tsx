import { ComponentProps, useEffect, useState } from 'react';
import { TagData } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const [elements, setElements] = useState<ComponentProps<typeof ChartGraph>['elements']>([]);

  const [selectedId, setSelectedId] = useState<ReadonlyArray<string | null | undefined>>([
    'Campaign Autumn',
  ]);
  const isSelected = (id?: string) => selectedId.includes(id);

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

  const handleSelectors = ({ id, selected }: { id?: string; selected: boolean }) => {
    if (!selected) {
      setSelectedId((values) => values.filter((idValue) => idValue !== id));
    }
    if (selected) {
      setSelectedId((idValues) => [...idValues, id]);
    }
  };

  useEffect(() => {
    const elementsArray = [
      {
        type: 'bar',
        id: 'Campaign Autumn',
        color: getColor('01'),
      },
      {
        type: 'bar',
        id: 'Campaign Winter',
        color: getColor('02'),
      },
      {
        type: 'bar',
        id: 'Campaign Spring',
        color: getColor('03'),
      },
    ];

    const newElements = selectedId
      .map((idToMap) => elementsArray.filter(({ id }) => id === idToMap))
      .flat();

    // @ts-expect-error - TS2345 - Argument of type '{ type: string; id: string; color: "10" | "11" | "12" | "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09"; }[]' is not assignable to parameter of type 'SetStateAction<readonly { type: "line" | "bar"; axis?: "bottom" | "left" | "right" | "top" | undefined; id: string; color?: "10" | "11" | "12" | "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | undefined; precision?: "exact" | ... 1 more ... | undefined; }[]>'.
    setElements(newElements);
  }, [selectedId]);

  return (
    <ChartGraph
      accessibilityLabel="Example of Bar chart"
      data={[
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
        { 
          name: 'NorthWest',
          'Campaign Autumn': 100,
          'Campaign Winter': 90,
          'Campaign Spring': 10,
        },
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
        {
          name: 'Sunbelt',
          'Campaign Autumn': 200,
          'Campaign Winter': 180,
          'Campaign Spring': 50,
        },
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
        {
          name: 'East Coast',
          'Campaign Autumn': 300,
          'Campaign Winter': 250,
          'Campaign Spring': 100,
        },
      ]}
      elements={elements}
      initialTicks={3}
      legend="none"
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
      }
      title="Clickthroughs per region"
      type="bar"
      // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
      visualPatternSelected={visualPatternSelected}
    > 
      <TagData
        color="01"
        id="Campaign Autumn"
        onTap={({ id, selected }) => handleSelectors({ id, selected })}
        selected={isSelected('Campaign Autumn')}
        showCheckbox
        text="Campaign Autumn"
      />
      
      <TagData
        color="02"
        id="Campaign Winter"
        onTap={({ id, selected }) => handleSelectors({ id, selected })}
        selected={isSelected('Campaign Winter')}
        showCheckbox
        text="Campaign Winter"
      />
      <TagData
        color="03"
        id="Campaign Spring"
        onTap={({ id, selected }) => handleSelectors({ id, selected })}
        selected={isSelected('Campaign Spring')}
        showCheckbox
        text="Campaign Spring"
      />
    </ChartGraph>
  );
}
