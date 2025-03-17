import { ReactElement } from 'react';

class EscapedCSS {
  _private_safe_value: string;

  static factory(input: string | EscapedCSS): EscapedCSS {
    return input instanceof EscapedCSS ? input : new EscapedCSS(String(input));
  }

  constructor(unsafeCSS: string) {
    // eslint-disable-next-line no-underscore-dangle
    this._private_safe_value = unsafeCSS
      .trim()
      .replace('>', '\u003E')
      .replace('<', '\u003C')
      .replace('&', '\u0026')
      .replace('"', '\u0022')
      .replace("'", '\u0027');
  }

  toString(): string {
    // eslint-disable-next-line no-underscore-dangle
    return this._private_safe_value;
  }
}

type Props = {
  css?: EscapedCSS;
  unsafeCSS?: string;
  id?: string;
};

export default function InlineStyle(props: Props): null | ReactElement<'style'> {
  const { css, unsafeCSS, ...rest } = props;
  const content = String(css || '') || unsafeCSS || '';
  const hasContent = !!content;

  return hasContent ? (
    <style
      {...rest}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: String(EscapedCSS.factory(content)) }}
    />
  ) : null;
}
