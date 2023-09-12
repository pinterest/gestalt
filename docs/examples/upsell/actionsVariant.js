// @flow strict
import { type Node, useState } from 'react';
import {
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
  Upsell,
} from 'gestalt';

export default function Example(): Node {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box marginStart={-1} marginEnd={-1}>
        <Upsell
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {},
          }}
          message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
          primaryAction={{
            accessibilityLabel: 'Send ads invite',
            label: 'Send invite',
            onClick: () => {
              setShowModal(!showModal);
            },
          }}
          secondaryAction={{
            accessibilityLabel: 'Learn more: Verified Merchant Program',
            href: 'https://help.pinterest.com/en/business/article/verified-merchant-program',
            label: 'Learn more',
            target: 'blank',
          }}
          title="Give $30, get $60 in ads credit"
        />

        {showModal && (
          <Layer>
            <Modal
              accessibilityModalLabel="Invite a friend to the Verified Merchant Program"
              footer={
                <Flex flex="grow" justifyContent="end">
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        setShowModal(!showModal);
                      }}
                      size="lg"
                      text="Cancel"
                    />
                    <Button color="red" size="lg" text="Send invite" />
                  </ButtonGroup>
                </Flex>
              }
              heading="Verified Merchant Program Invitation"
              onDismiss={() => {
                setShowModal(!showModal);
              }}
              size="md"
              subHeading="When your friend spends their first $30 on ads, you’ll earn $60 of ads credit, and they’ll get $30 of ads credit, too."
            >
              <Flex direction="row">
                <Column span={12}>
                  <Box display="flex" paddingY={2} paddingX={8}>
                    <Column span={4}>
                      <Label htmlFor="name">
                        <Text align="forceLeft" weight="bold">
                          Friend&apos;s Name
                        </Text>
                      </Label>
                    </Column>

                    <Column span={8}>
                      <TextField id="name" onChange={() => undefined} />
                    </Column>
                  </Box>

                  <Box display="flex" paddingY={2} paddingX={8}>
                    <Column span={4}>
                      <Label htmlFor="email">
                        <Text align="forceLeft" weight="bold">
                          Friend&apos;s E-mail
                        </Text>
                      </Label>
                    </Column>

                    <Column span={8}>
                      <TextField id="email" onChange={() => undefined} />
                    </Column>
                  </Box>

                  <Box display="flex" paddingY={2} paddingX={8}>
                    <Column span={4}>
                      <Label htmlFor="desc">
                        <Text align="forceLeft" weight="bold">
                          Personal Message
                        </Text>
                      </Label>
                    </Column>

                    <Column span={8}>
                      <TextArea id="desc" onChange={() => undefined} />
                    </Column>
                  </Box>
                </Column>
              </Flex>
            </Modal>
          </Layer>
        )}
      </Box>
    </Box>
  );
}
