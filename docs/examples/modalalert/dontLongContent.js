// @flow strict
import { Fragment, type Node, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Flex, Layer, ModalAlert, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState(true);

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
          <ModalAlert
            accessibilityModalLabel="Idea Pin Creator Code"
            heading="Publish new Idea Pin?"
            primaryAction={{
              accessibilityLabel: 'Publish',
              label: 'Publish',
              onClick: () => {},
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel',
              label: 'Cancel',
              onClick: () => {},
            }}
            onDismiss={() => {}}
          >
            <Box>
              <Text>
                Idea pins must conform to our Creator Code, a commitment to kindness for everyone on
                Pinterest. We expect everyone to follow these guidelines and lead with kindness when
                you create new content or interact with other people on Pinterest:
              </Text>
              <Box paddingY={2}>
                <Flex gap={2} direction="column">
                  <Text>
                    - Be kind—Being expressive shouldn’t come at the expense of others. Even if it’s
                    meant to be provocative, ask yourself if the content you post might insult or
                    harm someone else. For example: “Fashion don’ts” that mock or shame individuals
                    who wear certain clothing.&nbsp;
                  </Text>
                  <Text>
                    - Check your facts—Take time to pause and check the facts behind what you share.
                    In a world that moves fast, it can be easy to spread information that isn’t
                    true. For example: Opinion, stated as fact, about activist movements.
                  </Text>
                  <Text>
                    - Do no harm—While it’s great to create to connect with your audience in unique
                    ways, avoid calls to action that might cause harm. For example: A DIY challenge
                    that may pose health or safety risks.
                  </Text>
                  <Text>
                    - Watch for triggers—Sometimes ideas that are meant to be artistic can cross a
                    line. To maintain a safe space for everyone, explicit content isn’t allowed,
                    even if well intentioned. For example: Photography that sexually objectifies a
                    person
                  </Text>
                  <Text>
                    - Practice inclusion—True inspiration is supportive of everyone. Make sure not
                    to publish content that excludes or puts down certain people or communities. For
                    example: “Before and after” photos that body shames individuals.
                  </Text>
                </Flex>
              </Box>
            </Box>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
