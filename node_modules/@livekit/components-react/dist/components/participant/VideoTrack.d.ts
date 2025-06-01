import { type Participant, type Track, type TrackPublication } from 'livekit-client';
import * as React from 'react';
import type { ParticipantClickEvent, TrackReference } from '@livekit/components-core';
/** @public */
export interface VideoTrackProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    /** The track reference of the track to render. */
    trackRef?: TrackReference;
    /** @deprecated This property will be removed in a future version use `trackRef` instead. */
    source?: Track.Source;
    /** @deprecated This property will be removed in a future version use `trackRef` instead. */
    name?: string;
    /** @deprecated This property will be removed in a future version use `trackRef` instead. */
    participant?: Participant;
    /** @deprecated This property will be removed in a future version use `trackRef` instead. */
    publication?: TrackPublication;
    onTrackClick?: (evt: ParticipantClickEvent) => void;
    onSubscriptionStatusChanged?: (subscribed: boolean) => void;
    manageSubscription?: boolean;
}
/**
 * The `VideoTrack` component is responsible for rendering participant video tracks like `camera` and `screen_share`.
 * This component must have access to the participant's context, or alternatively pass it a `Participant` as a property.
 *
 * @example
 * ```tsx
 * <VideoTrack trackRef={trackRef} />
 * ```
 * @see {@link @livekit/components-react#ParticipantTile | ParticipantTile}
 * @public
 */
export declare function VideoTrack({ onTrackClick, onClick, onSubscriptionStatusChanged, trackRef, name, publication, source, participant: p, manageSubscription, ...props }: VideoTrackProps): React.JSX.Element;
//# sourceMappingURL=VideoTrack.d.ts.map