// @flow strict
import { type Node } from 'react';
import { Flex, Heading, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import Page from '../../../docs-components/Page.js';
import Markdown from '../../../docs-components/Markdown.js';

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


        Product animations typically fall into one of four categories: feedback, transitions, education, and celebration. While celebratory animations typically occur on illustrative, graphic objects, the other types of animations often apply to UI elements.
`}
      >
        <MainSection.Subsection
          title="Animating UI elements"
          description="UI elements refers to non-graphical elements on a surface, like a Card, Button, Sheet or Pin."
        >
          <Flex gap={8} direction="column" maxWidth={572}>
            <Flex gap={2} direction="column">
              <Heading size="300">Feedback</Heading>
              <Markdown text="Animation is often used to provide feedback to the user that an action they intended to take was successful. For example, a Button may shrink when pressed or tapped to indicate to the user that the Button was successfully interacted with. Similarly, a loading spinner may appear after a user submits a form to help indicate to the user that the form was submitted successfully and a process is beginning. Another example could be a Card that grows slightly when hovered/focused to help indicate which Card a user is interacting with." />
              <Text>[example from product - More Ideas on Home card]</Text>
            </Flex>
            <Flex gap={2} direction="column">
              <Heading size="300">Transitions</Heading>
              <Markdown text="Another common use case for animations is to show a transition between two states in the UI. For example, a search IconButton may expand into a SearchField when interacted with or a Sheet may slide in from the side of the screen to draw attention to it. Transitional animations help guide the user to focus on certain pieces of UI, ideally helping them complete a task." />
              <Text>
                [example from product - Sheeting sliding in during Campaign setup process]
              </Text>
            </Flex>
            <Flex gap={2} direction="column">
              <Heading size="300">Education</Heading>
              <Markdown text="Animations can also be used to help orient a user to the navigation or structure of an application. For instance, a new user may see a Pin shrink and navigate toward the Profile menu item to help inform the user that saved Pins can be found in the Profile menu. Another example could be a guided onboarding education tooltip that moves around the screen as it points to different features of the application." />
              <Text>[example from product - Saved Pin traveling to Profile on mWeb]</Text>
            </Flex>
          </Flex>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Animating illustrations and graphics"
          description={`
          Celebratory animations can be used to help a user feel accomplished after a certain event has occurred or add interest to an otherwise stagnant process. For example, confetti can be used to indicate a process has completed successfully, like creating a first Board while onboarding onto the app. Alternatively, graphics in an onboarding flow can be animated to draw attention and add interest to a multi-step modal.

          In general, illustrative animations add delight but are not critical for a user’s understanding of a task or feature. Because they are additive and not required, they should be used sparingly during high-value moments where an animation would be delightful and not distracting.
          `}
        >
          <Text>[example in product - confetti on saving pin]</Text>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Where to use"
        description={`
        The type of product should help inform what type of animations to use.  While feedback-based animations may be incredibly helpful in a Business product, celebratory animations may not be. Again, consider if the animation is helping a user finish a task, or distracting them from getting things done efficiently. In a business product where users are intimately familiar with a task they perform multiple times a day, animation may negatively add to the time they spend on a process.
`}
      >
        <Text>[example from product - Pin fade when selecting business type]</Text>
      </MainSection>
      <MainSection
        name="Accessibility"
        description={`
        Animations should never cause a user harm or distract from a necessary task. However, inaccessible animations have the potential to cause seizures, motion sickness, or anxiety in users, so we must ensure we are creating accessible animations every time.

        Below are 3 key considerations for accessibility. Note: these do not apply for “essential” animations, where [essential is defined](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-pause.html#essentialdef) as any animation where “if removed, would fundamentally change the information or functionality of the content, _and_ information and functionality cannot be achieved in another way that would conform.”
`}
      >
        <MainSection.Subsection
          title="Infinite animations"
          description={`
          Ensure that any animation that is moving, blinking, scrolling, or auto-playing and lasts longer than 5 seconds has an affordance for pausing and resuming the animation or an option to hide the animation.

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
