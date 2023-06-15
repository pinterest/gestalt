// @flow strict

/**
 * CODEMOD to RENAME GESTALT COMPONENTS
 * Ex. <Flyout /> to <Popover />
 *
 * TO RUN THIS CODEMOD
yarn codemod renameComponent ~/path/to/your/code \
  --componentName=string \
  --nextComponentName=string
 * E.g. yarn codemod renameComponent ~/code/pinboard/webapp --componentName=Box --nextComponentName=RenamedBox
 *
 * OPTIONS:
 * --componentName: current component name to be replaced
 * --nextComponentName: new component name to replace with
 */

import { type ApiType, type FileType } from './flowtypes.js';
import {
  buildReplaceWithRenamedComponent,
  buildReplaceWithRenamedImport,
  filterJSXByTargetLocalName,
  getComponentIdentifierByName,
  getGestaltImport,
  getLocalImportedName,
  initialize,
  saveToSource,
} from './utils.js';

type OptionsType = {|
  componentName: string,
  nextComponentName: string,
|};

function transform(fileInfo: FileType, api: ApiType, options: OptionsType): ?string | null {
  const { componentName, nextComponentName } = options;

  const { j, src } = initialize({ api, fileInfo });

  const gestaltImportCollection = getGestaltImport({ src, j });

  if (gestaltImportCollection.size() === 0) return null;

  const componentIdentifierCollection = getComponentIdentifierByName({
    j,
    gestaltImportCollection,
    componentName,
  });

  if (componentIdentifierCollection.size() === 0) return null;

  const targetLocalName = getLocalImportedName({
    importSpecifierCollection: componentIdentifierCollection,
  });

  const matchedJSXCollection = filterJSXByTargetLocalName({
    src,
    j,
    targetLocalName,
  });

  if (matchedJSXCollection.size() === 0) return null;

  const replaceWithModifiedCloneCallback = buildReplaceWithRenamedComponent({
    nextComponentName,
  });

  for (let idx = matchedJSXCollection.size() - 1; idx >= 0; idx -= 1) {
    matchedJSXCollection.at(idx).replaceWith(replaceWithModifiedCloneCallback);
  }

  const replaceWithModifiedCloneCallbackImport = buildReplaceWithRenamedImport({
    j,
    nextComponentName,
  });

  componentIdentifierCollection.replaceWith(replaceWithModifiedCloneCallbackImport);

  src.modified = true;

  return saveToSource({ src });
}

export default transform;
