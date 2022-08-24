---
title: Tabs
description: Tabs may be used navigate between multiple URLs. Tabs are intended as page-level navigation.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/30/7a/de/307adebcacf4fca359de788e6a077329.png" alt=""/>

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
    <ImgContainer src="https://i.pinimg.com/originals/c9/f0/c5/c9f0c597503b7d3ea1dc840ce1e3add8.png" alt=""/>
    <Do title="Do" />
    Keep Tab labels short and concise, one or two words.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/8b/ea/f5/8beaf574ae9b9207700c63cbb6f33f33.png" alt=""/>
    <Dont title="Don't" />
    Hide or disable Tabs if that Tab’s content is empty. Additionally, there should always be at least two tabs.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/a1/ad/0c/a1ad0cef8be13f304a3b350aef24f12e.png" alt=""/>
    <Do title="Do" />
    Allow tabs to scroll horizontally.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/8b/ea/f5/8beaf574ae9b9207700c63cbb6f33f33.png" alt=""/>
    <Dont title="Don't" />
    Truncate tabs to fit within a view.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/8b/ea/f5/8beaf574ae9b9207700c63cbb6f33f33.png" alt=""/>
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
    <ImgContainer src="https://i.pinimg.com/originals/c9/f0/c5/c9f0c597503b7d3ea1dc840ce1e3add8.png" alt=""/>
    **Start or end aligned (Default)**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/8b/ea/f5/8beaf574ae9b9207700c63cbb6f33f33.png" alt=""/>
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
    <ImgContainer src="https://i.pinimg.com/originals/c9/f0/c5/c9f0c597503b7d3ea1dc840ce1e3add8.png" alt=""/>
    **Filled (Default)**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/8b/ea/f5/8beaf574ae9b9207700c63cbb6f33f33.png" alt=""/>
    **Underline**
  </Group>
</TwoCol>

### Animation

By default, the Tabs content swipes in either from the left or right, depending on the way you are tabbing. Visit Apple’s HIG for more information on Animation and Motion.

## Related

<ThreeCol>
  <IllustrationCard
  title="SegmentedControl"
  description="SegmentedControl is used to switch between views within a small area of content, such as a Popover."
  color="teal-spabattical-450"
  image="segmented-control"
  />
</ThreeCol>
