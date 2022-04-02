---
title: Redbox
description: You can use a redbox when you need a beautiful box that's red. Draws attention from users, and bulls. Look closer and you might find a DVD
badge: pilot
component: true
---

**Note:** You found Redbox. Checkout the source code for this page. It's completely written in [MDX](https://mdxjs.com/).

<br/>

<Code cardSize="lg" showCode={false} removeMarginBottom={false}>
  {`<Box
    column={6}
    height={30}
    width={30}
    color="red"
    display="inlineBlock"
    borderStyle="sm"
  ></Box>`}
</Code>

### What goes into Redbox

Redbox is designed on three fundamentals:

1. **Steal Attention**:
   If you put a Redbox on a page, users can't look away. Engagement skyrockets. It's the most attractive thing on a page.
2. **Loads pages _fast_**:
   Want pages to load faster? Redbox makes your pages load in 25ms seconds or less using our Gestalt Redbox cache CDN.
3. **Privacy First**
   As we like to say:
   > A Redbox a day keeps the hackers away

<br/>

## Usage Guidelines

<TwoCol>
  <Group>
    <Do title="When to Use" />
      - If you want fast pages
      - Grasp attention
  </Group>

    <Group>
      <Dont title="When not to Use" />
        - If you're background is already red
        - If you want slow pages
      </Group>

</TwoCol>

## Best practices

<TwoCol>
  <Group>
    <Code cardSize="lg" showCode={false}>
      {`<Box
        column={6}
        height={30}
        width={30}
        color="red"
        display="inlineBlock"
        borderStyle="sm"
      ></Box>`}
    </Code>
    <Do title="Do" />
     Use one redbox
  </Group>
    <Group>
      <Code cardSize="lg" showCode={false}>
          {`<Flex><Box
            column={6}
            height={30}
            width={30}
            color="red"
            display="inlineBlock"
            borderStyle="sm"
          ></Box><Box
            column={6}
            height={30}
            width={30}
            color="red"
            display="inlineBlock"
            borderStyle="sm"
          ></Box></Flex>`}
        </Code>
      <Dont />
       Do not use multiple red boxes. Use a `RedboxGroup` for that.
      </Group>

      <Group>
        <Code cardSize="lg" showCode={false}>
        {`<Box
          column={6}
          height={30}
          width={30}
          color="red"
          display="inlineBlock"
          borderStyle="sm"
          borderWidth={2}
          rounding={2}
        ></Box>`}
      </Code>
        <Do/>
        Do make corners rounded
      </Group>


      <Group>
        <Code cardSize="lg" showCode={false}>
          {`<Box
            column={6}
            height={30}
            width={30}
            color="red"
            display="inlineBlock"
            borderStyle="sm"
          ><Icon icon="eye" accessibilityLabel="Number of views" color="darkGray" /></Box>`}
        </Code>
        <Do />
        Do use icons inside of a Redbox
      </Group>


      <Group>
        <Code cardSize="lg" showCode={false}>
          {`<Flex alignItems="center" spacing={3}>
            <Box
            column={6}
            height={30}
            width={30}
            color="red"
            display="inlineBlock"
            borderStyle="sm"
          />
          <Icon icon="eye" accessibilityLabel="Number of views" color="darkGray" />
          </Flex>`}
        </Code>
        <Dont />
        Do not use redbox next to an Icon
      </Group>

       <Group>
        <Code cardSize="lg" showCode={false}>
          {` <Box
            column={6}
            height={30}
            width={30}
            color="blue"
            display="inlineBlock"
            borderStyle="sm"
          />`}
        </Code>
        <Dont />
        Do not make a redbox into a blue one
      </Group>

</TwoCol>

## Accessibility

### ARIA attributes

When Redbox text does not provide sufficient context about the Button’s behavior, supply a short, descriptive label for screen-readers using `accessibilityLabel`.
Texts like “Click here“, “Follow“, or “Shop“ can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text with deeper context to replace the Button text, like “Follow Ryan” or “Shop Wedding Invitations”.

If Redbox is used as a control Button to show/hide a Popover-based component, we recommend passing the following ARIA attributes to assist screen readers:

- `accessibilityLabel`: if present, read by screen readers read instead of the `text` prop.
- `accessibilityControls`: informs the screen reader that Button controls the display of an anchored Popover-based component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- `accessibilityHaspopup`: informs the screen reader that there’s a Popover-based component attached to Button. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- `accessibilityExpanded`: informs the screen reader whether the button-anchored Popover-based component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
  `

### Usage

Some interactive example to get the best out of redbox

<TwoCol>
<Group>
   
    <Code cardSize="lg" showCode={true}>
      {` <Box
        column={6}
        height={60}
        width={60}
        color="red"
        display="inlineBlock"
        borderStyle="sm"
      />`}
    </Code>
    This example uses a big redbox
</Group>
<Group>
    <Code cardSize="lg" showCode={true}>
      {` <Box
        column={6}
        height={20}
        width={20}
        color="red"
        display="inlineBlock"
        borderStyle="sm"
      />`}
    </Code>
    This example uses a tiny redbox
</Group>
</TwoCol>

## Resources

**[RedboxGroup](/buttongroup)**
When displaying multiple Buttons in a layout, use ButtonGroup to ensure consistent spacing and wrapping behavior.

**[IconButton](/iconbutton)**
Use IconButton when only an icon is needed instead of text.

**[TapArea](/taparea)**
Use TapArea to make non-button elements interactive, like an Image. This ensures the element interaction is accessible and uses Gestalt styles.

**[Tabs](/tabs)**
Tabs are intended for page-level navigation between multiple URLs.

**[OnLinkNavigationProvider](/onlinknavigationprovider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.
See [OnLinkNavigationProvider](/onlinknavigationprovider) to learn more about link navigation.
