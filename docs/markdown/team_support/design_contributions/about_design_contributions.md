---
title: About design contributions
description: A design contribution is any design proposal that's approved for compliant release through the Gestalt Design System for other teams to reuse. Currently, we are prioritizing the contributions of components for use in our shared component Figma libraries for iOS, Android and web.
fullwidth: true
---
## Contribution levels

To help unblock teams and ship faster, we've created two levels of component designs that are accepted in our system.
### Compliant contributions
A compliant contribution contains the basic elements of visual and interaction consistency to go into Gestalt for reuse by other teams are met without introducing redundancy. This is a contribution that's considered “good enough” for release and reuse. “Good enough” includes:
- Design principles are met
- Gestalt tokens and design foundations are used
- All subcomponents are from Gestalt
The design is a crucial part of a product feature that multiple designers are working on

For examples of the minimum work that's required to be compliant, see our [Contribution templates](https://www.figma.com/file/d8wqI2ogUtq9tl3OGfl4bK/Staging---Component-contributions?type=design&node-id=12-4910&mode=design&t=66MCS6vhDwkHSySC-11)

### Certified contributions
A contribution that adheres to all quality standards. Mainly handled by the Gestalt Team, but external teams can also help a contribution become certified. Things that make a contribution certified include:
- Documentation is ready to publish
- Examples of best practices and how to use the component are available in Figma and the Gestalt site
- Fully specked and reviewed with engineering for implementation as a reusable component
- Has extra features that can be leveraged in all Pinterst products and by all teams
- Responsive behavior is addressed
- Figma mirrors code implementation
- Screen reader support is documented
- Keyboard navigation is documented
- Edge cases are documented with clear examples
- Accessibility goes beyond WCAG requirements and provides multi-modal ways to access content

The goal is for all components to go from Compliant to Certified eventually. However, there can be instances when a component never gets certified—for example, we find out over time that the component isn’t highly used anymore, or updated research and metrics show the need for a different component.

## Types of valid component contributions
There are four types of valid component contributions:
- Net new component
- Component enhancement
- Replacement component
- Related component

## Net new component
A brand new component with no functional equivalent in Gestalt

<br/>
<ImgContainer noPadding color="background-default" src="https://www.pinterest-assets.com/AssetLink/83t0kws845u8ut15mf7e2l8y0x2y246m/contributions-design-net-new-png.png" alt="pending"/>

### Validation criteria
**Note: This has a lower bar for approval because there is no existing functionality that may introduce redundancy to consider. Any of the below can qualify this as a valid contribution**

- Clear business justification
- A useful functionality that doesn’t exist in Gestalt
- Local experiments got good results
- User-tests are positive

## Component enhancement
An update or new variant of an existing Gestalt component

<br/>
<ImgContainer noPadding color="background-default" src="https://www.pinterest-assets.com/AssetLink/3vt2j4214020pv57kkv0k5isr62e6hm4/contributions-design-enhancement-png.png" alt="pending"/>

### Validation criteria
**Note: This has the highest bar for approval because this will impact multiple product teams and experiences.**

- The update is small enough that it can be made in the same component as an updated property, a new property or a new variant. Examples are:
  - Changing the icon used in a button.
  - Adding a variant to a component—for example,  a “recommendation” status of a component
  - Adding more sizes or density options.
- Metrics or user research shows that an updated component is needed and the same use case elsewhere isn't negatively affected. An example is a recent update to Avatar due to significant performance lifts.
- Existing patterns elsewhere are accounted for and the team has committed to reach out to those teams—for example, the “add collaborator” icon for Avatar in Boards has changed, but there are other cases of the same action being used in other parts of the product that don’t happen in the Avatar component.

## Component replacement
Completely replacing an existing component with a new one.

<br/>
<ImgContainer noPadding color="background-default" src="https://www.pinterest-assets.com/AssetLink/sihtl8868te51548ly0tp31wy6bx7774/contributions-design-replacement-png.png" alt="pending"/>
***Please don't try this at home.***

### Validation criteria
**Note: This has the highest bar for approval because this will impact multiple product teams and experiences.**

- There's been design leadership approval to replace a component completely
- Approval documentation is submitted and signed off on
- All surfaces affected by the replacement have been audited and accounted for
- Metrics or user research show that a replacement is needed globally, not just on one or two surfaces
- The ROI of making a big replacement has been documented
- The replacement is out of the experiment phase and no major experiments are planned in the near future

## Related component
Related to or an alternative to an existing  component. It doesn’t replace the existing component.
<br/>
<ImgContainer noPadding color="background-default" src="https://www.pinterest-assets.com/AssetLink/mx16r0b62801xk5h0yjparuy1d2m65l6/contributions-design-related-png.png" alt="pending"/>

### Validation criteria
**Note: This has the highest bar for approval because this will impact multiple product teams and experiences.**

- Something that performs the same function exists, but:
  - The related component performs better in global metrics tests, or
  - The related component is a better fit for certain experiences, screensor contexts.
- This component is different enough that it is a separate component and not a variant of a component.
- The alternative introduces significantly different functionality, like opening a dropdown
- A different layout than the original component, like adding a Footer to a Banner that complicates the existing component API.
- A visually different way to perform the same action as the related component—for example, multi-selecting via tags vs a checkbox list
- This component doesn’t replace an existing component completely, but complements it as an alternate component
- The related component doesn’t introduce redundancies anywhere else—another team isn’t already using a similar component

## Decision tree
To see if you have a potential contribution, go through our contribution decision tree:

<br/>
<iframe style={{border:0}} width="100%" height="800" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F6zf0xNW6i8XHuUBVxtnGSB%2FContributions-flow-diagrams%3Ftype%3Dwhiteboard%26node-id%3D2%253A645%26t%3D2glNSrcZEWIEZZts-1" allowFullScreen></iframe>
