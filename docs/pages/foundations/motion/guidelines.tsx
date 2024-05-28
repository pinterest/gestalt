import { Box, Flex, Heading } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../docs-components/consts';
import MainSection from '../../../docs-components/MainSection';
import Markdown from '../../../docs-components/Markdown';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import ReducedMotionGIF from '../../../docs-components/ReducedMotionGIF';

export default function GuidelinesPage() {
  return (
    <Page title="Motion guidelines">
      <PageHeader
        description="Animation should help the user to accomplish various tasks, for example, to provide feedback, add delight and educate users. To successfully fulfill our mission, keep these guiding principles in mind when considering adding animation to a product."
        name="Motion guidelines"
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
          <ReducedMotionGIF
            alt="Comparison of transitions with and without easing"
            height={630}
            src="https://i.pinimg.com/originals/1a/db/32/1adb3201fa6b7f03e1b2e820d672eebb.gif"
            staticImgSrc="https://i.pinimg.com/originals/06/2b/db/062bdb7677dd9f975fd6356811753a67.png"
            style={{ maxWidth: '100%', height: 'auto' }}
            width={500}
          />
        </Box>

        <Markdown text="We have six easings that you can use for different purposes:" />

        <MainSection.Subsection title="Expressive ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionGIF
                alt="Expressive easing animation"
                height={250}
                src="https://i.pinimg.com/originals/7d/76/4d/7d764d6b2a0eb47eec607ea5457fbbd5.gif"
                staticImgSrc="https://i.pinimg.com/originals/a0/ba/4c/a0ba4c7f323b026ec5a62c51e38ef2ef.png"
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
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <ReducedMotionGIF
              alt="Search screen transition example"
              height={542}
              src="https://i.pinimg.com/originals/6b/22/c8/6b22c89c7c6d92784130f816ff20a602.gif"
              staticImgSrc="https://i.pinimg.com/originals/86/e5/29/86e529087ed73540715a86b1e2ff8166.png"
              width={250}
            />
            <ReducedMotionGIF
              alt="Pin closeup transition example"
              height={542}
              src="https://i.pinimg.com/originals/ef/5d/45/ef5d45d10c4d0b971a00e21460a50fac.gif"
              staticImgSrc="https://i.pinimg.com/originals/a9/ba/a6/a9baa60ba82b9828b68b058d78891f76.png"
              width={250}
            />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Enter ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionGIF
                alt="Enter easing animation"
                height={250}
                src="https://i.pinimg.com/originals/23/4f/32/234f32053b56bd1f7736596937c21d30.gif"
                staticImgSrc="https://i.pinimg.com/originals/da/75/d6/da75d6fcb6439f903c26286a240d7409.png"
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
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <ReducedMotionGIF
              alt="Settings open transition example"
              height={542}
              src="https://i.pinimg.com/originals/59/0e/b5/590eb54c70961af6187addf797e67d21.gif"
              staticImgSrc="https://i.pinimg.com/originals/2a/16/bf/2a16bf228d7c8e1e5f45346ad2416712.png"
              width={250}
            />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Exit ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionGIF
                alt="Exit easing animation"
                height={250}
                src="https://i.pinimg.com/originals/c7/c7/e2/c7c7e28ecfe8a40effd613db069409c2.gif"
                staticImgSrc="https://i.pinimg.com/originals/9e/87/80/9e8780a462656c78300e95ee282076ed.png"
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
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <ReducedMotionGIF
              alt="Settings close transition example"
              height={542}
              src="https://i.pinimg.com/originals/97/ab/9f/97ab9fe5064b697d8a54f073b8f4edd2.gif"
              staticImgSrc="https://i.pinimg.com/originals/7a/76/5b/7a765b0041a62a841726cca8cce78ba2.png"
              width={250}
            />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Lateral ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionGIF
                alt="Lateral easing animation"
                height={250}
                src="https://i.pinimg.com/originals/a3/fb/49/a3fb49eb2948e3a276b8c26976d52e64.gif"
                staticImgSrc="https://i.pinimg.com/originals/eb/82/ce/eb82ceb91f0f28d34e3a53115533a44c.png"
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
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <ReducedMotionGIF
              alt="Homefeed screen change animation"
              height={542}
              src="https://i.pinimg.com/originals/f9/63/a0/f963a0d79164ac3e2c9c90a2905082ef.gif"
              staticImgSrc="https://i.pinimg.com/originals/4f/87/85/4f878578ee6b60505b1db3af5a16f0cb.png"
              width={250}
            />
            <ReducedMotionGIF
              alt="Image carousel example"
              height={542}
              src="https://i.pinimg.com/originals/18/11/3e/18113e94de7cda6516a8b01b984fda87.gif"
              staticImgSrc="https://i.pinimg.com/originals/37/5e/ce/375ece169fa14dcddee147bdb5bc57f9.png"
              width={250}
            />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Bounce ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionGIF
                alt="Bounce easing animation"
                height={250}
                src="https://i.pinimg.com/originals/12/0f/6c/120f6cb335a2e7d9823459b5cc2911af.gif"
                staticImgSrc="https://i.pinimg.com/originals/41/80/a7/4180a70733628339a84d2d72304ca302.png"
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
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <ReducedMotionGIF
              alt="Toolbar appear transition example"
              height={250}
              src="https://i.pinimg.com/originals/7a/79/3f/7a793fc62c7ddfe2dd56d06ffe136feb.gif"
              staticImgSrc="https://i.pinimg.com/originals/43/0c/71/430c71a792113f4c61f03db451b7efd6.png"
              width={250}
            />
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Linear ease">
          <Flex gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <Flex.Item flexBasis={200}>
              <ReducedMotionGIF
                alt="Linear easing animation"
                height={250}
                src="https://i.pinimg.com/originals/86/e5/ff/86e5ff5bf987f552dcd84ef48638856c.gif"
                staticImgSrc="https://i.pinimg.com/originals/f6/ac/3a/f6ac3ae51be0f2e10d96156c51be3514.png"
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
          <Flex gap={8} justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX} wrap>
            <ReducedMotionGIF
              alt="Radio button toggle example"
              height={542}
              src="https://i.pinimg.com/originals/20/92/29/20922961537e594b43c3f2f456b5817a.gif"
              staticImgSrc="https://i.pinimg.com/originals/70/00/eb/7000ebb29642dcb5c156e23e99d50fc1.png"
              width={250}
            />
            <ReducedMotionGIF
              alt="Follow button toggle example"
              height={542}
              src="https://i.pinimg.com/originals/a4/b6/88/a4b688b568a01ad81103fa52370492d6.gif"
              staticImgSrc="https://i.pinimg.com/originals/59/0e/94/590e947054957dd33b0b8d614bef0ff6.png"
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
          Further reading for iOS: [Appt prefers-reduced-motion iOS guidelines](https://appt.org/en/docs/ios/samples/reduced-animations)
          Further reading for Android: [Appt prefers-reduced-motion Android guidelines](https://appt.org/en/docs/android/samples/reduced-animations)
          `}
          title="Reduced motion user setting"
        />
      </MainSection>
    </Page>
  );
}
