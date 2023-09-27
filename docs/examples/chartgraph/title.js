// @flow strict
import { type Node } from 'react';
import { Flex, HelpButton } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'Quarter 1',
      'Clicks': 850000,
      'Conversions': 870000,
    },
    {
      name: 'Quarter 2',
      'Clicks': 800000,
      'Conversions': 690000,
    },
    {
      name: 'Quarter 3',
      'Clicks': 890000,
      'Conversions': 850000,
    },
    {
      name: 'Quarter 4',
      'Clicks': 870000,
      'Conversions': 550000,
    },
  ];
  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        accessibilityLabel="Example of chart with title and description"
        visualPatternSelected="disabled"
        onVisualPatternChange={() => {}}
        title="Clicks vs conversions"
        helpButton={
          <HelpButton
            accessibilityLabel="Click to learn more this ChartGraph"
            accessibilityPopoverLabel="Expanded information about this ChartGraph"
            text="If you want to learn more about Clicks vs conversions, visit our Help center."
            link={{
              href: 'https://help.pinterest.com/en/business/article/conversion-insights/',
              text: 'Read our documentation',
              accessibilityLabel: 'Visit our Help center',
            }}
          />
        }
        description="Includes both web and mobile"
        layout="verticalBiaxial"
        data={data}
        elements={[
          {
            type: 'bar',
            id: 'Clicks',
            axis: 'left',
          },
          {
            type: 'line',
            id: 'Conversions',
            axis: 'right',
          },
        ]}
      />
    </Flex>
  );
}
