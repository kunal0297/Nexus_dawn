import * as React from 'react';
import type { Participant, TrackPublication } from 'livekit-client';
import { Track } from 'livekit-client';
import type { ParticipantClickEvent, TrackReferenceOrPlaceholder } from '@livekit/components-core';
/**
 * The `ParticipantContextIfNeeded` component only creates a `ParticipantContext`
 * if there is no `ParticipantContext` already.
 * @example
 * ```tsx
 * <ParticipantContextIfNeeded participant={trackReference.participant}>
 *  ...
 * </ParticipantContextIfNeeded>
 * ```
 * @public
 */
export declare function ParticipantContextIfNeeded(props: React.PropsWithChildren<{
    participant?: Participant;
}>): React.JSX.Element;
/** @public */
export interface ParticipantTileProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The track reference to display. */
    trackRef?: TrackReferenceOrPlaceholder;
    disableSpeakingIndicator?: boolean;
    /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
    participant?: Participant;
    /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
    source?: Track.Source;
    /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
    publication?: TrackPublication;
    onParticipantClick?: (event: ParticipantClickEvent) => void;
}
/**
 * The `ParticipantTile` component is the base utility wrapper for displaying a visual representation of a participant.
 * This component can be used as a child of the `TrackLoop` component or by passing a track reference as property.
 *
 * @example Using the `ParticipantTile` component with a track reference:
 * ```tsx
 * <ParticipantTile trackRef={trackRef} />
 * ```
 * @example Using the `ParticipantTile` component as a child of the `TrackLoop` component:
 * ```tsx
 * <TrackLoop>
 *  <ParticipantTile />
 * </TrackLoop>
 * ```
 * @public
 */
export declare function ParticipantTile({ trackRef, participant, children, source, onParticipantClick, publication, disableSpeakingIndicator, ...htmlProps }: ParticipantTileProps): React.JSX.Element;
//# sourceMappingURL=ParticipantTile.d.ts.map