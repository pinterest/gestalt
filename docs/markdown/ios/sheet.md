---
title: Sheet
description: Sheets are bottom-anchored overlays that that allow the user to easily return to the previous screen. They are meant for temporary focused tasks. Sheets are the mobile equivalent of the modal or overlay on web.
fullwidth: true
---

<ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/db/25/21/db25219f8faf97e21dab59f02fe55a7d.png" alt="examples of three types of sheets: a Full sheet, a Partial resizable sheet and an Action sheet"/>

## Usage guidelines
<TwoCol>
<Group>
<Do title="When to use" />
- Performing an optional sub-task within a larger task
- Providing help while maintaining the current page and it's context
- Requesting minimal amounts of information from a user 
- Capturing user's full attention for vital matters
</Group>

<Group>
<Dont title="When not to use" />
- To display system errors. Use the appropriate messaging component instead.
- When it will distract users from their current work stream, unless necessary and intentional
- Avoid using on top of another sheet as this can create usability issues and confusion. View the transitions section for more on interaction logistics. 
</Group>
</TwoCol>

## Mobile best practices

- Trigger sheets via user actions, like button taps
- Include a header title. Headers can be center or start-aligned, but they should remain consistent.
- Keep the sheet footer uncluttered with clear actions
- Don’t remove the wash behind partial Sheets. The wash separates content and allows for better focus and accessibility. 
<br/>
<TwoCol>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/1e/52/20/1e5220045c7a0c67c852859dd9ecfc7f.png" alt="a partial sheet with a close button and a grabber to allow for multiple ways to close and collapse"/>
    <Do title="Do" />
    Include visible close options — multiple if possible. For example, X, back arrow, grabber, close button or outside tap.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/ae/21/74/ae2174d2f73e9238658e2346f1b5f063.png" alt="a partial sheet with a button in the top right corner of the header"/>
    <Dont title="Don't" />
    Avoid using Buttons in the header of Sheet as this can lead to sizing and internationalization problems.
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/98/f8/4d/98f84d38ef9dde66333830eead6fda9e.png" alt="a partial sheet with a grabber to help resize"/>
    <Do title="Do" />
    Always Include a grabber for partial sheets to signal resizability and provide better accessibility.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/03/c9/bb/03c9bb88c3746ce74bdacfe68fa9727c.png" alt="a full sheet with rounded corners"/>
    <Dont title="Don't" />
    Round the corners of full sheets. Only partial sheets should be rounded.
  </Group>
</TwoCol>

## Accessibility

- Always include a grabber for partial sheets, it aides in resizability but is also tab-accessible and usable with non-touch inputs like keyboard or switch controls.
- The accessibility role for a Sheet is "bottom sheet." When a Sheet is triggered and focus is moved to the first element in it, a screen reader will announce "bottom sheet" due to its role.

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/foundations/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/)

## Variants

### Size

Sheets are available in two sizes.

1. **Partial sheet**
   The content of a partial sheet should align with the primary screen content. Partial Sheet includes a background wash that enables the user to view the content behind, but not interact with it. Partial sheets are flexible and can vary in height. Users can tap outside of the Sheet to dismiss.
2. **Full sheet**
   A full sheet does not directly relate to the primary screen. The full Sheet occupies the entire viewport’s full height and must be closed to access underlying content. 

<TwoCol>
<Group>
<ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/b3/af/4d/b3af4d1665a91448a82edae916a9a10e.png" alt="a Full sheet that takes up the full phone screen and shows a profile picture and the ability to see ideas from a pinner, along with other actions like downloading and changing the profile picture" />
**Full sheet**
</Group>

<Group>
<ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/27/08/0d/27080db941d1f6736574c257d01b1702.png" alt="a Partial sheet that can be closed and/or resized. It is for Creating a board" />
**Partial sheet**
</Group>
</TwoCol>
<br/>

### Scrolling
Both partial and full sheet content can be vertically scrolled when it’s content exceeds the initial viewable height, independent of the rest of the screen’s content.
<br/>

### Header
The Sheet header has a flexible configuration and can utilize several navigation actions. To improve accessibility, it is advised to use at least two different navigation elements per sheet. Below are header elements and navigation options. 

1. **Required title**
  The header title is required, however it can be either center-aligned or start-aligned.
  
2. **Optional subheader**
   You may add a subheader, though it is not required.

3. **Close**
   To close a sheet, use an icon button in the top left corner with the “close” icon.

4. **Back and forward**
   On Android, to return to a previous screen, use an icon button in the top left corner with a “directional-arrow-left” icon. To move to a new screen in the Shee, use an icon button in the top right corner with a "directional-arrow-right" icon. 

5. **Button**
   An inline Button is available for a variety of purposes, back, close, next, save, etc. However we advise caution when using due to potential localization issues. 

6. **Grabber**
   A Grabber is a short gray line at the top of the sheet that tells the user that the sheet can be dragged to either collapse of expand.
<br/>

### Footer

The Sheet footer has a flexible configuration. It accepts many different kinds of components. However the recommendation is to restrict the number of actions as to not overwhelm the user. 
<br/>

### Transitions

The Sheet slides up from the bottom as the initial transition. However, transitions between sheets should follow the following patterns.  

**Same Size** 
If there's a transition between Sheets of the same size, the content transitions in place.

**Different Size** 
If there's a transition between Sheets of different sizes or with a size set to "auto", where height adjusts to content, the initial Sheet will slide down to close and the new Sheet will slide up to open.

## Localization
Be sure to localize the header, body content and any footer items. Note that localization can lengthen text by 20 to 30 percent.
<br/>
<ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/4a/8b/ef/4a8befb30bcb1aabcc5a25e8f4631bf9.png" alt="Example of a sheet that has been localized. The contents are flipped"/>

## Animation

By default, the Sheet animates up from the screen’s bottom when prompted by the user and animates down from the top when the user takes an action to exit. Visit Apple’s HIG for more information on [Animation and Motion](https://developer.apple.com/design/human-interface-guidelines/foundations/motion/).

## Writing
- Don’t truncate header text. Headers should have no more than two lines of text. If they are longer than two lines, consider revising the content.
