// @flow strict

/**
 * CODEMOD to COPY (COPY VALUE TO NEW PROP) PROP-VALUE COMBINATIONS in GESTALT COMPONENT
 * Supports string, number, and boolean values
 * Ex. <Box variant="error" /> to <Box variant="error" newProp="error" />
 * Ex. <IconButton accessibilityLabel="test" /> to <IconButton accessibilityLabel="test" tooltip={{ text: 'test' }} />
 *
 * OPTIONS:
 * --component: component to which copy props
 * --previousProp: current prop name to be copied
 * --previousPropNode: node of object to copy the current prop if the previousProp is an object [Not required]
 * --nextProp: new prop name to paste
 * --nextPropNode: node of object to paste the new prop if the newProp is an object [Not required]
 *
 * TO RUN THIS CODEMOD
 * yarn codemod copyProp ~/path/to/your/code \
 * --component=string \
 * --previousProp=string \
 * --previousPropNode=string \
 * --nextProp=string \
 * --nextPropNode=string
 *
 * If all options passed, previous+next combination are copied and paste between object props (OBJECT/OBJECT)
 * In the absence of previousPropNode, the codemod will apply the same `value` on the nextPropNode of the previousProp (NoOBJECT/OBJECT)
 * In the absence of previousPropNode & nextPropNode, the codemod will apply the the same `value` on the nextProp of the previousProp (NoOBJECT/NoOBJECT)
 * In the absence of nextPropNode, the codemod will apply the the same `value` on the nextProp of the previousPropNode (OBJECT/NoOBJECT)
 *
 * OBJECT/OBJECT E.g. yarn codemod copyProp ~/code/pinboard/webapp --component=IconButton --previousProp=dangerouslySetSvgPath --previousPropNode=__path --nextProp=tooltip --nextPropNode=text
 *
 * NoOBJECT/OBJECT E.g. yarn codemod copyProp ~/code/pinboard/webapp --component=IconButton --previousProp=accessibilityLabel --nextProp=tooltip --nextPropNode=text
 *
 * NoOBJECT/NoOBJECT E.g. yarn codemod copyProp ~/code/pinboard/webapp --component=Box --previousProp=variant --nextProp=color
 *
 * OBJECT/NoOBJECT E.g. yarn codemod copyProp ~/code/pinboard/webapp --component=IconButton --previousProp=dangerouslySetSvgPath --previousPropNode=__path --nextProp=accessibilityLabel
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
  deepCloneNode,
  throwErrorIfSpreadProps,
  JSCSObjectExpression,
} from './utils.js';
import { type FileType, type ApiType } from './flowtypes.js';

type OptionsType = {|
  component: string,
  subcomponent?: string,
  previousProp: string,
  previousPropNode?: string,
  nextProp: string,
  nextPropNode?: string,
|};

function transform(fileInfo: FileType, api: ApiType, options: OptionsType): ?string | null {
  const { component, subcomponent, previousProp, previousPropNode, nextProp, nextPropNode } =
    options;

  const { j, src } = initialize({ api, fileInfo });

  const gestaltImportCollection = getGestaltImport({ src, j });

  if (gestaltImportCollection.size() === 0) return null;

  // Getting component
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

  const nextjSXWithMatchingAttributesCollection = filterJSXByAttribute({
    j,
    jSXCollection: matchedJSXCollection,
    componentName: targetLocalName,
    subcomponentName: subcomponent,
    prop: nextProp,
  });

  if (nextjSXWithMatchingAttributesCollection.size() > 0) return null;

  // Copying & pasting values
  for (let idx = matchedJSXCollection.size() - 1; idx >= 0; idx -= 1) {
    matchedJSXCollection.at(idx).replaceWith((node) => {
      const jSXWithMatchingAttributesCollection = filterJSXByAttribute({
        j,
        jSXCollection: matchedJSXCollection.at(idx),
        componentName: targetLocalName,
        subcomponentName: subcomponent,
        prop: previousProp,
      });

      let previousValue;

      // NoOBJECT/NoOBJECT
      if (isNullOrUndefined(previousPropNode) && isNullOrUndefined(nextPropNode)) {
        console.log('NoOBJECT/NoOBJECT');
        jSXWithMatchingAttributesCollection.forEach((previousNode) => {
          previousValue = previousNode.get().value.value;
        });
      }

      // OBJECT/NoOBJECT
      if (!isNullOrUndefined(previousPropNode) && isNullOrUndefined(nextPropNode)) {
        console.log('OBJECT/NoOBJECT');
        jSXWithMatchingAttributesCollection.forEach((previousNode) => {
          const tmpValue = previousNode.get().value.value;
          const { properties } = tmpValue.expression;
          const prop = properties.find((item) => item.key.name === previousPropNode);
          previousValue = j.stringLiteral(prop.value.value);
        });
      }

      // NoOBJECT/OBJECT
      if (isNullOrUndefined(previousPropNode) && !isNullOrUndefined(nextPropNode)) {
        console.log('NoOBJECT/OBJECT');
        jSXWithMatchingAttributesCollection.forEach((previousNode) => {
          const { value } =
            previousNode.get().value.value.expression ?? previousNode.get().value.value;
          console.log(value);
          const newObject = new JSCSObjectExpression({ [nextPropNode ?? '']: value }, j);
          previousValue = j.jsxExpressionContainer(newObject);
        });
      }

      // OBJECT/OBJECT
      if (!isNullOrUndefined(previousPropNode) && !isNullOrUndefined(nextPropNode)) {
        console.log('OBJECT/OBJECT');
        jSXWithMatchingAttributesCollection.forEach((previousNode) => {
          const { properties } = previousNode.get().value.value.expression;
          const previousPropValue = properties?.find((item) => item.key.name === previousPropNode)
            .value.value;
          const newObject = new JSCSObjectExpression(
            { [nextPropNode ?? '']: previousPropValue },
            j,
          );
          previousValue = j.jsxExpressionContainer(newObject);
        });
      }

      const newAttribute = j.jsxAttribute(j.jsxIdentifier(nextProp), previousValue);
      const newNode = deepCloneNode({ node: node.get().node });
      newNode.openingElement.attributes.push(newAttribute);
      return newNode;
    });
  }

  src.modified = true;

  return saveToSource({ src });
}

export default transform;
