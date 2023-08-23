// @flow strict
import { Fragment, type Node, useEffect, useRef, useState } from 'react';
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

export default function ScrollBoundaryContainerExample(): Node {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Button text="Edit Pin" onClick={() => setShowSheet(true)} size="lg" />

      {showSheet && (
        <Layer zIndex={SHEET_ZINDEX}>
          <OverlayPanel
            accessibilityDismissButtonLabel="Close edit Pin overlay panel"
            accessibilityLabel="Edit your Pin details"
            heading="Edit Pin"
            footer={
              <Flex>
                <Flex.Item flex="grow">
                  <Button
                    color="white"
                    text="Delete"
                    size="lg"
                    onClick={() => setShowSheet(false)}
                  />
                </Flex.Item>

                <Flex gap={{ column: 0, row: 2 }}>
                  <Button text="Cancel" size="lg" onClick={() => setShowSheet(false)} />

                  <Button
                    text="Done"
                    color="red"
                    size="lg"
                    type="submit"
                    onClick={() => setShowSheet(false)}
                  />
                </Flex>
              </Flex>
            }
            onDismiss={() => setShowSheet(false)}
            size="lg"
          >
            <Box display="flex" height={400} paddingX={8}>
              <Flex gap={{ row: 8, column: 0 }} width="100%">
                <Box width={200} paddingX={2} rounding={4}>
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
                      onChange={() => {}}
                      placeholder="Add note"
                      label="Note"
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
          iconEnd="arrow-down"
          accessibilityLabel="Select Board"
          onClick={() => setOpenPopover(!openPopover)}
          text={selectedBoard}
          ref={anchorRef}
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
              <Box flex="grow" marginEnd={4} marginStart={4} marginTop={6} marginBottom={8}>
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
                    <List title="Top choices" onSelect={handleSelect} />
                    <List title="All boards" onSelect={handleSelect} />
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

function List({ title, onSelect }: {| title: string, onSelect: (data: string) => void |}) {
  return (
    <Flex direction="column" gap={{ column: 4, row: 0 }}>
      <Text color="default" size="100">
        {title}
      </Text>

      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        {[
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
        ].map((data) => (
          <TapArea key={data[1]} onTap={() => onSelect(data[1])} rounding={2}>
            <Flex gap={{ row: 2, column: 0 }} alignItems="center">
              <Box height={50} width={50} overflow="hidden" rounding={2}>
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

function SearchBoardField() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <SearchField
      accessibilityLabel="Search boards field"
      id="searchField"
      onChange={() => {}}
      placeholder="Search boards"
      size="lg"
      ref={ref}
    />
  );
}
