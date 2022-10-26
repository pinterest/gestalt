// @flow strict
import { type Node } from 'react';
import { Flex, Heading } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import Page from '../../../docs-components/Page.js';
import Markdown from '../../../docs-components/Markdown.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import educationExample from '../../../examples/animation/educationExample.js';
import celebrationExample from '../../../examples/animation/celebrationExample.js';
import feedbackExample from '../../../examples/animation/feedbackExample.js';
import useExample from '../../../examples/animation/useExample.js';

export default function TypographyPage(): Node {
  return (
    <Page title="Animation guidelines">
      <PageHeader
        name="Animation guidelines"
        description={`Animations can be utilized to provide feedback, add delight, and educate users. They should be purposeful, helpful, and accessible.
    `}
        type="guidelines"
      />

      <MainSection
        name="When to use"
        description={`
        Animations should help a user complete a task. Ask yourself, “what purpose does this animation serve?” Does it help a new user understand a flow in the product? Does it help showcase something is processing or loading?


        Product animations typically fall into one of four categories:

        - feedback
        - transitions
        - education
        - celebration.

        While celebratory animations typically occur on illustrative elements, like icons or illustrations, the other types of animations often apply to UI elements, like Buttons or Modals.
`}
      >
        <MainSection.Subsection
          title="Animating UI elements"
          description="UI elements refers to controls on a surface, like a Card, Button, Sheet or Pin."
        >
          <Flex gap={8} direction="column" maxWidth={572}>
            <Flex gap={2} direction="column">
              <Heading size="300">Feedback</Heading>
              <Markdown text="Animation is often used to provide feedback to the user that an action they intended to take was successful. For example, a Button may shrink when pressed or tapped to indicate to the user that the Button was successfully interacted with. Similarly, a loading spinner may appear after a user submits a form to help indicate to the user that the form was submitted successfully and a process is beginning. Another example could be a Card that grows slightly when hovered/focused to help indicate which Card a user is interacting with." />
              <SandpackExample
                code={feedbackExample}
                name="Feedback Example"
                hideEditor
                hideControls
                previewHeight={750}
              />
            </Flex>
            <Flex gap={2} direction="column">
              <Heading size="300">Transitions</Heading>
              <Markdown
                text={`
              Another common use case for animations is to show a transition between two states in the UI. For example, a search IconButton may expand into a SearchField when interacted with, or a Sheet may slide in from the side of the screen to draw attention to it. Transitional animations help draw the user's attention to particular pieces of the UI, ideally helping them complete a task.

              Transitional animations should also follow an intuitive flow. For example, a drawer that appears from the bottom on mobile should slide up from the bottom of the screen and slide back down upon dismissal.
              `}
              />
              <SandpackExample
                code={educationExample}
                name="Education Example"
                hideEditor
                hideControls
                previewHeight={750}
              />
            </Flex>
            <Flex gap={2} direction="column">
              <Heading size="300">Education</Heading>
              <Markdown text="Animations can also be used to help orient a user to the navigation or structure of an application. For instance, a new user may see a Pin shrink and navigate toward the Profile menu item to help inform the user that saved Pins can be found in the Profile menu. Another example could be a guided onboarding education tooltip that moves around the screen as it points to different features of the application." />
              <SandpackExample
                code={educationExample}
                name="Education Example"
                hideEditor
                hideControls
                previewHeight={750}
              />
            </Flex>
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Animating illustrations and graphics"
          description={`
         Illustrations and graphics refers to non-structural elements, like an icon, line of a graph, or imagery, like confetti or empty state illustrations.
          `}
        >
          <Flex gap={8} direction="column" maxWidth={572}>
            <Flex gap={2} direction="column">
              <Heading size="300">Celebration</Heading>
              <Markdown
                text={`
          Celebratory animations can be used to help a user feel accomplished after a certain event has occurred or add interest to an otherwise stagnant process. For example, confetti can be used to indicate a process has been completed successfully, like creating a first Board while onboarding onto the app. Alternatively, graphics in an onboarding flow can be animated to draw attention and add interest to a multi-step modal.

          In general, illustrative animations add delight but are not critical for a user’s understanding of a task or feature. Because they are additive and not required, they should be used sparingly during high-value moments where an animation would be delightful and not distracting.
          `}
              />
              <SandpackExample
                code={celebrationExample}
                name="Celebration Example"
                hideEditor
                hideControls
                previewHeight={750}
              />
            </Flex>
          </Flex>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Where to use"
        description={`
        The type of product should help inform what type of animations to use.  While feedback-based animations may be incredibly helpful in a Business product, celebratory animations may not be. Again, consider if the animation is helping a user finish a task, or distracting them from getting things done efficiently. In a business product where users are intimately familiar with a task they perform multiple times a day, animation may negatively add to the time they spend on a process. Use a celebratory animation for rare moments, like the first time a user successfully creates a campaign, and not for completed tasks that happen frequently.
`}
      >
        <Flex gap={8} direction="column" maxWidth={572}>
          <SandpackExample
            code={useExample}
            name="When to use Example"
            hideEditor
            hideControls
            previewHeight={750}
          />
        </Flex>
      </MainSection>
      <MainSection name="Treatment guidelines">
        <MainSection.Subsection
          title="Choosing objects to animate"
          description="When an element is animated, avoid animating sub-elements contained within that element. For instance, if a Card grows when hovered/focused, any buttons or text elements within the Card should not also be animated.  "
        />
        <MainSection.Subsection
          title="Axis considerations"
          description="Animations along an axis can be used to show transitions and educate users about navigation patterns. For example, items could animate along the z-axis to help relay stacking or depth, while items animated along an x-axis or y-axis can help relay navigation patterns, like a Sheet that slides in and out from the side of the screen, or a toast that pops up from the bottom of the screen."
        />
        <MainSection.Subsection
          title="Animation origin"
          description={`
          Keep transitions direct, meaning the animation starts from a logical location that gives the moving object the shortest distance to travel to its final destination. In other words, do not animate a Toast from the top of the screen down to the bottom of the screen if the final resting point is the bottom of the screen. Instead, begin the animation from the bottom of the screen.

          Also consider collisions when choosing animation origins. If Notification cards can stack, they may animate in from the top right of a screen, but fade out to avoid colliding with incoming notifications.
          `}
        />
        <MainSection.Subsection
          title="Duration"
          description="Animations should be direct and purposeful, meaning they only last as long as necessary to achieve the desired affect. For [accessibility reasons], avoid animations longer than 5 seconds. Most animations happen in a matter of milliseconds to avoid distracting the user. In most cases, aim to keep animations under one second. In the future, we will provide design tokens for desired durations in product."
        />
        <MainSection.Subsection
          title="Easing and velocity"
          description={`
          The timing function of an animation should be determined by the property and object being animated.

          Properties unrelated to motion (like color and opacity) will not likely benefit from easing and can be done linearly. For example, a background color of a button that expands or changes upon hover can happen linearly as it provides feedback to the user about their cursor position.

          However, people experience motion non-linearly, so objects being moved can benefit from an easing timing function. For example, an object transitioning onto the screen from the right side may use ease-out as it slides into view to create visibility as fast as possible, and then ease-in upon its departure to create a smooth transition back to the main screen.
          `}
        />
      </MainSection>
      <MainSection
        name="Accessibility"
        description={`
        Animations should never cause a user harm or distract from a necessary task. However, inaccessible animations have the potential to cause seizures, motion sickness, or anxiety in users, so we must ensure we are creating accessible animations every time.

        Below are 3 key considerations for accessibility. Note: these do not apply for “essential” animations, where [essential is defined](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-pause.html#essentialdef) as any animation where “if removed, would fundamentally change the information or functionality of the content, _and_ information and functionality cannot be achieved in another way that would conform.”
`}
      >
        <MainSection.Subsection
          title="Looping animations"
          description={`
          Ensure that any animation that is moving, blinking, scrolling, or auto-playing and lasts longer than 5 seconds has an affordance for pausing and resuming the animation or an option to hide the animation.

          _Looping animations should be avoided whenever possible, as they can become distracting very quickly._

          Further reading: [WCAG 2.0 Pause, Stop Hide requirements](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-pause.html)
          `}
          columns={2}
        >
          <MainSection.Card
            cardSize="md"
            type="do"
            description="In product video to encourage Pin creation lasts longer than 5 seconds but can be hidden by swiping down, or paused by tapping"
            defaultCode={`
              <Text>TBD</Text>
              `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Auto-play videos in help docs that cannot be paused or hidden"
            defaultCode={`
            <Text>TBD</Text>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Flashing animations"
          description={`
          Ensure that there are no flashing animations present, where flashing is defined as anything that flashes _more than three times in a one second period_.

          Further reading: [WCAG 2.0 Three Flashes requirements](https://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-three-times.html)
          `}
          columns={2}
        >
          <MainSection.Card
            cardSize="md"
            type="do"
            description="A Notification animation that blinks once and stops"
            defaultCode={`
              <Text>TBD</Text>
              `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="A toast that rapidly flashes when it appears"
            defaultCode={`
            <Text>TBD</Text>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Reduced motion user setting"
          description={`
          Any non-essential animations should automatically be disabled when a user enables the reduced motion setting on their device. We have provided a [useReducedMotion hook](https://gestalt.pinterest.systems/web/utilities/usereducedmotion) to make this easy to implement.

          Further reading: [MDN prefers-reduced-motion guidelines](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
          `}
          columns={2}
        >
          <MainSection.Card
            cardSize="md"
            type="do"
            description="A Button grows when hovered and reduced motion is not enabled"
            defaultCode={`
              <Text>TBD</Text>
              `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Button still grows when use reduced motion is turned on"
            defaultCode={`
            <Text>TBD</Text>
`}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
