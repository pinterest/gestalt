// @flow strict
import { type Node, useState } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import styles from './TableOfContents.css';
import TapArea from './TapArea.js';
import Text from './Text.js';

type Props = {|
  /**
   * Prop description.
   */
  label: string,
  active?: boolean,
  href: string,
  nested?: boolean,
|};

/**
 * [TableOfContents](https://gestalt.pinterest.systems/web/tableofcontents) component should be used for ... on the page.
 * ![TableOfContents light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TableOfContents.spec.mjs-snapshots/TableOfContents-chromium-darwin.png)
 * ![TableOfContents dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TableOfContents-dark.spec.mjs-snapshots/TableOfContents-dark-chromium-darwin.png)
 */
export default function TableOfContentsItem({ label, active, href, nested }: Props): Node {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const hasMarker = active || hovered || focused;
  const markerColor = active || focused ? 'inverse' : 'tertiary';

  return (
    <li style={{ listStyle: 'none' }}>
      <TapArea
        tapStyle="compress"
        role="link"
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <Flex>
          <Box width={4} color={hasMarker ? markerColor : 'default'} rounding="pill" />
          <Box
            flex="grow"
            color={hovered ? 'secondary' : undefined}
            dangerouslySetInlineStyle={{
              __style: {
                paddingRight: '16px',
                paddingLeft: nested ? '32px' : '12px',
                paddingTop: nested ? '14.5px' : '13.5px',
                paddingBottom: nested ? '14.5px' : '13.5px',
                borderRadius: '2px 8px 8px 2px',
              },
            }}
          >
            <Text weight={active ? 'bold' : 'normal'}>{label}</Text>
          </Box>
        </Flex>
      </TapArea>
    </li>
  );
}

TableOfContentsItem.displayName = 'TableOfContents.Item';
