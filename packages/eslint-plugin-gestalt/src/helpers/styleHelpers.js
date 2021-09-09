// @flow strict
import {
  genBointLookup,
  validateBackgroundColor,
  validateBorder,
  validateBorderRadius,
  validateBoxShadow,
} from './styleValidators.js';

// $FlowFixMe[unclear-type]\
type GenericType = any;

type GenericNode = GenericType;

type GenOpacityLookupType = () => {| [string | number]: string |};

const genOpacityLookup: GenOpacityLookupType = () => {
  const lookupMap = {};
  for (let i = 0; i <= 10; i += 1) {
    const val = i / 10; // Why not increment i by 0.1? Floats
    const msg = `opacity={${val}}`;
    lookupMap[val] = msg;
    lookupMap[`${val}`] = msg;
  }
  return lookupMap;
};

type MatchKeyErrorsAccType = $ReadOnlyArray<{|
  node: GenericNode,
  prop?: ?string | number,
  message: ?string | number,
|}>;

type MatchKeyErrorsType = (
  MatchKeyErrorsAccType,
  { [string]: GenericType },
) => MatchKeyErrorsAccType;

type DimensionFormattingType = ({| keyName: string, value: string |}) => ?string;

const dimensionFormatting: DimensionFormattingType = ({ keyName, value }) => {
  if (typeof value === 'number') return `${keyName ?? ''}={${value}}`;
  if (value.endsWith('%')) return `${keyName ?? ''}="${value}"`;
  if (value.endsWith('px')) return `${keyName ?? ''}={${value.replace('px', '')}}`;
  return null;
};

type GenerateDefaultMessageType = (?string | number) => ?string;

const generateDefaultMessage: GenerateDefaultMessageType = (prop) =>
  prop ? `  Use prop \`${prop}\` instead` : '';

type GetMatchKeyErrorsReducerType = ({| context: GenericNode |}) => MatchKeyErrorsType;

/** This function returns ...
 */
