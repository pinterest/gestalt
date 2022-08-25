---
title: Sheet
description: Sheets are bottom-anchored overlays that that allow the user to easily return to the previous screen. They are meant for temporary focused tasks. Sheets are the mobile equivalent of the modal or overlay on web.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/51/37/d2/5137d238a2fa8d2ff93668d87860e667.png" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - Performing an optional sub-task within a larger task
      - Presenting help info while maintaining the current page and its context
      - Requesting minimal amounts of information froma user (1-2 fields only)
      - Capturing user’s full attention for something important
  </Group>
  <Group>
    <Dont title="When not to use" />
      - Displaying system errors or notices. Consider a [Callout](web/callout) instead
      - Any time a separate, designated URL is desired
      - Any action that should not interrupt users from their current work stream
      - On top of another sheet, as this can create usability issues and confusion
  </Group>
</TwoCol>

## Mobile best practices

- Sheets should be triggered by the users action, like tapping on a button.
- Use a sheet for non-imersive content and simple tasks.
- Sheets always sit in front of other UI elements.

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/12/8c/2d/128c2d8557950e5beeb85dddb1f58d04.png" alt="a partial sheet with a close button and a grabber to allow for multiple ways to close and collapse"/>
    <Do title="Do" />
    Provide a collapse or a close affordance&mdash;multiple if possible. This could include an X, back arrow, grabber or close button. 
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/6a/d3/49/6ad3491d1618960d094d41c733b00e8e.png" alt="a partial sheet with a button in the top right corner of the header"/>
    <Dont title="Don't" />
    Include Buttons in the header of the Sheet as this can lead to sizing and internationalization problems. 
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/16/65/43/16654315cb922e2fc51f6cd60b2d86c7.png" alt="a partial sheet with a grabber to help resize"/>
    <Do title="Do" />Utilize a grabber for Partial sheets that are able to be resized.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/34/7c/0a/347c0a68fa3548b73f01af4a67fe914d.png" alt="a full sheet with rounded corners"/>
    <Dont title="Don't" />
    Round the corners of full sheets. Only Partial and Action sheets should have rounded corners.
  </Group>
</TwoCol>

## Variants

### Size

Sheets are available in three sizes.

1. **Full sheet**
   Full sheet is always the full height of the viewport. They need to be dismissed to interact with underlying content.
2. **Partial sheet**
   Partial sheet can be any height from 50% to 90% of the viewport. They are used when content on the sheet relates to the layer behind, therefore a background wash is optional. They are dismissed by swiping down or tapping outside of the sheet area.
3. **Action sheet**
   Action sheets can be any height up to 50% of the viewport. They always include a background wash and need to be dismissed to interact with the underlying content. Action sheets can serve as an alternative to dialogs and inline menus.

<ThreeCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/f4/dc/73/f4dc732c95493aa96a1ca09a2bd6c66d.png" />
**Full sheet**
</Group>

<Group>
<ImgContainer src="https://i.pinimg.com/originals/ce/d7/9a/ced79ab112a1934d569b535de3bd6b67.png" />
**Partial sheet**
</Group>

<Group>
<ImgContainer src="https://i.pinimg.com/originals/21/c9/2c/21c92cd25b3df51249216404a64c16bd.png" />
**Action sheet**
</Group>
</ThreeCol>

### Navigation

Sheets can utilize several navigation actions.

1. **Close**
   To close a sheet, use an icon button in the top left corner with the “close” icon.
2. **Back**
   To return to a previous screen, use an icon button in the top left corner with an “arrow-back” icon.

3. **Button**
   An inline Button can be used for a variety of purposes, back, close, next, save, etc.

4. **Grabber**
   A Grabber is a short gray line at the top of the sheet that tells the user that the sheet can be collapsed or expanded.
5. **Outside click**
   For the Partial Sheet and Action Sheet the user may be able to tap outside of the sheet to exit.

### Animation

By default, Sheet animates in from the bottom of the screen. It animates out when the header close button is pressed, the user swipes down or the user taps outside of the sheet. Visit Apple’s HIG for more information on [Animation and Motion](https://developer.apple.com/design/human-interface-guidelines/foundations/motion/).

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/foundations/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/)
