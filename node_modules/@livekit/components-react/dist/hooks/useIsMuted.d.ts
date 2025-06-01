import { type TrackReferenceOrPlaceholder } from '@livekit/components-core';
import type { Participant, Track } from 'livekit-client';
/** @public */
export interface UseIsMutedOptions {
    participant?: Participant;
}
/**
 * The `useIsMuted` hook is used to implement the `TrackMutedIndicator` or your custom implementation of it.
 * It returns a `boolean` that indicates if the track is muted or not.
 *
 * @example
 * ```tsx
 * const isMuted = useIsMuted(track);
 * ```
 * @public
 */
export declare function useIsMuted(trackRef: TrackReferenceOrPlaceholder): boolean;
/** @public @deprecated This overload will be removed in a future version, pass in trackRef instead. */
export declare function useIsMuted(source: Track.Source, options?: UseIsMutedOptions): boolean;
//# sourceMappingURL=useIsMuted.d.ts.map