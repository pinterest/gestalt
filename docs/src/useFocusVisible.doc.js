// @flow strict
import React, { type Node } from 'react';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="useFocusVisible"
    description={`
    \`useFocusVisible\` manages focus interactions on the page and determines whether a focus ring should be shown. If a user interacts with a mouse/touch, then the focus is not visible. When the user interacts with the keyboard, then the focus is visible.

    References:
    <ul>
      <li><a href="https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html">WCAG 2.4.7: Focus Visible</a></li>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible">:focus-visible CSS pseudo-class</a></li>
    </ul>
    `}
  />
);

card(
  <Example
    name="Example"
    defaultCode={`
function Example() {
  const { isFocusVisible } = useFocusVisible();
  const [ focussedButton1, setFocussedButton1 ] = React.useState(false);
  const [ focussedButton2, setFocussedButton2 ] = React.useState(false);

  return (
    <Stack gap={4}>
      <Row gap={4}>
        <Text>With focus visible</Text>
        <button
          onBlur={() => setFocussedButton1(false)}
          onFocus={() => setFocussedButton1(true)}
          style={{
            outline: 'none',
            boxShadow: isFocusVisible && focussedButton1 ? "0 0 0 4px rgba(0, 132, 255, 0.5)" : null
          }}
        >
          <Text>Button 1</Text>
        </button>
      </Row>
      <Row gap={4}>
        <Text>Without focus visible</Text>
        <button
          onBlur={() => setFocussedButton2(false)}
          onFocus={() => setFocussedButton2(true)}
          style={{
            outline: 'none',
            boxShadow: focussedButton2 ? "0 0 0 4px rgba(0, 132, 255, 0.5)" : null
          }}
        >
          <Text>Button 2</Text>
        </button>
      </Row>
    </Stack>
  );
}`}
  />
);

export default cards;
