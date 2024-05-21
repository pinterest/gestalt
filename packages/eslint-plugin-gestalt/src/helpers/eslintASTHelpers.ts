import { GenericNode, GenericType, ReducerAccType, ReducerType } from './reducerTypes';

/** =================  HELPERS =================
 */

type GetPropertiesFromVariableType = (arg1: { variableNode: GenericNode }) => GenericType;

/** This function returns the properties from a variable in scope
Example 1:
const a = { color: "red"}
<Box color={a}> >> returns the color property
 */
const getPropertiesFromVariable: GetPropertiesFromVariableType = ({ variableNode }) =>
  variableNode?.resolved?.defs?.[0]?.node?.init?.properties;

type GetInlineDefinedStylesType = (arg1: {
  attributeNode: GenericNode;
}) => GenericNode | null | undefined;

/** This function returns the inline style defined in Box within dangerouslySetInlineStyle
Example 1: Return the property color from variable a
<Box dangerouslySetInlineStyle={{ __style: { color: red }}}> >> returns the color property
 */
const getInlineDefinedStyles: GetInlineDefinedStylesType = ({ attributeNode }) => {
  const propertyNode = attributeNode?.value?.expression?.properties?.[0];
  return propertyNode?.key?.name === '__style' ? propertyNode?.value.properties : null;
};

type GetOpeningElementType = (arg1: { elementNode: GenericNode }) => GenericNode;

/** This function returns the opening element independently of the node passed

    Sometimes we have the parent JSXElement node, sometimes the child JSXOpeningElement node
 */
const getOpeningElement: GetOpeningElementType = ({ elementNode }) =>
  elementNode.type === 'JSXOpeningElement' ? elementNode : elementNode?.openingElement;

type GetClosingElementType = (arg1: { elementNode: GenericNode }) => GenericNode;

/** This function returns the closing element independently of the node passed

    Sometimes we have the parent JSXElement node, sometimes the child JSXOpeningElement node
 */
const getClosingElement: GetClosingElementType = ({ elementNode }) =>
  elementNode.type === 'JSXElement'
    ? elementNode.closingElement
    : elementNode?.parent?.closingElement;

type GetVariableDefinedStylesType = (arg1: {
  variableNode: GenericNode;
}) => GenericNode | null | undefined;

/** This function returns the style defined a varianle and passed to Box's dangerouslySetInlineStyle
Example 1: Return the property color from variable a
const a = { color: "red"}
<Box dangerouslySetInlineStyle={{ __style: a }}> >> returns the color property
 */
const getVariableDefinedStyles: GetVariableDefinedStylesType = ({ variableNode }) => {
  const propertyNode = getPropertiesFromVariable({ variableNode })?.[0];
  return propertyNode?.key?.name === '__style' ? propertyNode?.value?.properties : null;
};

type GetNodeFromPropNameType = (arg1: {
  elementNode: GenericNode;
  propName: string;
}) => GenericNode;

/** This function returns the attribute node within a component node (elementNode) if names (propName) match.
 */
const getNodeFromPropName: GetNodeFromPropNameType = ({ elementNode, propName }) =>
  // @ts-expect-error - TS7006 - Parameter 'prop' implicitly has an 'any' type.
  getOpeningElement({ elementNode })?.attributes?.find((prop) => prop?.name?.name === propName);

type GetTextNodeFromSourceCodeType = (arg1: {
  context: GenericNode;
  elementNode: GenericNode;
}) => string;

/** This function returns the text from a node as it's shown in the code source.
 */
const getTextNodeFromSourceCode: GetTextNodeFromSourceCodeType = ({ context, elementNode }) =>
  context.getSourceCode().getText(elementNode);

type KeyValuesType = {
  key: string;
  value: string | number;
  isValueTypeLiteral: boolean;
};
type RetrieveKeyValuesFromVariableType = (arg1: {
  context: GenericNode;
  variableNode: GenericNode;
}) => ReadonlyArray<KeyValuesType> | null;

