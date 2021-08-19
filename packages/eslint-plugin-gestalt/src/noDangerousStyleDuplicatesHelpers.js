// @flow strict
import {
  genBointLookup,
  validateBackgroundColor,
  validateBorder,
  validateBorderRadius,
  validateBoxShadow,
} from './validators.js';

// $FlowFixMe[unclear-type]
type GenericNode = any;

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
  message: string | number,
|}>;

type MatchKeyErrorsType = (
  MatchKeyErrorsAccType,
  { [string]: string | number },
) => MatchKeyErrorsAccType;

type GetMatchKeyErrorsReducerType = ({| context: GenericNode |}) => MatchKeyErrorsType;

/** This function returns ...
 */
const getMatchKeyErrorsReducer: GetMatchKeyErrorsReducerType = ({ context }) => {
  const matchKeyErrors: MatchKeyErrorsType = (matchedErrors, key) => {
    const newMatchedErrors = [...matchedErrors];
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
      const { onlyKeys } = context.options[0] || {};
      return !onlyKeys || onlyKeys.includes(keyName);
    }

    const generateDefaultMessage = (prop) => (prop ? `  Use prop \`${prop}\` instead` : '');

    switch (key.name) {
      case 'backgroundColor':
        if (includeKey('backgroundColor')) {
          const alternative = validateBackgroundColor(
            typeof key.value === 'string' ? key.value : '',
          );
          if (alternative) {
            newMatchedErrors.push({
              node: key.node,
              prop: alternative,
              message: generateDefaultMessage(alternative),
            });
          }
        }
        break;
      case 'borderRadius':
        if (includeKey('borderRadius')) {
          const alternative = validateBorderRadius(typeof key.value === 'string' ? key.value : '');
          newMatchedErrors.push({
            node: key.node,
            prop: alternative,
            message: generateDefaultMessage(alternative),
          });
        }
        break;
      case 'border':
        if (includeKey('border')) {
          const alternative = validateBorder(typeof key.value === 'string' ? key.value : '');
          if (alternative) {
            newMatchedErrors.push({
              node: key.node,
              prop: alternative,
              message: generateDefaultMessage(alternative),
            });
          }
        }
        break;
      case 'boxShadow':
        if (includeKey('boxShadow')) {
          const alternative = validateBoxShadow(typeof key.value === 'string' ? key.value : '');
          if (alternative) {
            newMatchedErrors.push({
              node: key.node,
              prop: alternative,
              message: generateDefaultMessage(alternative),
            });
          }
        }
        break;
      case 'bottom':
        if ((includeKey('bottom') && key.value === '0px') || key.value === 0) {
          newMatchedErrors.push({
            node: key.node,
            prop: 'bottom',
            message: '  Instead of dangerously styling bottom, use the "bottom" boolean prop',
          });
        }
        break;
      case 'left':
        if ((includeKey('left') && key.value === '0px') || key.value === 0) {
          newMatchedErrors.push({
            node: key.node,
            prop: 'left',
            message: '  Instead of dangerously styling left, use the "left" boolean prop',
          });
        }
        break;
      case 'margin':
        if (includeKey('margin')) {
          if (key.value === 'auto') {
            newMatchedErrors.push({
              node: key.node,
              prop: `margin="auto"`,
              message: '  Use prop `margin="auto"` instead',
            });
          } else {
            newMatchedErrors.push({
              node: key.node,
              prop: marginLookup[key.value],
              message: generateDefaultMessage(marginLookup[key.value]),
            });
          }
        }
        break;
      case 'marginBottom':
        if (includeKey('marginBottom')) {
          if (key.value === 'auto') {
            newMatchedErrors.push({
              node: key.node,
              prop: `marginBottom="auto"`,
              message: '  Use prop `marginBottom="auto"` instead',
            });
          } else {
            newMatchedErrors.push({
              node: key.node,
              prop: marginBottomLookup[key.value],
              message: generateDefaultMessage(marginBottomLookup[key.value]),
            });
          }
        }
        break;
      case 'marginLeft':
        if (includeKey('marginTop')) {
          if (key.value === 'auto') {
            newMatchedErrors.push({
              node: key.node,
              prop: `marginStart="auto"`,
              message: generateDefaultMessage(`marginStart="auto"`),
            });
          } else {
            newMatchedErrors.push({
              node: key.node,
              prop: marginLeftLookup[key.value],
              message: generateDefaultMessage(marginLeftLookup[key.value]),
            });
          }
        }
        break;
      case 'marginRight':
        if (includeKey('marginRight')) {
          if (key.value === 'auto') {
            newMatchedErrors.push({
              node: key.node,
              prop: `marginEnd="auto"`,
              message: generateDefaultMessage(`marginEnd="auto"`),
            });
          } else {
            newMatchedErrors.push({
              node: key.node,
              prop: marginRightLookup[key.value],
              message: generateDefaultMessage(marginRightLookup[key.value]),
            });
          }
        }
        break;
      case 'marginTop':
        if (includeKey('marginTop')) {
          if (key.value === 'auto') {
            newMatchedErrors.push({
              node: key.node,
              prop: `marginTop="auto"`,
              message: generateDefaultMessage(`marginTop="auto"`),
            });
          } else {
            newMatchedErrors.push({
              node: key.node,
              prop: marginTopLookup[key.value],
              message: generateDefaultMessage(marginTopLookup[key.value]),
            });
          }
        }
        break;
      case 'maxHeight':
        if (includeKey('maxHeight')) {
          newMatchedErrors.push({
            node: key.node,
            message: '  Use prop `maxHeight={pixels}` or `maxHeight="percentage%"` instead',
          });
        }
        break;
      case 'minHeight':
        if (includeKey('minHeight')) {
          newMatchedErrors.push({
            node: key.node,
            message: '  Use prop `minHeight={pixels}` or `minHeight="percentage%"` instead',
          });
        }
        break;
      case 'maxWidth':
        if (includeKey('maxWidth')) {
          newMatchedErrors.push({
            node: key.node,
            message: '  Use prop `maxWidth={pixels}` or `maxWidth="percentage%"` instead',
          });
        }
        break;
      case 'minWidth':
        if (includeKey('minWidth')) {
          newMatchedErrors.push({
            node: key.node,
            message: '  Use prop `minWidth={pixels}` or `minWidth="percentage%"` instead',
          });
        }
        break;
      case 'opacity':
        if (includeKey('opacity')) {
          newMatchedErrors.push({
            node: key.node,
            prop: opacityLookup[key.value],
            message: generateDefaultMessage(opacityLookup[key.value]),
          });
        }
        break;
      case 'overflow':
        if (includeKey('overflow')) {
          newMatchedErrors.push({
            node: key.node,
            prop: overflowLookup[key.value],
            message: generateDefaultMessage(overflowLookup[key.value]),
          });
        }
        break;
      case 'overflow-x':
        if (includeKey('overflow')) {
          if (key.value === 'scroll') {
            newMatchedErrors.push({
              node: key.node,
              prop: `overflow="scrollX"`,
              message: generateDefaultMessage(`overflow="scrollX"`),
            });
          }
        }
        break;
      case 'overflow-y':
        if (includeKey('overflow')) {
          if (key.value === 'scroll') {
            newMatchedErrors.push({
              node: key.node,
              prop: `overflow="scrollY"`,
              message: generateDefaultMessage(`overflow="scrollY"`),
            });
          }
        }
        break;
      case 'padding':
        if (includeKey('padding')) {
          newMatchedErrors.push({
            node: key.node,
            prop: paddingLookup[key.value],
            message: generateDefaultMessage(paddingLookup[key.value]),
          });
        }
        break;
      case 'position':
        if (includeKey('position')) {
          if (key.value === 'absolute') {
            newMatchedErrors.push({
              node: key.node,
              prop: `position="absolute"`,
              message: generateDefaultMessage(`position="absolute"`),
            });
          } else if (key.value === 'static') {
            newMatchedErrors.push({
              node: key.node,
              prop: `position="static"`,
              message: generateDefaultMessage(`position="static"`),
            });
          } else if (key.value === 'relative') {
            newMatchedErrors.push({
              node: key.node,
              prop: `position="relative"`,
              message: generateDefaultMessage(`position="relative"`),
            });
          } else if (key.value === 'fixed') {
            newMatchedErrors.push({
              node: key.node,
              prop: `position="fixed"`,
              message: generateDefaultMessage(`position="fixed"`),
            });
          }
        }
        break;
      case 'right':
        if ((includeKey('right') && key.value === '0px') || key.value === 0) {
          newMatchedErrors.push({
            node: key.node,
            prop: 'right',
            message: '  Instead of dangerously styling right, use the "right" boolean prop',
          });
        }
        break;
      case 'top':
        if ((includeKey('top') && key.value === '0px') || key.value === 0) {
          newMatchedErrors.push({
            node: key.node,
            prop: 'top',
            message: '  Instead of dangerously styling top, use the "top" boolean prop',
          });
        }
        break;
      default:
        break;
    }
    return newMatchedErrors.filter((x) => x);
  };
  return matchKeyErrors;
};

type BuildErrorMessagesFromStylePropertiesType = ({|
  context: GenericNode,
  styleProperties: GenericNode,
|}) => $ReadOnlyArray<{| node: GenericNode, prop?: ?string | number, message: string | number |}>;

/** This function returns ...
 */
const buildErrorMessagesFromStyleProperties: BuildErrorMessagesFromStylePropertiesType = ({
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

export default buildErrorMessagesFromStyleProperties;
