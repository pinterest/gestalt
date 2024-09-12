import { Fragment, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
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

/* ======= Z-INDEX  ======= */
const PAGE_HEADER_ZINDEX = new FixedZIndex(10);
const SHEET_ZINDEX = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

function SearchBoardField() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <SearchField
      // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLInputElement> | undefined'.
      ref={ref}
      accessibilityLabel="Search boards field"
      id="searchField"
      onChange={() => {}}
      placeholder="Search boards"
      size="lg"
    />
  );
}

function List({ title, onSelect }: { title: string; onSelect: (data: string) => void }) {
  return (
    <Flex direction="column" gap={{ column: 4, row: 0 }}>
      <Text color="default" size="100">
        {title}
      </Text>

      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        {(
          [
            [
              'https://i.ibb.co/s3PRJ8v/photo-1496747611176-843222e1e57c.webp',
              'Fashion',
              'Thumbnail image: a white dress with red flowers',
            ],
            [
              'https://i.ibb.co/swC1qpp/IMG-0494.jpg',
              'Food',
              'Thumbnail image: a paella with shrimp, green peas, red peppers and yellow rice',
            ],
            [
              'https://i.ibb.co/PFVF3JH/photo-1583847268964-b28dc8f51f92.webp',
              'Home',
              'Thumbnail image: a living room with a white couch, two paints in the wall and wooden furniture',
            ],
          ] as const
        ).map((data) => (
          <TapArea key={data[1]} onTap={() => onSelect(data[1])} rounding={2}>
            <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
              <Box height={50} overflow="hidden" rounding={2} width={50}>
                <Mask rounding={2}>
                  <Image
                    alt={data[2]}
                    color="rgb(231, 186, 176)"
                    naturalHeight={50}
                    naturalWidth={50}
                    src={data[0]}
                  />
                </Mask>
              </Box>

              <Text align="center" color="default" weight="bold">
                {data[1]}
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
  const anchorRef = useRef<HTMLElement | null>(null);

  const handleSelect = (data: string) => {
    setSelectedBoard(data);
    setOpenPopover(false);
  };

  return (
    <Fragment>
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Text size="100">Board</Text>

        <Button
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLAnchorElement | HTMLButtonElement> | undefined'.
          ref={anchorRef}
          accessibilityLabel="Select Board"
          iconEnd="arrow-down"
          onClick={() => setOpenPopover(!openPopover)}
          text={selectedBoard}
        />
      </Flex>

      {openPopover && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpenPopover(false)}
            positionRelativeToAnchor={false}
            size="xl"
          >
            <Box width={360}>
              <Box flex="grow" marginBottom={8} marginEnd={4} marginStart={4} marginTop={6}>
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
                    <List onSelect={handleSelect} title="Top choices" />
                    <List onSelect={handleSelect} title="All boards" />
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

export default function ScrollBoundaryContainerExample() {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Button onClick={() => setShowSheet(true)} size="lg" text="Edit Pin" />

      {showSheet && (
        <Layer zIndex={SHEET_ZINDEX}>
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
            <Box display="flex" height={400} paddingX={8}>
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
