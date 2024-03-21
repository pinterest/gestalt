// @flow strict
import { type Node as ReactNode, useRef, useState } from 'react';
import { Box, Layer, Link, Popover, RadioGroup, Text } from 'gestalt';

export default function RadioButtonPopoverExample(): ReactNode {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState('');
  const anchorCatRef = useRef<HTMLElement | null>(null);
  const anchorDogRef = useRef<HTMLElement | null>(null);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <RadioGroup id="popoverExample" legend="Tell us about yourself">
        <Box ref={anchorCatRef} display="inlineBlock">
          <RadioGroup.RadioButton
            checked={option === 'cat'}
            id="cat"
            label="I'm a cat person"
            onChange={() => {
              setOpen(true);
              setOption('cat');
            }}
            value="cat"
          />
        </Box>
        <Box ref={anchorDogRef} display="inlineBlock">
          <RadioGroup.RadioButton
            checked={option === 'dog'}
            id="dog"
            label="I'm a dog person"
            onChange={() => {
              setOpen(true);
              setOption('dog');
            }}
            value="dog"
          />
        </Box>
        {open && (
          <Layer>
            <Popover
              anchor={option === 'cat' ? anchorCatRef.current : anchorDogRef.current}
              idealDirection="right"
              onDismiss={() => setOpen(false)}
              positionRelativeToAnchor={false}
              shouldFocus={false}
              size="md"
            >
              <Box padding={3}>
                <Text color="default">
                  <Link
                    href={
                      option === 'cat'
                        ? 'https://www.pinterest.com/search/pins/?q=cats'
                        : 'https://www.pinterest.com/search/pins/?q=dogs'
                    }
                    target="blank"
                    underline="always"
                  >
                    {option === 'cat'
                      ? 'Check out cats on Pinterest!'
                      : 'Check out dogs on Pinterest!'}
                  </Link>
                </Text>
              </Box>
            </Popover>
          </Layer>
        )}
      </RadioGroup>
    </Box>
  );
}