/** This function returns an array of objects containing the data for each key/value in the variable object.
Example 1:
const a = { color: "red"} >> returns [{ key: "color", value: "red", isValueTypeLiteral: true }]
Example 2:
const a = { width: 20} >> returns [{ key: "width", value: 20, isValueTypeLiteral: true }]
Example 3:
const a = { onClick: () => {}} >> returns [{ key: "onClick", value: "() => {}", isValueTypeLiteral: false }]
*/
const retrieveKeyValuesFromVariable: RetrieveKeyValuesFromVariableType = ({
  context,
  variableNode,
}) => {
  const properties = getPropertiesFromVariable({ variableNode });
  return properties
    ? // @ts-expect-error - TS7006 - Parameter 'prop' implicitly has an 'any' type.
      properties.map((prop) => {
        const isLiteral = prop.value.type === 'Literal';
        return {
          key: prop.key.name,
          value: isLiteral ? prop.value.value : context.getSourceCode().getText(prop.value),
          isValueTypeLiteral: isLiteral,
        };
      })
    : null;
};

type BuildLiteralValueStringType = (arg1: { value: string | number }) => string;

/** This function returns a string of literal value formatted as a prop value.
Example 1:
{ key: "color", value: "red", isValueTypeLiteral: true } >> "red"
Example 2:
{ key: "width", value: 20, isValueTypeLiteral: true } >> "{20}"
*/
const buildLiteralValueString: BuildLiteralValueStringType = ({ value }) =>
  typeof value === 'number' ? `{${value}}` : `"${value}"`;

type RetrieveKeyValuesFromPropsType = (arg1: {
  context: GenericNode;
  elementNode: GenericNode;
  propSorting?: boolean;
  propsToAdd?: string;
  propsToRemove?: ReadonlyArray<string>;
}) => string;

/** This function returns a string of component props
Example:
If the node is \<div width={20} \> and newPropsString="color='red'"", it returns "color='red' width={20}"
*/
const buildProps: RetrieveKeyValuesFromPropsType = ({
  context,
  elementNode,
  propsToAdd,
  propSorting = true,
  propsToRemove,
}) => {
  const openingElement = getOpeningElement({ elementNode });

  if (openingElement.attributes.length === 0) {
    return propsToAdd ?? '';
  }

  const filteredProps = propsToRemove
    ? // @ts-expect-error - TS7006 - Parameter 'prop' implicitly has an 'any' type.
      openingElement.attributes.filter((prop) => !(propsToRemove ?? []).includes(prop.name.name))
    : openingElement.attributes;

  // @ts-expect-error - TS7006 - Parameter 'prop' implicitly has an 'any' type.
  const previousProps = filteredProps.map((prop) =>
    prop.value
      ? `${prop.name.name}=${getTextNodeFromSourceCode({
          context,
          elementNode: prop.value,
        })}`
      : // catch boolean props
        getTextNodeFromSourceCode({
          context,
          elementNode: prop,
        }),
  );

  const propsArray = propsToAdd ? [...previousProps, propsToAdd] : previousProps;

  return propSorting ? propsArray.sort().join(' ') : propsArray.join(' ');
};

type BuildPropsFromKeyValuesType = (arg1: { keyValues: ReadonlyArray<KeyValuesType> }) => string;
/** This function returns key/values formatted as component props.
Example 1:
{ key: "color", value: "red", isValueTypeLiteral: true } >> color="red"
Example 2:
{ key: "width", value: 20, isValueTypeLiteral: true } >> width={20}
Example 3:
{ key: "onClick", value: "() => {}", isValueTypeLiteral: false } >> onClick={() => {}}
*/

const buildPropsFromKeyValues: BuildPropsFromKeyValuesType = ({ keyValues }) => {
  if (!keyValues[0]) return '';

  const newKeyValues = [...keyValues];

  const stringProps = newKeyValues
    .sort((a, b) => {
      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;
      return 0;
    })
    .map(
      (pair) =>
        `${pair.key}=${
          pair.isValueTypeLiteral
            ? buildLiteralValueString({ value: pair.value })
            : `{${pair.value}}`
        }`,
    )
    .join(' ');

  return stringProps;
};

type BuildPropsFromKeyValuesVariableType = (arg1: {
  context: GenericNode;
  variableNode: GenericNode;
}) => string;
/** This function returns key/values formatted as component props.
Example:
[{ key: "color", value: "red", isValueTypeLiteral: true }, { key: "width", value: 20, isValueTypeLiteral: true }] >> 'color="red" width={20}'
*/
const buildPropsFromKeyValuesVariable: BuildPropsFromKeyValuesVariableType = ({
  context,
  variableNode,
}) => {
  const keyValues = retrieveKeyValuesFromVariable({
    context,
    variableNode,
  });
  return keyValues ? buildPropsFromKeyValues({ keyValues }) : '';
};

