import { Fragment, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  FixedZIndex,
  Flex,
  Image,
  Layer,
  Mask,
  OverlayPanel,
  Popover,
  SearchField,
  TapArea,
  Text,
  TextArea,
} from 'gestalt';

const images = [
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
];

function SearchBoardField() {
  const ref = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  return (
    <SearchField
      ref={ref}
      accessibilityLabel="Search boards field"
      id="searchField"
      onChange={() => {}}
      placeholder="Search boards"
      size="lg"
    />
  );
}

function List({
  handleImageTap,
  title,
}: {
  handleImageTap: (imageTitle: string) => void;
  title: string;
}) {
  return (
    <Flex direction="column" gap={{ column: 4, row: 0 }}>
      <Text color="default" size="100">
        {title}
      </Text>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        {images.map(({ alt, title: imageTitle, url }) => (
          <TapArea
            key={imageTitle}
            onTap={() => {
              handleImageTap(imageTitle);
            }}
            rounding={2}
          >
            <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
              <Box height={50} overflow="hidden" rounding={2} width={50}>
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
  );
}

function SelectBoard() {
  const [openPopover, setOpenPopover] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState('Fashion');
  const anchorRef = useRef<null | HTMLButtonElement>(null);

  const handleImageTap = (imageTitle: string) => {
    setSelectedBoard(imageTitle);
    setOpenPopover(false);
  };

  return (
    <Fragment>
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Text size="100">Board</Text>
        <Button
          ref={anchorRef}
          accessibilityControls="popover-search-board-3"
          accessibilityExpanded={openPopover}
          accessibilityHaspopup
          iconEnd="arrow-down"
          onClick={() => setOpenPopover(!openPopover)}
          text={selectedBoard}
        />
      </Flex>
      {openPopover && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            id="popover-search-board-3"
            idealDirection="down"
            onDismiss={() => setOpenPopover(false)}
            positionRelativeToAnchor={false}
            showDismissButton
            size="xl"
          >
            <Box width={360}>
              <Box flex="grow" marginBottom={8} marginEnd={4} marginStart={4}>
                <Flex direction="column" gap={{ column: 6, row: 0 }}>
                  <Text align="center" color="default" weight="bold">
                    Save to board
                  </Text>
                  <SearchBoardField />
                </Flex>
              </Box>
              <Box height={300} overflow="scrollY">
                <Box marginEnd={4} marginStart={4}>
                  <Flex direction="column" gap={{ column: 8, row: 0 }}>
                    <List handleImageTap={handleImageTap} title="Top choices" />
                    <List handleImageTap={handleImageTap} title="All boards" />
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Popover>
        </Layer>
      )}
    </Fragment>
  );
}

export default function Example() {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Box padding={6}>
      <Button
        accessibilityControls="popover-overlaypanel"
        accessibilityExpanded={showSheet}
        accessibilityHaspopup
        onClick={() => setShowSheet(true)}
        size="lg"
        text="Edit Pin"
      />

      {showSheet && (
        <Layer zIndex={new FixedZIndex(11)}>
          <OverlayPanel
            accessibilityDismissButtonLabel="Close edit Pin overlay panel"
            accessibilityLabel="Edit your Pin details"
            footer={
              <Flex>
                <Flex.Item flex="grow">
                  <Button
                    color="white"
                    onClick={() => setShowSheet(false)}
                    size="lg"
                    text="Delete"
                  />
                </Flex.Item>
                <Flex gap={{ column: 0, row: 2 }}>
                  <Button onClick={() => setShowSheet(false)} size="lg" text="Cancel" />
                  <Button
                    color="red"
                    onClick={() => setShowSheet(false)}
                    size="lg"
                    text="Done"
                    type="submit"
                  />
                </Flex>
              </Flex>
            }
            heading="Edit Pin"
            onDismiss={() => setShowSheet(false)}
            size="lg"
          >
            <Box display="flex" height={400} id="popover-overlaypanel" paddingX={8}>
              <Flex gap={{ row: 8, column: 0 }} width="100%">
                <Box paddingX={2} rounding={4} width={200}>
                  <Mask rounding={4}>
                    <Image
                      alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
                      color="rgb(231, 186, 176)"
                      naturalHeight={751}
                      naturalWidth={564}
                      src="https://i.ibb.co/7bQQYkX/stock2.jpg"
                    />
                  </Mask>
                </Box>
                <Flex.Item flex="grow">
                  <Flex direction="column" gap={{ column: 8, row: 0 }}>
                    <SelectBoard />
                    <TextArea
                      id="note"
                      label="Note"
                      onChange={() => {}}
                      placeholder="Add note"
                      value=""
                    />
                  </Flex>
                </Flex.Item>
              </Flex>
            </Box>
          </OverlayPanel>
        </Layer>
      )}
    </Box>
  );
}
