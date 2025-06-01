import * as React from 'react';
import type { Participant, Track } from 'livekit-client';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
/** @public */
export interface TrackMutedIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
    /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
    source?: Track.Source;
    /** @deprecated This parameter will be removed in a future version use `trackRef` instead. */
    participant?: Participant;
    trackRef?: TrackReferenceOrPlaceholder;
    show?: 'always' | 'muted' | 'unmuted';
}
/**
 * The `TrackMutedIndicator` shows whether the participant's camera or microphone is muted or not.
 * By default, a muted/unmuted icon is displayed for a camera, microphone, and screen sharing track.
 *
 * @example
 * ```tsx
 * <TrackMutedIndicator source={Track.Source.Camera} />
 * <TrackMutedIndicator source={Track.Source.Microphone} />
 * ```
 * @public
 */
export declare function TrackMutedIndicator({ source, participant, trackRef, show, ...props }: TrackMutedIndicatorProps): React.JSX.Element | null;
//# sourceMappingURL=TrackMutedIndicator.d.ts.map