// @flow strict

/**
 * CODEMOD to THROW AN ERROR MESSAGE for COMPONENTS, PROPS, and PROP-VALUE COMBINATIONS in GESTALT COMPONENTS
 * Supports string, number, and boolean values
 *
 * OPTIONS:
 * --component: component to which modify props
 * --subcomponent: component's subcomponent to which modify props
 * --prop: current prop name to be replaced
 * --value: new prop name to replace with, null if we want to remove prop
 *
 *
 * TO RUN THIS CODEMOD
yarn codemod detectManualReplacement ~/path/to/your/code \
  --component=string \
  --subcomponent=string \
  --prop=string \
  --value=string|number|boolean
 *
 * E.g. yarn codemod detectManualReplacement ~/code/pinboard/webapp --component=Box --prop=color value=error
 *
 */

import { type ApiType, type FileType } from './flowtypes.js';
import {
  filterJSXByAttribute,
  filterJSXByTargetLocalName,
  getComponentIdentifierByName,
  getGestaltImport,
  getLocalImportedName,
  initialize,
  isNullOrUndefined,
  saveToSource,
  throwErrorIfSpreadProps,
  throwErrorMessageWithNodesData,
} from './utils.js';

type OptionsType = {|
  component: string,
  subcomponent?: string,
  prop?: string,
  value?: string,
|};

function transform(fileInfo: FileType, api: ApiType, options: OptionsType): ?string | null {
  const { component, subcomponent, prop, value } = options;

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

  if (isNullOrUndefined(prop) && isNullOrUndefined(value)) {
    throwErrorMessageWithNodesData({ fileInfo, jSXCollection: matchedJSXCollection });
  }

  throwErrorIfSpreadProps({
    fileInfo,
    j,
    jSXCollection: matchedJSXCollection,
    componentName: targetLocalName,
    subcomponentName: subcomponent,
  });

  if (prop) {
    const jSXWithMatchingAttributesCollection = filterJSXByAttribute({
      j,
      jSXCollection: matchedJSXCollection,
      componentName: targetLocalName,
      subcomponentName: subcomponent,
      prop,
      value,
    });

    throwErrorMessageWithNodesData({
      fileInfo,
      jSXCollection: jSXWithMatchingAttributesCollection,
    });
  }

  return saveToSource({ src });
}

export default transform;
