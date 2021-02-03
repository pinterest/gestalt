// @flow strict
import {
  getFlyoutDir,
  getCaretDir,
  calcEdgeShifts,
  baseOffsets,
  adjustOffsets,
  CARET_HEIGHT,
  CARET_WIDTH,
  BORDER_RADIUS,
} from './utils/positioningUtils.js';

const windowSize = {
  height: 900,
  width: 1440,
  scrollX: 0,
  scrollY: 0,
};

const flyoutSize = {
  height: 360,
  width: 180,
};

const fixedOffset = {
  x: 0,
  y: 0,
};

const centerTriggerRect = (props = {}) => ({
  bottom: props.bottom ?? 470,
  height: 40,
  left: 700,
  right: 740,
  top: props.top ?? 430,
  width: 40,
});

const upperMiddleTriggerRect = (props = {}) => ({
  bottom: 40,
  height: 40,
  left: props.left ?? 700,
  right: props.right ?? 740,
  top: 0,
  width: 40,
});

// between BORDER_RADIUS & CARET_HEIGHT away from the edge of the screen
const upperLeftTriggerRect = (props = {}) => ({
  bottom: props.bottom ?? 50,
  height: props.height ?? 40,
  left: props.left ?? 10,
  right: props.right ?? 50,
  top: props.top ?? 10,
  width: props.width ?? 40,
});

const idealDirections = ['up', 'right', 'left', 'down'];

