// @flow strict

/**
 * CODEMOD to MODIFY (DEPRECATE or RENAME) GESTALT COMPONENT PROPS
 * Ex. <Box size="" /> to <Box />
 * Ex. <Box size="" /> to <Box renamedSize="" />
 * Ex. <Dropdown.Item size="" /> to <Dropdown.Item renamedSize="" />
 *
 *
 * OPTIONS:
 * --component: component to which modify props
 * --subcomponent: component's subcomponent to which modify props
 * --previousProp: current prop name to be replaced
 * --nextProp: new prop name to replace with
 *
 *
 * TO RUN THIS CODEMOD
 yarn codemod modifyProp ~/path/to/your/code \
  --component=string \
  --previousProp=string \
  --nextProp=string
 *
 *
 * If all options passed, previous prop is replaced with next prop value (REPLACE)
 * In the absence of nextProp, the codemod removes the prop (REMOVE)
 *
 *
 * REPLACE E.g. yarn codemod modifyProp ~/code/pinboard/webapp --component=Box --previousProp=size --nextProp=renamedSize
 * REPLACE E.g. yarn codemod modifyProp ~/code/pinboard/webapp --component=Dropdown --subcomponent=Item --previousProp=size --nextProp=renamedSize
 *
 * REMOVE E.g. yarn codemod modifyProp ~/code/pinboard/webapp --component=Box --previousProp=size
 */

import { type ApiType, type FileType } from './flowtypes.js';
import {
  buildReplaceWithModifiedAttributes,
  filterJSXByAttribute,
  filterJSXByTargetLocalName,
  getComponentIdentifierByName,
  getGestaltImport,
  getLocalImportedName,
  initialize,
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
  const { component, subcomponent, previousProp, nextProp } = options;

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

  if (previousProp) {
    const jSXWithMatchingAttributesCollection = filterJSXByAttribute({
      j,
      jSXCollection: matchedJSXCollection,
      componentName: targetLocalName,
      subcomponentName: subcomponent,
      prop: previousProp,
    });

    if (jSXWithMatchingAttributesCollection.size() === 0) return null;

    let replaceWithModifiedCloneCallback;

    if (!nextProp) {
      replaceWithModifiedCloneCallback = buildReplaceWithModifiedAttributes({ j, previousProp });
    } else {
      replaceWithModifiedCloneCallback = buildReplaceWithModifiedAttributes({
        j,
        previousProp,
        nextProp,
      });
    }
    jSXWithMatchingAttributesCollection.replaceWith(replaceWithModifiedCloneCallback);
  }

  src.modified = true;

  return saveToSource({ src });
}

export default transform;
