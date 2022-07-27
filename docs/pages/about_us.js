// @flow strict
import { type Node } from 'react';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';

export default function DocsPage(): Node {
  return (
    <Page title="About Gestalt">
      <PageHeader name="About us" type="guidelines" />

      <MainSection
        name="We make Gestalt, Pinterest’s design system"
        description={`
Our system includes a React component library with comprehensive guidelines, best practices, tools, and resources to support designers and engineers delivering a high-quality product.

We constantly ask ourselves how might we improve experiences to be even more intuitive and inclusive. We believe that this is a never-ending journey and something to improve every day. We've integrated accessibility into the design and development of our components, following the [WCAG 2.1 AA guidelines](https://www.w3.org/TR/WCAG21/), ensuring they are not only compliant but accessible by users of all abilities.

We work closely with the Brand team to maintain Pinterest's identity and aesthetic; however, Gestalt and Brand are different areas within our organization. For further Brand guidance, please reference the [Brand guidelines website](https://brand.pinterest.com/).
`}
      />
      <MainSection
        name="Who uses Gestalt?"
        description={`
Gestalt is built for every cross-functional team member, such as designers, engineers, product managers, and every user part of Pinterest's product experience. Our system provides Pinterest with a shared language, facilitates cross-functional collaboration, avoids duplication of efforts, saves design and development time, and establishes design cohesion.
    `}
      />
      <MainSection
        name="Our design principles"
        description={`
We create digital experiences that span across culture, devices, and across a diverse group of people. Our design decisions should be purposeful in order to **meet people where they are**, **celebrate content**, **clear the noise**, **invite interaction**, and **keep visual continuity**. These principles are at the heart of how we approach problems from a design perspective. Putting each principle to practice is a vital aspect of the design process and should act as a guiding force in every decision we make. Any Pinterest experience should feel welcoming, inspiring, and inclusive.
`}
      >
        <MainSection.Subsection
          title="Meet people where they are "
          description={`
To deliver a clear, holistic experience, we must think about the needs of different types of Pinners and businesses. We are designing at scale, so we mustn't design for a single use case or type of Pinner or business. When we do, we create an isolated experience that is unwelcoming for others. Instead, we should strive to understand our internal and external users' nuances while considering multiple languages, cultures, and abilities. We should design solutions that are inclusive of all types of people, meeting them where they are.
`}
        />
        <MainSection.Subsection
          title="Celebrate content"
          description={`
Pinterest is a visual platform. Little should distract from or compete with Pinterest's content. Inspire with visuals, follow with text, and end with the interface. We should ensure nothing gets in the way of people getting absorbed in that inspiring content, insightful dashboard, or content creation flow. Components should have a consistent and appropriate hierarchy across all experiences.
          `}
        />
        <MainSection.Subsection
          title="Clear the noise"
          description={`
Each experience should remain simple even though our technology is robust and complex. Finding inspiration and inspiring others should feel effortless and, at times—downright magic. A magician is a master at keeping people's attention where they want it. We do that by getting rid of anything unnecessary and providing a clear path forward. When it comes to interface, reduce, reuse and condense whenever possible. Consider minimal color use, concise typography, and breathable whitespace.
          `}
        />
        <MainSection.Subsection
          title="Invite interaction"
          description={`
Every action should strive to make the experience as intuitive as possible. Every design should be familiar and encourage people to tap or click with confidence and ease. Consider mobile use-cases, organization of interactions and feedback.
`}
        />
        <MainSection.Subsection
          title="Keep visual continuity"
          description={`
From space to space, across any journey, Pinterest's elements should keep their form and meaning anytime someone sees them. This consistency prevents a disorienting journey where signs and landmarks drastically change or move. It is especially important when transitioning across surfaces and in navigation flows. We should strive to keep things consistent visually and conceptually.
`}
        />
      </MainSection>

      <MainSection name="Connect with Gestalt">
        <MainSection.Subsection
          description={`
[Meet the Gestalt team](http://pinch.pinadmin.com/gestaltOnboarding). We are designers, engineers, producers, writers, and so much more! We love to show our work, debate, and challenge each other, but ultimately we trust and empower each other to create great work, and we're always open to feedback.

You can connect with us through our slack channels, weekly meetings, and events. Visit [How to work with us](/how_to_work_with_us) for support and collaboration details.
`}
        />
      </MainSection>
    </Page>
  );
}
