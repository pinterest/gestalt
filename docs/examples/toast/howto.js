// @flow strict
import { type Node, useState } from 'react';
import { Box, Button, Image, Layer, Link, Text, Toast } from 'gestalt';

export default function Example(): Node {
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
            width="100%"
            paddingX={1}
            position="fixed"
            display="flex"
            justifyContent="center"
          >
            <Toast
              primaryAction={{ accessibilityLabel: 'Test', label: 'Undo', size: 'lg' }}
              text={
                <Text inline>
                  Saved to{' '}
                  <Link
                    display="inlineBlock"
                    target="blank"
                    href="https://www.pinterest.com/search/pins/?q=home%20decor"
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
