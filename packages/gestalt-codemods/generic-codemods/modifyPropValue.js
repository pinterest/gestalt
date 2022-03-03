// @flow strict

/**
 * CODEMOD to MODIFY (RENAME, ADD, OR REMOVE) PROP-VALUE COMBINATIONS in GESTALT COMPONENT
 * Ex. <Box color="red" /> to <Box variant="error" />
 * Ex. <Box /> to <Box variant="error" />
 * Ex. <Box color="red" /> to <Box />
 *
 * OPTIONS:
 * --component: component to which modify props
 * --subcomponent: component's subcomponent to which modify props
 * --previousProp: current prop name to be replaced
 * --nextProp: new prop name to replace with, null if we want to remove prop
 * --previousValue: current prop name to be replaced
 * --nextValue: new prop name to replace with, null if we want to remove prop
 *
 * TO RUN THIS CODEMOD
 * yarn codemod modifyPropValues ~/path/to/your/code
 * --component=<value>
 * --previousProp=<value>
 * --nextProp=<value>
 * --previousValue=<value>
 * --nextValue=<value>
 *
 * If all options passed, prop+value combination are replaced with new prop+value combination
 * In the absence of nextProp, the codemod replaces the value
 * In the absence of nextValue, the codemod replaces the prop
 * In the absence of nextProp+nextValue, the codemod removes the prop with that particular value
 * In the absence of previousProp+previousValue, the codemod adds a new prop with value
 *
 * RENAME E.g. yarn codemod modifyPropValues ~/code/pinboard/webapp --component=Box --previousProp=color --nextProp=variant --previousValue=red --nextValue=error
 * ADD    E.g. yarn codemod modifyPropValues ~/code/pinboard/webapp --component=Box --nextProp=variant --nextValue=error
 * REMOVE E.g. yarn codemod modifyPropValues ~/code/pinboard/webapp --component=Box --previousProp=color --previousValue=red
 */

// $FlowExpectedError[untyped-import]
import { describe } from 'jscodeshift-helper';
import {
  buildReplaceWithModifiedAttributes,
  getGestaltImport,
  getComponentIdentifierByName,
  getLocalImportedName,
  filterJSXByTargetLocalName,
  filterJSXByAttribute,
  initialize,
  saveToSource,
  deepCloneNode,
} from './clean_utils.js';
import { type FileType, type ApiType } from './flowtypes.js';

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

  const targetLocalName = getLocalImportedName({ importSpecifierCollection: componentIdentifierCollection });

  const matchedJSXCollection = filterJSXByTargetLocalName({ src, j, targetLocalName, subcomponent });

  if (previousProp && previousValue) {
    const jSXWithMatchingAttributesCollection = filterJSXByAttribute({
      j,
      jSXCollection: matchedJSXCollection,
      prop: previousProp,
      value: previousValue,
    });

    if (jSXWithMatchingAttributesCollection.size() === 0) return null;

    if (!nextProp && !nextValue) {
      for (let idx = 0; idx < jSXWithMatchingAttributesCollection.size() - 1; idx += 1) {
        jSXWithMatchingAttributesCollection.at(idx).remove();
      }
    } else {
      const replaceWithModifiedCloneCallback = buildReplaceWithModifiedAttributes({
        nextProp,
        nextValue,
      });

      jSXWithMatchingAttributesCollection.replaceWith(replaceWithModifiedCloneCallback);
    }
  }

  if (!previousProp && !previousValue) {
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
