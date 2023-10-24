// @flow strict
import { getTextNodeFromSourceCode } from './eslintASTHelpers.js';
import { type BuildReducerType, type ReducerType } from './reducerTypes.js';

const buildPreferLinkReducer: BuildReducerType = ({ context }) => {
  // This function is returned at the end with context in scope
  const preferLinkReducer: ReducerType = (accumulatorAlternatives, { name, node, value }) => {
    const accumulatorAlternativesBuilder = [...accumulatorAlternatives];
    // This function manages all suggested alternatives, if existing

    const handleAlternative = ({ alternative }: { alternative: string }) => {
      if (alternative) {
        accumulatorAlternativesBuilder.push({
          node,
          prop: alternative,
        });
      }
    };

    const regex = /nofollow/g;
    const nodeText = getTextNodeFromSourceCode({ context, elementNode: node });
    switch (name) {
      case 'aria-label':
      case 'aria-selected':
        handleAlternative({
          alternative: nodeText.replace(
            name,
            name === 'aria-label' ? 'accessibilityLabel' : 'accessibilitySelected',
          ),
        });
        break;

      case 'target':
        if (value === '_blank') {
          handleAlternative({
            alternative: 'target="blank"',
          });
        }
        break;

      case 'rel':
        if (regex.test(value)) {
          handleAlternative({
            alternative: 'rel="nofollow"',
          });
        }
        break;

      case 'onBlur':
      case 'onClick':
      case 'onFocus':
      case 'onKeyPress':
        // regex expression to match "={(event)"
        if (/=\{\(event\) =>/.test(nodeText)) {
          handleAlternative({
            alternative: nodeText.replace('(event)', '({ event })'),
          });
          // regex expression to match "={()"
        } else if (/={\(\)/.test(nodeText)) {
          handleAlternative({
            alternative: nodeText, // keep as it is
          });
        } else {
          handleAlternative({
            alternative: nodeText.replace(
              // eslint-disable-next-line prefer-regex-literals
              new RegExp(/={(.+)}/, 'i'), // regex expression to match "={console.log}"
              (match, p1) => `={({ event }) => ${p1}(event)}`, // replacer returns "={({event}) => console.log(event)}"
            ),
          });
        }
        break;

      default:
        break;
    }

    return accumulatorAlternativesBuilder.filter(Boolean);
  };

  return preferLinkReducer;
};

export default buildPreferLinkReducer;
