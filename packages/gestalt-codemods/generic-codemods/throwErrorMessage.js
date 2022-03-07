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
 * yarn codemod throwErrorMessage ~/path/to/your/code
 * --component=string
 * --subcomponent=string
 * --prop=string
 * --value=string|number|boolean
 *
 *
 * If all options passed, prop+value combination are replaced with new prop+value combination
 * In the absence of nextProp, the codemod only replaces the prop value
 * In the absence of nextValue, the codemod only replaces the prop name for that prop+value combination
 * In the absence of nextProp+nextValue, the codemod removes the prop with that particular value
 * In the absence of previousProp+previousValue, the codemod adds a new prop with value
 *
 *
 * E.g. yarn codemod throwErrorMessage ~/code/pinboard/webapp --component=Box --prop=color value=error
 *
 */

import {
  getGestaltImport,
  getComponentIdentifierByName,
  getLocalImportedName,
  filterJSXByTargetLocalName,
  filterJSXByAttribute,
  initialize,
  isNullOrUndefined,
  saveToSource,
  throwErrorMessage,
  throwErrorIfSpreadProps,
} from './utils.js';
import { type FileType, type ApiType } from './flowtypes.js';

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
    throwErrorMessage({ fileInfo, jSXCollection: matchedJSXCollection });
  }

  throwErrorIfSpreadProps({ fileInfo, j, jSXCollection: matchedJSXCollection });

  if (prop) {
    const jSXWithMatchingAttributesCollection = filterJSXByAttribute({
      j,
      jSXCollection: matchedJSXCollection,
      prop,
      value,
    });

    throwErrorMessage({ fileInfo, jSXCollection: jSXWithMatchingAttributesCollection });
  }

  return saveToSource({ src });
}

export default transform;
