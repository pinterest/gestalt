import { Fragment, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Heading,
  IconButton,
  Image,
  Layer,
  Modal,
  Text,
  Tooltip,
} from 'gestalt';

/* ======= Z-INDEX  ======= */
const PAGE_HEADER_ZINDEX = new FixedZIndex(10);
const MODAL_ZINDEX = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

export default function ScrollBoundaryContainerExample() {
  const [showModal, setShowModal] = useState(false);
  const [alignText, setAlignText] = useState('forceLeft');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Fragment>
        <Box display="flex" justifyContent="center">
          <Button
            accessibilityLabel="Edit this Pin"
            color="gray"
            onClick={() => setShowModal(true)}
            size="lg"
            text="Open edit modal"
          />
        </Box>
        {showModal && (
          <Layer zIndex={MODAL_ZINDEX}>
            <Modal
              accessibilityModalLabel="Edit Pin"
              footer={
                <Box flex="grow" paddingX={3} paddingY={3}>
                  <Box
                    display="flex"
                    justifyContent="end"
                    marginBottom={-1}
                    marginEnd={-1}
                    marginStart={-1}
                    marginTop={-1}
                    wrap
                  >
                    <Box paddingX={1} paddingY={1}>
                      <Button onClick={() => setShowModal(false)} size="lg" text="Cancel" />
                    </Box>
                    <Box paddingX={1} paddingY={1}>
                      <Button
                        color="red"
                        onClick={() => setShowModal(false)}
                        size="lg"
                        text="Save"
                        type="submit"
                      />
                    </Box>
                  </Box>
                </Box>
              }
              heading="Edit"
              onDismiss={() => setShowModal(false)}
              size="lg"
            >
              <Box column={12} display="flex" justifyContent="center">
                <Box column={6} paddingX={4}>
                  <Image
                    alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
                    color="rgb(231, 186, 176)"
                    naturalHeight={751}
                    naturalWidth={564}
                    src="https://i.ibb.co/7bQQYkX/stock2.jpg"
                  >
                    <Box padding={3}>
                      {/* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'TextAlignType | undefined'. */}
                      <Heading align={alignText} color="light" size="600">
                        Tropic greens: The taste of Petrol and Porcelain
                      </Heading>
                    </Box>
                  </Image>
                </Box>
                <Flex direction="column" gap={{ column: 4, row: 0 }}>
                  <Heading size="400">Text Overlay</Heading>
                  <Text size="300">Add text directly onto your Pin</Text>
                  <Text size="300" weight="bold">
                    Alignment
                  </Text>
                  <Flex>
                    <Tooltip text="Align left">
                      <IconButton
                        accessibilityLabel="Align left"
                        bgColor="white"
                        icon="text-align-left"
                        iconColor="darkGray"
                        onClick={() => setAlignText('left')}
                        selected={alignText === 'left'}
                        size="lg"
                      />
                    </Tooltip>
                    <Tooltip text="Align center">
                      <IconButton
                        accessibilityLabel="Align center"
                        bgColor="white"
                        icon="text-align-center"
                        iconColor="darkGray"
                        onClick={() => setAlignText('center')}
                        selected={alignText === 'center'}
                        size="lg"
                      />
                    </Tooltip>
                    <Tooltip text="Align right">
                      <IconButton
                        accessibilityLabel="Align right"
                        bgColor="white"
                        icon="text-align-right"
                        iconColor="darkGray"
                        onClick={() => setAlignText('right')}
                        selected={alignText === 'right'}
                        size="lg"
                      />
                    </Tooltip>
                  </Flex>
                </Flex>
              </Box>
            </Modal>
          </Layer>
        )}
      </Fragment>
    </Box>
  );
}
