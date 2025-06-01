import type { VideoSource, AudioSource } from '@livekit/components-core';
import type { Participant } from 'livekit-client';
import type * as React from 'react';
/** @public */
export interface UseMediaTrackOptions {
    element?: React.RefObject<HTMLMediaElement>;
    props?: React.HTMLAttributes<HTMLVideoElement | HTMLAudioElement>;
}
/**
 * @public
 * @deprecated use `useTrack` instead
 *  */
export declare function useMediaTrack(source: VideoSource | AudioSource, participant?: Participant, options?: UseMediaTrackOptions): {
    publication: import("livekit-client").TrackPublication | undefined;
    isMuted: boolean | undefined;
    isSubscribed: boolean | undefined;
    track: import("livekit-client").Track | undefined;
    elementProps: React.HTMLAttributes<HTMLElement>;
};
//# sourceMappingURL=useMediaTrack.d.ts.map