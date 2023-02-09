import * as t from "@babel/types";

/**
 * Convert HTML tag names to the TS type for it
 * @param tag - The string of the HTML tag e.g. `div`
 * @returns {string} - The TS type for that tag
 */
function translateHTMLComponent(tag: string) {
  if (tag.match(/h\d/)) {
    return "HTMLHeadingElement";
  }

  if (tag === "fieldset") {
    return "HTMLFieldSetElement";
  }

  if (tag === "a") {
    return "HTMLAnchorElement";
  }

  if (tag === "td") {
    return "HTMLTableCellElement";
  }

  if (tag === "tr") {
    return "HTMLTableRowElement";
  }

  return `HTML${tag.charAt(0).toUpperCase()}${tag.slice(1)}Element`;
}

export function getComponentType(targetTag: string) {
  if (targetTag.charAt(0) === targetTag.charAt(0).toLowerCase()) {
    const qualifiedTypeAnnotation = t.tsQualifiedName(
      t.identifier("React"),
      t.identifier("HTMLProps")
    );

    const myTypeLiteral = t.tsTypeReference(
      t.identifier(translateHTMLComponent(targetTag))
    );

    return t.tsTypeReference(
      qualifiedTypeAnnotation,
      t.tsTypeParameterInstantiation([myTypeLiteral])
    );
  }

  const typeOfComponentAnnotation = t.tsTypeQuery(t.identifier(targetTag));
  const qualifiedTypeAnnotation = t.tsQualifiedName(
    t.identifier("Flow"),
    t.identifier("ComponentProps")
  );

  return t.tsTypeReference(
    qualifiedTypeAnnotation,
    t.tsTypeParameterInstantiation([typeOfComponentAnnotation])
  );
}
