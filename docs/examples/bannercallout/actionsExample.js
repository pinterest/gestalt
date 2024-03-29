// @flow strict
import { type Node as ReactNode, useState } from 'react';
import {
  BannerCallout,
  Box,
  Button,
  ButtonGroup,
  Column,
  Flex,
  Label,
  Layer,
  Modal,
  Text,
  TextArea,
  TextField,
} from 'gestalt';

export default function Example(): ReactNode {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((currState) => !currState);
  };

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingX={8} paddingY={8}>
        <BannerCallout
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="Apply to the Verified Merchant Program"
          primaryAction={{
            accessibilityLabel: 'Apply now: verified merchant program',
            label: 'Apply now',
            onClick: toggleModal,
            role: 'button',
          }}
          secondaryAction={{
            accessibilityLabel: 'Learn more: Verified Merchant Program',
            href: 'https://help.pinterest.com/en/business/article/verified-merchant-program',
            label: 'Learn more',
            target: 'blank',
            role: 'link',
          }}
          title="Your business account was created!"
          type="info"
        />

        {showModal && (
          <Layer>
            <Modal
              accessibilityModalLabel="Apply for the Verified Merchant Program"
              footer={
                <Flex flex="grow" justifyContent="end">
                  <ButtonGroup>
                    <Button onClick={toggleModal} size="lg" text="Cancel" />
                    <Button color="red" onClick={toggleModal} size="lg" text="Save" />
                  </ButtonGroup>
                </Flex>
              }
              heading="Verified Merchant Program Application"
              onDismiss={toggleModal}
              size="md"
            >
              <Flex>
                <Column span={12}>
                  <Box display="flex" paddingX={8} paddingY={2}>
                    <Column span={4}>
                      <Label htmlFor="name">
                        <Text align="start" weight="bold">
                          Name
                        </Text>
                      </Label>
                    </Column>
                    <Column span={8}>
                      <TextField id="name" onChange={() => {}} />
                    </Column>
                  </Box>

                  <Box display="flex" paddingX={8} paddingY={2}>
                    <Column span={4}>
                      <Label htmlFor="desc">
                        <Text align="start" weight="bold">
                          Business Description
                        </Text>
                      </Label>
                    </Column>
                    <Column span={8}>
                      <TextArea id="desc" onChange={() => {}} />
                    </Column>
                  </Box>
                </Column>
              </Flex>
            </Modal>
          </Layer>
        )}
      </Box>
    </Flex>
  );
}
