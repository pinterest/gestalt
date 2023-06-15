// @flow strict
import { type Node } from 'react';
import { Box, Divider, Flex, Heading, Icon, Link, Status, Table, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import Blocking from '../../../graphics/messaging/blocking.svg';
import Emphemeral from '../../../graphics/messaging/ephemeral.svg';
import CampaignIssue from '../../../graphics/messaging/modals/campaignIssue.svg';
import DeleteBoard from '../../../graphics/messaging/modals/deleteBoard.svg';
import ExperienceTrends from '../../../graphics/messaging/modals/experienceTrends.svg';
import NewRecommendations from '../../../graphics/messaging/modals/newRecommendations.svg';
import PinSaved from '../../../graphics/messaging/modals/pinSaved.svg';
import SiteSpam from '../../../graphics/messaging/modals/siteSpam.svg';
import WebsiteBlocked from '../../../graphics/messaging/modals/websiteBlocked.svg';
import Section from '../../../graphics/messaging/section.svg';
import TopPage from '../../../graphics/messaging/topPage.svg';

export default function MessagingPriorityAndPlacementPage(): Node {
  return (
    <Page title="Messaging priority and placement">
      <PageHeader name="Messaging priority and placement" type="guidelines" />
      <MainSection name="Priority">
        <Text>
          In order to avoid too many messages stacked on the screen, we prioritize which messages to
          send first based on the severity of the issue.{' '}
        </Text>
        <MainSection.Subsection title="What goes first">
          <Box maxWidth={400}>
            <Table accessibilityLabel="Table of messaging priorities and types">
              <Table.Header>
                <Table.Row>
                  <Table.Cell>
                    <Text weight="bold">Priority</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text weight="bold">Status type</Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Text>Highest</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap={2}>
                      <Icon
                        accessibilityLabel="error"
                        icon="workflow-status-problem"
                        color="error"
                      />
                      <Text>Error</Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text>High</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap={2}>
                      <Icon
                        accessibilityLabel="warning"
                        icon="workflow-status-warning"
                        color="warning"
                      />
                      <Text>Warning</Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text>Medium</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap={2}>
                      <Icon
                        accessibilityLabel="success"
                        icon="workflow-status-ok"
                        color="success"
                      />
                      <Text>Success</Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text>Low</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap={2}>
                      <Icon
                        accessibilityLabel="recommendation"
                        icon="sparkle"
                        color="recommendation"
                      />
                      <Text>Recommendations</Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text>Lowest</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap={2}>
                      <Icon accessibilityLabel="info" icon="info-circle" color="info" />
                      <Text>Info</Text>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Box>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Prominence and placement"
        description="Prominence of a message is determined by its severity. The amount of time it remains on screen is also determined by severity."
      >
        <MainSection.Subsection title="Overlays">
          <Heading size="300" accessibilityLevel={4}>
            Blocking content—the most prominent
          </Heading>
          <Box maxWidth={678} maxHeight={409}>
            <Blocking />
          </Box>
          <Box maxWidth={556}>
            <Text>
              Messages that block the surface below them are placed in the center of the screen,
              both vertically and horizontally. They should be used sparingly to avoid blocking
              people from productivity and inspiration.
            </Text>
          </Box>

          <Flex gap={2}>
            <Text weight="bold">Current components:</Text>
            <Text>
              <Link href="/web/modal" underline="always">
                Modal
              </Link>
            </Text>
          </Flex>
          <Box marginTop={4} marginBottom={2} maxWidth={556}>
            <Text>
              Blocking content slows a person down from their usual flow, so here are some
              guidelines on when it’s okay to block content.
            </Text>
          </Box>
          <Box>
            <Flex alignItems="center">
              <Box padding={4} width="50%">
                <Flex gap={1} alignItems="center">
                  <Status type="ok" />
                  <Text weight="bold">When to use</Text>
                </Flex>
              </Box>
              <Box padding={4} width="50%" display="none" lgDisplay="block">
                <Text weight="bold">Example wireframe</Text>
              </Box>
            </Flex>
            <Box color="successWeak">
              <Flex direction="column">
                <Box color="successBase" height={4} width="100%" />
                <Box display="flex" alignItems="center" direction="column" lgDirection="row">
                  <Box padding={4} width="50%">
                    <Text>
                      To confirm that someone wants to peform a destructive/irreversible action
                    </Text>
                  </Box>
                  <Box padding={4} width="50%">
                    <DeleteBoard />
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" direction="column" lgDirection="row">
                  <Box padding={4} width="50%">
                    <Text>
                      When an issue is so severe that it’s hard to continue with a good experience
                    </Text>
                  </Box>
                  <Box padding={4} width="50%">
                    <WebsiteBlocked />
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" direction="column" lgDirection="row">
                  <Box padding={4} width="50%">
                    <Text>
                      To warn a person of something that can have serious consequences before they
                      continue
                    </Text>
                  </Box>
                  <Box padding={4} width="50%">
                    <SiteSpam />
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" direction="column" lgDirection="row">
                  <Box padding={4} width="50%">
                    <Text>
                      As an interstitial that leads to a much better experience we think a person
                      shouldn’t miss
                    </Text>
                  </Box>
                  <Box padding={4} width="50%">
                    <ExperienceTrends />
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Box>

          <Box>
            <Flex alignItems="center">
              <Box padding={4} width="50%">
                <Flex gap={1} alignItems="center">
                  <Status type="problem" />
                  <Text weight="bold">When not to use</Text>
                </Flex>
              </Box>
              <Box padding={4} width="50%" display="none" lgDisplay="block">
                <Text weight="bold">Example wireframe</Text>
              </Box>
            </Flex>
            <Box color="errorWeak">
              <Flex direction="column">
                <Box color="errorBase" height={4} width="100%" />
                <Box display="flex" alignItems="center" direction="column" lgDirection="row">
                  <Box padding={4} width="50%">
                    <Text>
                      To acknowledge completion of a task that doesn’t require follow up, like
                      pinning to a board. Use{' '}
                      <Link href="/web/toast" underline="always" display="inlineBlock">
                        Toast
                      </Link>{' '}
                      instead.
                    </Text>
                  </Box>
                  <Box padding={4} width="50%">
                    <PinSaved />
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" direction="column" lgDirection="row">
                  <Box padding={4} width="50%">
                    <Text>
                      To provide general information and recommendations. Use{' '}
                      <Link href="/web/callout" underline="always" display="inlineBlock">
                        Callout
                      </Link>{' '}
                      instead.
                    </Text>
                  </Box>
                  <Box padding={4} width="50%">
                    <NewRecommendations />
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" direction="column" lgDirection="row">
                  <Box padding={4} width="50%">
                    <Text>
                      To show an error or warning that applies to a section of a page, or that
                      doesn’t severely limit the user experience.
                    </Text>
                  </Box>
                  <Box padding={4} width="50%">
                    <CampaignIssue />
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box marginBottom={4} marginTop={8}>
            <Heading size="300" accessibilityLevel={4}>
              Not blocking content
            </Heading>
          </Box>
          <Box marginTop={-4}>
            <Heading size="200" accessibilityLevel={5}>
              Ephemeral—less prominent
            </Heading>
          </Box>
          <Box maxWidth={678} maxHeight={409}>
            <Emphemeral />
          </Box>
          <Box maxWidth={556} marginTop={4} marginBottom={0}>
            <Text>
              Small overlays that appear for a short period of time, usually 3–5 seconds depending
              on content. They do not prevent a user from accessing the main content and navigation
              on the surface underneath.
            </Text>
          </Box>
          <Box marginBottom={4}>
            <Flex gap={2}>
              <Text weight="bold">Current components:</Text>
              <Text>
                <Link href="/web/toast" underline="always">
                  Toast
                </Link>
              </Text>
            </Flex>
          </Box>
        </MainSection.Subsection>

        <MainSection.Subsection title="On surface">
          <Heading size="300" accessibilityLevel={4}>
            Top of the page—very prominent
          </Heading>
          <Box maxWidth={678} maxHeight={409}>
            <TopPage />
          </Box>
          <Box maxWidth={556} marginBottom={-4}>
            <Text>
              Place messages at the top of a page, below the main app nav if the alert or
              information applies to the entire page. Avoid stacking messages so that a person’s
              view isn’t cluttered and they can’t focus on the main information they came to see and
              interact with. Show the highest-severity ones first.
            </Text>
          </Box>
          <Box marginTop={4} marginBottom={4}>
            <Flex gap={2}>
              <Text weight="bold">Current components:</Text>
              <Text>
                <Link href="/web/callout" underline="always">
                  Callout
                </Link>
              </Text>
              <Text>
                <Link href="/web/slimbanner" underline="always">
                  SlimBanner
                </Link>
              </Text>
              <Text>
                <Link href="/web/upsell" underline="always">
                  Upsell
                </Link>
              </Text>
            </Flex>
          </Box>

          <Heading size="300" accessibilityLevel={4}>
            Ephemeral—less prominent
          </Heading>
          <Box maxWidth={678} maxHeight={409}>
            <Section />
          </Box>
          <Box maxWidth={556}>
            <Text>
              Place messages at the top of a page, below the main app nav if the alert or
              information applies to the entire page. Avoid stacking messages so that a person’s
              view isn’t cluttered and they can’t focus on the main information they came to see and
              interact with. Show the highest-severity ones first.
            </Text>
          </Box>
          <Flex gap={2}>
            <Text weight="bold">Current components:</Text>
            <Text>
              <Link href="/web/slimbanner" underline="always">
                SlimBanner
              </Link>
            </Text>
          </Flex>
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
