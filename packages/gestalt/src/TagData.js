// @flow strict
import { type Node } from 'react';
import styles from './TagData.css';
import Flex from './Flex.js';
import Text from './Text.js';
import Tile from './Tile/Tile.js';

export type Props = {|
  /**
   * If your app uses DefaultLabelProvider, a default value for this label will be used. Using this prop will override the default label value with a more specific label if desired. This populates the `aria-label` on the remove icon.
   */
  accessibilityRemoveIconLabel?: string,
  /**
   * Disabled tags appear inactive and cannot be interacted with.
   */
  disabled?: boolean,
  /**
   * Callback fired when the user dismisses the tag. This handler should take care of state updates to no longer render the Tag.
   */
  onRemove?: ({| event: SyntheticMouseEvent<HTMLButtonElement> |}) => void,
  /**
   * Size of the Tag Data, see the [sizes](https://gestalt.pinterest.systems.com/web/tagdata#sizes) variant
   */
  size?: 'sm' | 'md' | 'lg',
  /**
   * Short text to render inside the Tag.
   */
  text: string,
|};

/**
 * [Tags](https://gestalt.pinterest.systems/web/tag) are objects that hold text and have a delete icon to remove them. They can appear within [TextFields](https://gestalt.pinterest.systems/web/textfield#tagsExample), [TextAreas](https://gestalt.pinterest.systems/web/textarea#tagsExample), [ComboBox](https://gestalt.pinterest.systems/web/combobox#Tags) or as standalone components.
 *
 * ![Tag light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag.spec.mjs-snapshots/Tag-chromium-darwin.png)
 * ![Tag dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag-dark.spec.mjs-snapshots/Tag-dark-chromium-darwin.png)
 */
export default function TagData({
  accessibilityRemoveIconLabel,
  disabled = false,
  onRemove,
  size = 'md',
  text,
}: Props): Node {
  const sizes = {
    'sm': { height: 32, font: '200' },
    'lg': { height: 48, font: '300' },
    'md': { height: 40, font: '200' },
  };

  return (
    <Flex>
      <Tile className={styles}>
        <div title={text}>
          <Text inline fontSize={sizes[size].fontSize} lineClamp={1}>
            {text}
          </Text>
        </div>
      </Tile>
    </Flex>
  );
}
