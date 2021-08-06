// @flow strict

// $FlowFixMe[unclear-type]
type GenericNode = {| [string]: any |};

/** =================  HELPERS =================
 */

type GetTextNodeFromSourceCodeType = ({|
  context: GenericNode,
  elementNode: GenericNode,
|}) => string;

/** This function returns the text from a node as it's shown in the code source.
 */
export const getTextNodeFromSourceCode: GetTextNodeFromSourceCodeType = ({
  context,
  elementNode,
}) => context.getSourceCode().getText(elementNode);

type GetPropertiesFromVariableType = ({|
  variableNode: GenericNode,
|}) => ?GenericNode;

/** This function returns the properties  of a variable (variableNode).
Examples: const a = { key: "value"} >> returns nodes containing information (key: "value")
*/
export const getPropertiesFromVariable: GetPropertiesFromVariableType = ({ variableNode }) =>
  variableNode?.resolved?.defs[0]?.node?.init?.properties;

type KeyValuesType = {|
  key: string,
  value: string | number,
  isValueTypeLiteral: boolean,
|};
type RetrieveKeyValuesFromVariableType = ({|
  context: GenericNode,
  variableNode: GenericNode,
|}) => $ReadOnlyArray<KeyValuesType> | null;

/** This function returns an array of objects containing the data for each key/value in the variable object.
Example 1:
const a = { color: "red"} >> returns [{ key: "color", value: "red", isValueTypeLiteral: true }]
Example 2:
const a = { width: 20} >> returns [{ key: "width", value: 20, isValueTypeLiteral: true }]
Example 3:
const a = { onClick: () => {}} >> returns [{ key: "onClick", value: "() => {}", isValueTypeLiteral: false }]
*/
export const retrieveKeyValuesFromVariable: RetrieveKeyValuesFromVariableType = ({
  context,
  variableNode,
}) => {
  const properties = getPropertiesFromVariable({ variableNode });
  return properties
    ? properties.map((prop) => {
        const isLiteral = prop.value.type === 'Literal';
        return {
          key: prop.key.name,
          value: isLiteral ? prop.value.value : context.getSourceCode().getText(prop.value),
          isValueTypeLiteral: isLiteral,
        };
      })
    : null;
};

type BuildLiteralValueStringType = ({|
  value: string | number,
|}) => string;

/** This function returns a string of literal value formatted as a prop value.
Example 1:
{ key: "color", value: "red", isValueTypeLiteral: true } >> "red"
Example 2:
{ key: "width", value: 20, isValueTypeLiteral: true } >> "{20}"
*/
export const buildLiteralValueString: BuildLiteralValueStringType = ({ value }) =>
  typeof value === 'number' ? `{${value}}` : `"${value}"`;

type RetrieveKeyValuesFromPropsType = ({|
  context: GenericNode,
  elementNode: GenericNode,
  newPropsString: string,
|}) => string;

/** This function returns a string of component props
Example:
If the node is \<div width={20} \> and newPropsString="color='red'"", it returns "color='red' width={20}"
*/
export const buildProps: RetrieveKeyValuesFromPropsType = ({
  context,
  elementNode,
  newPropsString,
}) => {
  if (elementNode.openingElement.attributes.length === 0) return newPropsString;

  const previousProps = elementNode.openingElement.attributes.map(
    (prop) => `${prop.name.name}=${context.getSourceCode().getText(prop.value)}`,
  );

  return [...previousProps, newPropsString].sort().join(' ');
};

type BuildPropsFromKeyValuesType = ({|
  keyValues: $ReadOnlyArray<KeyValuesType>,
|}) => string;
/** This function returns key/values formatted as component props.
Example 1:
{ key: "color", value: "red", isValueTypeLiteral: true } >> color="red"
Example 2:
{ key: "width", value: 20, isValueTypeLiteral: true } >> width={20}
Example 3:
{ key: "onClick", value: "() => {}", isValueTypeLiteral: false } >> onClick={() => {}}
*/

