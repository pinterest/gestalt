// @flow strict
import { type Node } from 'react';
import PageHeader from '../../../docs-components/PageHeader.js';
import Page from '../../../docs-components/Page.js';
import MainSection from '../../../docs-components/MainSection.js';
import QualityChecklist from '../../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../../docs-components/AccessibilitySection.js';

export default function DocsPage(): Node {
  return (
    <Page title="useReducedMotion">
      <PageHeader
        name="useReducedMotion"
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
            defaultCode={`
function Example() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <React.Fragment>
      <style dangerouslySetInnerHTML={{__html: \`
        @keyframes vibrate {
          0% {
            transform: translate(0);
          }
          33% {
            transform: translate(-2px, -2px);
          }
          66% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
      \`}} />
      <div
        style={
          shouldReduceMotion
            ? {}
            : { animation: 'vibrate 0.3s linear infinite both' }
        }
      >
        <Box color="infoBase" display="inlineBlock" padding={4}>
          <Text color="inverse">{shouldReduceMotion ? 'Reduced motion enabled' : 'Reduced motion disabled'}</Text>
        </Box>
      </div>
    </React.Fragment>
  );
}`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component="useReducedMotion" />
    </Page>
  );
}
