// @flow
import {
  getMainDir,
  getSubDir,
  calcEdgeShifts,
  baseOffsets,
  adjustOffsets,
  SPACING_OUTSIDE,
  BORDER_RADIUS,
} from './Contents.js';

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
  bottom: 470,
  height: 40,
  left: 700,
  right: 740,
  top: 430,
  width: 40,
  ...props,
});

const upperMiddleTriggerRect = (props = {}) => ({
  bottom: 40,
  height: 40,
  left: 700,
  right: 740,
  top: 0,
  width: 40,
  ...props,
});

// between BORDER_RADIUS away from the edge of the scrren
const upperLeftTriggerRect = (props = {}) => ({
  bottom: 50,
  height: 40,
  left: 10,
  right: 50,
  top: 10,
  width: 40,
  ...props,
});

const idealDirections = ['up', 'right', 'down', 'left'];

describe('Contents', () => {
  describe('Main Direction chosen correctly', () => {
    it('Chooses the main direction as idealDirection when it fits on screen', () => {
      const triggerRect = centerTriggerRect();
      idealDirections.forEach(idealDir => {
        const mainDir = getMainDir(
          flyoutSize,
          idealDir,
          triggerRect,
          windowSize
        );
        expect(mainDir).toEqual(idealDir);
      });
    });

    it('Opens down when the trigger is too close to the top of screen', () => {
      const triggerRect = centerTriggerRect({ bottom: 40, top: 0 });
      idealDirections.forEach(idealDir => {
        const mainDir = getMainDir(
          flyoutSize,
          idealDir,
          triggerRect,
          windowSize
        );
        expect(mainDir).toEqual('down');
      });
    });

    it('Opens up when the trigger is too close to the bottom of screen', () => {
      const triggerRect = centerTriggerRect({
        bottom: windowSize.height,
        top: windowSize.height - 40,
      });
      idealDirections.forEach(idealDir => {
        const mainDir = getMainDir(
          flyoutSize,
          idealDir,
          triggerRect,
          windowSize
        );
        expect(mainDir).toEqual('up');
      });
    });

    it('Chooses the direction in which there is the most space if idealDirection is not given', () => {
      const triggerRect = upperMiddleTriggerRect({ left: 40, right: 80 });
      const mainDir = getMainDir(flyoutSize, null, triggerRect, windowSize);
      expect(mainDir).toEqual('down');
    });
  });

  describe('Sub direction chosen correctly', () => {
    it('Chooses the middle as sub direction when it fits on the screen', () => {
      const triggerRect = centerTriggerRect();
      idealDirections.forEach(idealDir => {
        const subDir = getSubDir(flyoutSize, idealDir, triggerRect, windowSize);
        expect(subDir).toEqual('middle');
      });
    });
  });

  describe('Base offsets chosen correctly', () => {
    it('Left opening flyouts', () => {
      const triggerRect = centerTriggerRect();
      const mainDir = 'left';
      const expectedBase = {
        top: windowSize.scrollY + triggerRect.top,
        left:
          windowSize.scrollX +
          (triggerRect.left - flyoutSize.width - SPACING_OUTSIDE),
      };
      const base = baseOffsets(
        fixedOffset,
        flyoutSize,
        mainDir,
        triggerRect,
        windowSize
      );
      expect(base).toEqual(expectedBase);
    });

    it('Right opening flyouts', () => {
      const triggerRect = centerTriggerRect();
      const mainDir = 'right';
      const expectedBase = {
        top: windowSize.scrollY + triggerRect.top,
        left: windowSize.scrollX + (triggerRect.right + SPACING_OUTSIDE),
      };
      const base = baseOffsets(
        fixedOffset,
        flyoutSize,
        mainDir,
        triggerRect,
        windowSize
      );
      expect(base).toEqual(expectedBase);
    });

    it('Up opening flyouts', () => {
      const triggerRect = centerTriggerRect();
      const mainDir = 'up';
      const expectedBase = {
        top:
          windowSize.scrollY +
          (triggerRect.top - flyoutSize.height - SPACING_OUTSIDE),
        left: windowSize.scrollX + triggerRect.left,
      };
      const base = baseOffsets(
        fixedOffset,
        flyoutSize,
        mainDir,
        triggerRect,
        windowSize
      );
      expect(base).toEqual(expectedBase);
    });

    it('Down opening flyouts', () => {
      const triggerRect = centerTriggerRect();
      const mainDir = 'down';
      const expectedBase = {
        top: windowSize.scrollY + triggerRect.bottom + SPACING_OUTSIDE,
        left: windowSize.scrollX + triggerRect.left,
      };
      const base = baseOffsets(
        fixedOffset,
        flyoutSize,
        mainDir,
        triggerRect,
        windowSize
      );
      expect(base).toEqual(expectedBase);
    });
  });

  describe('Adjusted offsets chosen correctly', () => {
    it('Left-up opening flyouts', () => {
      const triggerRect = centerTriggerRect();
      const mainDir = 'left';
      const subDir = 'up';
      const base = {
        top: 100,
        left: 100,
      };
      const edgeShift = {
        flyout: {
          x: 24,
          y: 24,
        },
      };
      const expectedFlyoutOffset = {
        top: base.top - edgeShift.flyout.y,
        left: base.left,
      };
      const flyoutOffset = adjustOffsets(
        base,
        edgeShift,
        flyoutSize,
        mainDir,
        subDir,
        triggerRect
      );
      expect(flyoutOffset).toEqual(expectedFlyoutOffset);
    });
  });

  describe('Edge shifts calculated correctly', () => {
    it('Keeps Container on screen when trigger is on the edge', () => {
      const triggerRect = upperLeftTriggerRect();
      const subDir = 'up';
      const { flyout } = calcEdgeShifts(subDir, triggerRect, windowSize);
      expect(triggerRect.bottom - flyout.y).toBeGreaterThan(0);
      expect(flyout.x).toBeLessThan(BORDER_RADIUS);
    });
  });
});
