import { Box, Flex, Heading } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../docs-components/consts';
import MainSection from '../../../docs-components/MainSection';
import Markdown from '../../../docs-components/Markdown';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import ReducedMotionImage from '../../../docs-components/ReducedMotionImage';

export default function GuidelinesPage() {
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

Easing allows movement to mimic motion *in the real world* - objects accelerate when they start to move, and decelerate when they stop.

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
          <ReducedMotionImage
            alt="Comparison of transitions with and without easing"
            height={630}
            src="/motion-gifs/with-and-without-easing.gif"
            staticImgSrc="/motion-gifs/with-and-without-easing.png"
            width={500}
          />
        </Box>

        <Markdown text="We have six easings that you can use for different purposes:" />

        <MainSection.Subsection title="Expressive ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionImage
                alt="Expressive easing animation"
                height={250}
                src="/motion-gifs/expressive.gif"
                staticImgSrc="/motion-gifs/expressive.png"
                width={250}
              />
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
            <ReducedMotionImage
              alt="Search screen transition example"
              height={542}
              src="/motion-gifs/search-page.gif"
              staticImgSrc="/motion-gifs/search-page.png"
              width={250}
            />
            <ReducedMotionImage
              alt="Pin closeup transition example"
              height={542}
              src="/motion-gifs/pin-closeup.gif"
              staticImgSrc="/motion-gifs/pin-closeup.png"
              width={250}
            />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Enter ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionImage
                alt="Enter easing animation"
                height={250}
                src="/motion-gifs/enter.gif"
                staticImgSrc="/motion-gifs/enter.png"
                width={250}
              />
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis={240}>
              <Markdown
                text={`
**Function:** cubic-bezier(0.05; 0.7; 0.1; 1)
**Recommended duration:** 300-500ms
**Usage:** entering

Curve is commonly used for elements that initially exist out of view and smoothly enter into the screen. Additionally, this curve is also appropriate for elements that need to snap into a specific position after being released from a drag interaction.

**Usage examples:** any enter transition
        `}
              />
            </Flex.Item>
          </Flex>

          <Heading size="300">Examples in product</Heading>
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <ReducedMotionImage
              alt="Settings open transition example"
              height={542}
              src="/motion-gifs/settings-enter.gif"
              staticImgSrc="/motion-gifs/settings-enter.png"
              width={250}
            />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Exit ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionImage
                alt="Exit easing animation"
                height={250}
                src="/motion-gifs/expressive.gif"
                staticImgSrc="/motion-gifs/expressive.png"
                width={250}
              />
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
            <ReducedMotionImage
              alt="Settings close transition example"
              height={542}
              src="/motion-gifs/settings-exit.gif"
              staticImgSrc="/motion-gifs/settings-exit.png"
              width={250}
            />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Lateral ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionImage
                alt="Lateral easing animation"
                height={250}
                src="/motion-gifs/lateral.gif"
                staticImgSrc="/motion-gifs/lateral.png"
                width={250}
              />
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis={240}>
              <Markdown
                text={`
**Function:** cubic-bezier(0.8; 0; 0.2; 1;)
**Recommended duration:** 400-500ms
**Usage:** This easing is commonly used in animation for smooth horizontal transitions of elements that are at the same level of hierarchy, like swiping between tabs of home feed or carousel of search page. It creates a natural-looking movement by starting slowly, accelerating in the middle‌ and slowing down towards the end.

**Usage examples:** navigation between tabs of home feed, navigation between tabs Pins/Boards (Created/Saved), navigation between tabs Updates/Messages, carousel of search page
        `}
              />
            </Flex.Item>
          </Flex>

          <Heading size="300">Examples in product</Heading>
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <ReducedMotionImage
              alt="Homefeed screen change animation"
              height={542}
              src="/motion-gifs/homefeed-lateral.gif"
              staticImgSrc="/motion-gifs/homefeed-lateral.png"
              width={250}
            />
            <ReducedMotionImage
              alt="Image carousel example"
              height={542}
              src="/motion-gifs/sp-carousel.gif"
              staticImgSrc="/motion-gifs/sp-carousel.png"
              width={250}
            />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Bounce ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionImage
                alt="Bounce easing animation"
                height={250}
                src="/motion-gifs/bounce.gif"
                staticImgSrc="/motion-gifs/bounce.png"
                width={250}
              />
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis={240}>
              <Markdown
                text={`
**Function:** cubic-bezier(0; 0.4; 0; 1.4;)
**Recommended duration:** 100-200ms
**Usage:** Easing is used for light and fun motion that allows users to interact with Pinterest_._ This easing is commonly used for animation of floating elements, as a toolbar, thereby emphasizing their weightlessness.

**Usage examples:** Toolbar
                `}
              />
            </Flex.Item>
          </Flex>

          <Heading size="300">Examples in product</Heading>
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <ReducedMotionImage
              alt="Toolbar appear transition example"
              height={250}
              src="/motion-gifs/bounce-toolbar.gif"
              staticImgSrc="/motion-gifs/bounce-toolbar.png"
              width={250}
            />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Linear ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionImage
                alt="Linear easing animation"
                height={250}
                src="/motion-gifs/linear.gif"
                staticImgSrc="/motion-gifs/linear.png"
                width={250}
              />
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
            <ReducedMotionImage
              alt="Radio button toggle example"
              height={542}
              src="/motion-gifs/radio-button.gif"
              staticImgSrc="/motion-gifs/radio-button.png"
              width={250}
            />
            <ReducedMotionImage
              alt="Follow button toggle example"
              height={542}
              src="/motion-gifs/follow-button.gif"
              staticImgSrc="/motion-gifs/follow-button.png"
              width={250}
            />
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

        Below are 3 key considerations for accessibility. Note: these do not apply for “essential” animations, where [essential is defined](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html#dfn-essential) as any animation where “if removed, would fundamentally change the information or functionality of the content, _and_ information and functionality cannot be achieved in another way that would conform.”
`}
        name="Accessibility"
      >
        <MainSection.Subsection
          columns={2}
          description={`
          Ensure that any animation that is moving, blinking, scrolling or auto-playing and lasts longer than 5 seconds has an affordance for pausing and resuming the animation or an option to hide the animation.

          _Looping animations should be avoided whenever possible, as they can become distracting very quickly._

          Further reading: [WCAG 2.2 Pause, Stop Hide requirements](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
          `}
          title="Looping animations"
        />
        <MainSection.Subsection
          columns={2}
          description={`
          Ensure that there are no flashing animations present, where flashing is defined as anything that flashes _more than three times in a one second period_.

          Further reading: [WCAG 2.2 Three Flashes requirements](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes)
          `}
          title="Flashing animations"
        />
        <MainSection.Subsection
          columns={2}
          description={`
          Any non-essential animations should automatically be disabled when a user enables the reduced motion setting on their device. For Web, we have provided a [useReducedMotion hook](https://gestalt.pinterest.systems/web/utilities/usereducedmotion) to make this easy to implement.

          Further reading for Web: [MDN prefers-reduced-motion guidelines](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
          Further reading for iOS: [Appt iOS guidelines](https://appt.org/en/docs/ios/samples/reduced-animations)
          Further reading for Android: [Appt Android guidelines](https://appt.org/en/docs/android/samples/reduced-animations)
          `}
          title="Reduced motion user setting"
        />
      </MainSection>
    </Page>
  );
}
