import { ReactNode } from 'react';
import classnames from 'classnames';
import style from './InternalFieldset.css';
import boxStyles from '../Box.css';
import boxWhitespaceStyles from '../boxWhitespace.css';
import formStyles from '../sharedSubcomponents/FormElement.css';
import FormErrorMessage from '../sharedSubcomponents/FormErrorMessage';
import FormHelperText from '../sharedSubcomponents/FormHelperText';
import Text from '../Text';
import whitespaceStyles from '../Whitespace.css';

type Props = {
  children: ReactNode;
  id?: string;
  errorMessage?: string;
  legend: string;
  legendDisplay?: 'visible' | 'hidden';
  helperText?: string;
  marginTop?: boolean;
};

export default function InternalFieldset({
  id,
  errorMessage,
  legend,
  legendDisplay,
  children,
  helperText,
  marginTop,
}: Props) {
  return (
    <fieldset
      aria-describedby={errorMessage ? `${id}-error` : undefined}
      className={classnames(formStyles.unstyled, whitespaceStyles.p0, whitespaceStyles.m0)}
    >
      <legend
        className={classnames(style.label, {
          [boxStyles.visuallyHidden]: legendDisplay === 'hidden',
        })}
      >
        <Text size="100">{legend}</Text>
      </legend>
      {children}
      {helperText && (
        <FormHelperText
          disabled={false}
          id={`${id}-helperText`}
          marginTop={marginTop}
          noPadding
          text={helperText}
        />
      )}

      {errorMessage && (
        <FormErrorMessage id={`${id}-error`} marginTop={marginTop} text={errorMessage} />
      )}
    </fieldset>
  );
}

InternalFieldset.displayName = 'InternalFieldset';
