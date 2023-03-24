// @flow strict
import { type Node, useState } from 'react';
import { Flex, Layer, SheetMobile, Box, Text, DeviceTypeProvider, Button } from 'gestalt';

export default function Example(): Node {
  const [showSheetMobile, setShowSheetMobile] = useState(false);

  return (
    <DeviceTypeProvider deviceType="mobile">
      {showSheetMobile ? (
        <Layer>
          <SheetMobile
            align="center"
            accessibilityModalLabel="SheetMobile example"
            heading="Heading"
            subHeading="SubHeading"
            onDismiss={() => setShowSheetMobile(false)}
            footer={
              <Flex justifyContent="center" gap={2}>
                <Button color="gray" text="Secondary" />
                <Button color="red" text="Primary" />
              </Flex>
            }
            size="full"
          >
            <Box>{Array(100).fill(<Text>Content</Text>)}</Box>
          </SheetMobile>
        </Layer>
      ) : null}
      <Box padding={2}>
        <Button
          accessibilityLabel="Show SheetMobile"
          color="red"
          text="Show SheetMobile"
          size="lg"
          onClick={() => setShowSheetMobile(true)}
        />
      </Box>
    </DeviceTypeProvider>
  );
}
