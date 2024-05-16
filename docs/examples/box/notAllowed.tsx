import { ReactNode } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%">
      <Box
// @ts-expect-error - TS2322 - Type '{ children: Element; className: string; color: "infoBase"; column: 12; height: number; padding: 4; style: { backgroundColor: string; }; }' is not assignable to type 'IntrinsicAttributes & Omit<BoxProps, "ref"> & RefAttributes<HTMLDivElement>'.
        className="This class name will not appear"
        color="infoBase"
        column={12}
        height={100}
        padding={4}
        style={{ backgroundColor: 'orange' }}
      >
        <Box
          color="successBase"
          height={50}
// @ts-expect-error - TS2322 - Type '{ children: Element; color: "successBase"; height: number; onClick: () => void; paddingX: 1; }' is not assignable to type 'IntrinsicAttributes & Omit<BoxProps, "ref"> & RefAttributes<HTMLDivElement>'.
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log("This won't get logged.");
          }}
          paddingX={1}
        >
          <Text color="light" weight="bold">
            Adding onClick here will do nothing
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
