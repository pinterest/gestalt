// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Button, Image, Layer, Link, Text, Toast } from 'gestalt';

export default function Example(): ReactNode {
  const [showToast, setShowToast] = useState(false);

  return (
    <Box padding={3}>
      <Button
        onClick={() => setShowToast((currVal) => !currVal)}
        text={showToast ? 'Close toast' : 'Show toast'}
      />

      {showToast && (
        <Layer>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: '50%',
                transform: 'translateX(-50%)',
              },
            }}
            display="flex"
            justifyContent="center"
            paddingX={1}
            position="fixed"
            width="100%"
          >
            <Toast
              primaryAction={{
                accessibilityLabel: 'Test',
                label: 'Undo',
                size: 'lg',
                role: 'button',
                onClick: () => {},
              }}
              text={
                <Text inline>
                  Saved to{' '}
                  <Link
                    display="inlineBlock"
                    href="https://www.pinterest.com/search/pins/?q=home%20decor"
                    target="blank"
                  >
                    Home decor
                  </Link>
                </Text>
              }
              thumbnail={{
                image: (
                  <Image
                    alt="Modern ceramic vase pin."
                    naturalHeight={564}
                    naturalWidth={564}
                    src="https://i.ibb.co/Lx54BCT/stock1.jpg"
                  />
                ),
              }}
            />
          </Box>
        </Layer>
      )}
    </Box>
  );
}
