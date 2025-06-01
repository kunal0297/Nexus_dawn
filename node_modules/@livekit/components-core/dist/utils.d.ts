import type { Participant, Track, TrackPublication } from 'livekit-client';
import type { PinState } from './types';
import type { TrackReference } from './track-reference';
export declare function isLocal(p: Participant): boolean;
export declare function isRemote(p: Participant): boolean;
export declare const attachIfSubscribed: (publication: TrackPublication | undefined, element: HTMLMediaElement | null | undefined) => void;
/**
 * Check if the participant track source is pinned.
 * @deprecated Use {@link isParticipantTrackReferencePinned} instead.
 */
export declare function isParticipantSourcePinned(participant: Participant, source: Track.Source, pinState: PinState | undefined): boolean;
/**
 * Check if the participant track reference is pinned.
 */
export declare function isParticipantTrackReferencePinned(trackRef: TrackReference, pinState: PinState | undefined): boolean;
/**
 * Calculates the scrollbar width by creating two HTML elements
 * and messaging the difference.
 * @internal
 */
export declare function getScrollBarWidth(): number;
//# sourceMappingURL=utils.d.ts.map