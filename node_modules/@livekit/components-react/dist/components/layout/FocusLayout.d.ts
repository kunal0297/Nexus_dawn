import type { Participant } from 'livekit-client';
import * as React from 'react';
import type { TrackReference, TrackReferenceOrPlaceholder } from '@livekit/components-core';
import type { ParticipantClickEvent } from '@livekit/components-core';
/** @public */
export interface FocusLayoutContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** @deprecated This property has no effect and will be removed in a future version. */
    focusTrack?: TrackReference;
    /** @deprecated This property has no effect and will be removed in a future version. */
    participants?: Array<Participant>;
}
/**
 * The `FocusLayoutContainer` is a layout component that expects two children:
 * A small side component: In a video conference, this is usually a carousel of participants
 * who are not in focus. And a larger main component to display the focused participant.
 * For example, with the `FocusLayout` component.
 *  @public
 */
export declare function FocusLayoutContainer(props: FocusLayoutContainerProps): React.JSX.Element;
/** @public */
export interface FocusLayoutProps extends React.HTMLAttributes<HTMLElement> {
    /** The track to display in the focus layout. */
    trackRef?: TrackReferenceOrPlaceholder;
    /** @deprecated This property will be removed in a future version use `trackRef` instead. */
    track?: TrackReferenceOrPlaceholder;
    onParticipantClick?: (evt: ParticipantClickEvent) => void;
}
/**
 * The `FocusLayout` component is just a light wrapper around the `ParticipantTile` to display a single participant.
 * @public
 */
export declare function FocusLayout({ trackRef, track, ...htmlProps }: FocusLayoutProps): React.JSX.Element;
//# sourceMappingURL=FocusLayout.d.ts.map