// @flow strict
import * as React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Link"
    description="The Link component allows you to show links on the page, open them in a new window, and change the color."
  />
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
        href: 'advancedExample',
      },
      {
        name: 'href',
        type: 'string',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'inline',
        type: 'boolean',
        defaultValue: false,
        href: 'advancedExample',
      },
      {
        name: 'onClick',
        type:
          '({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> }) => void',
        href: 'advancedExample',
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
        href: 'advancedExample',
      },
      {
        name: 'target',
        type: `"null" | "self" | "blank"`,
        defaultValue: 'null',
      },
    ]}
  />
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
      <Text weight="bold">Pinterest.com</Text>
    </Box>
  </Link>
  <Box color="darkGray">
    <Text color="white" weight="bold">
      <Link href="https://pinterest.com">
        <Box padding={2}>
          Pinterest.com
        </Box>
      </Link>
    </Text>
  </Box>
</Box>
`}
  />
);

card(
  <Example
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
      <Link inline href="https://pinterest.com">
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
  />
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
            href="#"
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
  />
);

card(
  <Example
    id="advancedExample"
    name="Advanced Example"
    defaultCode={`
function AdvancedExample() {
  const [preventDefault, setPreventDefault] = React.useState(true);
  const onClick = ({ event }) => {
    if (preventDefault) {
      event.preventDefault();
    }
  };

  return (
    <Box>
      <Row gap={2} padding={2}>
        <Label htmlFor="preventDefault">
          <Text>Prevent default on tap</Text>
        </Label>
        <Switch
          id="preventDefault"
          onChange={() => setPreventDefault(!preventDefault)}
          switched={preventDefault}
        />
      </Row>
      <Divider />
      <Box padding={2}>
        <Link href="https://pinterest.com" onClick={onClick}>
          <Text>Link with default options</Text>
        </Link>
      </Box>
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
              <Text inline>Inline</Text>
              {' '}
              <Link
                hoverStyle={hoverStyle}
                href="https://pinterest.com"
                inline
                onClick={onClick}
                tapStyle={tapStyle}
                target="blank"
              >
                <Text>{text}</Text>
              </Link>
            </Box>
          )
        )}
    </Box>
  );
}
`}
  />
);

export default cards;

const navRoute = { section: 'components', group: 'Forms' };
export { navRoute };
