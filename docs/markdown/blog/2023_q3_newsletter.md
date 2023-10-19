---
title: Gestalt 2023 Q3 newsletter
description: The Gestalt Team is spending the second half of 2023 refining, cleaning up and improving previous iterations. We also cranked out brand new components, guidelines and tokens along the way.
fullwidth: true
---

## Q3 highlight: RTL guidelines 
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/a8/64/02/a864028b1abd18cdc2794e44fadd7b97.png" alt="Illustration showing 3 screens with content flowing from right to left." />
<br />
In partnership with our Internationalization Team, we published the first version of guidelines for using and formatting right-to-left (RTL) and bi-directional (BIDI) languages in products. This includes:

- A general summary of international design concepts and terms
- Guidelines for layout and text direction
- Typography guidelines
- Tips for mirroring icons
- Additional resources for localizing interfaces

With a large amount of people who speak an RTL and BIDI language using digital products, it is imperative that we be more inclusive and design with those speakers in mind. Our RTL guidelines are the first step in educating our design and engineering teams on best practices for internationalization. We plan to add guidance on internationalizing numerals, currency and dates next quarter.

**[Read the RTL guidelines](https://gestalt.pinterest.systems/foundations/rtl_guidelines/about_international_design)**

## Components and tokens
### Featured component: ChartGraph
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/96/50/a3/9650a322f58fa3614a325cea3284d0ad.png" alt="Illustration bar and line graphs in a checkboard grid." />
<br />
Hot off the heels of our data visualization guidelines, we created our first data visualization component for web: ChartGraph. The component solves for commonly-used graphs that are plotted on an x and y axis, like line graphs, bar graphs and combo graphs. ‌Advertisers, merchants and creators who want a visual way to interpret and act on data can do so via charts that can be consistent across surfaces since it’s one component built on one charting library.

The components are responsive and also include settings for those with color blindness or other visual impairments. A tabular view of graph data is coming next for those who either have difficulty navigating charts with assistive devices, prefer to read data in tabular format, or want to download the data as a table to interpret using their own tools. This also means that our data visualization guidelines can be updated using real examples. Look for that update in Q4!

**[Check out the ChartGraph component](https://gestalt.pinterest.systems/web/chartgraph)**

<TwoCol>
<Group>
### ButtonLink
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/58/f2/d5/58f2d55de641a773ea50dbcaa26517a3.png" alt="An illustration of a button on a page with a Visit icon next to the label signifying that it is a link." />
<br />
We’ve made it easier for developers to use a button as a link by providing a component that handles that out-of-the-box instead of having to use TapArea, or modify our Button component.

**[Check out ButtonLink](https://gestalt.pinterest.systems/web/buttonlink)**
</Group>

<Group>
### Spacing density tokens
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/c9/ee/91/c9ee91ba0da8ac1ad0de923a567819f0.png" alt="An illustration showing gradual increases in spacing with the increments of 4px, 8px and 12px." />
<br />
More data density for complex experiences for Enterprise and Internal Tools customers has been an issue for a while. We’ve taken the first step by updating our spacing tokens to a denser 4px grid. These will then get applied to a core set of components so that our business and dev tools customers can have more density and be more productive.

**[See the updated spacing tokens](https://gestalt.pinterest.systems/foundations/design_tokens#Spacing)**
</Group>
</TwoCol>

<TwoCol>
<Group>
### TableofContents
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/50/2e/3f/502e3fafcc8b933638b0a2f58593db27.png" alt="An illustration showing content on a page with TableofContents next to it." />
<br />
This component allows you to easily navigate a long page or form. You can see it in action on this page over to the right!

**[Try out TableofContents](https://gestalt.pinterest.systems/web/tableofcontents)**
</Group>
<Group></Group>
</TwoCol>

## Documentation
We added native mobile component guidelines and refined some existing documentation.

### Native mobile component guidelines
We continue to add guidelines for Android and iOS components that'll soon be available in code.

<TwoCol>
<Group>
### ListAction
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/02/18/d3/0218d3becaeff05715189211b3e224a1.png" alt="An illustration showing a ListAction." />
<br />
ListAction is a continuous vertical group of list items that can include text, icons, images and actions.

* [ListAction for iOS](https://gestalt.pinterest.systems/ios/listaction)
* [ListAction for Android](https://gestalt.pinterest.systems/android/listaction)
</Group>
<Group>
### Tabs
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/b4/26/bd/b426bd05929fa90b4ea5e9f248b7db03.png" alt="An illustration showing tabs with a Pin representation underneath them." />
<br />
Tabs are used to navigate between URLs. They're intended as page-level navigation.

* [Tabs for iOS](https://gestalt.pinterest.systems/ios/tabs)
* [Tabs for Android](https://gestalt.pinterest.systems/android/tabs)

</Group>
</TwoCol>

<TwoCol>
<Group>
### Toast
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/27/00/35/270035cd6766a6ecc9bf54acc89776b9.png" alt="An illustration shown a toast at the bottom of a mobile screen." />
<br />
Our Toasts are slimmed down to allow for quick, useful messages without taking up too much space.

* [Toast for iOS](https://gestalt.pinterest.systems/ios/toast)
* [Toast for Android](https://gestalt.pinterest.systems/android/toast)
</Group>
<Group></Group>
</TwoCol>

## Figma library updates
This quarter, we were all-in on improving discoverability in Figma.

<TwoCol>
<Group>
## Keyword search
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/48/12/f6/4812f6f8f42c2082e99069c140db24fe.png" alt="An illustration of a magnifying glass focusing on keywords." />
<br />
We added keywords to all components and icons. This makes it easier to find a component if you don’t know its exact name.
</Group>
<Group>
## Color naming improvements
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/cc/9c/44/cc9c445bed7136991d00392bf0682e4a.png" alt="An illustration of a swatchbook fanned out to show multiple color ramps." />
<br />
Hex codes were added to help distinguish colors between libraries. Descriptions were fixed to help those who can’t see colors clearly and need another way to interpret them.
</Group>
</TwoCol>

<TwoCol>
<Group>
## Design handoff kit
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/cb/d4/b3/cbd4b3fce3fb44d9ae75d9985efea751.png" alt="An illustration with the Figma logo in the center of it to signify our handoff kit." />
<br />
We improved our accessibility annotation kit, cleaned up instances and fixed auto-layout issues.
</Group>
<Group>
## Dark mode washes
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/6d/86/63/6d8663dfc8e7cbd611c54a332c5c4f65.png" alt="An illustration of a dark wash circle overlaying a lighter circle to show the concept of transparency." />
<br />
We continued to work on parity between light and dark modes by adding washes to dark mode.
</Group>
</TwoCol>

## Pinterest Design Plugin
We’ve been hard at work continuing to improve the Pinterest design plugin. This Q3, we focused on Figma variables and a table generator.

**[Check out our design plugin](http://pinch.pinadmin.com/pinterest-design-plugin)**

<TwoCol>
<Group>
## Figma variables
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/22/a7/49/22a74910e7137148709bbfa0bd485e54.png" alt="An illustration showing a variable being connected to components and styles." />
<br />
This is an internal shift to Figma Variables. We didn’t roll it out yet, but if you try the plugin’s experimental linting capability in the experiments section, current styles will be linked to variables. Expect to hear more about this in Q4.
</Group>
<Group>
## Easy table creation
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/ed/48/f1/ed48f193e46f8d2e5dc9efe9fd12627e.png" alt="An illustration of rows and columns selected with an arrow pointing to a table." />
<br />
Tables in Figma are notoriously complex to create and edit. We’ve made it easier with our table generator. Simply pick the number of rows and columns you want, and instantly get a Gestalt table made in seconds.
</Group>
</TwoCol>

## What’s coming in Q4
In addition to continued additions and maintenance for everything already mentioned, we have a number of exciting plans to end the year on a high note.

### Design system day
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/fc/64/af/fc64afc4cd23b367fc2aa47325b78f07.png" alt="An illustration highlighting Design System Day." />
<br />
Our annual internal mini-conference is back on October 20!  Take a break from the day-to-day and get inspired with a full day of speakers and guests from Pinterest and the design industry at large. Schedule and registration details are below (**Note:**  these are internal-only):
- [Schedule](http://pinch.pinadmin.com/dsd-schedule)
- [Sign-up](http://pinch.pinadmin.com/dsd-sign-up)

### Android pattern standardization
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/b5/94/81/b594819a404f2a0533fae2f8aee2a1a9.png" alt="An illustration showing the Android logo and Android phone screens." />
<br />
Our Android UI has veered away from standard platform conventions over the years, but we are working hard to bring it in line with what most Android users are familiar with. Get ready for more Android-aligned patterns and components in Q4!

### Figma variables migration
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/f8/c8/c8/f8c8c8304ce17a92db71651127d031b8.png" alt="An illustration of Figma variables being applied to 3 phone screens." />
<br />
We have already added variables to our Figma library, but in Q4 we plan to make the full transition to variables. This will be a huge gain for design efficiency as variables make it easy to switch between modes and spacing themes. We should be done by the end of the year—this will include both Figma and Figma plug-in updates.

### Documentation: Architecture and content improvements
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/8e/77/30/8e77302fd3e01aa438ae4273ac8cf3fb.png" alt="An illustration of an information architecture diagram with a heart." />
<br />
We’ll continue to make updates to our Foundations section to make it easier to navigate and also include more guidelines on how all of our components and styles fit together. This includes:

* Navigation based on user feedback
* Home page updates to make things easier to find
* Guidelines on page layout
* Improved Messaging guidelines

That’s all for now. See y’all during the next big update!






