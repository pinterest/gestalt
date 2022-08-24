---
title: Tabs
description: Tabs may be used navigate between multiple URLs. Tabs are intended as page-level navigation.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/8b/cf/19/8bcf1919b6b5f9379a99bfbe8e304d5a.png" width={446} height={44} alt="an example of tabs"/>

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
    <ImgContainer src="https://i.pinimg.com/originals/f5/7f/85/f57f85ccb677cca5372f3419feb4d7f1.png" width={249} height={44} alt="example with concise tab labels"/>
    <Do title="Do" />
    Keep Tab labels short and concise, one or two words.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/34/48/4f/34484faabaf959cac956ff2e85c8cc48.png" width={82} height={44} alt="example of only one tab"/>
    <Dont title="Don't" />
    Hide or disable Tabs if that Tab’s content is empty. Additionally, there should always be at least two tabs.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/f5/0b/d4/f50bd4fb2fecc191cf462717c828e483.png" alt="example of tabs scrolling horizontally"/>
    <Do title="Do" />
    Allow tabs to scroll horizontally.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/d1/02/d0/d102d035b37609342307de99560cd56a.png" alt="example of tabs with truncated labels"/>
    <Dont title="Don't" />
    Truncate tabs to fit within a view.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/1b/54/ed/1b54edeaa10d58365ce6808bf70c0abb.png" alt="example of using too many tabs"/>
    <Dont title="Don't" />
    Use more than 6 Tabs. Consider using a different component like a Sheet.
  </Group>
</TwoCol>

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Variants

### Alignment

Tabs can be aligned to either the start or end point depending on language direction or centered.

1. **Start or end aligned (Default)**
Use if you have more than three tabs. Start or end aligned tabs will scroll horizontally if content is long enough to flow out of the frame. 
2. **Center aligned**
This variant may be used if you have two or three tabs. Center aligned Tabs should not be used if labels are long or if you have more than three Tabs. The center-aligned style of Tabs is used primarily for navigational Tabs and sits in the header of the screen.

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/cd/56/43/cd5643de79de5d00f4dff323451fb5d3.png" alt="start aligned tabs"/>
    
    **Start or end aligned (Default)**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/95/07/7b/95077b097278c0d1a69e16397ab268a7.png" alt="center aligned tabs"/>
   
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

By default, the Tabs content swipes in either from the left or right, depending on the way you are tabbing. Visit Apple’s HIG for more information on [Animation and Motion](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/animation/).

## Related

<ThreeCol>
  <IllustrationCard
  title="SegmentedControl"
  description="SegmentedControl is used to switch between views within a small area of content, such as a Popover."
  color="teal-spabattical-450"
  image="segmented-control"
  />
</ThreeCol>
