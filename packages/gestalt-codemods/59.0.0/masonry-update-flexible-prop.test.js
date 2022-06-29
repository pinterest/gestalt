import { runInlineTest } from 'jscodeshift/dist/testUtils.js';
import masonryUpdateFlexibleProp from './masonry-update-flexible-prop.js';

describe('masonry-update-flexible-prop', () => {
  it('transforms correctly', () => {
    runInlineTest(
      masonryUpdateFlexibleProp,
      { quote: 'single' },
      {
        source: `
    // @flow strict
    import { Masonry } from 'gestalt';
    export default function TestMasonry() {
      return <>
        <Masonry flexible={true} />
        <Masonry flexible={false} />
        <Masonry flexible />
        <Masonry flexible layout="flexible" />
        <Masonry />
      </>
    }
      `,
      },
      `
    // @flow strict
    import { Masonry } from 'gestalt';
    export default function TestMasonry() {
      return <>
        <Masonry layout="flexible" />
        <Masonry />
        <Masonry layout="flexible" />
        <Masonry layout="flexible" />
        <Masonry />
      </>;
    }
    `,
    );
  });

  it('throws an error when spread is used on Masonry', () => {
    expect(() => {
      runInlineTest(
        masonryUpdateFlexibleProp,
        { quote: 'single' },
        {
          path: 'test.js',
          source: `
      // @flow strict
      import { Masonry } from 'gestalt';
      export default function TestMasonry() {
        return <>
          <Masonry {...otherProps} />
        </>
      }
        `,
        },
      );
    }).toThrow(
      new Error(
        `Remove Dynamic properties on Masonry and rerun codemod. Location: test.js @line: 6`,
      ),
    );
  });

  it('throws an error when the flexible prop contains a dynamic value', () => {
    expect(() => {
      runInlineTest(
        masonryUpdateFlexibleProp,
        { quote: 'single' },
        {
          path: 'test.js',
          source: `
      // @flow strict
      import { Masonry } from 'gestalt';
      export default function TestMasonry() {
        return <>
          <Masonry flexible={dynamicValue} />
        </>
      }
        `,
        },
      );
    }).toThrow(
      new Error(
        `Inspect Masonry component manually to evaluate if 'flexible' is set dynamically. Location: test.js @line: 6`,
      ),
    );
  });

  it('throws an error when the flexible prop is set and layout is set to a non flexible layout', () => {
    expect(() => {
      runInlineTest(
        masonryUpdateFlexibleProp,
        { quote: 'single' },
        {
          path: 'test.js',
          source: `
      // @flow strict
      import { Masonry } from 'gestalt';
      export default function TestMasonry() {
        return <>
          <Masonry flexible layout="basicCentered" />
        </>
      }
        `,
        },
      );
    }).toThrow(
      new Error(
        `Invalid prop combination related to "flexible" on Masonry, please update manually. Location: test.js @line: 6`,
      ),
    );
  });
});
