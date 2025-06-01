import type { Participant, Track } from 'livekit-client';
import * as React from 'react';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
/** @public */
export interface FocusToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    trackRef?: TrackReferenceOrPlaceholder;
    /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
    trackSource?: Track.Source;
    /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
    participant?: Participant;
}
/**
 * The `FocusToggle` puts the `ParticipantTile` in focus or removes it from focus.
 * @remarks
 * This component needs to live inside `LayoutContext` to work properly.
 *
 * @example
 * ```tsx
 * <ParticipantTile>
 *   <FocusToggle />
 * </ParticipantTile>
 * ```
 * @public
 */
export declare function FocusToggle({ trackRef, trackSource, participant, ...props }: FocusToggleProps): React.JSX.Element;
//# sourceMappingURL=FocusToggle.d.ts.map