import { ReactNode } from 'react';
import { Box, Flex, Image, Text } from 'gestalt';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import IllAlt1 from '../../graphics/illustration/ill-alt-1.svg';
import IllAlt2 from '../../graphics/illustration/ill-alt-2.svg';
import IllColor from '../../graphics/illustration/ill-color.svg';
import IllContext from '../../graphics/illustration/ill-context.svg';
import IllEmptyLarge from '../../graphics/illustration/ill-empty-lg.svg';
import IllEmptyMedium1 from '../../graphics/illustration/ill-empty-md-1.svg';
import IllEmptyMedium2 from '../../graphics/illustration/ill-empty-md-2.svg';
import IllErrorLarge from '../../graphics/illustration/ill-error-lg.svg';
import IllErrorMedium1 from '../../graphics/illustration/ill-error-md-1.svg';
import IllErrorMedium2 from '../../graphics/illustration/ill-error-md-2.svg';
import IllFullpage from '../../graphics/illustration/ill-fullpage.svg';
import IllHeader from '../../graphics/illustration/ill-header.svg';
import IllLarge from '../../graphics/illustration/ill-large.svg';
import IllLoadingLarge from '../../graphics/illustration/ill-loading-lg.svg';
import IllLoadingMedium1 from '../../graphics/illustration/ill-loading-md-1.svg';
import IllLoadingMedium2 from '../../graphics/illustration/ill-loading-md-2.svg';
import IllMedium from '../../graphics/illustration/ill-medium.svg';
import IllMessaging from '../../graphics/illustration/ill-messaging.svg';
import IllMobileExample from '../../graphics/illustration/ill-mobile-example.svg';
import IllResize from '../../graphics/illustration/ill-resize.svg';
import IllSmall from '../../graphics/illustration/ill-small.svg';
import IllSuccess from '../../graphics/illustration/ill-success.svg';
import IllSuccessLarge from '../../graphics/illustration/ill-success-lg.svg';
import IllSuccessMedium1 from '../../graphics/illustration/ill-success-md-1.svg';
import IllSuccessMedium2 from '../../graphics/illustration/ill-success-md-2.svg';
import IllWebExample from '../../graphics/illustration/ill-web-example.svg';
import IllWhitespace from '../../graphics/illustration/ill-whitespace.svg';

