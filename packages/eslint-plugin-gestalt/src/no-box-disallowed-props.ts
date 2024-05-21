/**
 * @fileoverview Error on disallowed props on `Box`
 */

import { ESLintRule } from './helpers/eslintFlowTypes';

export const allowedBaseProps = [
  // React / DOM
  'id',
  'key',
  'onAnimationEnd',
  'onAnimationIteration',
  'onAnimationStart',
  'onBlur',
  'onClick',
  'onContextMenu',
  'onDblClick',
  'onDoubleClick',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onFocus',
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onScroll',
  'onSelect',
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',
  'onTransitionEnd',
  'onTransitionStart',
  'onWheel',
  'ref',
  'tabIndex',

  // Box specific
  'dangerouslySetInlineStyle',
  'display',
  'column',
  'direction',
  'smDisplay',
  'smColumn',
  'smDirection',
  'mdDisplay',
  'mdColumn',
  'mdDirection',
  'lgDisplay',
  'lgColumn',
  'lgDirection',
  'alignContent',
  'alignItems',
  'smAlignItems',
  'mdAlignItems',
  'lgAlignItems',
  'alignSelf',
  'as',
  'bottom',
  'borderStyle',
  'color',
  'fit',
  'flex',
  'height',
  'justifyContent',
  'left',
  'margin',
  'marginTop',
  'marginBottom',
  'marginStart',
  'marginEnd',
  'smMargin',
  'smMarginTop',
  'smMarginBottom',
  'smMarginStart',
  'smMarginEnd',
  'mdMargin',
  'mdMarginTop',
  'mdMarginBottom',
  'mdMarginStart',
  'mdMarginEnd',
  'lgMargin',
  'lgMarginTop',
  'lgMarginBottom',
  'lgMarginStart',
  'lgMarginEnd',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'opacity',
  'overflow',
  'padding',
  'smPadding',
  'mdPadding',
  'lgPadding',
  'paddingX',
  'smPaddingX',
  'mdPaddingX',
  'lgPaddingX',
  'paddingY',
  'smPaddingY',
  'mdPaddingY',
  'lgPaddingY',
  'position',
  'right',
  'rounding',
  'top',
  'width',
  'wrap',
  'userSelect',
  'role',
  'zIndex',
] as const;

const allowedPrefixProps = ['data-', 'aria-'];

const errorMessage = (props: ReadonlyArray<string>, localBoxName: string): string =>
  `${props.length === 1 ? `${props[0]} is` : `${props.join(', ')} are`} not allowed on Box${
    localBoxName !== 'Box' ? ` (imported as ${localBoxName})` : ''
  }. Please see https://gestalt.pinterest.systems/Box for all allowed props.`;

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: `Don't allow props different from the officially-supported Box props and the allowed-list of passthrough React / DOM props`,
      category: 'Gestalt restrictions',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltno-box-disallowed-props',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    let localBoxName: string | null | undefined = null;

    return {
      // @ts-expect-error - TS7006 - Parameter 'decl' implicitly has an 'any' type.
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
        localBoxName = decl.specifiers.find((node) => node.imported.name === 'Box')?.local?.name;
      },
      // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
      JSXOpeningElement(node) {
        if (!localBoxName || node?.name?.name !== localBoxName) {
          return;
        }

        const disallowedProps = Object.keys(node.attributes)
          .map((key: string) => node.attributes[key]?.name?.name)
          .filter(
            (propName: string) =>
              propName &&
              // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type '"ref" | "column" | "alignItems" | "key" | "color" | "overflow" | "display" | "id" | "onBlur" | "onClick" | "onFocus" | "rounding" | "tabIndex" | "role" | "onKeyDown" | "onKeyPress" | ... 98 more ... | "onTransitionStart"'.
              !allowedBaseProps.includes(propName) &&
              !allowedPrefixProps.some((allowedPrefixProp) =>
                propName.startsWith(allowedPrefixProp),
              ),
          );

        if (disallowedProps.length) {
          const message = errorMessage(disallowedProps, localBoxName ?? '');
          context.report(node, message);
        }
      },
    };
  },
};

export default rule;