type GetComponentFromAttributeType = (arg1: { nodeAttribute: GenericNode }) => GenericNode;
/** This function returns the component containing the attribute's node (nodeAttribute).
Example:
\<div {...props} \/\> returns div node for the spread props attribute
*/
const getComponentFromAttribute: GetComponentFromAttributeType = ({ nodeAttribute }) =>
  nodeAttribute.parent;

type GetVariableNodeInScopeFromNameType = (arg1: {
  context: GenericNode;
  nodeElement: GenericNode;
  name: string;
}) => GenericNode;
/** This function returns the component's name containing the attribute's node (nodeAttribute).
Example:
\<div {...props} \/\> returns div for the spread props attribute
*/

const getVariableNodeInScopeFromName: GetVariableNodeInScopeFromNameType = ({
  context,
  nodeElement,
  name,
}) => {
  const scope = context.getScope(nodeElement);
  // Look in local scope for variable reference
  // @ts-expect-error - TS7006 - Parameter 'reference' implicitly has an 'any' type.
  const variableNode = scope.references.find((reference) => reference.identifier.name === name);
  return variableNode;
};

type GetComponentNameFromAttributeType = (arg1: { nodeAttribute: GenericNode }) => string;
/** This function returns the component's name containing the attribute's node (nodeAttribute).
Example:
\<div {...props} \/\> returns div for the spread props attribute
*/
const getComponentNameFromAttribute: GetComponentNameFromAttributeType = ({ nodeAttribute }) =>
  nodeAttribute?.parent?.name?.name;

type HasImportType = (arg1: { importNode: GenericNode; path: string }) => boolean;
/** This function checks if a given node (importNode) contains a given import path (path), and returns true if so.
Example 1:
import { Box } from 'gestalt'; path="gestalt"
Example 2:
import { Box } from 'app/box'; path="app/box"
*/
const hasImport: HasImportType = ({ importNode, path }) => {
  const importName = importNode.source ? importNode.source.value : null;
  return importName === path;
};

type GetNamedImportsComponentsType = (arg1: {
  importNode: GenericNode;
}) => ReadonlyArray<ReadonlyArray<string>> | null | undefined;
/** This function returns an array of arrays containing the named imports ([imported name, local or aliased name]) from a node (importNode).
 */
const getNamedImportsComponents: GetNamedImportsComponentsType = ({ importNode }) => {
  // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
  const namedImports = importNode?.specifiers?.map((node) => [
    node.imported.name,
    node?.local?.name,
  ]);
  return namedImports;
};

type GetHtmlTagType = (arg1: { elementNode: GenericNode }) => string;

/** This function returns the tag of a given node (elementNode).
Examples:
\<div \/\> returns "div"
\<button \/\> returns "button"
*/
const getHtmlTag: GetHtmlTagType = ({ elementNode }) => elementNode?.openingElement?.name?.name;

type IsTagType = (arg1: {
  elementNode: GenericNode;
  tagName: string | ReadonlyArray<string>;
}) => boolean;
/** This function checks if a given node (elementNode) contains a given tag (tagName), and returns true if so.
Example 1:
\<div \/\> >> tagName="div" returns true
Example 2:
\<div \/\> >> tagName="button" returns false
*/
const isTag: IsTagType = ({ elementNode, tagName }) =>
  Array.isArray(tagName)
    ? tagName.includes(elementNode?.name?.name)
    : elementNode?.name?.name === tagName;

type HasSpreadAttributesType = (arg1: { elementNode: GenericNode }) => boolean;
/** This function checks if a given node (elementNode) contains spread attributes
Example 1:
\<div {...props} \/\> >> returns true
*/
const hasSpreadAttributes: HasSpreadAttributesType = ({ elementNode }) =>
  // @ts-expect-error - TS7006 - Parameter 'attributeNode' implicitly has an 'any' type.
  elementNode.attributes.some((attributeNode) => attributeNode.type === 'JSXSpreadAttribute');

type HasLonelyAttributeType = (arg1: {
  elementNode: GenericNode;
  tagName: string;
  attribute: string;
}) => boolean;

