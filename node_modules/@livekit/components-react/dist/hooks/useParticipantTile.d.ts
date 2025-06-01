import type { ParticipantClickEvent, TrackReferenceOrPlaceholder } from '@livekit/components-core';
import type { TrackPublication, Participant } from 'livekit-client';
import { Track } from 'livekit-client';
import * as React from 'react';
/** @public */
export interface UseParticipantTileProps<T extends HTMLElement> extends React.HTMLAttributes<T> {
    /** The track reference to display. */
    trackRef?: TrackReferenceOrPlaceholder;
    disableSpeakingIndicator?: boolean;
    /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
    publication?: TrackPublication;
    onParticipantClick?: (event: ParticipantClickEvent) => void;
    htmlProps: React.HTMLAttributes<T>;
    /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
    source?: Track.Source;
    /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
    participant?: Participant;
}
/**
 * The `useParticipantTile` hook is used to implement the `ParticipantTile` and returns the props needed to render the tile.
 * @remarks
 * The returned props include many data attributes that are useful for CSS styling purposes because they
 * indicate the state of the participant and the track.
 * For example: `data-lk-audio-muted`, `data-lk-video-muted`, `data-lk-speaking`, `data-lk-local-participant`, `data-lk-source`, `data-lk-facing-mode`.
 * @public
 */
export declare function useParticipantTile<T extends HTMLElement>({ trackRef, participant, source, publication, onParticipantClick, disableSpeakingIndicator, htmlProps, }: UseParticipantTileProps<T>): {
    elementProps: React.HTMLAttributes<T>;
};
//# sourceMappingURL=useParticipantTile.d.ts.map