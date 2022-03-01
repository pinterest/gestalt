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
 * In the absence of nextProp+nextValue, the codemod removes the prop with that particular value
 * In the absence of previousProp+previousValue, the codemod adds a new prop with value
 * 
 * RENAME E.g. yarn codemod modifyPropValues ~/code/pinboard/webapp --component=Box --previousProp=color --nextProp=variant --previousValue=red --nextValue=error
 * ADD    E.g. yarn codemod modifyPropValues ~/code/pinboard/webapp --component=Box --nextProp=variant --nextValue=error
 * REMOVE E.g. yarn codemod modifyPropValues ~/code/pinboard/webapp --component=Box --previousProp=color --previousValue=red
 */

import {
  getImports,
  getGestaltImport,
  getJSX,
  getLocalImportedName,
  initialize,
  isGestaltImport,
  matchesComponentName,
  getNewAttributes,
  replaceJSXAttributes,
  saveSource,
  throwErrorIfSpreadProps,
} from './utils.js';
import { type FileType, type ApiType } from './flowtypes.js';

type OptionsType = {|
  componentName: string,
  subcomponentName: string,
  previousPropName: string,
  nextPropName: string | null,
|};

function transform(file: FileType, api: ApiType, options: OptionsType): ?string {
  const { component, subcomponent, previousProp, nextProp, previousValue, nextValue } = options;

  const { j, src } = initialize({ api, file });

  const gestaltImport = getGestaltImport({ src, j })

  if (!gestaltImport) return;

  const  targetLocalImportedName = getLocalImportedName({
    importDeclaration: gestaltImport,
    importedName: component,
  });

  console.log(targetLocalImportedName)
  
  src.modified = true;

  return saveSource({ src });
}

export default transform;
