/// <reference types="react" />
import type { UseMediaTrackOptions } from './useMediaTrack';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
/**
 * @public
 */
export declare function useTrackByName(trackRef?: TrackReferenceOrPlaceholder, options?: UseMediaTrackOptions): {
    publication: import("livekit-client").TrackPublication | undefined;
    isMuted: boolean | undefined;
    isSubscribed: boolean | undefined;
    track: import("livekit-client").Track | undefined;
    elementProps: import("react").HTMLAttributes<HTMLElement>;
};
//# sourceMappingURL=useTrackByName.d.ts.map