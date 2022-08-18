// @flow strict
import { Text, Table, Icon, Flex, Heading, Box } from 'gestalt';
import { type Node } from 'react';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import Blocking from '../../../graphics/messaging/blocking.svg';
import Emphemeral from '../../../graphics/messaging/ephemeral.svg';
import Section from '../../../graphics/messaging/section.svg';
import TopPage from '../../../graphics/messaging/topPage.svg';

export default function MessagingPriorityAndPlacementPage(): Node {
  return (
    <Page title="Messaging priority and placement">
      <PageHeader name="Messaging priority and placement" type="guidelines" />
      <MainSection name="Priority">
        <Text>In order to avoid too many messages stacked on the screen, we prioritize which messages to send first based on the severity of the issue. </Text>
        <MainSection.Subsection title="What goes first">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Cell><Text weight='bold'>Priority</Text></Table.Cell>
                <Table.Cell><Text weight='bold'>Status type</Text></Table.Cell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell><Text>Highest</Text></Table.Cell>
                <Table.Cell><Flex gap={2}><Icon icon="workflow-status-problem" color='error' /><Text>Error</Text></Flex></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><Text>High</Text></Table.Cell>
                <Table.Cell><Flex gap={2}><Icon icon="workflow-status-warning" color='warning' /><Text>Warning</Text></Flex></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><Text>Medium</Text></Table.Cell>
                <Table.Cell><Flex gap={2}><Icon icon="workflow-status-ok" color='success' /><Text>Success</Text></Flex></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><Text>Low</Text></Table.Cell>
                <Table.Cell><Flex gap={2}><Icon icon="sparkle" color='recommendation' /><Text>Recommendations</Text></Flex></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><Text>Lowest</Text></Table.Cell>
                <Table.Cell><Flex gap={2}><Icon icon="info-circle" color='info' /><Text>Info</Text></Flex></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </MainSection.Subsection>

      </MainSection>
      <MainSection name="Prominence and placement" description="Prominence of a message is determined by its severity. The amount of time it remains on screen is also determined by severity." >
        <MainSection.Subsection title="Overlays">
          <Heading size={300} accessibilityLevel={4}>Blocking—the most prominent</Heading>
          <Blocking />
          <Text>Messages that block the surface below them are placed in the center of the screen, both vertically and horizontally. They should be used sparingly to avoid blocking people from productivity and inspiration.</Text>

          <Heading size={300} accessibilityLevel={4}>Current components: Modal</Heading>
          <Text>Blocking content slows a person down from their usual flow, so here are some guidelines on when it’s okay to block content.</Text>

          <Box color='successWeak'>
            <Flex direction='column'>
              <Flex><Box><Text>To confirm that someone wants to peform a destructive//irreversible action</Text></Box><Box>foo</Box></Flex>
              <Flex><Box><Text>When an issue is so severe that it’s hard to continue with a good experience</Text></Box><Box>foo</Box></Flex>
            </Flex>
          </Box>

          <Heading size={300} accessibilityLevel={4}>Foo</Heading>
        </MainSection.Subsection>
        <MainSection.Subsection title="Not-blocking">
          <Emphemeral />
        </MainSection.Subsection>
        <MainSection.Subsection title="On surface">
          <TopPage />

          <Section />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
