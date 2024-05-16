import { useState } from 'react';
import { Box, Image, Link, Mask, TapArea, Text } from 'gestalt';

export default function TapAreaExample() {
  const [touches, setTouches] = useState(0);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width={200}>
        <TapArea onTap={() => setTouches(touches + 1)} rounding={2}>
          <Box borderStyle="sm" color="selected" rounding={4}>
            <Mask rounding={2}>
              <Image
                alt="Antelope Canyon"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/DwYrGy6/stock14.jpg"
              />
            </Mask>
            <Box paddingY={2}>
              <Link
                href="https://www.pinterest.com/search/pins/?rs=ac&len=2&q=antelope%20canyon%20arizona&eq=Antelope%20Canyon"
                onClick={({ event }) => event.stopPropagation()}
                rounding="pill"
                target="blank"
              >
                <Text align="center" color="inverse">
                  Find More on Pinterest
                </Text>
              </Link>
            </Box>
          </Box>
        </TapArea>
        <Box paddingY={2}>
          <Text align="center" color="subtle">
            Touched {touches} {touches === 1 ? 'time' : 'times'}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
