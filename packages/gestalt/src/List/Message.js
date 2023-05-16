// @flow strict
import { Children, type Element, type Node } from 'react';
import { useColorScheme } from '../contexts/ColorSchemeProvider.js';
import styles from '../List.css';
import Text from '../Text.js';

type Props = {|
  text: string | Element<typeof Text>,
|};

export default function ListText({ text }: Props): Node {
  const { name: colorSchemeName } = useColorScheme();

  // Flow shuold catch if text is missing. In case Flow is not enabled and text is missing, the errors are not that helpful. This surfaces the problem more explicitly.
  if (!text) {
    throw new Error(`Gestalt List is missing \`label\` prop or a \`text\` prop within List.Item.`);
  }

  if (typeof text === 'string') {
    return <Text>{text}</Text>;
  }

  // If `text` is a Text component, we need to override any text colors within to ensure they all match
  // $FlowFixMe[underconstrained-implicit-instantiation]
  if (typeof text !== 'string' && Children.only(text)?.type.displayName === 'Text') {
    const isDarkMode = colorSchemeName === 'darkMode';

    const textColorOverrideStyles = isDarkMode
      ? styles.textColorOverrideLight
      : styles.textColorOverrideDark;

    return <span className={textColorOverrideStyles}>{text}</span>;
  }

  throw new Error(
    `Gestalt List has a \`label\` prop or a \`text\` prop that is not a string nor a Text component.`,
  );
}
