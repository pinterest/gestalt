import { Fragment, ReactNode, useState } from 'react';
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

export default function AccessibilityExample() {
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
          onClick={() => setShowComponent(true)}
          size="lg"
          text="Show Modal"
        />
      </Box>
      {showComponent ? (
        <Layer zIndex={zIndex}>
          <Modal
            accessibilityModalLabel="Choose how to claim site"
            align="start"
            footer={
              <Flex gap={2} justifyContent="end">
                <Button color="gray" text="Cancel" />
                <Button color="red" text="Next" />
              </Flex>
            }
            heading={
              <Flex justifyContent="between">
                <Heading accessibilityLevel={1} size="500">
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
            size="sm"
          >
            <RadioGroup id="claim-option" legend="Claim options" legendDisplay="hidden">
              <RadioGroup.RadioButton
                checked={claim === 'tag'}
                helperText="Paste this tag into the <head> section of your site's index.html file"
                id="claimTag"
                label="Add HTML tag"
                name="claim-type"
                onChange={() => setClaim('tag')}
                value="tag"
              />
              <RadioGroup.RadioButton
                checked={claim === 'file'}
                helperText="Download this file and upload it to your website's root directory"
                id="claimFile"
                label="Upload HTML file"
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
