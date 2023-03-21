import { $Keys } from 'utility-types';
import type { Node } from 'react';
import 'react';
import icons from './icons/index';
export type IconColor =
  | 'default'
  | 'subtle'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'recommendation'
  | 'inverse'
  | 'shopping'
  | 'brandPrimary'
  | 'light'
  | 'dark';
type Props = {
  /**
   * Label for screen readers to announce Icon.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/icon#Accessibility) for details on proper usage.
   */
  accessibilityLabel: string;
  /**
   * These are all the colors available to apply to the Icon. However, the literal options ("blue" , "darkGray" , "eggplant" , "gray" , "green" , "lightGray" , "maroon" , "midnight" , "navy" , "olive" , "orange" , "orchid" , "pine" , "purple" , "red" , "watermelon" and "white") will be deprecated soon. Avoid using them in any new implementations.
   *
   * See the [color variant](https://gestalt.pinterest.systems/web/icon#Colors) to learn more.
   */
  color?: IconColor;
  /**
   * SVG icon from the Gestalt icon library to use within Icon..
   *
   * See the [iconography and SVG](https://gestalt.pinterest.systems/foundations/iconography/library) guidelines to explore the Gestalt icon library.
   */
  icon?: $Keys<typeof icons>;
  /**
   * Defines a new icon different from the built-in Gestalt icons.
   *
   * See the [custom icon](https://gestalt.pinterest.systems/web/icon#Custom-icon) variant to learn more.
   */
  dangerouslySetSvgPath?: {
    __path: string;
  };
  /**
   * Properly positions Icon relative to an inline element, such as Text using the inline property.
   */
  inline?: boolean;
  /**
   * Use a number for pixel sizes or a string for percentage based sizes.
   *
   * See the [size](https://gestalt.pinterest.systems/web/icon#Size) variant to learn more.
   */
  size?: number | string;
};
/**
 * [Icons](https://gestalt.pinterest.systems/web/icon) are the symbolic representation of an action or information, providing visual context and improving usability.
 *
 * See the [Iconography and SVG guidelines](https://gestalt.pinterest.systems/foundations/iconography/library) to explore the full icon library.
 *
 * ![Icon light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Icon-list.spec.mjs-snapshots/Icon-list-chromium-darwin.png)
 * ![Icon dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Icon-list-dark.spec.mjs-snapshots/Icon-list-dark-chromium-darwin.png)
 *
 */
