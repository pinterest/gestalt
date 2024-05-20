import { ReactNode } from 'react';
import Image from 'next/image';
import { Box, Flex, Heading, Text } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../docs-components/consts';
import MainSection from '../../../docs-components/MainSection';
import Markdown from '../../../docs-components/Markdown';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import SandpackExample from '../../../docs-components/SandpackExample';
import celebrationExample from '../../../examples/animation/celebrationExample';
import educationExample from '../../../examples/animation/educationExample';
import feedbackExample from '../../../examples/animation/feedbackExample';
import transitionExample from '../../../examples/animation/transitionExample';
import useExample from '../../../examples/animation/useExample';

type Props = {
  children: ReactNode;
  heading: string;
  text: string;
};
function ThemeLayout({ heading, children, text }: Props) {
  return (
    <Flex direction="column" gap={2} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
      <Heading size="300">{heading}</Heading>
      <Markdown text={text} />
      {children}
    </Flex>
  );
}

export default function TypographyPage() {
  return (
    <Page title="Animation guidelines">
      <PageHeader
        description="Animation should help the user to accomplish various tasks, for example, to provide feedback, add delight and educate users. To successfully fulfill our mission, keep these guiding principles in mind when considering adding animation to a product."
        name="Animation guidelines"
        type="guidelines"
      />

      <MainSection
        description={`
**Easing** is the timing function of an animation, which helps transitions and animations appear more realistic or natural. As a result, the user experience is improved.

Easing allows movement to mimic motion *in the real world* – objects accelerate when they start to move, and decelerate when they stop.

**Linear motion** (or animation without easing) can look sharp and unnatural, but it's useful for smoothly animating properties unrelated to motion, like opacity and color.
`}
        name="Easing"
      >
        <Box
          display="flex"
          justifyContent="center"
          marginTop={-10}
          maxWidth={DOCS_COPY_MAX_WIDTH_PX}
        >
          <Image height={630} src="/motion-gifs/with-and-without-easing.gif" width={500} />
        </Box>

        <Markdown text="We have six easings that you can use for different purposes:" />

        <MainSection.Subsection title="Expressive ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <Image height={250} src="/motion-gifs/expressive.gif" width={250} />
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis={240}>
              <Markdown
                text={`
**Function:** cubic-bezier(0.55; 0; 0; 1)
**Recommended duration:** depends on element size
**Usage:** moving, pushing

The most commonly used easing, and a reliable default choice when unsure. A curve is suitable for elements that both begin and end within the user's field of view, such as an object undergoing ***size or position changes***. It is also appropriate for elements that enter or exit the view, particularly if they are moving in synchronization with other elements that also begin or end within the user's field of view.

**Usage examples:**  Pin opening/closing, Board opening/closing, Buttons animation, Forward and backward transitions

        `}
              />
            </Flex.Item>
          </Flex>

          <Heading size="300">Examples in product</Heading>
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Image height={542} src="/motion-gifs/search-page.gif" width={250} />
            <Image height={542} src="/motion-gifs/pin-closeup.gif" width={250} />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Enter ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <Image height={250} src="/motion-gifs/enter.gif" width={250} />
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis={240}>
              <Markdown
                text={`
**Function:** cubic-bezier(0.05; 0.7; 0.1; 1)
**Recommended duration:** 300-500ms
**Usage:**  entering

Curve is commonly used for elements that initially exist out of view and smoothly enter into the screen. Additionally, this curve is also appropriate for elements that need to snap into a specific position after being released from a drag interaction.

**Usage examples:** any enter transition
        `}
              />
            </Flex.Item>
          </Flex>

          <Heading size="300">Examples in product</Heading>
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Image height={542} src="/motion-gifs/settings-enter.gif" width={250} />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Exit ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <Image height={250} src="/motion-gifs/expressive.gif" width={250} />
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis={240}>
              <Markdown
                text={`
**Function:** cubic-bezier(0.3; 0; 0.8; 0.15)
**Recommended duration:** 200-300ms
**Usage:** passive exiting

Curve is commonly used for elements that begin within the user's field of view and passively disappear from the screen without any direct interaction from the user.

**Usage examples:** any exit transition
        `}
              />
            </Flex.Item>
          </Flex>

          <Heading size="300">Examples in product</Heading>
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Image height={542} src="/motion-gifs/settings-exit.gif" width={250} />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Lateral ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <Image height={250} src="/motion-gifs/lateral.gif" width={250} />
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis={240}>
              <Markdown
                text={`
**Function:** cubic-bezier(0.8; 0; 0.2; 1;)
**Recommended duration:** 400-500ms
**Usage:** This easing is commonly used in animation for smooth horizontal transitions of elements that are at the same level of hierarchy, like swiping between tabs of home feed or carousel of search page. It creates a natural-looking movement by starting slowly, accelerating in the middle‌ and slowing down towards the end.

**Usage examples:**  navigation between tabs of home feed, navigation between tabs Pins/Boards (Created/Saved), navigation between tabs Updates/Messages, carousel of search page
        `}
              />
            </Flex.Item>
          </Flex>

          <Heading size="300">Examples in product</Heading>
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Image height={542} src="/motion-gifs/homefeed-lateral.gif" width={250} />
            <Image height={542} src="/motion-gifs/sp-carousel.gif" width={250} />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Bounce ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <Image height={250} src="/motion-gifs/bounce.gif" width={250} />
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis={240}>
              <Markdown
                text={`
**Function:** cubic-bezier(0; 0.4; 0; 1.4;)
**Recommended duration:** 100-200ms
**Usage:** Easing is used for light and fun motion that allows users to interact with Pinterest_._ This easing is commonly used for animation of floating elements, as a toolbar, thereby emphasizing their weightlessness.

**Usage examples:** Toolbar
                `}
              />
            </Flex.Item>
          </Flex>

          <Heading size="300">Examples in product</Heading>
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Image height={250} src="/motion-gifs/bounce-toolbar.gif" width={250} />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Linear ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <Image height={250} src="/motion-gifs/linear.gif" width={250} />
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis={240}>
              <Markdown
                text={`
**Function:** cubic-bezier(0; 0; 1; 1;)
**Recommended duration:**
**Usage:** for properties unrelated to motion (like color and opacity). For example, a background color of a button that expands or changes upon hover can happen _**linearly**_ as it provides feedback to the user about their cursor position.

**Usage examples:** Toggles, Checkboxes, Buttons, Text field
        `}
              />
            </Flex.Item>
          </Flex>

          <Heading size="300">Examples in product</Heading>
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Image height={542} src="/motion-gifs/radio-button.gif" width={250} />
            <Image height={542} src="/motion-gifs/follow-button.gif" width={250} />
          </Flex>
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        description={`
**Duration** is the time taken to complete any transition, interaction, and animation.
Transitions should not be too fast or too slow, as this can make users feel rushed or impatient. To achieve smooth and responsive transitions, it is important to find the right balance of duration and easing.

Durations are chosen based on these criteria:
`}
        name="Durations"
      >
        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
          <Markdown
            text={`
*   **Transition size** (that are based on the distance or the size of the object or element)
    * Transitions covering smaller screen areas are assigned shorter durations, while those spanning larger areas have longer durations. Scaling the duration based on the transition area size ensures a consistent perception of speed.
`}
          />
          <Markdown
            text={`
*   **Enter vs. exit transitions** (enter should be longer than exit)

    * Shorter durations are applied to transitions that exit, dismiss, or collapse an element, as they require less user attention due to being swift. 

    * On the other hand, enter transitions use longer durations, helping users in directing their attention on new elements appearing on the screen.
`}
          />
        </Box>
      </MainSection>

      <MainSection
        description={`
        Animations should never cause a user harm or distract from a necessary task. However, inaccessible animations have the potential to cause seizures, motion sickness, or anxiety in users, so we must ensure we are creating accessible animations every time.

        Below are 3 key considerations for accessibility. Note: these do not apply for “essential” animations, where [essential is defined](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-pause.html#essentialdef) as any animation where “if removed, would fundamentally change the information or functionality of the content, _and_ information and functionality cannot be achieved in another way that would conform.”
`}
        name="Accessibility"
      >
        <MainSection.Subsection
          columns={2}
          description={`
          Ensure that any animation that is moving, blinking, scrolling or auto-playing and lasts longer than 5 seconds has an affordance for pausing and resuming the animation or an option to hide the animation.

          _Looping animations should be avoided whenever possible, as they can become distracting very quickly._

          Further reading: [WCAG 2.0 Pause, Stop Hide requirements](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-pause.html)
          `}
          title="Looping animations"
        />
        <MainSection.Subsection
          columns={2}
          description={`
          Ensure that there are no flashing animations present, where flashing is defined as anything that flashes _more than three times in a one second period_.

          Further reading: [WCAG 2.0 Three Flashes requirements](https://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-three-times.html)
          `}
          title="Flashing animations"
        />
        <MainSection.Subsection
          columns={2}
          description={`
          Any non-essential animations should automatically be disabled when a user enables the reduced motion setting on their device. For Web, we have provided a [useReducedMotion hook](https://gestalt.pinterest.systems/web/utilities/usereducedmotion) to make this easy to implement.

          Further reading for Web: [MDN prefers-reduced-motion guidelines](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
          Further reading for iOS: [Apple developer guidelines](https://developer.apple.com/documentation/uikit/uiaccessibility/1615133-isreducemotionenabled)
          `}
          title="Reduced motion user setting"
        />
      </MainSection>
    </Page>
  );
}
