// @flow strict
import {
  dimensionFormatting,
  marginLookup,
  marginBottomLookup,
  marginLeftLookup,
  marginRightLookup,
  marginTopLookup,
  opacityLookup,
  overflowLookup,
  paddingLookup,
  kebabToCamelCase,
  validateBackgroundColor,
  validateBorder,
  validateBorderRadius,
  validateBoxShadow,
  validateFlex,
} from './styleValidators.js';
import {
  type MatchKeyErrorsType,
  type GenerateDefaultMessageType,
  type ReducerType,
} from './reducerTypes.js';

/** This function returns the default messages for all change suggestions
 */
const generateDefaultMessage: GenerateDefaultMessageType = (prop) =>
  prop ? `  Use prop \`${prop}\` instead` : '';

/** This function is a reducer
 */
const noBoxDangerousStyleDuplicatesReducer: ReducerType = ({ context }) => {
  // This function is returned at the end with context in scope
  const matchKeyErrors: MatchKeyErrorsType = (accumulatorAlternatives, { name, node, value }) => {
    const accumulatorAlternativesBuilder = [...accumulatorAlternatives];

    // This function manages all suggested alternatives, if existing
    const handleAlternative = ({ alternative }) => {
      if (alternative) {
        accumulatorAlternativesBuilder.push({
          node,
          prop: alternative,
          message: generateDefaultMessage(alternative),
        });
      }
    };

    // This function is guard clause for those opt-out props from Eslint configuration
    function includeKey(keyName) {
      const { onlyKeys } = context?.options?.[0] ?? {}; // Access options from Eslint configuration
      return !onlyKeys || onlyKeys.includes(keyName); // replacer function p1 returns the match between '()' in the RegExp
    }

    if (includeKey(name)) {
      switch (name) {
        case 'alignContent':
          handleAlternative({
            alternative: [
              'start',
              'end',
              'center',
              'space-between',
              'space-around',
              'space-evenly',
              'stretch',
            ].includes(value)
              ? `alignContent="${value.replace('space-', '')}"`
              : undefined,
          });
          break;

        case 'alignItems':
          handleAlternative({
            alternative: ['start', 'end', 'center', 'baseline', 'stretch'].includes(value)
              ? `alignItems="${value}"`
              : undefined,
          });
          break;

        case 'alignSelf':
          handleAlternative({
            alternative: [
              'auto',
              'self-start',
              'self-end',
              'center',
              'baseline',
              'stretch',
            ].includes(value)
              ? `alignSelf="${value.replace('self-', '')}"`
              : undefined,
          });
          break;

        case 'backgroundColor':
          handleAlternative({
            alternative: validateBackgroundColor(typeof value === 'string' ? value : ''),
          });
          break;

        case 'borderRadius':
          handleAlternative({
            alternative: validateBorderRadius(typeof value === 'string' ? value : ''),
          });
          break;

        case 'border':
          handleAlternative({
            alternative: validateBorder(typeof value === 'string' ? value : ''),
          });
          break;

        case 'boxShadow':
          handleAlternative({
            alternative: validateBoxShadow(typeof value === 'string' ? value : ''),
          });
          break;

        case 'bottom':
          handleAlternative({
            alternative: ['0px', 0, '0'].includes(value) ? 'bottom' : undefined,
          });
          break;

        case 'display':
          handleAlternative({
            alternative: ['none', 'flex', 'block', 'inline-block'].includes(value)
              ? `display="${kebabToCamelCase({ attribute: value })}"`
              : undefined,
          });
          break;

        case 'flex':
          handleAlternative({
            alternative: validateFlex(value),
          });
          break;

        case 'flexWrap':
          handleAlternative({
            alternative: value === 'wrap' ? 'wrap' : undefined,
          });
          break;

        case 'justifyContent':
          handleAlternative({
            alternative: [
              'flex-start',
              'flex-end',
              'center',
              'space-between',
              'space-around',
              'space-evenly',
            ].includes(value)
              ? `justifyContent="${value.replace('flex-', '').replace('space-', '')}"`
              : undefined,
          });
          break;

        case 'left':
          handleAlternative({
            alternative: ['0px', 0, '0'].includes(value) ? 'left' : undefined,
          });
          break;

        case 'right':
          handleAlternative({
            alternative: ['0px', 0, '0'].includes(value) ? 'right' : undefined,
          });
          break;

        case 'top':
          handleAlternative({
            alternative: ['0px', 0, '0'].includes(value) ? 'top' : undefined,
          });
          break;

        case 'margin':
          handleAlternative({
            alternative: value === 'auto' ? `margin="auto"` : marginLookup[value],
          });
          break;

        case 'marginBottom':
          handleAlternative({
            alternative: value === 'auto' ? `marginBottom="auto"` : marginBottomLookup[value],
          });
          break;

        case 'marginLeft':
          handleAlternative({
            alternative: value === 'auto' ? `marginStart="auto"` : marginLeftLookup[value],
          });
          break;

        case 'marginRight':
          handleAlternative({
            alternative: value === 'auto' ? `marginEnd="auto"` : marginRightLookup[value],
          });
          break;

        case 'marginTop':
          handleAlternative({
            alternative: value === 'auto' ? `marginTop="auto"` : marginTopLookup[value],
          });
          break;

        case 'height':
          handleAlternative({
            alternative: dimensionFormatting({ keyName: node?.key?.name ?? '', value }),
          });
          break;

        case 'maxHeight':
          handleAlternative({
            alternative: dimensionFormatting({ keyName: node?.key?.name ?? '', value }),
          });
          break;

        case 'minHeight':
          handleAlternative({
            alternative: dimensionFormatting({ keyName: node?.key?.name, value }),
          });
          break;

        case 'width':
          handleAlternative({
            alternative: dimensionFormatting({ keyName: name, value }),
          });
          break;

        case 'maxWidth':
          handleAlternative({
            alternative: value === '100%' ? 'fit' : dimensionFormatting({ keyName: name, value }),
          });
          break;

        case 'minWidth':
          handleAlternative({
            alternative: dimensionFormatting({ keyName: node?.key?.name, value }),
          });
          break;

        case 'opacity':
          handleAlternative({ alternative: opacityLookup[value] });
          break;

        case 'overflow':
          handleAlternative({ alternative: overflowLookup[value] });
          break;

        case 'overflow-x':
          handleAlternative({
            alternative: value === 'scroll' ? `overflow="scrollX"` : undefined,
          });
          break;

        case 'overflow-y':
          handleAlternative({
            alternative: value === 'scroll' ? `overflow="scrollY"` : undefined,
          });
          break;

        case 'padding':
          handleAlternative({ alternative: paddingLookup[value] });
          break;

        case 'position':
          handleAlternative({
            alternative: ['absolute', 'static', 'relative', 'fixed'].includes(value)
              ? `position="${value}"`
              : undefined,
          });
          break;

        case 'role':
          handleAlternative({ alternative: `role="${value}"` });
          break;

        case 'zIndex':
          handleAlternative({
            alternative: value ? `zIndex={new FixedZIndex(${value})}` : undefined,
          });
          break;

        default:
          break;
      }
    }
    return accumulatorAlternativesBuilder.filter((x) => x);
  };

  return matchKeyErrors;
};

export { noBoxDangerousStyleDuplicatesReducer, generateDefaultMessage };
