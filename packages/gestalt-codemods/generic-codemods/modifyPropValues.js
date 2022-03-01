// @flow strict

/**
 * CODEMOD to MODIFY (RENAME, ADD, OR REMOVE) GESTALT COMPONENT with PROP-VALUE COMBINATIONS
 * Ex. <Box color="red" /> to <Box variant="error" />
 * Ex. <Box /> to <Box variant="error" />
 * Ex. <Box color="red" /> to <Box /> 
 *
 * OPTIONS:
 * --component: component to which modify props
 * --subcomponent: component's subcomponent to which modify props
 * --previousProp: current prop name to be replaced
 * --nextProp: new prop name to replace with, null if we want to remove prop
 *
 *
 * TO RUN THIS CODEMOD
 * yarn codemod modifyPropValues ~/path/to/your/code 
 * --component=Box
 * --previousProp=<value>
 * --nextProp=<value>
 * --previousValue=<value>
 * --nextValue=<value>


 * E.g. yarn codemod modifyProp ~/code/pinboard/webapp --componentName=Box --previousPropName=size --nextPropName=renamedSize
 * E.g. yarn codemod modifyProp ~/code/pinboard/webapp --componentName=Dropdown --subcomponentName=Item --previousPropName=size --nextPropName=renamedSize
 * E.g. yarn codemod modifyProp ~/code/pinboard/webapp --componentName=Box --previousPropName=size --nextPropName=null
 */

import {
  getImports,
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
  const { componentName, subcomponentName, previousPropName, nextPropName } = options;

  const { j, src } = initialize({ api, file });

  let targetLocalImportedName;

  getImports({ src, j }).forEach((nodePath) => {
    const { node: importDeclaration } = nodePath;

    if (!isGestaltImport({ importDeclaration })) return;

    targetLocalImportedName = getLocalImportedName({
      importDeclaration,
      importedName: componentName,
    });
  });

  getJSX({ src, j }).forEach((nodePath) => {
    const { node: JSXNode } = nodePath;
    if (
      !matchesComponentName({ JSXNode, componentName: targetLocalImportedName, subcomponentName })
    )
      return;
    throwErrorIfSpreadProps({ file, JSXNode });
    const newAttributes = getNewAttributes({
      JSXNode,
      previousPropName,
      nextPropName,
    });

    replaceJSXAttributes({ JSXNode, newAttributes });

    src.modified = true;
  });

  return saveSource({ src });
}

export default transform;
