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
  getGestaltImport,
  getJSX,
  getLocalImportedName,
  initialize,
  isGestaltImport,
  matchesComponentName,
  getNewAttributes,
  replaceJSXAttributes,
  saveToSource,
  throwErrorIfSpreadProps,
} from './utils.js';
import { type FileType, type ApiType } from './flowtypes.js';

type OptionsType = {|
  componentName: string,
  subcomponentName: string,
  previousPropName: string,
  nextPropName: string | null,
|};

function transform(fileInfo: FileType, api: ApiType, options: OptionsType): ?string {
  const { componentName, subcomponentName, previousPropName, nextPropName } = options;

  const { j, src } = initialize({ api, fileInfo });

  const gestaltImport = getGestaltImport({ src, j })

  if (!gestaltImport) return;

  const  targetLocalImportedName = getLocalImportedName({
    importDeclaration: gestaltImport,
    importedName: componentName,
  });

  getJSX({ src, j }).forEach((nodePath) => {
    const { node: JSXNode } = nodePath;
    if (
      !matchesComponentName({ JSXNode, componentName: targetLocalImportedName, subcomponentName })
    )
      return;

    throwErrorIfSpreadProps({ fileInfo, JSXNode });
    const newAttributes = getNewAttributes({
      JSXNode,
      previousPropName,
      nextPropName,
    });

    replaceJSXAttributes({ JSXNode, newAttributes });

    src.modified = true;
  });

  return saveToSource({ src });
}

export default transform;
