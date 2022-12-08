// @flow strict
import { Children, type Element, type Node } from 'react';
import Text from './Text.js';
import styles from './List.css';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';

type Props = {|
  text: string | Element<typeof Text>,
|};

export default function ListText({ text }: Props): Node {
  if (!text) {
    throw new Error(`Gestalt List is missing \`label\` prop or a \`text\` prop within List.Item.`);
  }

  const { name: colorSchemeName } = useColorScheme();

  const isDarkMode = colorSchemeName === 'darkMode';

  let labelElement: Element<'span'> | string | Node = text;

  if (typeof text === 'string') {
    labelElement = <Text>{text}</Text>;
  }

  // If `text` is a Text component, we need to override any text colors within to ensure they all match
  if (typeof text !== 'string' && Children.only(text)?.type.displayName === 'Text') {
    const textColorOverrideStyles = isDarkMode
      ? styles.textColorOverrideLight
      : styles.textColorOverrideDark;

    labelElement = <span className={textColorOverrideStyles}>{text}</span>;
  }

  return labelElement;
}
