// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../../docs-components/AccessibilitySection';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import QualityChecklist from '../../../docs-components/QualityChecklist';
import SandpackExample from '../../../docs-components/SandpackExample';
import example from '../../../examples/usereducedmotion/example';

export default function DocsPage(): ReactNode {
  return (
    <Page title="useReducedMotion">
      <PageHeader
        description={`
    \`useReducedMotion\` allows a user to request that the system minimize the amount of non-essential motion.

    Users can experience distraction or nausea from animated content. For example, scrolling a page which causes elements to move (other than the essential movement associated with scrolling) can trigger vestibular disorders.

    Change your Accessibility -> Display device settings to "Reduce motion" and notice the animation stops.

    References:
    <ul>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" target="_blank">CSS media query: prefers-reduced-motion</a></li>
      <li><a href="https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html">WCAG C39: Using the CSS reduce-motion query to prevent motion</a></li>
    </ul>
    `}
        name="useReducedMotion"
        type="utility"
      />

      <AccessibilitySection name="useReducedMotion" />

      <MainSection name="Examples">
        <MainSection.Subsection
          description={
            'To test the example below, change your Accessibility -> Display device settings to "Reduce motion" and notice the animation stops.'
          }
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={example} layout="column" name="Example" />}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component="useReducedMotion" />
    </Page>
  );
}
