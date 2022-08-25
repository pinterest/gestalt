---
title: Tabs
description: Tabs may be used to navigate between multiple URLs. Tabs are intended as page-level navigation.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/5b/b9/0e/5bb90ee7b0b2e9f336cb803303f3eecf.png" width={413} height={48} alt="an example of tabs"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - To break up a large collection of content into logical, digestible views.
      - To switch between different, yet related views, such as Updates and Messages.
  </Group>
  <Group>
  <Dont title="When not to use" />
    - When any UI or content above the Tabs is altered upon selection. Use Link instead. 
    - To break up content that is not related to each other or is not on the same hierarchical level. 
    - To filter content. Consider SegmentedControl instead.
  </Group>
</TwoCol>

## Best practices

- Place Tabs directly above the relevant content. 
- Avoid using more than 6 Tabs. Consider using a different component like a Sheet.
- Order Tabs by relevance - the first tab should be the most logical starting view.

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/d7/27/63/d727634455161d98e7614c8b12b956f6.png" width={233} height={48} alt="example with concise tab labels"/>
    <Do title="Do" />
    Keep Tab labels short and concise, one or two words.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/ae/f7/f8/aef7f8343979091c40c01111e732a95c.png" width={78} height={48} alt="example of only one tab"/>
    <Dont title="Don't" />
    Hide or disable Tabs if that Tab’s content is empty. Additionally, there should always be at least two tabs.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/0d/08/71/0d08712e4810341422d3d20fbe9fd4cb.png" alt="example of tabs scrolling horizontally"/>
    <Do title="Do" />
    Allow tabs to scroll horizontally.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/fe/97/b2/fe97b2a279741762771f98bcd47e8e15.png" alt="example of tabs with truncated labels"/>
    <Dont title="Don't" />
    Truncate tabs to fit within a view.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/09/e9/b6/09e9b68dea0327b92311472655e416a1.png" alt="example of using too many tabs"/>
    <Dont title="Don't" />
    Use more than 6 Tabs. Consider using a different component like a Sheet.
  </Group>
</TwoCol>

## Accessibility

People use Android’s accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessbile design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Variants

### Alignment

Tabs can be aligned to either the start or end point depending on language direction or centered.

1. **Start or end aligned (Default)**
Use if you have more than three tabs. Start or end aligned tabs will scroll horizontally if content is long enough to flow out of the frame. 
2. **Center aligned**
This variant may be used if you have two or three tabs. Center aligned Tabs should not be used if labels are long or if you have more than three Tabs. The center-aligned style of Tabs is used primarily for navigational Tabs and sits in the header of the screen.

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/00/f2/1e/00f21e5c900eba214a575805c2198820.png" alt="start aligned tabs"/>
    
    **Start or end aligned (Default)**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/dc/60/4d/dc604d623a98939ed89acad50e77bdab.png" alt="center aligned tabs"/>
   
    **Center aligned**
  </Group>
</TwoCol>

### Style

Tabs can be aligned to either the start or end point depending on language direction or centered.

1. **Filled (Default)**
This is the default tab style. Use the filled style for any Tabs that sit within a screen.
2. **Underline**
The underline style of Tabs sits primarily in the header of the screen.

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/cd/56/43/cd5643de79de5d00f4dff323451fb5d3.png" alt="filled tabs style"/>
    
    **Filled (Default)**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/95/07/7b/95077b097278c0d1a69e16397ab268a7.png" alt="underlined tabs style"/>
    
    **Underline**
  </Group>
</TwoCol>

### Animation

By default, Sheet animates in from the bottom of the screen. It animates out when the header close button is pressed, the user swipes down or the user taps outside of the sheet. Visit Material Design for more information on [container motion](https://material.io/design/motion/the-motion-system.html#container-transform).

## Related

<ThreeCol>
  <IllustrationCard
  title="SegmentedControl"
  description="SegmentedControl is used to switch between views within a small area of content, such as a Popover."
  color="teal-spabattical-450"
  image="segmented-control"
  />
</ThreeCol>
