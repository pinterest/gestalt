// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Link"
    description="The Link component allows you to show links on the page, open them in a new window, and change the color."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilitySelected',
        type: 'boolean',
        href: 'tab',
      },
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'hoverStyle',
        type: `'none' | 'underline'`,
        defaultValue: 'underline',
        href: 'Permutations',
      },
      {
        name: 'href',
        type: 'string',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'id',
        type: 'string',
        description: 'id attribute of the anchor tag',
      },
      {
        name: 'inline',
        type: 'boolean',
        defaultValue: false,
        href: 'advancedExample',
      },
      {
        name: 'onBlur',
        type: '() => void',
      },
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: false,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers to replace link texts that do not provide sufficient context about the link component behavior. Texts like `Click Here,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the link text.',
          'Accessibility: It populates aria-label. Screen readers read the `accessibilityLabel` prop, if present, instead of the link text.',
        ],
        href: 'accessibility',
      },
      {
        name: 'onClick',
        type:
          '({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> }) => void',
        href: 'PreventDefault',
      },
      {
        name: 'onFocus',
        type: '() => void',
      },
      {
        name: 'onNavigationOptions',
        type: '({ [string]: Node | ({| +event: SyntheticEvent<> |}) => void }) => void',
        description: [
          'onNavigationOptions works in pair with a Provider:',
          '<Provider onNavigation={({ href, onNavigationOptions, event}) => {}}>.',
          `- 'href' can be used to check the type of url`,
          `- 'onNavigationOptions' can be used to pass custom props to 'onNavigation'`,
          `- 'event' can be used to prevent native Link component events`,
        ],
        href: 'OnNavigationContext',
      },
      {
        name: 'ref',
        type: "React.Ref<'a'>",
        description: 'Forward the ref to the underlying anchor element',
      },
      {
        name: 'rel',
        type: `"none" | "nofollow"`,
        defaultValue: 'none',
      },
      {
        name: 'role',
        type: `"tab"`,
        href: 'tab',
      },
      {
        name: 'rounding',
        type: `"pill" | "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8`,
        defaultValue: '0',
        href: 'advancedExample',
      },
      {
        name: 'tapStyle',
        type: `"none" | "compress"`,
        defaultValue: 'none',
        href: 'Permutations',
      },
      {
        name: 'target',
        type: `"null" | "self" | "blank"`,
        defaultValue: 'null',
        href: 'PreventDefault',
      },
    ]}
  />,
);

card(
  <Example
    description={`
    You should wrap \`Link\` components inside of a \`Text\` component to get the correct font & underline color.
  `}
    name="Example"
    defaultCode={`
<Box>
  <Link href="https://pinterest.com">
    <Box padding={2}>
      <Text color='red' weight="bold">Incorrect underline color: Pinterest.com</Text>
    </Box>
  </Link>
    <Text color="red" weight="bold">
      <Link href="https://pinterest.com">
        <Box padding={2}>
          Correct underline color: Pinterest.com
        </Box>
      </Link>
    </Text>
</Box>`}
  />,
);

card(
  <Example
    id="accessibility"
    description={`
    When providing the content for the link, avoid phrases like "click here" or "go to".
  `}
    name="Accessible Content"
    defaultCode={`
<Box>
  <Heading>
    Bad ❌
  </Heading>
  <Text>
    For more information,{' '}
    <Text inline weight="bold">
      <Link accessibilityLabel="visit https://pinterest.com" inline href="https://pinterest.com">
        click here
      </Link>
    </Text>.
  </Text>
  <Box paddingY={4}>
    <Heading>
      Good ✅
    </Heading>
    <Text>
      Visit
      {' '}
      <Text inline weight="bold">
        <Link inline href="https://pinterest.com">
          Pinterest.com
        </Link>
      </Text>
      {' '}
      for more information.
    </Text>
  </Box>
</Box>
`}
  />,
);

card(
  <Example
    id="tab"
    description={`
    Use accessibilitySelected and role when using it as a Tab.
  `}
    name="Accessible Tab Link"
    defaultCode={`
function TabExample() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <Box display="flex" alignItems="center" role="tablist">
      {['Boards', 'Pins'].map((text, index) => (
        <Box
          color={index === activeIndex ? "darkGray" : undefined}
          display="inlineBlock"
          key={text}
          rounding="pill"
        >
          <Link
            accessibilitySelected={index === activeIndex}
            hoverStyle="none"
            href="https://pinterest.com"
            onClick={({ event }) => {
              event.preventDefault();
              setActiveIndex(index);
            }}
            rounding="pill"
            role="tab"
          >
            <Box padding={3} rounding="pill">
              <Text color={index === activeIndex ? "white" : "darkGray"}>
                {text}
              </Text>
            </Box>
          </Link>
        </Box>
      ))}
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    id="Permutations"
    name="Permutations: tapStyle and hoverStyle"
    defaultCode={`
function PermutationsExample() {
  return (
    <Box>
      {
        [
          { text: 'Link without compress nor underline', hoverStyle: 'none', tapStyle: 'none' },
          { text: 'Link with compress only', hoverStyle: 'none', tapStyle: 'compress' },
          { text: 'Link with underline only', hoverStyle: 'underline', tapStyle: 'none' },
          { text: 'Link with compress and underline', hoverStyle: 'underline', tapStyle: 'compress' },
        ]
        .map(
          ({ text, hoverStyle, tapStyle }) => (
            <Box key={text} padding={2}>
              <Text>
              <Link
                hoverStyle={hoverStyle}
                href="https://pinterest.com"
                onClick={ ({ event }) => { event.preventDefault() }}
                tapStyle={tapStyle}
                target="blank"
              >
               {text}
               </Link>
             </Text>
            </Box>
          )
        )}
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    id="PreventDefault"
    name="Prevent default"
    defaultCode={`
function PreventDefaultExample() {
  const [preventDefault, setPreventDefault] = React.useState(true);
  const onClick = ({ event }) => {
    if (preventDefault) {
      event.preventDefault();
    }
  };

  return (
    <Box>
      <Box padding={2}>
        <Flex alignItems="center" gap={4}>
          <Label htmlFor="preventDefault">
            <Text>Prevent default on tap</Text>
          </Label>
          <Switch
            id="preventDefault"
            onChange={() => setPreventDefault(!preventDefault)}
            switched={preventDefault}
          />
        </Flex>
      </Box>
      <Divider />
      <Box padding={2}>
        <Text>
          <Link href="https://pinterest.com" onClick={onClick} target='blank'>
            https://pinterest.com
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
`}
  />,
);

export default cards;