/** This function checks if a given tag (tagName) in a node (elementNode) contains only a single attribute (attribute), and returns true if so.
Example 1:
\<div ref={} \/\> if attribute="ref" returns true
Example 2:
\<div ref={} style={} \/\> if attribute="ref" returns false
*/
const hasLonelyAttribute: HasLonelyAttributeType = ({ elementNode, tagName, attribute }) =>
  isTag({ elementNode, tagName }) &&
  elementNode?.attributes?.length === 1 &&
  elementNode.attributes[0]?.name?.name === attribute;

type HasAttributesType = (arg1: {
  elementNode: GenericNode;
  tagName: string | ReadonlyArray<string>;
  attributes: ReadonlyArray<string>;
}) => boolean;

/** This function checks if a given tag (tagName) in a node (elementNode) contains a given attribute (attribute), and returns true if so.
Example 1:
\<div role="button" \/\> if attribute="role" returns true
*/
const hasAttributes: HasAttributesType = ({ elementNode, tagName, attributes }) =>
  isTag({ elementNode, tagName }) &&
  // @ts-expect-error - TS7006 - Parameter 'nodeAttribute' implicitly has an 'any' type.
  elementNode?.attributes.some((nodeAttribute) => attributes.includes(nodeAttribute?.name?.name));

type HasAriaAttributesType = (arg1: {
  elementNode: GenericNode;
  ignoreAttributes?: ReadonlyArray<string>;
  tagName: string | ReadonlyArray<string>;
}) => boolean;

/** This function checks if a given tag (tagName) in a node (elementNode) contains an ARIA attribute, and returns true if so. Pass ignoreAttributes if not all aria attributes should be considered.
Example 1:
\<div aria-label="test" \/\> returns true
*/
const hasAriaAttributes: HasAriaAttributesType = ({ elementNode, ignoreAttributes, tagName }) =>
  isTag({ elementNode, tagName }) &&
  // @ts-expect-error - TS7006 - Parameter 'nodeAttribute' implicitly has an 'any' type.
  elementNode?.attributes.some((nodeAttribute) => {
    const attributeName = nodeAttribute?.name?.name;
    return !ignoreAttributes?.includes(attributeName) && attributeName.startsWith('aria-');
  });

type HasSupportedAttributesType = (arg1: {
  elementNode: GenericNode;
  tagName: string | ReadonlyArray<string>;
  supportedAttributes: ReadonlyArray<string>;
}) => boolean;

/** This function checks if a given tag (tagName) in a node (elementNode) contains attribute that are not supported by the Gestalt alternative (supportedAttributes), and returns true if so.
Example 1:
\<div aria-label="test" \/\> returns true
*/
const hasUnsupportedAttributes: HasSupportedAttributesType = ({
  elementNode,
  tagName,
  supportedAttributes,
}) =>
  isTag({ elementNode, tagName }) &&
  elementNode?.attributes.some(
    // @ts-expect-error - TS7006 - Parameter 'nodeAttribute' implicitly has an 'any' type.
    (nodeAttribute) => !supportedAttributes.includes(nodeAttribute?.name?.name),
  );

type HasDataAttributesType = (arg1: {
  elementNode: GenericNode;
  tagName: string | ReadonlyArray<string>;
}) => boolean;

/** This function checks if a given tag (tagName) in a node (elementNode) contains an data-* attribute (attribute), and returns true if so.
Example 1:
\<div data-test-id="test" \/\> returns true
*/
const hasDataAttributes: HasDataAttributesType = ({ elementNode, tagName }) =>
  isTag({ elementNode, tagName }) &&
  // @ts-expect-error - TS7006 - Parameter 'nodeAttribute' implicitly has an 'any' type.
  elementNode?.attributes.some((nodeAttribute) => nodeAttribute?.name?.name.startsWith('data-'));

type GetLocalComponentImportNameType = (arg1: {
  importNode: GenericNode;
  componentName: string;
}) => string;

/** This function returns the local component name, returning the alias.
Example 1:
import { Box } from 'gestalt // returns Box
Example 2:
import { Box as RenamedBox } from 'gestalt // returns RenamedBox
 */
const getLocalComponentImportName: GetLocalComponentImportNameType = ({
  importNode,
  componentName,
}) => {
  const namedImportsComponents = getNamedImportsComponents({ importNode }) ?? [];
  const componentNameMatch = namedImportsComponents.find((item) => item[0] === componentName);
  return (componentNameMatch && componentNameMatch[1]) ?? componentName;
};

