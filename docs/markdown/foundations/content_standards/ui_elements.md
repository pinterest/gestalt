---
title: UI Elements
description: Here are a few guidelines we recommend you follow when writing near UI elements to help make things clear
fullwidth: true
---

## Buttons
Buttons should be descriptive but short.

<TwoCol>
  <Group>
    <Do title="Do"/>
     - If your object is already described on the screen, buttons only need a verb
     - If your object isn’t described on the screen, buttons need a verb + the object
     - Use fewer than 3 words
     - Use sentence case
     - Examples:
        - Save
        - Edit profile
        - See job openings
        - Cancel
        - No thanks 
  </Group>
  <Group>
  <Dont title="Don't"/>
     - Don’t use punctuation
     - Examples:
        - Save changes
        - Edit
        - Jobs
        - No, thanks
  </Group>
</TwoCol>

---

## Confirmations and toasts

Confirmations are like little high-fives that let people know that the action they just took was successful. 

Always use a toast, unless there’s another visual indicator that an action’s been taken (for example: if you follow someone there’s an animation showing their icon going into your following tab—so you wouldn’t need a toast there). 

**Elements**
- Header/title: Let the Pinner know the action they just took was successful.
- Subhead/main text: Use if needed, but it’s optional. Ask yourself if a visual element might help more than additional text would.
- Buttons: No buttons in confirmations! 

<TwoCol>
  <Group>
    <Do title="Do"/>
     - Explain what just happened
     - Keep it short and light
     - Include an exclamation point if the toast is under ~4-5 words (even if the toast is a negative action)
     - Examples: 
        - Pin sent!
        - Delete undone!
        - 3 Pins deleted!
  </Group>
  <Group>
  <Dont title="Don't"/>
     - Don’t sound like a robot
     - Don’t include an exclamation point if you say it out loud and it doesn’t sound like something you’d...actually exclaim
        - The action was successful
        - You saved 3 Pins to Uniform
        - We’ll send your feedback to Felicia
  </Group>
</TwoCol>

---

## Education

Education for a new (or existing!) feature can be a tooltip or a screen takeover, often using progressive disclosure or multiple screens. 

Use the following principles when writing education:

- Set expectations up front about what the new product does
- Guide people to anticipate (and take) next steps—what action will occur after they tap on this button or tab?
- Identify potential questions or points of anxiety about the new product, and give people context and information to feel confident and knowledgeable so they feel confident and comfortable.
- Celebrate a job well done—either with judicious use of positive writing like an exclamation point or “yay,” or some kind of delightful design element.help center

PS: When working with designers on education, consider what education should look like. (Ex: Is a banner being used when just a temporary flyout is needed?) Currently, we have a number of different education design options:
- Tooltip
- Flyout 
- Modal (screen takeover)
- Empty state text
- Banners

---

## Emoji

Okay, okay. We’re loosening up about emoji, since it’s a natural part of human communication. Don’t go crazy and start using, like, flags and onigiri and stuff though. Check out these handy-dandy guidelines:

<TwoCol>
  <Group>
    <Do title="Do"/>
     - Limit emoji to infrequent, one-off elements, like notifications
     - Use extremely common emojis from this list: ❤️, ✔️, 📌, 🔥, ✨, 💡, ⭐️, 📣
     - Use emojis as an addition to the copy, not instead of a word (so “Look who's checking out your Pins  “ rather than “You've got  on your Pins”)
  </Group>
  <Group>
  <Dont title="Don't"/>
     - Don’t use emoji in the product, in permanent parts of the UI
     - Don’t use unique or unusual emojis, even in the name of “delight”
     - Don’t use emojis for negativity (like error messages)
     - Don’t use emoji in an experience where whimsy or delight could be established through existing design assets instead. Check with your designer first!
  </Group>
</TwoCol>

---

## Error messages

Error messages should clearly describe what happened and what the person can do to fix the problem—without overwhelming them with unnecessary info. 

**Elements**

Use titles and text wisely—quickly explain the problem in the title, then follow up with more details
- Title: Let the Pinner know why they’re seeing the error, but keep it short. Include a “Sorry!” or “Oops!” at the beginning to lighten things up a bit. 
  - Sorry is a good fit for when we or our servers screwed up 
  - Oops is a good fit for when we're not sure whether it's us or them (or when it's them)
- Text: Give more details about why they’re seeing the error and how to resolve it if they can. 
- Buttons: A good ol’ [Okay] works in most cases
<br/>
Use red text inline when someone submits a form that’s missing a required field. 
- Don’t use punctuation. Exception: Errors that are more than one sentence or if you want to use an exclamation point

<TwoCol>
  <Group>
    <Do title="Do"/>
     - Use super-simple language
     - Clearly explain what happened
     - Help people fix the problem
     - Be tone-sensitive
     - Limit calls to action—don’t give Pinners too many ways to solve a problem or multiple buttons/steps to work through 
     - If error is a full and complete sentence, use a period at the end
     - Don’t use periods for one-word errors
     - Use conversational, normalizing words like Psst!, Hmm, Oops, and Um
     - Examples: 
        - Choose a board for your Pin and try again.
        - You can't follow this board because this person blocked you. 
  </Group>
  <Group>
  <Dont title="Don't"/>
     - Examples: 
        - Parameter 'board_id' is required.
        - You’re not allowed to do that. 
  </Group>
</TwoCol>

---

## Mobile UI

Use mobile-appropriate terms for gestures (ex: swipe and tap, not click), and keep things short.

<TwoCol>
  <Group>
    <Do title="Do"/>
     - Tap 
  </Group>
  <Group>
  <Dont title="Don't"/>
     - Click
  </Group>
</TwoCol>

---

## Notifications

Notifications (including push notifications) are lightweight messages that let Pinners know about what’s happening with the Pins they saved, the people they follow and more. 

**Elements**

- Title: No titles in notifications!
- Body: Include up to 3 subjects (ex: Tiffani, Mia and 5 others NOT Tiffani, Mia, Long, Ricky and 17 other people) and keep them to two lines of text, max. 
- Buttons: No buttons in notifications! 

<TwoCol>
  <Group>
    <Do title="Do examples"/>
     - Mac saved your Pin
     - Sadia invited you to a group board
  </Group>
  <Group>
  <Dont title="Don't examples"/>
     - Check out what we’re doing for Fashion Week!!!!
     - Based on your search for "dogs,” you’ll love these ideas!  [ Okay ]
  </Group>
</TwoCol>

