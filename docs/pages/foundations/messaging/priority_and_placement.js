// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Divider, Flex, Heading, Icon, Link, Status, Table, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
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

export default function MessagingPriorityAndPlacementPage(): ReactNode {
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
                        color="error"
                        icon="workflow-status-problem"
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
                        color="warning"
                        icon="workflow-status-warning"
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
                        color="success"
                        icon="workflow-status-ok"
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
                        color="recommendation"
                        icon="sparkle"
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
                      <Icon accessibilityLabel="info" color="info" icon="info-circle" />
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
        description="Prominence of a message is determined by its severity. The amount of time it remains on screen is also determined by severity."
        name="Prominence and placement"
      >
        <MainSection.Subsection title="Overlays">
          <Heading accessibilityLevel={4} size="300">
            Blocking content—the most prominent
          </Heading>
          <Box maxHeight={409} maxWidth={678}>
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
          <Box marginBottom={2} marginTop={4} maxWidth={556}>
            <Text>
              Blocking content slows a person down from their usual flow, so here are some
              guidelines on when it’s okay to block content.
            </Text>
          </Box>
          <Box>
            <Flex alignItems="center">
              <Box padding={4} width="50%">
                <Flex alignItems="center" gap={1}>
                  <Status type="ok" />
                  <Text weight="bold">When to use</Text>
                </Flex>
              </Box>
              <Box display="none" lgDisplay="block" padding={4} width="50%">
                <Text weight="bold">Example wireframe</Text>
              </Box>
            </Flex>
            <Box color="successWeak">
              <Flex direction="column">
                <Box color="successBase" height={4} width="100%" />
                <Box alignItems="center" direction="column" display="flex" lgDirection="row">
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
                <Box alignItems="center" direction="column" display="flex" lgDirection="row">
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
                <Box alignItems="center" direction="column" display="flex" lgDirection="row">
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
                <Box alignItems="center" direction="column" display="flex" lgDirection="row">
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
                <Flex alignItems="center" gap={1}>
                  <Status type="problem" />
                  <Text weight="bold">When not to use</Text>
                </Flex>
              </Box>
              <Box display="none" lgDisplay="block" padding={4} width="50%">
                <Text weight="bold">Example wireframe</Text>
              </Box>
            </Flex>
            <Box color="errorWeak">
              <Flex direction="column">
                <Box color="errorBase" height={4} width="100%" />
                <Box alignItems="center" direction="column" display="flex" lgDirection="row">
                  <Box padding={4} width="50%">
                    <Text>
                      To acknowledge completion of a task that doesn’t require follow up, like
                      pinning to a board. Use{' '}
                      <Link display="inlineBlock" href="/web/toast" underline="always">
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
                <Box alignItems="center" direction="column" display="flex" lgDirection="row">
                  <Box padding={4} width="50%">
                    <Text>
                      To provide general information and recommendations. Use{' '}
                      <Link display="inlineBlock" href="/web/bannercallout" underline="always">
                        BannerCallout
                      </Link>{' '}
                      instead.
                    </Text>
                  </Box>
                  <Box padding={4} width="50%">
                    <NewRecommendations />
                  </Box>
                </Box>
                <Divider />
                <Box alignItems="center" direction="column" display="flex" lgDirection="row">
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
            <Heading accessibilityLevel={4} size="300">
              Not blocking content
            </Heading>
          </Box>
          <Box marginTop={-4}>
            <Heading accessibilityLevel={5} size="200">
              Ephemeral—less prominent
            </Heading>
          </Box>
          <Box maxHeight={409} maxWidth={678}>
            <Emphemeral />
          </Box>
          <Box marginBottom={0} marginTop={4} maxWidth={556}>
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
          <Heading accessibilityLevel={4} size="300">
            Top of the page—very prominent
          </Heading>
          <Box maxHeight={409} maxWidth={678}>
            <TopPage />
          </Box>
          <Box marginBottom={-4} maxWidth={556}>
            <Text>
              Place messages at the top of a page, below the main app nav if the alert or
              information applies to the entire page. Avoid stacking messages so that a person’s
              view isn’t cluttered and they can’t focus on the main information they came to see and
              interact with. Show the highest-severity ones first.
            </Text>
          </Box>
          <Box marginBottom={4} marginTop={4}>
            <Flex gap={2}>
              <Text weight="bold">Current components:</Text>
              <Text>
                <Link href="/web/bannercallout" underline="always">
                  BannerCallout
                </Link>
              </Text>
              <Text>
                <Link href="/web/bannerslim" underline="always">
                  BannerSlim
                </Link>
              </Text>
              <Text>
                <Link href="/web/bannerupsell" underline="always">
                  BannerUpsell
                </Link>
              </Text>
            </Flex>
          </Box>

          <Heading accessibilityLevel={4} size="300">
            Ephemeral—less prominent
          </Heading>
          <Box maxHeight={409} maxWidth={678}>
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
              <Link href="/web/bannerslim" underline="always">
                BannerSlim
              </Link>
            </Text>
          </Flex>
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
