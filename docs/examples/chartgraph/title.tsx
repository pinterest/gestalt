import { ReactNode } from 'react';
import { Flex, HelpButton } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
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
// @ts-expect-error - TS2322 - Type '{ name: string; Clicks: number; Conversions: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
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
// @ts-expect-error - TS2322 - Type '{ href: string; text: string; accessibilityLabel: string; }' is not assignable to type '{ accessibilityLabel?: string | undefined; externalLinkIcon?: "none" | "default" | { color: "warning" | "info" | "error" | "brandPrimary" | "default" | "subtle" | "success" | "shopping" | ... 4 more ... | undefined; size: string | ... 1 more ... | undefined; } | undefined; href: string; onClick?: AbstractEventHandle...'.
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
