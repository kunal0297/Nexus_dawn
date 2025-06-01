import type { TrackIdentifier } from '@livekit/components-core';
import * as React from 'react';
import type { UseMediaTrackOptions } from './useMediaTrack';
/**
 * @internal
 */
export declare function useMediaTrackBySourceOrName(observerOptions: TrackIdentifier, options?: UseMediaTrackOptions): {
    publication: import("livekit-client").TrackPublication | undefined;
    isMuted: boolean | undefined;
    isSubscribed: boolean | undefined;
    track: import("livekit-client").Track | undefined;
    elementProps: React.HTMLAttributes<HTMLElement>;
};
//# sourceMappingURL=useMediaTrackBySourceOrName.d.ts.map