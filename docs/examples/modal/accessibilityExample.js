// @flow strict
import { Fragment, type Node, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Heading,
  IconButton,
  Layer,
  Modal,
  RadioGroup,
} from 'gestalt';

export default function AccessibilityExample(): Node {
  const [showComponent, setShowComponent] = useState(true);
  const [claim, setClaim] = useState('tag');

  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Fragment>
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          text="Show Modal"
          size="lg"
          onClick={() => setShowComponent(true)}
        />
      </Box>
      {showComponent ? (
        <Layer zIndex={zIndex}>
          <Modal
            accessibilityModalLabel="Choose how to claim site"
            align="start"
            heading={
              <Flex justifyContent="between">
                <Heading size="500" accessibilityLevel={1}>
                  Pick claim option
                </Heading>
                <IconButton
                  accessibilityLabel="Dismiss modal"
                  bgColor="white"
                  icon="cancel"
                  iconColor="darkGray"
                  onClick={() => setShowComponent(false)}
                  size="sm"
                />
              </Flex>
            }
            onDismiss={() => {
              setShowComponent(false);
            }}
            footer={
              <Flex justifyContent="end" gap={2}>
                <Button color="gray" text="Cancel" />
                <Button color="red" text="Next" />
              </Flex>
            }
            size="sm"
          >
            <RadioGroup id="claim-option" legend="Claim options" legendDisplay="hidden">
              <RadioGroup.RadioButton
                checked={claim === 'tag'}
                id="claimTag"
                label="Add HTML tag"
                helperText="Paste this tag into the <head> section of your site's index.html file"
                name="claim-type"
                onChange={() => setClaim('tag')}
                value="tag"
              />
              <RadioGroup.RadioButton
                checked={claim === 'file'}
                id="claimFile"
                label="Upload HTML file"
                helperText="Download this file and upload it to your website's root directory"
                name="claim-type"
                onChange={() => setClaim('file')}
                value="file"
              />
            </RadioGroup>
          </Modal>
        </Layer>
      ) : null}
    </Fragment>
  );
}
