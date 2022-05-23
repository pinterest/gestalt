/**
 * Alerts
 * Identify the <AvatarPair /> uses and alert the user to the manual fix
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/generics-codemod/deprecatedAvatarPair.js relative/path/to/your/code
import { initialize, getComponentIdentifierByName, getGestaltImport } from './utils';

export default function deprecatedAvatarPair(file, api) {
  const startup = initialize(api, file);

  const AvatarPairCollection = getComponentIdentifierByName(
    startup.j,
    getGestaltImport(startup),
    'AvatarPair',
  );

  if (AvatarPairCollection.length > 0) {
    const currentAvatarPairPath =
      'app/www-unified/components/messages/FullHeightInbox/Conversations/AvatarPair/AvatarPair';

    throw new Error(
      `Remove manually the "AvatarPair" import from "gestalt" and import this component from "${currentAvatarPairPath}". Location: ${file.path} @line: ${node.loc.start.line}`,
    );
  }

  return null;
}
