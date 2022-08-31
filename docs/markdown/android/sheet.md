---
title: Sheet
description: Sheets are bottom-anchored overlays that that allow the user to easily return to the previous screen. They are meant for temporary focused tasks. Sheets are the mobile equivalent of the modal or overlay on web.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/41/a6/36/41a6369d262d24bf04d08ee32beef508.png" alt="examples of three types of sheets: a Full sheet, a Partial resizable sheet and an Action sheet"/>

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
    <ImgContainer src="https://i.pinimg.com/originals/84/d4/0d/84d40d290128608db361a276a586da87.png" alt="a partial sheet with a close button and a grabber to allow for multiple ways to close and collapse"/>
    <Do title="Do" />
    Provide a collapse or a close affordance&mdash;multiple if possible. This could include an X, back arrow, grabber or close button. 
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/5d/3a/20/5d3a20657045824cb4b7d89263b6ec30.png" alt="a partial sheet with a button in the top right corner of the header"/>
    <Dont title="Don't" />
    Include Buttons in the header of the Sheet as this can lead to sizing and internationalization problems. 
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/06/e9/6f/06e96f0193da3a32a25d7f1174d5dfa1.png" alt="a partial sheet with a grabber to help resize"/>
    <Do title="Do" />Utilize a grabber for Partial sheets that are able to be resized.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/62/a4/fa/62a4fa0befb32c836519b6d9f1af5f28.png" alt="a full sheet with rounded corners"/>
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
<ImgContainer src="https://i.pinimg.com/originals/5a/47/1d/5a471d7d44d380915953f57777455c7d.png" alt="a Full sheet that takes up the full phone screen and shows a profile picture and the ability to see ideas from a pinner, along with other actions like downloading and changing the profile picture" />
**Full sheet**
</Group>

<Group>
<ImgContainer src="https://i.pinimg.com/originals/09/7a/72/097a72f92026753e50b29641eab975ff.png" alt="a Partial sheet that can be closed and/or resized. It is for Creating a board" />
**Partial sheet**
</Group>

<Group>
<ImgContainer src="https://i.pinimg.com/originals/df/d3/8f/dfd38f800948c6bc8f3cb5a53d575a87.png" alt="An Action Sheet that allows for sorting and organization" />
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

By default, Sheet animates in from the bottom of the screen. It animates out when the header close button is pressed, the user swipes down or the user taps outside of the sheet. Visit Material Design for more information on [container motion](CONTAINER_MOTION).

## Accessibility

People use Android’s accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](ACCESSIBLE_DESIGN_ANDROID)
[Accessible development on Android](ACCESSIBLE_DEVELOPMENT_ANDROID)
