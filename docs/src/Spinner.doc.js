// @flow strict
import type { Node } from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Spinner"
    description="Spinners help indicate that a surface's content or portion of content is currently loading."
    defaultCode={`
function SpinnerExample() {
  const [show, setShow] = React.useState(true);

  return (
    <Box>
      <Box paddingY={2}>
        <Button
          text={!show ? "Show spinner" : "Hide spinner"}
          onClick={() => setShow(!show)}
          size="md"
        />
      </Box>
      <Spinner show={show} accessibilityLabel="Example spinner" />
    </Box>
  );
}
`}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the element. Always localize the label.',
      },
      {
        name: 'show',
        type: 'boolean',
        required: true,
        defaultValue: false,
      },
      {
        name: 'delay',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description:
          'Whether or not to render with a 300ms delay. The delay is for perceived performance so you should rarely need to remove it.',
      },
      {
        name: 'size',
        type: `"sm" | "md"`,
        description: `sm: 32px, md: 40px`,
        defaultValue: 'md',
      },
    ]}
  />,
);

card(
  <MainSection name="Usage guidelines">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        title="When to Use"
        description={`
          - When loading or updating content on a surface.
        `}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        title="When Not to Use"
        description={`
          - To communicate that a UI element, such as a button, is performing an action that takes a perceptible amount of time. Contact us if this is needed.
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <Example
    description={`
    Spinners indicate when a user has to wait for something else to occur. They delay showing for 300ms to improve perceived performance.

    The label on a spinner is for accessibility. You should pick labels that relate to the specific part of the product it's being used in ("Loading homefeed" for instance).
  `}
    name="Example"
    defaultCode={`
function SpinnerExample() {
  const [show, setShow] = React.useState(false);

  return (
    <Box>
      <Box paddingY={2}>
        <Button
          text={!show ? "Show spinner" : "Hide spinner"}
          onClick={() => setShow(!show)}
          size="md"
        />
      </Box>
      <Spinner show={show} accessibilityLabel="Example spinner" />
    </Box>
  );
}
`}
  />,
);

export default cards;