export const buildPropsFromKeyValues: BuildPropsFromKeyValuesType = ({ keyValues }) => {
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

type BuildPropsFromKeyValuesVariableType = ({|
  context: GenericNode,
  variableNode: GenericNode,
|}) => string;
/** This function returns key/values formatted as component props.
Example:
[{ key: "color", value: "red", isValueTypeLiteral: true }, { key: "width", value: 20, isValueTypeLiteral: true }] >> 'color="red" width={20}'
*/
export const buildPropsFromKeyValuesVariable: BuildPropsFromKeyValuesVariableType = ({
  context,
  variableNode,
}) => {
  const keyValues = retrieveKeyValuesFromVariable({
    context,
    variableNode,
  });
  return keyValues ? buildPropsFromKeyValues({ keyValues }) : '';
};

type GetComponentFromAttributeType = ({| nodeAttribute: GenericNode |}) => GenericNode;
/** This function returns the component containing the attribute's node (nodeAttribute).
Example:
\<div {...props} \/\> returns div node for the spread props attribute
*/
export const getComponenFromAttribute: GetComponentFromAttributeType = ({ nodeAttribute }) =>
  nodeAttribute.parent;

type GetVariableNodeInScopeFromNameType = ({|
  context: GenericNode,
  nodeElement: GenericNode,
  name: string,
|}) => GenericNode;
/** This function returns the component's name containing the attribute's node (nodeAttribute).
Example:
\<div {...props} \/\> returns div for the spread props attribute
*/

export const getVariableNodeInScopeFromName: GetVariableNodeInScopeFromNameType = ({
  context,
  nodeElement,
  name,
}) => {
  const scope = context.getScope(nodeElement);
  // Look in local scope for variable reference
  const variableNode = scope.references.find((reference) => reference.identifier.name === name);
  return variableNode;
};

type GetComponentNameFromAttributeType = ({| nodeAttribute: GenericNode |}) => string;
/** This function returns the component's name containing the attribute's node (nodeAttribute).
Example:
\<div {...props} \/\> returns div for the spread props attribute
*/
export const getComponentNameFromAttribute: GetComponentNameFromAttributeType = ({
  nodeAttribute,
}) => nodeAttribute?.parent?.name?.name;

type HasImportType = ({| importNode: GenericNode, path: string |}) => boolean;
/** This function checks is a given node (importNode) contains a given import path (path), and returns true if so.
Example 1:
import { Box } from 'gestalt'; path="gestalt"
Example 2:
import { Box } from 'app/box'; path="app/box"
*/
export const hasImport: HasImportType = ({ importNode, path }) => {
  const importName = importNode.source ? importNode.source.value : null;
  return importName === path;
};

type GetNamedImportsComponentsType = ({| importNode: GenericNode |}) => ?$ReadOnlyArray<
  $ReadOnlyArray<string>,
>;
/** This function returns an array of arrays containing the named imports ([imported name, local or aliased name]) from a node (importNode).
 */
export const getNamedImportsComponents: GetNamedImportsComponentsType = ({ importNode }) => {
  const namedImports = importNode?.specifiers?.map((node) => [
    node.imported.name,
    node?.local?.name,
  ]);
  return namedImports;
};

type GetHtmlTagType = ({| elementNode: GenericNode |}) => string;

/** This function returns the tag of a given node (elementNode).
Examples:
\<div \/\> returns "div"
\<button \/\> returns "button"
*/
export const getHtmlTag: GetHtmlTagType = ({ elementNode }) =>
  elementNode?.openingElement?.name?.name;

type IsTagType = ({| elementNode: GenericNode, tagName: string |}) => boolean;
/** This function checks is a given node (elementNode) contains a given tag (tagName), and returns true if so.
Example 1:
\<div \/\> >> tagName="div" returns true
Example 2:
\<div \/\> >> tagName="button" returns false
*/
export const isTag: IsTagType = ({ elementNode, tagName }) => elementNode?.name?.name === tagName;

type HasLonelyAttributeType = ({|
  elementNode: GenericNode,
  tagName: string,
  attribute: string,
|}) => boolean;

/** This function checks is a given tag (tagName) in a node (elementNode) contains only a single attribute (attribute), and returns true if so.
Example 1:
\<div ref={} \/\> if attribute="ref" returns true
Example 2:
\<div ref={} style={} \/\> if attribute="ref" returns false
*/
export const hasLonelyAttribute: HasLonelyAttributeType = ({ elementNode, tagName, attribute }) =>
  isTag({ elementNode, tagName }) &&
  elementNode?.attributes?.length === 1 &&
  elementNode.attributes[0]?.name?.name === attribute;
