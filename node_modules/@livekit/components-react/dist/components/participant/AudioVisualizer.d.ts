import type { Participant } from 'livekit-client';
import * as React from 'react';
import { type TrackReference } from '@livekit/components-core';
/** @public */
export interface AudioVisualizerProps extends React.HTMLAttributes<SVGElement> {
    /** @deprecated this property will be removed in a future version, use `trackRef` instead */
    participant?: Participant;
    trackRef?: TrackReference;
}
/**
 * The AudioVisualizer component is used to visualize the audio volume of a given audio track.
 * @remarks
 * Requires a `TrackReferenceOrPlaceholder` to be provided either as a property or via the `TrackRefContext`.
 * @example
 * ```tsx
 * <AudioVisualizer />
 * ```
 * @public
 */
export declare function AudioVisualizer({ participant, trackRef, ...props }: AudioVisualizerProps): React.JSX.Element;
//# sourceMappingURL=AudioVisualizer.d.ts.map