type IsGestaltComponentType = (arg1: {
  elementNode: GenericNode;
  gestaltImportNode: GenericNode;
  componentName: string;
}) => boolean;

/** This function checks if component is a Gestalt import and return true if so */
const isGestaltComponent: IsGestaltComponentType = ({
  elementNode,
  gestaltImportNode,
  componentName,
}) => {
  const importedBoxName = getNamedImportsComponents({
    importNode: gestaltImportNode,
  })?.find((importName) => importName[0] === componentName)?.[1];

  return importedBoxName === elementNode.name.name;
};

type KeyValueTypeArrayType = ReadonlyArray<{
  name: string | null | undefined;
  value?: string | null | undefined | number;
  node: GenericNode;
}>;

type BuildKeyValueTypeArrayType = (arg1: {
  elementNode: GenericNode;
  nodeType: 'openingElementNode' | 'styleProperties';
}) => KeyValueTypeArrayType;

/** This function stores attributes/properties into an array store
 */
const buildKeyValueTypeArray: BuildKeyValueTypeArrayType = ({ elementNode, nodeType }) => {
  if (nodeType === 'styleProperties') {
    // @ts-expect-error - TS7006 - Parameter 'stylePropertyNode' implicitly has an 'any' type.
    return elementNode.map((stylePropertyNode) => {
      const { key, type, value } = stylePropertyNode;
      return !key || value.value === undefined
        ? { name: type, value: null, node: stylePropertyNode }
        : { name: key.name, value: value.value, node: stylePropertyNode };
    });
  }
  if (nodeType === 'openingElementNode') {
    // @ts-expect-error - TS7006 - Parameter 'propertyNode' implicitly has an 'any' type.
    return elementNode.attributes.map((propertyNode) => {
      const { name, value } = propertyNode;
      return { name: name.name, value: value.value, node: propertyNode };
    });
  }
  return [{ name: undefined, value: undefined, node: undefined }];
};

type BuildValidatorResponseFromPropertiesType = (arg1: {
  context: GenericNode;
  keyValueTypeArray: KeyValueTypeArrayType;
  reducerCallbackFn: (callbackArg: { context: GenericNode }) => ReducerType;
}) => ReducerAccType;

/** This function returns props fixes and the associated messages
 */
const buildValidatorResponsesFromProperties: BuildValidatorResponseFromPropertiesType = ({
  context,
  keyValueTypeArray,
  reducerCallbackFn,
  // @ts-expect-error - TS2740 - Type '{ name: string | null | undefined; value?: string | number | null | undefined; node: any; }' is missing the following properties from type 'readonly { node: any; prop?: string | number | null | undefined; message?: string | number | null | undefined; }[]': length, concat, join, slice, and 18 more. | TS2345 - Argument of type 'ReducerType' is not assignable to parameter of type '(previousValue: any[], currentValue: { name: string | null | undefined; value?: string | number | null | undefined; node: any; }, currentIndex: number, array: readonly { name: string | null | undefined; value?: string | ... 2 more ... | undefined; node: any; }[]) => any[]'.
}) => keyValueTypeArray.reduce<Array<any>>(reducerCallbackFn({ context }), []);

// This export acts as an index of all helper functions for quick reference of helpers available
export {
  buildKeyValueTypeArray,
  buildLiteralValueString,
  buildProps,
  buildPropsFromKeyValues,
  buildPropsFromKeyValuesVariable,
  buildValidatorResponsesFromProperties,
  getClosingElement,
  getComponentFromAttribute,
  getComponentNameFromAttribute,
  getHtmlTag,
  getInlineDefinedStyles,
  getLocalComponentImportName,
  getNamedImportsComponents,
  getNodeFromPropName,
  getOpeningElement,
  getPropertiesFromVariable,
  getTextNodeFromSourceCode,
  getVariableDefinedStyles,
  getVariableNodeInScopeFromName,
  hasAriaAttributes,
  hasAttributes,
  hasDataAttributes,
  hasImport,
  hasLonelyAttribute,
  hasSpreadAttributes,
  hasUnsupportedAttributes,
  isGestaltComponent,
  isTag,
  retrieveKeyValuesFromVariable,
};
