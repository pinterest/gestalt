// @flow strict

/**
 * CODEMOD to MODIFY (DEPRECATE or RENAME) GESTALT COMPONENT PROPS
 * Ex. <Box size="" /> to <Box />
 * Ex. <Box size="" /> to <Box renamedSize="" />
 * Ex. <Dropdown.Item size="" /> to <Dropdown.Item renamedSize="" />
 *
 *
 * OPTIONS:
 * --componentName: component to which modify props
 * --subcomponentName: component's subcomponent to which modify props
 * --previousPropName: current prop name to be replaced
 * --nextPropName: new prop name to replace with, null if we want to remove prop
 *
 *
 * TO RUN THIS CODEMOD
 * yarn codemod modifyProp ~/path/to/your/code --componentName=<value> --previousPropName=<value> --nextPropName=<value>
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
