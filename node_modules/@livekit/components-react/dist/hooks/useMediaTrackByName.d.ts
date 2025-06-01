/// <reference types="react" />
import type { Participant } from 'livekit-client';
import type { UseMediaTrackOptions } from './useMediaTrack';
/**
 * @public
 * @deprecated This function will be removed in a future version, use `useTrackByName` instead.
 */
export declare function useMediaTrackByName(name: string, participant?: Participant, options?: UseMediaTrackOptions): {
    publication: import("livekit-client").TrackPublication | undefined;
    isMuted: boolean | undefined;
    isSubscribed: boolean | undefined;
    track: import("livekit-client").Track | undefined;
    elementProps: import("react").HTMLAttributes<HTMLElement>;
};
//# sourceMappingURL=useMediaTrackByName.d.ts.map