const getMatchKeyErrorsReducer: GetMatchKeyErrorsReducerType = ({ context }) => {
  // this function is return at the end with context in scope
  const matchKeyErrors: MatchKeyErrorsType = (accumulatorAlternatives, alternativeMap) => {
    const accumulatorAlternativesBuilder = [...accumulatorAlternatives];
    const marginLookup = genBointLookup('margin', -12);
    const marginBottomLookup = genBointLookup('marginBottom', -12);
    const marginLeftLookup = genBointLookup('marginLeft', -12);
    const marginRightLookup = genBointLookup('marginRight', -12);
    const marginTopLookup = genBointLookup('marginTop', -12);
    const opacityLookup = genOpacityLookup();
    const paddingLookup = genBointLookup('padding', 0);

    const overflowLookup = {
      visible: `overflow="visible"`,
      hidden: `overflow="hidden"`,
      scroll: `overflow="scroll"`,
      auto: `overflow="auto"`,
    };

    function includeKey(keyName) {
      const { onlyKeys } = context?.options?.[0] ?? {}; // Access options from Eslint configuration
      return !onlyKeys || onlyKeys.includes(keyName);
    }

    switch (alternativeMap.name) {
      case 'backgroundColor':
        if (includeKey('backgroundColor')) {
          const alternative = validateBackgroundColor(
            typeof alternativeMap.value === 'string' ? alternativeMap.value : '',
          );
          if (alternative) {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: alternative,
              message: generateDefaultMessage(alternative),
            });
          }
        }
        break;
      case 'borderRadius':
        if (includeKey('borderRadius')) {
          const alternative = validateBorderRadius(
            typeof alternativeMap.value === 'string' ? alternativeMap.value : '',
          );
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: alternative,
            message: generateDefaultMessage(alternative),
          });
        }
        break;
      case 'border':
        if (includeKey('border')) {
          const alternative = validateBorder(
            typeof alternativeMap.value === 'string' ? alternativeMap.value : '',
          );
          if (alternative) {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: alternative,
              message: generateDefaultMessage(alternative),
            });
          }
        }
        break;
      case 'boxShadow':
        if (includeKey('boxShadow')) {
          const alternative = validateBoxShadow(
            typeof alternativeMap.value === 'string' ? alternativeMap.value : '',
          );
          if (alternative) {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: alternative,
              message: generateDefaultMessage(alternative),
            });
          }
        }
        break;
      case 'bottom':
        if (
          (includeKey('bottom') && alternativeMap.value === '0px') ||
          alternativeMap.value === 0
        ) {
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: 'bottom',
            message: generateDefaultMessage('bottom'),
          });
        }
        break;
      case 'left':
        if ((includeKey('left') && alternativeMap.value === '0px') || alternativeMap.value === 0) {
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: 'left',
            message: generateDefaultMessage('left'),
          });
        }
        break;
      case 'margin':
        if (includeKey('margin')) {
          if (alternativeMap.value === 'auto') {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: `margin="auto"`,
              message: generateDefaultMessage('margin="auto"'),
            });
          } else {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: marginLookup[alternativeMap.value],
              message: generateDefaultMessage(marginLookup[alternativeMap.value]),
            });
          }
        }
        break;
      case 'marginBottom':
        if (includeKey('marginBottom')) {
          if (alternativeMap.value === 'auto') {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: `marginBottom="auto"`,
              message: '  Use prop `marginBottom="auto"` instead',
            });
          } else {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: marginBottomLookup[alternativeMap.value],
              message: generateDefaultMessage(marginBottomLookup[alternativeMap.value]),
            });
          }
        }
        break;
      case 'marginLeft':
        if (includeKey('marginTop')) {
          if (alternativeMap.value === 'auto') {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: `marginStart="auto"`,
              message: generateDefaultMessage(`marginStart="auto"`),
            });
          } else {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: marginLeftLookup[alternativeMap.value],
              message: generateDefaultMessage(marginLeftLookup[alternativeMap.value]),
            });
          }
        }
        break;
      case 'marginRight':
        if (includeKey('marginRight')) {
          if (alternativeMap.value === 'auto') {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: `marginEnd="auto"`,
              message: generateDefaultMessage(`marginEnd="auto"`),
            });
          } else {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: marginRightLookup[alternativeMap.value],
              message: generateDefaultMessage(marginRightLookup[alternativeMap.value]),
            });
          }
        }
        break;
      case 'marginTop':
        if (includeKey('marginTop')) {
          if (alternativeMap.value === 'auto') {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: `marginTop="auto"`,
              message: generateDefaultMessage(`marginTop="auto"`),
            });
          } else {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: marginTopLookup[alternativeMap.value],
              message: generateDefaultMessage(marginTopLookup[alternativeMap.value]),
            });
          }
        }
        break;
      case 'maxHeight':
        if (includeKey('maxHeight')) {
          const alternative = dimensionFormatting({
            keyName: alternativeMap.node?.key?.name ?? '',
            value: alternativeMap.value,
          });
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: alternative,
            message: generateDefaultMessage(alternative),
          });
        }
        break;
      case 'minHeight':
        if (includeKey('minHeight')) {
          const alternative = dimensionFormatting({
            keyName: alternativeMap.node?.key?.name,
            value: alternativeMap.value,
          });
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: alternative,
            message: generateDefaultMessage(alternative),
          });
        }
        break;
      case 'maxWidth':
        if (includeKey('maxWidth')) {
          const alternative = dimensionFormatting({
            keyName: alternativeMap.name,
            value: alternativeMap.value,
          });
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: alternative,
            message: generateDefaultMessage(alternative),
          });
        }
        break;
      case 'minWidth':
        if (includeKey('minWidth')) {
          const alternative = dimensionFormatting({
            keyName: alternativeMap.node?.key?.name,
            value: alternativeMap.value,
          });
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: alternative,
            message: generateDefaultMessage(alternative),
          });
        }
        break;
      case 'opacity':
        if (includeKey('opacity')) {
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: opacityLookup[alternativeMap.value],
            message: generateDefaultMessage(opacityLookup[alternativeMap.value]),
          });
        }
        break;
      case 'overflow':
        if (includeKey('overflow')) {
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: overflowLookup[alternativeMap.value],
            message: generateDefaultMessage(overflowLookup[alternativeMap.value]),
          });
        }
        break;
      case 'overflow-x':
        if (includeKey('overflow')) {
          if (alternativeMap.value === 'scroll') {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: `overflow="scrollX"`,
              message: generateDefaultMessage(`overflow="scrollX"`),
            });
          }
        }
        break;
      case 'overflow-y':
        if (includeKey('overflow')) {
          if (alternativeMap.value === 'scroll') {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: `overflow="scrollY"`,
              message: generateDefaultMessage(`overflow="scrollY"`),
            });
          }
        }
        break;
      case 'padding':
        if (includeKey('padding')) {
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: paddingLookup[alternativeMap.value],
            message: generateDefaultMessage(paddingLookup[alternativeMap.value]),
          });
        }
        break;
      case 'position':
        if (includeKey('position')) {
          if (alternativeMap.value === 'absolute') {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: `position="absolute"`,
              message: generateDefaultMessage(`position="absolute"`),
            });
          } else if (alternativeMap.value === 'static') {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: `position="static"`,
              message: generateDefaultMessage(`position="static"`),
            });
          } else if (alternativeMap.value === 'relative') {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: `position="relative"`,
              message: generateDefaultMessage(`position="relative"`),
            });
          } else if (alternativeMap.value === 'fixed') {
            accumulatorAlternativesBuilder.push({
              node: alternativeMap.node,
              prop: `position="fixed"`,
              message: generateDefaultMessage(`position="fixed"`),
            });
          }
        }
        break;
      case 'right':
        if ((includeKey('right') && alternativeMap.value === '0px') || alternativeMap.value === 0) {
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: 'right',
            message: generateDefaultMessage('right'),
          });
        }
        break;
      case 'top':
        if ((includeKey('top') && alternativeMap.value === '0px') || alternativeMap.value === 0) {
          accumulatorAlternativesBuilder.push({
            node: alternativeMap.node,
            prop: 'top',
            message: generateDefaultMessage('top'),
          });
        }
        break;
      default:
        break;
    }
    return accumulatorAlternativesBuilder.filter((x) => x);
  };

  return matchKeyErrors;
};

type BuildValidatorResponseFromStylePropertiesType = ({|
  context: GenericNode,
  styleProperties: GenericNode,
|}) => $ReadOnlyArray<{| node: GenericNode, prop?: ?string | number, message: string | number |}>;

/** This function returns ...
 */
const buildValidatorResponsesFromStyleProperties: BuildValidatorResponseFromStylePropertiesType = ({
  context,
  styleProperties,
}) =>
  styleProperties
    .map((stylePropertyNode) => {
      const { key, type, value } = stylePropertyNode;
      return !key || value.value === undefined
        ? { name: type, value: null, node: stylePropertyNode }
        : { name: key.name, value: value.value, node: stylePropertyNode };
    })
    .reduce(getMatchKeyErrorsReducer({ context }), []);

export { buildValidatorResponsesFromStyleProperties, generateDefaultMessage };
