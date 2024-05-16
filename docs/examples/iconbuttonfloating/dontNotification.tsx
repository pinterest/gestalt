import { ReactNode, useRef } from 'react';
import { Box, Flex, IconButtonFloating } from 'gestalt';

export default function Example() {
  const anchorRef = useRef<null | HTMLElement>(null);

  return (
    <Flex alignItems="center" flex="grow" height="100%" justifyContent="center">
      <Box alignContent="center" display="flex" position="relative" width={60}>
        <Box
          color="errorBase"
          height={8}
          marginEnd={1}
          marginTop={1}
          position="absolute"
          right
          rounding="circle"
          top
          width={8}
        />
        <IconButtonFloating
          // @ts-expect-error - TS2322 - Type '{ ref: MutableRefObject<HTMLElement | null>; accessibilityExpanded: false; accessibilityLabel: string; accessibilityPopupRole: "menu"; icon: "add"; onClick: () => void; tooltip: { ...; }; }' is not assignable to type 'IntrinsicAttributes & IconButtonFloatingProps'.
          ref={anchorRef}
          accessibilityExpanded={false}
          accessibilityLabel="Create Pin Menu"
          accessibilityPopupRole="menu"
          icon="add"
          onClick={() => {}}
          tooltip={{
            text: 'Create Pin Menu',
          }}
        />
      </Box>
    </Flex>
  );
}