describe('Contents', () => {
  describe('Main Direction chosen correctly', () => {
    it('Chooses the main direction as idealDirection when it fits on screen', () => {
      const triggerRect = centerTriggerRect();
      idealDirections.forEach((idealDirection) => {
        const mainDir = getFlyoutDir({ flyoutSize, idealDirection, triggerRect, windowSize });
        expect(mainDir).toEqual(idealDirection);
      });
    });

    it('Opens down when the trigger is too close to the top of screen', () => {
      const triggerRect = centerTriggerRect({ bottom: 40, top: 0 });
      idealDirections.forEach((idealDirection) => {
        const mainDir = getFlyoutDir({ flyoutSize, idealDirection, triggerRect, windowSize });
        expect(mainDir).toEqual('down');
      });
    });

    it('Opens up when the trigger is too close to the bottom of screen', () => {
      const triggerRect = centerTriggerRect({
        bottom: windowSize.height,
        top: windowSize.height - 40,
      });
      idealDirections.forEach((idealDirection) => {
        const mainDir = getFlyoutDir({ flyoutSize, idealDirection, triggerRect, windowSize });
        expect(mainDir).toEqual('up');
      });
    });

    it('Chooses the direction in which there is the most space if idealDirection is not given', () => {
      const triggerRect = upperMiddleTriggerRect({ left: 40, right: 80 });
      const mainDir = getFlyoutDir({ flyoutSize, idealDirection: null, triggerRect, windowSize });
      expect(mainDir).toEqual('down');
    });

    it('Chooses the direction within ScrollableBox, opens right or bottom when the trigger is right on the top/left corner', () => {
      const centerRightTriggerRect = {
        bottom: 40,
        height: 40,
        left: 0,
        right: 40,
        top: 0,
        width: 40,
      };

      const scrollableContainerSize = {
        height: 100,
        width: 100,
        scrollX: 0,
        scrollY: 0,
      };

      const reducedFlyoutSize = {
        height: 30,
        width: 30,
      };

      idealDirections.forEach((idealDirection) => {
        const mainDir = getFlyoutDir({
          idealDirection,
          flyoutSize: reducedFlyoutSize,
          triggerRect: centerRightTriggerRect,
          windowSize: scrollableContainerSize,
          isScrollableContainer: true,
        });
        expect(mainDir).toEqual(mainDir === 'down' ? 'down' : 'right');
      });
    });
  });

  describe('Sub direction chosen correctly', () => {
    it('Chooses the middle as sub direction when it fits on the screen', () => {
      const triggerRect = centerTriggerRect();
      idealDirections.forEach((flyoutDir) => {
        const subDir = getCaretDir({ flyoutSize, flyoutDir, triggerRect, windowSize });
        expect(subDir).toEqual('middle');
      });
    });
  });

  describe('Base offsets chosen correctly', () => {
    it('Left opening flyouts', () => {
      const hasCaret = true;
      const triggerRect = centerTriggerRect();
      const flyoutDir = 'left';
      const expectedBase = {
        top: windowSize.scrollY + triggerRect.top,
        left: windowSize.scrollX + (triggerRect.left - flyoutSize.width - CARET_HEIGHT),
      };
      const base = baseOffsets({
        hasCaret,
        relativeOffset: fixedOffset,
        flyoutSize,
        flyoutDir,
        triggerRect,
        windowSize,
      });
      expect(base).toEqual(expectedBase);
    });

    it('Right opening flyouts', () => {
      const hasCaret = true;
      const triggerRect = centerTriggerRect();
      const flyoutDir = 'right';
      const expectedBase = {
        top: windowSize.scrollY + triggerRect.top,
        left: windowSize.scrollX + triggerRect.right + CARET_HEIGHT,
      };
      const base = baseOffsets({
        hasCaret,
        relativeOffset: fixedOffset,
        flyoutSize,
        flyoutDir,
        triggerRect,
        windowSize,
      });
      expect(base).toEqual(expectedBase);
    });

    it('Up opening flyouts', () => {
      const hasCaret = true;
      const triggerRect = centerTriggerRect();
      const flyoutDir = 'up';
      const expectedBase = {
        top: windowSize.scrollY + (triggerRect.top - flyoutSize.height - CARET_HEIGHT),
        left: windowSize.scrollX + triggerRect.left,
      };
      const base = baseOffsets({
        hasCaret,
        relativeOffset: fixedOffset,
        flyoutSize,
        flyoutDir,
        triggerRect,
        windowSize,
      });
      expect(base).toEqual(expectedBase);
    });

    it('Down opening flyouts', () => {
      const hasCaret = true;
      const triggerRect = centerTriggerRect();
      const flyoutDir = 'down';
      const expectedBase = {
        top: windowSize.scrollY + triggerRect.bottom + CARET_HEIGHT,
        left: windowSize.scrollX + triggerRect.left,
      };
      const base = baseOffsets({
        hasCaret,
        relativeOffset: fixedOffset,
        flyoutSize,
        flyoutDir,
        triggerRect,
        windowSize,
      });
      expect(base).toEqual(expectedBase);
    });

    it('Left opening flyouts without caret', () => {
      const hasCaret = false;
      const triggerRect = centerTriggerRect();
      const flyoutDir = 'left';
      const expectedBase = {
        top: windowSize.scrollY + triggerRect.top,
        left: windowSize.scrollX + (triggerRect.left - flyoutSize.width - 8),
      };
      const base = baseOffsets({
        hasCaret,
        relativeOffset: fixedOffset,
        flyoutSize,
        flyoutDir,
        triggerRect,
        windowSize,
      });
      expect(base).toEqual(expectedBase);
    });

    it('Down opening flyouts without caret', () => {
      const hasCaret = false;
      const triggerRect = centerTriggerRect();
      const flyoutDir = 'down';
      const expectedBase = {
        top: windowSize.scrollY + triggerRect.bottom + 8,
        left: windowSize.scrollX + triggerRect.left,
      };
      const base = baseOffsets({
        hasCaret,
        relativeOffset: fixedOffset,
        flyoutSize,
        flyoutDir,
        triggerRect,
        windowSize,
      });
      expect(base).toEqual(expectedBase);
    });
  });

  describe('Adjusted offsets chosen correctly', () => {
    it('Left-up opening flyouts with caret shifted left past rounded corners', () => {
      const triggerRect = centerTriggerRect();
      const flyoutDir = 'left';
      const caretDir = 'up';
      const base = {
        top: 100,
        left: 100,
      };
      const edgeShift = {
        flyout: {
          x: 24,
          y: 24,
        },
        caret: {
          x: 22,
          y: 24,
        },
      };
      const expectedFlyoutOffset = {
        top: base.top - edgeShift.flyout.y,
        left: base.left,
      };
      const expectedCaretOffset = {
        top: edgeShift.caret.y + 2,
        right: -CARET_HEIGHT,
        bottom: null,
        left: null,
      };
      const { flyoutOffset, caretOffset } = adjustOffsets({
        base,
        edgeShift,
        flyoutSize,
        flyoutDir,
        caretDir,
        triggerRect,
        isScrollableContainer: false,
      });
      expect(flyoutOffset).toEqual(expectedFlyoutOffset);
      expect(caretOffset).toEqual(expectedCaretOffset);
    });
  });

  it('Right-up opening flyouts with caret shifted right past rounded corners', () => {
    const triggerRect = centerTriggerRect();
    const flyoutDir = 'right';
    const caretDir = 'up';
    const base = {
      top: 100,
      left: 100,
    };
    const edgeShift = {
      flyout: {
        x: 24,
        y: 24,
      },
      caret: {
        x: 22,
        y: 24,
      },
    };
    const expectedFlyoutOffset = {
      top: base.top - edgeShift.flyout.y,
      left: base.left,
    };
    const expectedCaretOffset = {
      top: edgeShift.caret.y + 2,
      right: null,
      bottom: null,
      left: -CARET_HEIGHT,
    };
    const { flyoutOffset, caretOffset } = adjustOffsets({
      base,
      edgeShift,
      flyoutSize,
      flyoutDir,
      caretDir,
      triggerRect,
      isScrollableContainer: false,
    });
    expect(flyoutOffset).toEqual(expectedFlyoutOffset);
    expect(caretOffset).toEqual(expectedCaretOffset);
  });

  describe('Edge shifts calculated correctly', () => {
    it('Keeps Container on screen when trigger is on the edge', () => {
      const triggerRect = upperLeftTriggerRect();
      const { flyout, caret } = calcEdgeShifts({
        triggerRect,
        windowSize,
        isScrollableContainer: false,
      });
      expect(triggerRect.bottom - flyout.y).toBeGreaterThan(0);
      expect(flyout.x).toBeLessThan(BORDER_RADIUS);
      expect(caret.x).toEqual(caret.y);
      expect(caret.x).toEqual(CARET_WIDTH);
    });
  });
});
