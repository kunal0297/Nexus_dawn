import type { Participant, Track, TrackPublication } from 'livekit-client';
import * as React from 'react';
import type { TrackReference } from '@livekit/components-core';
/** @public */
export interface AudioTrackProps extends React.AudioHTMLAttributes<HTMLAudioElement> {
    /** The track reference of the track from which the audio is to be rendered. */
    trackRef?: TrackReference;
    /** @deprecated This property will be removed in a future version use `trackRef` instead. */
    source?: Track.Source;
    /** @deprecated This property will be removed in a future version use `trackRef` instead. */
    name?: string;
    /** @deprecated This property will be removed in a future version use `trackRef` instead. */
    participant?: Participant;
    /** @deprecated This property will be removed in a future version use `trackRef` instead. */
    publication?: TrackPublication;
    onSubscriptionStatusChanged?: (subscribed: boolean) => void;
    /** Sets the volume of the audio track. By default, the range is between `0.0` and `1.0`. */
    volume?: number;
    /**
     * Mutes the audio track if set to `true`.
     * @remarks
     * If set to `true`, the server will stop sending audio track data to the client.
     * @alpha
     */
    muted?: boolean;
}
/**
 * The AudioTrack component is responsible for rendering participant audio tracks.
 * This component must have access to the participant's context, or alternatively pass it a `Participant` as a property.
 *
 * @example
 * ```tsx
 *   <ParticipantTile>
 *     <AudioTrack trackRef={trackRef} />
 *   </ParticipantTile>
 * ```
 *
 * @see `ParticipantTile` component
 * @public
 */
export declare function AudioTrack({ trackRef, onSubscriptionStatusChanged, volume, source, name, publication, participant: p, ...props }: AudioTrackProps): React.JSX.Element;
//# sourceMappingURL=AudioTrack.d.ts.map