// @flow strict
import {
  type GenericType,
  type ReducerType,
  type GenerateDefaultMessageType,
  type BuildReducerType,
} from './reducerTypes.js';
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

/** This function returns the default messages for all change suggestions
 */
const generateDefaultMessage: GenerateDefaultMessageType = (prop) =>
  prop ? `  Use prop \`${prop}\` instead` : '';

const buildNoBoxDangerousStyleDuplicatesReducer: BuildReducerType = ({ context }) => {
  // This function is returned at the end with context in scope
  const noBoxDangerousStyleDuplicatesReducer: ReducerType = (
    accumulatorAlternatives,
    { name, node, value },
  ) => {
    const accumulatorAlternativesBuilder = [...accumulatorAlternatives];

    // This function manages all suggested alternatives, if existing
    const handleAlternative = ({
      alternative,
    }:
      | {| alternative: string |}
      | {| alternative: ?string |}
      | {| alternative: string | void |}
      | {| alternative: ?(number | string) |}
      | {| alternative: ?string |}) => {
      if (alternative) {
        accumulatorAlternativesBuilder.push({
          node,
          prop: alternative,
          message: generateDefaultMessage(alternative),
        });
      }
    };

    // This function is guard clause for those opt-out props from ESLint configuration
    function includeKey(keyName: GenericType) {
      const { onlyKeys } = context?.options?.[0] ?? {}; // Access options from ESLint configuration
      return !onlyKeys || onlyKeys.includes(keyName);
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

  return noBoxDangerousStyleDuplicatesReducer;
};

export { buildNoBoxDangerousStyleDuplicatesReducer, generateDefaultMessage };
