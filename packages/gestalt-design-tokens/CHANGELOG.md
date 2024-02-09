This file is updated manually

## 140.0.1 https://github.com/pinterest/gestalt/pull/3420

### Minor

| name       | old value | new value |
| ---------- | --------- | --------- |
| rounding-0 | 0         | 0px       |
| space-0    | 0         | 0px       |

#### Why

0 values break in Android and rounding was not added in the config.

#### Breaking change notes

--

## 139.1.0 https://github.com/pinterest/gestalt/pull/3413

### Minor

NEW

| name                     | light                          | dark                                          |
| ------------------------ | ------------------------------ | --------------------------------------------- |
| overlay-color-background | color.background.default.value | color.background.elevation.floating.darkValue |

REVERT

| name                        | old value              | new value                |
| --------------------------- | ---------------------- | ------------------------ |
| color-background-wash-dark  | rgb(0 0 0 / 0.8)       | rgba(0, 0, 0, 0.8)       |
| color-background-wash-light | rgb(255 255 255 / 0.9) | rgba(255, 255, 255, 0.9) |

#### Why

Tokenize overlay component background colors. Overlay components require a white background but a floating elevation on darkmode. We needed a custom color pairing.

#### Breaking change notes

Partially reverting token changes in from https://github.com/pinterest/gestalt/pull/3407

--

## 139.0.0 https://github.com/pinterest/gestalt/pull/3410

NEW

| name                                     | light                          | dark                     |
| ---------------------------------------- | ------------------------------ | ------------------------ |
| button-color-gray-default                | color.background.neutral.value |                          |
| button-color-gray-hover                  | #878787                        |                          |
| button-color-gray-active                 | #828282                        | #9b9b9b                  |
| button-color-semitransparentdark-default | rgba(51, 51, 51, 0.8)          | rgba(255, 255, 255, 0.8) |
| button-color-semitransparentdark-hover   | #121212                        | #f0f0f0                  |
| button-color-semitransparentdark-active  | #1f1f1f                        | #e0e0e0                  |

#### Why

Tokenize Pog colors.

#### Breaking change notes

--

## 136.0.1 https://github.com/pinterest/gestalt/pull/3407

### This PR introduces a BUG!

### Patch

| name                                      | old value                                        | new value                                    |
| ----------------------------------------- | ------------------------------------------------ | -------------------------------------------- |
| color-background-wash-dark                | rgba(0, 0, 0, 0.8)                               | rgb(0 0 0 / 0.8)                             |
| color-background-wash-light               | rgba(255, 255, 255, 0.9)                         | rgb(255 255 255 / 0.9)                       |
| button-color-tertiary-hover               | rgba(0, 0, 0, 0.06) / rgba(250, 250, 250, 0.5)   | rgb(0 0 0 / 0.06) / rgb(250 250 250 / 0.5)   |
| button-color-tertiary-active              | rgba(0, 0, 0, 0.1) / rgba(250, 250, 250, 0.6)    | rgb(0 0 0 / 0.1) / rgb(250 250 250 / 0.6)    |
| button-color-semitransparentwhite-default | rgba(255, 255, 255, 0.8) / rgba(51, 51, 51, 0.8) | rgb(255 255 255 / 0.8) / rgb(51 51 51 / 0.8) |
| elevation-floating                        | 0 0 8px rgba(0, 0, 0, 0.10)                      | 0 0 8px rgb(0 0 0 / 0.10)                    |
| elevation-raised-top                      | 0 2px 8px rgba(0, 0, 0, 0.12)                    | 0 2px 8px rgb(0 0 0 / 0.12)                  |
| elevation-raised-bottom                   | 0 -2px 8px rgba(0, 0, 0, 0.12)                   | 0 -2px 8px rgb(0 0 0 / 0.12)                 |

#### Why

Modern color-functions use a comma-free syntax because functions in CSS are used to group/name a syntax chunk.

#### Breaking change notes

This PR introduces a bug as reported by Android where alpha values `color_background_wash_dark` and `color_background_wash_light` and now that alpha value is gone, leaving the color just black and white without opacity value assigned.

## 136.0.0 https://github.com/pinterest/gestalt/pull/3404

### Major

| old name                       | new name value            |
| ------------------------------ | ------------------------- |
| color-text-icon-default        | color-icon-default        |
| color-text-icon-subtle         | color-icon-subtle         |
| color-text-icon-info           | color-icon-info           |
| color-text-icon-recommendation | color-icon-recommendation |
| color-text-icon-success        | color-icon-success        |
| color-text-icon-warning        | color-icon-warning        |
| color-text-icon-error          | color-icon-error          |
| color-text-icon-inverse        | color-icon-inverse        |

#### Why

Both text and icon are content and should be at the same token level

#### Breaking change notes

Token instances must manually change tokens from color-text-icon-_ to color-icon-_

## 134.3.0 https://github.com/pinterest/gestalt/pull/3401

### Minor

NEW

| name                                      | light                                 | dark                          |
| ----------------------------------------- | ------------------------------------- | ----------------------------- |
| button-color-primary-default              | color.background.primary.base         |                               |
| button-color-primary-hover                | color.background.primary.strong.value |                               |
| button-color-primary-active               | "#a3081a                              | #b8001b                       |
| button-color-secondary-default            | color.background.secondary.base       | color.gray.roboflow.600.value |
| button-color-secondary-hover              | #e2e2e2                               | #535353                       |
| button-color-secondary-active             | #dadada                               | #666                          |
| button-color-tertiary-default             | color.transparent.value               |                               |
| button-color-tertiary-hover               | rgb(0 0 0 / 0.06)                     | rgb(250 250 250 / 0.5)        |
| button-color-tertiary-active              | rgb(0 0 0 / 0.1)                      | rgb(250 250 250 / 0.6)        |
| button-color-shopping-default             | color.background.shopping.value       |                               |
| button-color-shopping-hover               | #4a8ad4                               |                               |
| button-color-shopping-active              | 4a85c9                                | #4a85c9                       |
| button-color-white-default                | color.white.mochimalist.0.value       | #030303                       |
| button-color-white-hover                  | #f0f0f0                               | #121212                       |
| button-color-white-active                 | #e0e0e0                               | #1f1f1f                       |
| button-color-semitransparentwhite-default | rgb(255 255 255 / 0.8)                | rgb(51 51 51 / 0.8)           |
| button-color-semitransparentwhite-hover   | #f0f0f0                               | #121212                       |
| button-color-semitransparentwhite-active  | #e0e0e0                               | #1f1f1f                       |
| button-color-disabled-default             | color.background.secondary.base       | color.gray.roboflow.600       |
| button-color-selected-default             | color.background.selected.base        |                               |

#### Why

Tokenize current Button color styles

#### Breaking change notes

--

## 134.0.0 https://github.com/pinterest/gestalt/pull/3394

### Major

| name                   | old value                     | new value                     |
| ---------------------- | ----------------------------- | ----------------------------- |
| color-text-subtle      | color.gray.roboflow.550.value | color.gray.roboflow.500.value |
| color-text-icon-subtle | color.gray.roboflow.550.value | color.gray.roboflow.500.value |

Before
![Screenshot by Dropbox Capture](https://github.com/pinterest/gestalt/assets/10593890/dcda2b20-e1ba-476c-8b5c-41271cafb84c)

After
![Screenshot by Dropbox Capture](https://github.com/pinterest/gestalt/assets/10593890/8621a8a1-0d71-4ea0-9d64-423ba166b9b5)

#### Why

Reconcile with Figma values

#### Breaking change notes

It might break visual snapshots
