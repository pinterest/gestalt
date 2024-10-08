// CONSTANTS

const getContainerNode = ({
  scrollBoundaryContainerRef,
  initialPositionRef,
}: {
  scrollBoundaryContainerRef: HTMLElement | null | undefined;
  initialPositionRef: HTMLElement | null | undefined;
}): HTMLElement | null | undefined => {
  // containerNode references the ScrollBoundaryContainer node to which
  // append the portal
  let containerNode = null;
  // currentNode references the DOM node used while traversing up nodes in the DOM tree
  let currentNode: HTMLElement | null | undefined | Node = initialPositionRef;

  while (!containerNode) {
    // To find ScrollBoundaryContainer parents, currentNode is traversed up accessing its parent node
    // until matching with the ScrollBoundaryContainer ref passed via context
    // or until reaching the HTML document (loop break)
    if (scrollBoundaryContainerRef && currentNode && currentNode.parentNode) {
      if (
        currentNode instanceof HTMLDivElement &&
        scrollBoundaryContainerRef?.isSameNode(currentNode)
      ) {
        containerNode = scrollBoundaryContainerRef;
      }
      currentNode = currentNode.parentNode;
    } else {
      break;
    }
  }
  return containerNode;
};

export default getContainerNode;
