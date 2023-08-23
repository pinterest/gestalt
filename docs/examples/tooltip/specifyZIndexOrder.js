// @flow strict
import { Fragment, type Node, useState } from 'react';
import {
  Box,
  Button,
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

const MODAL_Z_INDEX = new FixedZIndex(11);

export default function ScrollBoundaryContainerExample(): Node {
  const [showModal, setShowModal] = useState(false);
  const [alignText, setAlignText] = useState('forceLeft');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Fragment>
        <Box display="flex" justifyContent="center">
          <Button
            accessibilityLabel="Edit this Pin"
            color="white"
            onClick={() => setShowModal(true)}
            text="Open edit modal"
            size="lg"
          />
        </Box>
        {showModal && (
          <Layer zIndex={MODAL_Z_INDEX}>
            <Modal
              accessibilityModalLabel="Edit Pin"
              heading="Edit"
              size="lg"
              onDismiss={() => setShowModal(false)}
              footer={
                <Box flex="grow" paddingX={3} paddingY={3}>
                  <Box
                    justifyContent="end"
                    marginStart={-1}
                    marginEnd={-1}
                    marginTop={-1}
                    marginBottom={-1}
                    display="flex"
                    wrap
                  >
                    <Box paddingX={1} paddingY={1}>
                      <Button text="Cancel" size="lg" onClick={() => setShowModal(false)} />
                    </Box>
                    <Box paddingX={1} paddingY={1}>
                      <Button
                        text="Save"
                        color="red"
                        size="lg"
                        type="submit"
                        onClick={() => setShowModal(false)}
                      />
                    </Box>
                  </Box>
                </Box>
              }
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
                        size="lg"
                        selected={alignText === 'left'}
                      />
                    </Tooltip>
                    <Tooltip text="Align center">
                      <IconButton
                        accessibilityLabel="Align center"
                        bgColor="white"
                        icon="text-align-center"
                        iconColor="darkGray"
                        onClick={() => setAlignText('center')}
                        size="lg"
                        selected={alignText === 'center'}
                      />
                    </Tooltip>
                    <Tooltip text="Align right">
                      <IconButton
                        accessibilityLabel="Align right"
                        bgColor="white"
                        icon="text-align-right"
                        iconColor="darkGray"
                        onClick={() => setAlignText('right')}
                        size="lg"
                        selected={alignText === 'right'}
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
