// @flow strict
import { type Node, useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  IconButton,
  RadioButton,
  ScrollBoundaryContainer,
  Text,
  Tooltip,
} from 'gestalt';

export default function ScrollBoundaryContainerExample(): Node {
  const [content, setContent] = useState<string | null>(null);
  const [claimed, setClaimed] = useState<string | null>(null);
  const [device, setDevice] = useState<string | null>(null);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <ScrollBoundaryContainer overflow="scrollY" height={200}>
        <Flex width={300} direction="column" gap={{ column: 4, row: 0 }}>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
              <Text weight="bold" size="400">
                Content type
              </Text>
              <Tooltip
                idealDirection="right"
                text="See stats about different types of content created by you and/or others on Pinterest. Filter to get more details on your organic (not an ad) and paid (promoted as an ad) content."
              >
                <IconButton
                  accessibilityLabel="Information"
                  bgColor="white"
                  icon="info-circle"
                  iconColor="darkGray"
                />
              </Tooltip>
            </Flex>
            <Box display="flex" direction="column">
              <Box paddingY={1}>
                <RadioButton
                  checked={content === 'all'}
                  id="allcontent"
                  label="All"
                  name="content"
                  onChange={() => setContent('all')}
                  value="all"
                />
              </Box>
              <Box paddingY={1}>
                <RadioButton
                  checked={content === 'organic'}
                  id="organic"
                  label="Organic"
                  name="content"
                  onChange={() => setContent('organic')}
                  value="organic"
                />
              </Box>
              <Box paddingY={1}>
                <RadioButton
                  checked={content === 'paid'}
                  id="paid"
                  label="Paid and earned"
                  name="content"
                  onChange={() => setContent('paid')}
                  value="paid"
                />
              </Box>
            </Box>
          </Flex>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
              <Text weight="bold" size="400">
                Claimed account
              </Text>
              <Tooltip
                idealDirection="right"
                text="See stats for Pins linked to your claimed accounts like websites, Etsy, Instagram or Youtube. The Other Pins category includes Pins you’ve published or saved that don’t link to any of your claimed accounts."
              >
                <Icon icon="info-circle" accessibilityLabel="Information" color="default" />
              </Tooltip>
            </Flex>
            <Box display="flex" direction="column">
              <Box paddingY={1}>
                <RadioButton
                  checked={claimed === 'all'}
                  id="allclaimed"
                  label="All Pins"
                  name="claimed"
                  onChange={() => setClaimed('all')}
                  value="all"
                />
              </Box>
              <Box paddingY={1}>
                <RadioButton
                  checked={claimed === 'instagram'}
                  id="instagram"
                  label="Instagram"
                  name="claimed"
                  onChange={() => setClaimed('instagram')}
                  value="instagram"
                />
              </Box>
              <Box paddingY={1}>
                <RadioButton
                  checked={claimed === 'other'}
                  id="other"
                  label="Other pins"
                  name="claimed"
                  onChange={() => setClaimed('other')}
                  value="other"
                />
              </Box>
            </Box>
          </Flex>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
              <Text weight="bold" size="400">
                Device
              </Text>
              <Tooltip
                idealDirection="right"
                text="See stats for the different devices your Pinterest traffic is coming from."
              >
                <Icon icon="info-circle" accessibilityLabel="Information" color="default" />
              </Tooltip>
            </Flex>
            <Box display="flex" direction="column">
              <Box paddingY={1}>
                <RadioButton
                  checked={device === 'all'}
                  id="alldevices"
                  label="All"
                  name="device"
                  onChange={() => setDevice('all')}
                  value="all"
                />
              </Box>
              <Box paddingY={1}>
                <RadioButton
                  checked={device === 'mobile'}
                  id="mobile"
                  label="Mobile"
                  name="device"
                  onChange={() => setDevice('mobile')}
                  value="mobile"
                />
              </Box>
              <Box paddingY={1}>
                <RadioButton
                  checked={device === 'desktop'}
                  id="desktop"
                  label="Desktop"
                  name="device"
                  onChange={() => setDevice('desktop')}
                  value="desktop"
                />
              </Box>
              <Box paddingY={1}>
                <RadioButton
                  checked={device === 'tablet'}
                  id="tablet"
                  label="Tablet"
                  name="device"
                  onChange={() => setDevice('tablet')}
                  value="tablet"
                />
              </Box>
            </Box>
          </Flex>
        </Flex>
      </ScrollBoundaryContainer>
    </Box>
  );
}
