import { forwardRef } from 'react';
import InternalAvatar from './Avatar/InternalAvatar';
import CollaboratorsCount from './AvatarGroup/CollaboratorsCount';
import Box from './Box';

type Props = {
  /**
   * AvatarGroupCluster has different configurations for 2, 3, 4, and above 4 collaborators.
   */
  collaborators: ReadonlyArray<{
    color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    name: string;
    src?: string;
  }>;
  /**
   * AvaraGroupCluster is available in 2 fixed sizes. See the [sizes variant](https://gestalt.pinterest.systems/web/avatargroupcluster#Sizes) to learn more.
   */
  size?: 'sm' | 'md';
};

/**
 * [AvatarGroupCluster](https://gestalt.pinterest.systems/web/avatargroupcluster) is used to both display a group of user avatars.
 *
 * ![AvatarGroupCluster light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/AvatarGroupCluster.spec.ts-snapshots/AvatarGroupCluster-chromium-darwin.png)
 * ![AvatarGroupCluster dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/AvatarGroupCluster-dark.spec.ts-snapshots/AvatarGroupCluster-dark-chromium-darwin.png)
 */
const AvatarGroupClusterWithForwardRef = forwardRef<HTMLDivElement, Props>(
  function AvatarGroupCluster({ size = 'md', collaborators }: Props, ref) {
    const collaboratorsCount = collaborators.length;
    const isRtl = typeof document === 'undefined' ? false : document?.dir === 'rtl';
    const isPair = collaboratorsCount === 2;
    const displayCounter = collaboratorsCount > 4;
    const displayCounterIndex = isRtl ? 0 : 3;
    const dimensions = {
      sm: { sizeDimension: 32, dimensionPair: '24px', dimensionCluster: '20px' },
      md: {
        sizeDimension: isPair ? 48 : 40,
        dimensionPair: '32px',
        dimensionCluster: '24px',
      },
    } as const;

    const renderedCollaborators = displayCounter ? [...collaborators.slice(3)] : [...collaborators];

    if (isRtl) {
      renderedCollaborators.reverse();
    }

    const positions = {
      2: [
        { bottom: 0, left: 0 },
        { top: 0, right: 0 },
      ],
      3: [
        { bottom: 0, left: 0 },
        { top: 0, left: '50%', transform: 'translate(-50%, 0)' },
        { bottom: 0, right: 0 },
      ],
      4: [
        { bottom: 0, left: 0 },
        { top: 0, left: 0 },
        { top: 0, right: 0 },
        { bottom: 0, right: 0 },
      ],
    } as const;

    function getPositions() {
      if (collaboratorsCount === 2) {
        return positions[2];
      }
      if (collaboratorsCount === 3) {
        return positions[3];
      }
      return positions[4];
    }

    return (
      <Box padding={collaboratorsCount > 2 && size === 'md' ? 1 : undefined}>
        <Box
          ref={ref}
          dangerouslySetInlineStyle={{ __style: { isolation: 'isolate' } }}
          height={dimensions[size].sizeDimension}
          position="relative"
          role="presentation"
          width={dimensions[size].sizeDimension}
        >
          {renderedCollaborators.map((user, index) => (
            <div
              key={user.src}
              style={{
                zIndex: isRtl ? collaboratorsCount - 1 - index : undefined,
                border: '2px solid #FFFFFF',
                borderRadius: '99%',
                boxSizing: 'border-box',
                position: 'absolute',
                ...getPositions()[index],
                height: isPair ? dimensions[size].dimensionPair : dimensions[size].dimensionCluster,
                width: isPair ? dimensions[size].dimensionPair : dimensions[size].dimensionCluster,
              }}
            >
              {displayCounter && index === displayCounterIndex ? (
                <CollaboratorsCount
                  key={`avatargroupcluster-counter-${collaborators.length}`}
                  count={collaborators.length - 3}
                  pileCount={0}
                />
              ) : (
                <InternalAvatar color={user.color} name={user.name} size="fit" src={user.src} />
              )}
            </div>
          ))}
        </Box>
      </Box>
    );
  },
);

AvatarGroupClusterWithForwardRef.displayName = 'AvatarGroupCluster';

export default AvatarGroupClusterWithForwardRef;
