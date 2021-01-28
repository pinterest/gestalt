// @flow strict

export default function experiments() {
  const changed = danger.git.modified_files.some((file) => file.match(/masonry/i));
  if (changed) {
    const title = ':microscope: Experimental data needed';
    const message =
      'Changes were made to critical components. Do you have experimental data to back up your changes?';
    warn(`${title} - <i>${message}</i>`);
  }
}
