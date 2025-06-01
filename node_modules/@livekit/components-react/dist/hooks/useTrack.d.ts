import type { TrackIdentifier } from '@livekit/components-core';
import type * as React from 'react';
/** @public */
export interface UseTrackOptions {
    element?: React.RefObject<HTMLMediaElement>;
    props?: React.HTMLAttributes<HTMLVideoElement | HTMLAudioElement>;
}
/** @public */
export declare function useTrack(trackRef: TrackIdentifier, options?: UseTrackOptions): {
    publication: import("livekit-client").TrackPublication | undefined;
    isMuted: boolean | undefined;
    isSubscribed: boolean | undefined;
    track: import("livekit-client").Track | undefined;
    elementProps: React.HTMLAttributes<HTMLElement>;
};
//# sourceMappingURL=useTrack.d.ts.map