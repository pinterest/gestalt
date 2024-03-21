// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, HelpButton } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
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
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of chart with title and description"
        data={data}
        description="Includes both web and mobile"
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
        helpButton={
          <HelpButton
            accessibilityLabel="Click to learn more this ChartGraph"
            accessibilityPopoverLabel="Expanded information about this ChartGraph"
            link={{
              href: 'https://help.pinterest.com/en/business/article/conversion-insights/',
              text: 'Read our documentation',
              accessibilityLabel: 'Visit our Help center',
            }}
            text="If you want to learn more about Clicks vs conversions, visit our Help center."
          />
        }
        layout="verticalBiaxial"
        onVisualPatternChange={() => {}}
        title="Clicks vs conversions"
        visualPatternSelected="disabled"
      />
    </Flex>
  );
}
