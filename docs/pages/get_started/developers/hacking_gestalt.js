// @flow strict
import { type Node as ReactNode } from 'react';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import SandpackExample from '../../../docs-components/SandpackExample';
// Examples
import dangerouslySetInlineStyle from '../../../examples/hacking_gestalt/dangerouslySetInlineStyle';
import ref from '../../../examples/hacking_gestalt/ref';
import wrappingComponents from '../../../examples/hacking_gestalt/wrappingComponents';

export default function DocsPage(): ReactNode {
  return (
    <Page title="How to hack around Gestalt">
      <PageHeader
        description="Guidelines for customizing Gestalt components."
        name="How to hack around Gestalt"
        type="guidelines"
      />

      <MainSection name="Disclaimer">
        <MainSection.Subsection
          description={`
    For the vast majority of use cases, please do _not_ use these techniques. **Please explore building your custom UI element using our primitive components, like [Box](/web/box), [TapArea](/web/taparea), [Pog](/web/pog), etc first! And feel free to ask us for help!**

    Gestalt's components enforce the design system by restricting possible usage. This is by design! However, in certain scenarios — experimental usage, usage on internal tools or other non-Pinner/M10n surfaces, etc — it may be necessary to circumvent those restrictions to build the desired experience. With that in mind, here are some common techniques and their trade-offs.
    `}
        />
      </MainSection>

      <MainSection name="Creating new components">
        <MainSection.Subsection
          description={`
When a Gestalt component doesn't quite match the desired design spec, a common idea is to fork the component: copy/paste the component's code into the target repo where it can be modified.
**Pro:**
- Complete freedom to make whatever changes are desired

**Con:**
- Duplicate code
- Drift from the original component can make re-integration difficult/impossible
- Heavy maintenance burden: any future updates to Gestalt (changes to color, rounding, etc) will need to be made manually, and will likely lead to a broken/outdated UI in the meantime
- Dark mode and RTL support will need to be handled manually

**Alternative:** Chat with the Gestalt team about your needs and let's see how we can accommodate them. Often features that we don't support are for accessibility or other reasons — but we're happy to see how we can support you!
`}
          title="Forking components"
        />

        <MainSection.Subsection
          description={`
Custom components can also be made from scratch, using native DOM elements and CSS/SCSS.
**Pro:**
- Complete freedom to build whatever UI is desired

**Con:**
- Adds to bundle size with custom stylesheets instead of taking advantage of Gestalt's common styles
- Creates disjointed app feel by not working within the design system
- Heavy maintenance burden: no support from Gestalt team for future updates
- Dark mode and RTL support will need to be handled manually

**Alternative:** Chat with the Gestalt team about your needs and let's see how we can accommodate them. If we can't officially support your needs, at least use Gestalt primitives (Box, TapArea, etc) when building your custom UI to ensure that your feature is accessible and fits in with the rest of the design system.
        `}
          title="Custom components"
        />
      </MainSection>

      <MainSection name="Modifications to existing components">
        <MainSection.Subsection
          description={`
[Box](/web/box) provides an "escape hatch" prop, \`dangerouslySetInlineStyle\`, allowing for styles to be set directly on the component. Similarly, [Icon](/web/icon), [IconButton](/web/iconbutton), and [Pog](/web/pog) provide the \`dangerouslySetSvgPath\` to allow for custom icons.

**Pro:**
- Uses Gestalt components for all non-custom styles needed, taking advantage of our hashed classes for smaller stylesheets, adhering to the design system, and getting future upgrades for free
- We track \`dangerouslySetInlineStyle\` usage, which informs future changes to Gestalt components

**Con:**
- Doesn't support pseudo-classes, pseudo-elements, or animations
- Overridden styles will not respond to dark mode or RTL

**Alternative:** When possible, stick to the styles available on Gestalt components natively. If you need to use a custom style, try to use the corresponding [design token](/foundations/design_tokens) instead of a hard-coded value. If your design calls for unsupported styles, please feel free to contact us to chat about design options.
`}
          title={`Box's dangerouslySetInlineStyle`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={dangerouslySetInlineStyle}
                name="dangerouslySetInlineStyle Example"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
Certain components have styles that can be overridden when wrapped by (or wrapped around) other components.

**Pro:**
- Continues to use Gestalt components for all except the custom styles

**Con:**
- Your UI may look disjointed with the rest of the design system
- Overridden styles will not respond to dark mode or RTL

**Alternative**: When possible, stick to the styles available on Gestalt components natively. If your design calls for unsupported styles, please feel free to contact us to chat about design options.
`}
          title="Wrapping components"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={wrappingComponents} name="Wrapping Components Example" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
Components that accept refs (e.g. [Box](/web/box), [Button](/web/button), etc) can be customized by manipulating the referenced element.

**Pro:**
- Uses Gestalt components for all non-custom styles needed, taking advantage of our hashed classes for smaller stylesheets, adhering to the design system, and getting future upgrades for free
- Directly targets the instance of the component rather than relying on the underlying DOM elements

**Con:**
- Doesn't support pseudo-classes, pseudo-elements, or animations
- Typically only targets the outermost element of the component; inner elements of complex components cannot be reached
- Overridden styles will not respond to dark mode or RTL

**Alternative:** When possible, stick to the styles available on Gestalt components natively. If your design calls for unsupported styles, please feel free to contact us to chat about design options.
`}
          title="Refs"
        >
          <MainSection.Card sandpackExample={<SandpackExample code={ref} name="Ref Example" />} />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
It is possible to use CSS selectors to peer "under the hood" of Gestalt components and target the underlying DOM elements.
**Pro:**
- It's CSS, so you can do whatever you want

**Con:**
- This is very, very brittle and subject to breaking changes at any point; we do not consider breaking changes to the underlying DOM structure when determining [semver](https://semver.org/) so even \`patch\` changes could break your UI
- Overridden styles will not respond to dark mode or RTL

**Alternative**: Absolutely anything — this is just about the worst way to hack Gestalt components. Your UI _will_ break in the future. Consider using a [ref](#Refs) if possible.
`}
          title="CSS selectors"
        />
      </MainSection>
    </Page>
  );
}