declare function Icon({
  accessibilityLabel,
  color,
  dangerouslySetSvgPath,
  icon,
  inline,
  size,
}: Props): Node;
declare namespace Icon {
  var icons: readonly $Keys<
    Readonly<{
      '3D': any;
      '3D-move': any;
      ad: any;
      'ad-group': any;
      add: any;
      'add-circle': any;
      'add-layout': any;
      'add-pin': any;
      'add-section': any;
      'ads-stats': any;
      'ads-overview': any;
      alert: any;
      'align-bottom-center': any;
      'align-bottom-left': any;
      'align-bottom-right': any;
      'align-bottom': any;
      'align-middle': any;
      'align-top-center': any;
      'align-top-left': any;
      'align-top-right': any;
      'align-top': any;
      'android-share': any;
      'angled-pin': any;
      apple: any;
      apps: any;
      'arrow-back': any;
      'arrow-circle-back': any;
      'arrow-circle-down': any;
      'arrow-circle-forward': any;
      'arrow-circle-up': any;
      'arrow-down': any;
      'arrow-end': any;
      'arrow-forward': any;
      'arrow-left-curved': any;
      'arrow-start': any;
      'arrow-up': any;
      'arrow-up-right': any;
      board: any;
      bell: any;
      calendar: any;
      'calendar-check': any;
      camera: any;
      'camera-roll': any;
      cancel: any;
      'canonical-pin': any;
      captions: any;
      'color-picker': any;
      check: any;
      'check-circle': any;
      'circle-outline': any;
      clear: any;
      clock: any;
      code: any;
      cog: any;
      compass: any;
      compose: any;
      'copy-to-clipboard': any;
      crop: any;
      dash: any;
      desktop: any;
      'conversion-tag': any;
      'credit-card': any;
      'directional-arrow-left': any;
      'directional-arrow-right': any;
      download: any;
      'drag-drop': any;
      duplicate: any;
      edit: any;
      ellipsis: any;
      'ellipsis-circle-outline': any;
      envelope: any;
      eye: any;
      'eye-hide': any;
      facebook: any;
      'face-happy': any;
      'face-neutral': any;
      'face-sad': any;
      'face-smiley': any;
      'file-unknown': any;
      'fill-opaque': any;
      'fill-transparent': any;
      filter: any;
      flag: any;
      flame: any;
      flash: any;
      flashlight: any;
      flipHorizontal: any;
      flipVertical: any;
      folder: any;
      gif: any;
      globe: any;
      'globe-checked': any;
      gmail: any;
      'google-plus': any;
      'graph-bar': any;
      handle: any;
      'hand-pointing': any;
      heart: any;
      'heart-outline': any;
      'heart-broken': any;
      history: any;
      home: any;
      'idea-pin': any;
      'image-portrait': any;
      impressum: any;
      'insights-audience': any;
      'insights-conversions': any;
      instagram: any;
      invoice: any;
      'info-circle': any;
      key: any;
      knoop: any;
      lightbulb: any;
      'lightning-bolt-circle': any;
      link: any;
      live: any;
      location: any;
      lock: any;
      'logo-large': any;
      'logo-small': any;
      logout: any;
      'manage-access': any;
      'magic-pen': any;
      'margins-large': any;
      'margins-medium': any;
      'margins-small': any;
      maximize: any;
      megaphone: any;
      menu: any;
      minimize: any;
      mobile: any;
      move: any;
      mute: any;
      'move-pin': any;
      'music-off': any;
      'music-on': any;
      'overlay-text': any;
      overview: any;
      pause: any;
      people: any;
      person: any;
      'person-add': any;
      phone: any;
      pin: any;
      pincode: any;
      'pin-hide': any;
      pinterest: any;
      play: any;
      protect: any;
      refresh: any;
      'question-mark': any;
      remove: any;
      'reorder-images': any;
      replace: any;
      report: any;
      rotate: any;
      'save-outline': any;
      saved: any;
      scale: any;
      search: any;
      security: any;
      'shopping-bag': any;
      smiley: any;
      'smiley-outline': any;
      send: any;
      share: any;
      sound: any;
      'sort-ascending': any;
      'sort-descending': any;
      sparkle: any;
      speech: any;
      'speech-ellipsis': any;
      star: any;
      'star-half': any;
      'switch-account': any;
      tag: any;
      terms: any;
      'text-align-left': any;
      'text-align-center': any;
      'text-align-right': any;
      'text-all-caps': any;
      'text-extra-small': any;
      'text-large': any;
      'text-line-height': any;
      'text-medium': any;
      'text-sentence-case': any;
      'text-size': any;
      'text-small': any;
      'text-spacing': any;
      'thumbs-down': any;
      'thumbs-up': any;
      'trash-can': any;
      trending: any;
      twitter: any;
      'video-advance-10-seconds': any;
      'video-camera': any;
      'video-rewind-10-seconds': any;
      'view-type-default': any;
      'view-type-dense': any;
      'view-type-list': any;
      visit: any;
      'whats-app': any;
      'wifi-no': any;
      'workflow-status-all': any;
      'workflow-status-canceled': any;
      'workflow-status-halted': any;
      'workflow-status-in-progress': any;
      'workflow-status-ok': any;
      'workflow-status-problem': any;
      'workflow-status-queued': any;
      'workflow-status-unstarted': any;
      'workflow-status-warning': any;
    }>
  >[];
  var displayName: string;
}
export default Icon;