export default function IllustrationPage() {
  return (
    <Page title="Illustration">
      <PageHeader
        description={`Illustrations bring meaning and emotion to otherwise simple layouts. They can add context, enhance information comprehension and add visual interest. Generally, illustrations should be used in conjunction with blocks of informative text.
`}
        name="Illustration"
        type="guidelines"
      />
      <Flex alignItems="center" justifyContent="center" overflow="hidden" width="100%">
        <IllHeader />
      </Flex>

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
            - In support of a text block relating to the states: Empty, Error, Success and Loading
            - In experiences that are full page or in alignment with blocks of informative content
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
            - Without a purpose as a decorative element. Illustrations should always accompany content
            - In an experience that competes with user content and Pins
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card description="Use illustrations at the recommended size." type="do">
            <Flex overflow="hidden">
              <IllSuccess />
            </Flex>
          </MainSection.Card>
          <MainSection.Card
            description="Increase or shrink the size of illustrations past their prescribed size. If you need something smaller, consider using an icon."
            type="don't"
          >
            <Flex overflow="hidden">
              <IllResize />
            </Flex>
          </MainSection.Card>
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            description="Allow the illustrations to have plenty of surrounding white space."
            type="do"
          >
            <Flex overflow="hidden">
              <IllWhitespace />
            </Flex>
          </MainSection.Card>
          <MainSection.Card
            description="Place illustrations on top of other elements such as images or text."
            type="don't"
          >
            <Box height="100%" overflow="hidden" width="100%">
              <Image
                alt="An illustration placed on top of an image."
                fit="contain"
                naturalHeight={614}
                naturalWidth={834}
                src="https://i.pinimg.com/originals/de/5e/95/de5e95c743ace131cc81b4e50a9e6aed.jpg"
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            description="Use the correct illustration type in the correct context. For example, use a loading illustration for content about processing."
            type="do"
          >
            <Flex overflow="hidden">
              <IllContext />
            </Flex>
          </MainSection.Card>
          <MainSection.Card
            description="Change the color, line thickness or subject of the illustration."
            type="don't"
          >
            <Flex overflow="hidden">
              <IllColor />
            </Flex>
          </MainSection.Card>
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            description="Use illustrations in experiences that are full-page or in alignment with blocks of informative content."
            type="do"
          >
            <Flex overflow="hidden">
              <IllFullpage />
            </Flex>
          </MainSection.Card>
          <MainSection.Card
            description="Use illustrations to replace crucial or in-the-moment messaging patterns like BannerCallout, BannerSlim or Toast. Learn more about [available messaging components](messaging/available_components)"
            type="don't"
          >
            <Flex overflow="hidden">
              <IllMessaging />
            </Flex>
          </MainSection.Card>
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Accessibility">
        <MainSection.Subsection
          description={`Illustrations should always accompany content. Different cultures don’t always interpret illustrations in the same way. Accompanying content can help to add the appropriate context.
        `}
          title="Pair with text"
        />

        <MainSection.Subsection
          description={`Illustrations should include a title that describes the image. A title adds valuable information for low-vision or screen reader users.
        `}
          title="Include a title"
        >
          <Flex alignContent="between" direction="row" gap={6} wrap>
            <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
              <Box
                borderStyle="sm"
                color="light"
                display="inlineBlock"
                justifyContent="center"
                marginBottom={3}
                overflow="hidden"
                rounding={2}
              >
                <IllAlt1 />
              </Box>
              <Text>title=&ldquo;Line illustration of a wilted plant in a pot.&ldquo;</Text>
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
              <Box
                borderStyle="sm"
                color="light"
                display="inlineBlock"
                justifyContent="center"
                marginBottom={3}
                overflow="hidden"
                rounding={2}
              >
                <IllAlt2 />
              </Box>
              <Text>
                title=&ldquo;Line illustration of a coffee cup with a sad face in the coffee
                foam.&ldquo;
              </Text>
            </Flex.Item>
          </Flex>
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Size">
        <Flex alignContent="between" direction="row" gap={6} wrap>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllLarge />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Large</Text>
              <Text>
                These are more complex illustrations. They include multiple illustration subjects in
                a scene-like lockup. Large illustrations should be used in experiences where there
                is ample white space.
              </Text>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllMedium />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Medium</Text>
              <Text>
                These illustrations are individual pieces of the Large variant. They are smaller and
                more contained. Instead of depicting a scene, they stand on their own.
              </Text>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllSmall />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Small</Text>
              <Text>
                The small illustration is the simplest of the three. They are used in areas where
                space is limited, like tables or small mobile experiences.
              </Text>
            </Flex>
          </Flex.Item>
        </Flex>
      </MainSection>

      <MainSection name="Status">
        <MainSection.Subsection
          description={`Display when content is not currently available or is unable to load. For example, when a user is interacting with a card in a dashboard for the first time. `}
          title="Empty"
        />

        <Flex alignContent="between" direction="row" gap={6} wrap>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllEmptyLarge />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Large</Text>
              <Text>Large empty</Text>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllEmptyMedium1 />
            </Box>
            <Flex direction="column" gap={2}>
              <Flex direction="column" gap={2}>
                <Text weight="bold">Medium option 1</Text>
                <Text>Sad puzzle</Text>
              </Flex>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllEmptyMedium2 />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Medium option 2</Text>
              <Text>Spool</Text>
            </Flex>
          </Flex.Item>
        </Flex>
        <MainSection.Subsection
          description={`Display when something goes right. Used for success or celebration moments that are more permanent or long-lasting. `}
          title="Success"
        />

        <Flex alignContent="between" direction="row" gap={6} wrap>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllSuccessLarge />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Large</Text>
              <Text>Success</Text>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllSuccessMedium1 />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Success option 1</Text>
              <Text>Disco ball</Text>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllSuccessMedium2 />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Success option 2</Text>
              <Text>Happy plant</Text>
            </Flex>
          </Flex.Item>
        </Flex>
        <MainSection.Subsection
          description={`Display when something goes wrong or extra care should be taken. Used for moments that are more permanent/long-lasting, for example a 404 page. If the message is more critical or requires action, use an [appropriate messaging component](messaging/available_components) instead. `}
          title="Error"
        />

        <Flex alignContent="between" direction="row" gap={6} wrap>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllErrorLarge />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Large</Text>
              <Text>Error</Text>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllErrorMedium1 />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Medium option 1</Text>
              <Text>Sad plant</Text>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllErrorMedium2 />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Medium option 2</Text>
              <Text>Sad coffee</Text>
            </Flex>
          </Flex.Item>
        </Flex>
        <MainSection.Subsection
          description={`Display when information may take time to process or when keeping users informed on system status. If processing time is short and does not require the user to leave and return to the page, use the Spinnerinstead. `}
          title="Loading"
        />

        <Flex alignContent="between" direction="row" gap={6} wrap>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllLoadingLarge />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Large</Text>
              <Text>Loading</Text>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllLoadingMedium1 />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Medium option 1</Text>
              <Text>Hourglass</Text>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="45%" minWidth={280}>
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              overflow="hidden"
              rounding={2}
            >
              <IllLoadingMedium2 />
            </Box>
            <Flex direction="column" gap={2}>
              <Text weight="bold">Medium option 2</Text>
              <Text>Palette</Text>
            </Flex>
          </Flex.Item>
        </Flex>
      </MainSection>

      <MainSection name="Illustration in use">
        <MainSection.Subsection title="Mobile">
          <Flex alignItems="center" justifyContent="center" width="100%">
            <IllMobileExample />
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection title="Web">
          <Flex
            alignItems="center"
            justifyContent="center"
            maxHeight="561"
            maxWidth="100%"
            overflow="hidden"
          >
            <IllWebExample />
          </Flex>
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Future updates">
        <MainSection.Subsection
          description={`Gestalt plans to keep an eye on illustration use and design requests. As we gather data from designers and engineers, we will iterate on the illustration library to better serve a broad set of use cases.
        `}
          title="Research and iteration"
        />
        <MainSection.Subsection
          description={`If you are looking for a new illustration, please first check the existing set and make sure there isn’t something similar already in the library. If there is not an applicable illustration or if you have an idea for a new illustration:

- [Reach out via Slack](http://pinch.pinadmin.com/gestalt-design-slack)
- [Schedule an office hours slot](https://pinch.pinadmin.com/gestaltSignUp)
        `}
          title="Need an illustration?"
        />
        <MainSection.Subsection
          description={`If there is a signal that teams are interested in using illustration in a broader context, Gestalt will publish documentation on illustration creation and how to graduate an illustration into the system.
        `}
          title="Future collaboration model"
        />
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Iconography](/foundations/iconography/library)**
Our iconography system provides symbolic representations of elements within an interface.

**[Messaging](/foundations/messaging/overview)**
Messaging patterns detail how we communicate errors, warnings, successes, recommendations and general information on system status.

**[Brand expression](/foundations/brand_expression/guidelines)**
Brand expression in the product the combination of visual elements (colors, typography, photography, motion, and other assets) to provide a delightful experience for Pinners.
      `}
        />
      </MainSection>
    </Page>
  );
}
