// @flow strict

/**
 * CODEMOD to MODIFY (RENAME, ADD, OR REMOVE) PROP-VALUE COMBINATIONS in GESTALT COMPONENT
 * Supports string, number, and boolean values
 * Ex. <Box color="red" /> to <Box variant="error" />
 * Ex. <Box /> to <Box variant="error" />
 * Ex. <Box color="red" /> to <Box />
 *
 *
 * OPTIONS:
 * --component: component to which modify props
 * --subcomponent: component's subcomponent to which modify props
 * --previousProp: current prop name to be replaced
 * --nextProp: new prop name to replace with, null if we want to remove prop
 * --previousValue: current prop name to be replaced
 * --nextValue: new prop name to replace with, null if we want to remove prop
 *
 *
 * TO RUN THIS CODEMOD
 yarn codemod modifyPropValue ~/path/to/your/code \
  --component=string \
  --subcomponent=string \
  --previousProp=string \
  --nextProp=string \
  --previousValue=string|number|boolean \
  --nextValue=string|number|boolean
 *
 *
 * If all options passed, prop+value combination are replaced with new prop+value combination (REPLACE)
 * In the absence of nextProp, the codemod only replaces the prop value (REPLACE)
 * In the absence of nextValue, the codemod only replaces the prop name for that prop+value combination (REPLACE)
 * In the absence of previousProp+previousValue, the codemod adds a new prop with value (ADD)
 * In the absence of nextProp+nextValue, the codemod removes the prop with that particular value (REMOVE)
 *
 *
 * REPLACE E.g. yarn codemod modifyPropValue ~/code/pinboard/webapp --component=Box --previousProp=color --nextProp=variant --previousValue=400 --nextValue=error
 * REPLACE E.g. yarn codemod modifyPropValue ~/code/pinboard/webapp --component=Box --previousProp=color --previousValue=400 --nextValue=error
 * REPLACE E.g. yarn codemod modifyPropValue ~/code/pinboard/webapp --component=Box --previousProp=color --nextProp=variant --previousValue=400
 *
 * ADD E.g. yarn codemod modifyPropValue ~/code/pinboard/webapp --component=Box --nextProp=variant --nextValue=error
 *
 * REMOVE E.g. yarn codemod modifyPropValue ~/code/pinboard/webapp --component=Box --previousProp=color --previousValue=red
 */

import { type ApiType, type FileType } from './flowtypes.js';
import {
  buildReplaceWithModifiedAttributes,
  deepCloneNode,
  filterJSXByAttribute,
  filterJSXByTargetLocalName,
  getComponentIdentifierByName,
  getGestaltImport,
  getLocalImportedName,
  initialize,
  isNullOrUndefined,
  saveToSource,
  throwErrorIfSpreadProps,
} from './utils.js';

type OptionsType = {|
  component: string,
  subcomponent?: string,
  previousProp?: string,
  nextProp?: string,
  previousValue?: string,
  nextValue?: string,
|};

function transform(fileInfo: FileType, api: ApiType, options: OptionsType): ?string | null {
  const { component, subcomponent, previousProp, nextProp, previousValue, nextValue } = options;

  const { j, src } = initialize({ api, fileInfo });

  const gestaltImportCollection = getGestaltImport({ src, j });

  if (gestaltImportCollection.size() === 0) return null;

  const componentIdentifierCollection = getComponentIdentifierByName({
    j,
    gestaltImportCollection,
    componentName: component,
  });

  if (componentIdentifierCollection.size() === 0) return null;

  const targetLocalName = getLocalImportedName({
    importSpecifierCollection: componentIdentifierCollection,
  });

  const matchedJSXCollection = filterJSXByTargetLocalName({
    src,
    j,
    targetLocalName,
    subcomponent,
  });

  throwErrorIfSpreadProps({
    fileInfo,
    j,
    jSXCollection: matchedJSXCollection,
    componentName: targetLocalName,
    subcomponentName: subcomponent,
  });

  // We need to identify previousProp & previousValue in order to RENAME or DEPRECATE
  if (previousProp && !isNullOrUndefined(previousValue)) {
    const jSXWithMatchingAttributesCollection = filterJSXByAttribute({
      j,
      jSXCollection: matchedJSXCollection,
      componentName: targetLocalName,
      subcomponentName: subcomponent,
      prop: previousProp,
      value: previousValue,
    });

    if (jSXWithMatchingAttributesCollection.size() === 0) return null;

    let replaceWithModifiedCloneCallback;

    // In the absence of nextProp & nextValue, we REMOVE prop and values
    if (!nextProp && isNullOrUndefined(nextValue)) {
      replaceWithModifiedCloneCallback = buildReplaceWithModifiedAttributes({ j, previousProp });
    } else {
      // In the absence of just nextProp, we change the value.
      // In the absence of just nextValue, we rename the prop if both prop and value match.
      replaceWithModifiedCloneCallback = buildReplaceWithModifiedAttributes({
        j,
        previousProp,
        nextProp,
        nextValue,
      });
    }
    jSXWithMatchingAttributesCollection.replaceWith(replaceWithModifiedCloneCallback);
  }

  // In the absence of previousProp & previousValue, we ADD prop and values
  if (isNullOrUndefined(previousProp) && isNullOrUndefined(previousValue)) {
    for (let idx = matchedJSXCollection.size() - 1; idx >= 0; idx -= 1) {
      matchedJSXCollection.at(idx).replaceWith((node) => {
        const newAttribute = j.jsxAttribute(j.jsxIdentifier(nextProp), j.stringLiteral(nextValue));
        const newNode = deepCloneNode({ node: node.get().node });
        newNode.openingElement.attributes.push(newAttribute);
        return newNode;
      });
    }
  }

  src.modified = true;

  return saveToSource({ src });
}

export default transform;
