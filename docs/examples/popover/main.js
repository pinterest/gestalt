// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Layer,
  Mask,
  Popover,
  SearchField,
  TapArea,
  Text,
} from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState('Fashion');
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);
  const ref = useRef<null | HTMLElement>(null);

  useEffect(() => {
    if (open && ref && ref.current) {
      ref.current.focus();
    }
  }, [open]);

  const handleImageTap = (imageTitle: string) => {
    setSelectedBoard(imageTitle);
    setOpen(false);
  };

  return (
    <Box padding={6} height="100%" width="100%">
      <Flex gap={2} justifyContent="center" width="100%">
        <Button
          accessibilityHaspopup
          accessibilityExpanded={open}
          accessibilityControls="main-example"
          color="white"
          iconEnd="arrow-down"
          onClick={() => setOpen(!open)}
          ref={anchorRef}
          size="lg"
          selected={open}
          text={selectedBoard}
        />

        <Button color="red" onClick={() => {}} size="lg" text="Save" />
      </Flex>
      {open && (
        <Layer>
          <Popover
            accessibilityLabel="Save to board"
            anchor={anchorRef.current}
            id="main-example"
            idealDirection="forceDown"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size="xl"
            showDismissButton
          >
            <Box width={300}>
              <Box flex="grow" marginEnd={4} marginStart={4} marginBottom={8}>
                <Flex direction="column" gap={{ column: 6, row: 0 }}>
                  <Text align="center" color="default" weight="bold">
                    Save to board
                  </Text>
                  <SearchField
                    accessibilityLabel="Search boards field"
                    id="searchField"
                    onChange={() => {}}
                    placeholder="Search boards"
                    size="lg"
                    ref={ref}
                  />
                </Flex>
              </Box>
              <Box height={300} overflow="scrollY">
                <Box marginEnd={4} marginStart={4}>
                  <Flex direction="column" gap={{ column: 8, row: 0 }}>
                    <Flex direction="column" gap={{ column: 4, row: 0 }}>
                      <Text color="default" size="100">
                        Top choices
                      </Text>
                      <Flex direction="column" gap={{ column: 4, row: 0 }}>
                        {[
                          {
                            url: 'https://i.ibb.co/s3PRJ8v/photo-1496747611176-843222e1e57c.webp',
                            title: 'Fashion',
                            alt: 'Thumbnail image: a white dress with red flowers',
                          },
                          {
                            url: 'https://i.ibb.co/swC1qpp/IMG-0494.jpg',
                            title: 'Food',
                            alt: 'Thumbnail image: a paella with shrimp, green peas, red peppers and yellow rice',
                          },
                          {
                            url: 'https://i.ibb.co/PFVF3JH/photo-1583847268964-b28dc8f51f92.webp',
                            title: 'Home',
                            alt: 'Thumbnail image: a living room with a white couch, two paints in the wall and wooden furniture',
                          },
                        ].map(({ alt, title: imageTitle, url }) => (
                          <TapArea
                            key={imageTitle}
                            onTap={() => {
                              handleImageTap(imageTitle);
                            }}
                          >
                            <Flex gap={{ row: 2, column: 0 }} alignItems="center">
                              <Box height={50} width={50} overflow="hidden" rounding={2}>
                                <Mask rounding={2}>
                                  <Image
                                    alt={alt}
                                    color="rgb(231, 186, 176)"
                                    naturalHeight={50}
                                    naturalWidth={50}
                                    src={url}
                                  />
                                </Mask>
                              </Box>
                              <Text align="center" color="default" weight="bold">
                                {imageTitle}
                              </Text>
                            </Flex>
                          </TapArea>
                        ))}
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Popover>
        </Layer>
      )}
    </Box>
  );
}
