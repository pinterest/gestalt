import { BannerCallout } from 'gestalt';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import SandpackExample from '../../docs-components/SandpackExample';
import useFocusVisibleExample from '../../examples/accessibility/useFocusVisibleExample';
import useReducedMotionExample from '../../examples/accessibility/useReducedMotionExample';

export default function AccessibilityGuidelinesPage() {
  return (
    <Page title="Accessibility Guidelines">
      <PageHeader
        description="At Pinterest we strive to create an inclusive product that brings inspiration to everyone. A large part of that requires creating accessible designs and components that contribute to an accessible product."
        name="Accessibility (A11Y)"
        type="guidelines"
      />
      <BannerCallout
        message="Elevate your understanding of the needs of people with disabilities through our new courses on Fable. This program includes videos of instructors with disabilities, with the aim to empower you with the knowledge and skills needed to create a more inclusive experience for all Pinners."
        primaryAction={{
          href: 'http://pinch.pinadmin.com/fable-source-gestalt',
          label: 'Start training on Fable',
          accessibilityLabel: 'Start training on Fable',
          target: 'blank',
          role: 'link',
        }}
        secondaryAction={{
          href: 'https://w.pinadmin.com/display/EPD/Accessibility',
          label: 'Learn more',
          accessibilityLabel: 'Learn more about training',
          target: 'blank',
          role: 'link',
        }}
        title="New accessibility training program"
        type="recommendation"
      />
      <MainSection
        description={`
    Everyone should be able to create the life they love with Pinterest, no matter their ability. An inclusive product is a top priority, and it relies on everyone's commitment to accessibility. Pinterest's goal as a company is to meet <a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2 AA standards</a>, and Gestalt's goal is no different. By creating accessible components, we aim to help everyone create an inclusive product.

    It's important to remember that accessible components are a great starting point, but there is further work to do to create a cohesive, accessible experience. Below we've highlighted some key areas to address, but for a more extensive list we recommend checking out <a href="https://www.a11yproject.com/">The A11Y Project</a> and Heydon Pickering's <a href="https://github.com/Heydon/inclusive-design-checklist">Inclusive Design Checklist</a>.
    `}
        name="Our approach"
      />
      <MainSection
        description="Accessibility starts at the design phase! Below are some key things to watch out for when designing inclusive products. For further detail and matching visual examples, check out our [Accessible Design deck](https://docs.google.com/presentation/d/1b-L0tuzaMTIf1xX7j86g46QfDW3_C0Ep_Ca4TEmXPz8/edit#slide=id.gcf38b911e3_0_750)."
        name="Design considerations"
      >
        <MainSection.Subsection
          description={`
      When designing, it's important to ensure our use of color and typography is appropriate.

      - **Avoid using color as the sole indicator of information.** For instance, always supply an icon or text describing errors, rather than relying on a red outline or red text. Color-only changes do not work well for those who may be color blind or have low vision.
      - **Check your color contrast!** We follow AA guidance from the Web Content Accessibility Guidelines, so we recommend using a tool like [aremycolorsaccessible.com](https://www.aremycolorsaccessible.com/) to check the foreground color against the background color. In Figma, you can use [the Able plugin](https://www.figma.com/community/plugin/734693888346260052/Able-%E2%80%93-Friction-free-accessibility) to check color contrast in your designs.
      - **Use appropriate text-sizes.** WCAG 2.2 suggests using text no smaller than 16pt for easy readability.
      `}
          title="Visuals"
        />
        <MainSection.Subsection
          description={`
    Accounting for all aspects of interaction is critical to creating inclusive designs.

    - **Create designs for every state**, like focus, hover, focus + hover, active, selected, disabled, and anything else that might be relevant. Ensure each combination is visually distinct from the others.
    - **Keep disabled elements disabled.** Disabled buttons are removed from the tab order, so they are impossible to access with a keyboard. Adding something like a tooltip to a disabled item means only mouse-users can access the content of the tooltip, so the best option is to attach the tooltip to an active element, like an IconButton, next to the disabled element instead.
    `}
          title="Interaction"
        />
        <MainSection.Subsection
          description={`
    Seemingly small design decisions can have a large impact on users comprehension.

    - **Use form labels whenever possible.** Placeholder text is not enough to indicate to users what information they are expected to enter in any given text field, since it disappears as soon as any content is typed. Adding labels to every form field and dropdown will make expectations clearer for everyone.
    - **Design a logical heading hierarchy.** Screen reader users can quickly navigate an entire page by analyzing the headings provided. Be sure to follow a logical order, starting with a single H1, and progressing to H2, H3, etc. If you could see only your headings, would the page make sense?
    - **Create descriptive link text.** Avoid multiple links with vague text like "More info" or "Learn more". Instead, users should be able to tell exactly what info will be provided at a given link by the link text only. For instance, "Explore campaigns" instead of just "Learn more".
    `}
          title="Comprehension"
        />
        <MainSection.Subsection
          description={`
    Accessibility requirements vary depending on the device used, so be sure to account for small and large screens alike.

    - **Account for zooming!** Many users, especially on mobile, adjust the default size of fonts and often increase the zoom setting. Does your design still work when zoomed in 200%?
    - **Create large touch targets.** If you've ever clicked on the wrong thing because the tap target was too small, you know how frustrating it can be to have to re-orient yourself. Ensure your touch targets on both mobile and web are large enough for people with limited mobility to accurately press what they're aiming for.
    - **Provide white space.** Use empty space on the page to break up sections and draw users' focus to specific content. Too much content and information can overwhelm and confuse users.
    `}
          title="Responsiveness"
        />
      </MainSection>
      <MainSection name="Engineering considerations">
        <MainSection.Subsection
          description={`
      Accessible Rich Internet Applications (ARIA) attributes provide ways to make applications more accessible by supplementing HTML so that common interactions in applications can be properly utilized with assistive technology.

      Please note, HTML 5 covers many common patterns and interactions by default, so ARIA should only be used to fill gaps, not in place of correct semantic HTML. For instance, it is always preferred to use the native \`<button>\` instead of adding \`role="button"\`. Better yet, use the Gestalt [Button](/web/button), and you won't have to worry about a thing!

      In general, ARIA is best used to provide extra information about a component, like using \`aria-expanded\` to signal when a [Popover](/web/popover#ARIA-attributes) is open or closed. Learn more about [ARIA and its use cases](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA).
    `}
          title="ARIA attributes"
        />
        <MainSection.Subsection
          description={`
      One of the most common ways to influence the ARIA attributes in our Gestalt components is through our \`accessibilityLabel\` props. These props allow users to create concise descriptions about components and their interactive elements in order to provide the best possible experience to those using assistive technology, like a screen reader. Avoid using the words "button" or "link" in the label, as this becomes repetitive. If the action text is already descriptive, an empty string can be passed.

      - In [AvatarGroup](/web/avatargroup#ARIA-attributes), \`accessibilityLabel\` is used to describe an interactive Avatar face-pile that also acts as a button. A good \`accessibilityLabel\` may be "Collaborators: Keerthi, Alberto, and 10 more. Add collaborators to this board."
      - In [BannerCallout](/web/bannercallout#accessibility) and [BannerUpsell](/web/bannerupsell#accessibility), \`accessibilityLabel\` can be specified for each primary and secondary action to create better context. If the button texts are "Learn More" and "Invite", the accessibility labels should be "Learn more about ads credit" and "Invite friends for ads credit". If the button text is already descriptive enough, the accessibilityLabel can be an empty string.
    `}
          title="Labels"
        />
        <MainSection.Subsection
          description={`
        People use and interact with technology in myriad ways. Many people do not use a mouse for various reasons and instead rely on the keyboard and a [screen reader](https://www.afb.org/blindness-and-low-vision/using-technology/assistive-technology-products/screen-readers) to interact with applications. The key to creating truly accessible products is ensuring that your application works very well when using only a keyboard and/or screen reader to navigate and interact with content. In other words, if it can be done with a mouse, it can be done with a keyboard. In the Gestalt documentation, we aim to help describe the expectations for keyboard navigation, particularly within our more complex components. For example, in [ComboBox](/web/combobox#Keyboard-interaction), we've detailed the expected keyboard interaction for all aspects of the ComboBox.

        Another key aspect to keyboard navigation is [focus management](https://css-tricks.com/focus-management-and-inert/). Users should never lose their place within a page, and their current point of focus should always be clear visually. Some components, like Modals or Popovers, act as focus traps, meaning the user's focus should only rotate between items inside the Modal or Popover, and anything below these items is not reachable by keyboard. When a component like Modal or Popover is dismissed or closed, the user's focus should go back to the item that triggered the component.
    `}
          title="Keyboard navigation"
        />
        <MainSection.Subsection
          columns={2}
          description={`Gestalt provides two [custom Hooks](https://reactjs.org/docs/hooks-custom.html) that help create more accessible experiences: \`useFocusVisible\` and \`useReducedMotion\`.`}
          title="Available Hooks"
        >
          <MainSection.Card
            cardSize="md"
            description={`
          \`useFocusVisible\` manages focus interactions on the page and determines whether a focus ring should be shown. When using the \`useFocusVisible\` hook, if a user interacts with a mouse or by touch, then the focus indicator is not visible. When the user interacts with the keyboard however, the focus indicator will be visible.

          References:
          <ul>
            <li><a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html">WCAG 2.4.7: Focus Visible</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible">:focus-visible CSS pseudo-class</a></li>
          </ul>
        `}
            sandpackExample={
              <SandpackExample
                code={useFocusVisibleExample}
                name="useFocusVisible example"
                previewHeight={250}
              />
            }
            title="useFocusVisible"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          \`useReducedMotion\` allows a user to request that the system minimize the amount of non-essential motion.

          Users can experience distraction or nausea from animated content. For example, scrolling a page which causes elements to move (other than the essential movement associated with scrolling) can trigger vestibular disorders. Change your Accessibility -> Display device settings to "Reduce motion" and notice the animation stops.

          References:
          <ul>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" target="_blank">CSS media query: prefers-reduced-motion</a></li>
            <li><a href="https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html">WCAG C39: Using the CSS reduce-motion query to prevent motion</a></li>
          </ul>
        `}
            sandpackExample={
              <SandpackExample
                code={useReducedMotionExample}
                name="useReducedMotion example"
                previewHeight={250}
              />
            }
            title="useReducedMotion"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Further learning">
        <MainSection.Subsection
          description={`
        **[Introduction to Digital Accessibility course](https://w.pinadmin.com/display/EPD/Introduction+to+Digital+Accessibility)**
        Learn about accessibility by understanding disability and assistive technology.

        **[Creating Accessible Mobile Apps course](https://w.pinadmin.com/display/EPD/Accessible+Mobile+Apps)**
        Learn how to design, develop, and test mobile apps that work well for all users, including people who use assistive technology.

        **[Gestalt Accessibility Training for Designers course](https://pinterest.docebosaas.com/learn/courses/1155/gestalt-accessibility-training-for-designers/lessons)**
        Watch our virtual training and get resources from our Accessibility training for designers.

       **[Accessibility Checklist](https://www.figma.com/design/50RRYnFcgPTQzy1AIjQoWB/Gestalt-Handoff-Kit?node-id=5015-3469&t=D7TQJn6iWgAa8P8P-4)**
        A checklist created to help you with the design foundations of accessibility. Keep in mind it is a not a complete guide to creating accessible content.

        **[Accessibility Annotations](https://www.figma.com/design/50RRYnFcgPTQzy1AIjQoWB/Gestalt-Handoff-Kit?node-id=2817-4396)**
        A framework for Designers to consider and communicate decisions as part of the product design stage.
      `}
          title="Pinternal"
        />
        <MainSection.Subsection
          description={`
        **[A11Y Project](https://www.a11yproject.com/checklist/)**
        Reference checklists, blog posts, and more. This is a great tool for learning about accessibility.

        **[Able Figma Plugin](https://www.figma.com/community/plugin/734693888346260052/Able-%E2%80%93-Friction-free-accessibility)**
        Use the Able plugin to verify color contrast and account for color blindness.

        **[Deque aXe DevTools](https://www.deque.com/axe/devtools/)**
        Learn more about the software that powers our accessibility testing.

        **[Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)**
        Details and info about the web content accessibility guidelines.
      `}
          title="External"
        />
      </MainSection>
    </Page>
  );
}
