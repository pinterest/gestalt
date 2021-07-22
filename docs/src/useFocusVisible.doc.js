// @flow strict
import type { Node } from 'react';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="useFocusVisible"
    description={`
    \`useFocusVisible\` manages focus interactions on the page and determines whether a focus ring should be shown. When using the \`useFocusVisible\` hook, if a user interacts with a mouse or by touch, then the focus indicator is not visible. When the user interacts with the keyboard however, the focus indicator will be visible.

    References:
    <ul>
      <li><a href="https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html">WCAG 2.4.7: Focus Visible</a></li>
      <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible">:focus-visible CSS pseudo-class</a></li>
    </ul>
    `}
  />,
);

card(
  <Example
    name="Example"
    defaultCode={`
function Example() {
  const { isFocusVisible } = useFocusVisible();
  const [ focusedButton1, setFocusedButton1 ] = React.useState(false);
  const [ focusedButton2, setFocusedButton2 ] = React.useState(false);

  return (
    <Flex alignItems="center" direction="column" gap={12}>
      <Flex direction="column" alignItems="center" gap={4}>
        <Text>Using useFocusVisible(): Focus ring is only visible when using keyboard</Text>
        <button
          onBlur={() => setFocusedButton1(false)}
          onFocus={() => setFocusedButton1(true)}
          style={{
            outline: 'none',
            boxShadow: isFocusVisible && focusedButton1 ? "0 0 0 4px rgba(0, 132, 255, 0.5)" : null
          }}
        >
          <Text>Button 1</Text>
        </button>
      </Flex>
      <Flex alignItems="center" direction="column" gap={4}>
        <Text>Not using useFocusVisible(): Focus ring is always visible</Text>
        <button
          onBlur={() => setFocusedButton2(false)}
          onFocus={() => setFocusedButton2(true)}
          style={{
            outline: 'none',
            boxShadow: focusedButton2 ? "0 0 0 4px rgba(0, 132, 255, 0.5)" : null
          }}
        >
          <Text>Button 2</Text>
        </button>
      </Flex>
    </Flex>
  );
}`}
  />,
);

export default cards;
