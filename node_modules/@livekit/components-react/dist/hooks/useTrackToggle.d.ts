import type { ToggleSource } from '@livekit/components-core';
import * as React from 'react';
import type { TrackToggleProps } from '../components';
/** @public */
export interface UseTrackToggleProps<T extends ToggleSource> extends Omit<TrackToggleProps<T>, 'showIcon'> {
}
/**
 * The `useTrackToggle` hook is used to implement the `TrackToggle` component and returns state
 * and functionality of the given track.
 *
 * @example
 * ```tsx
 * const { buttonProps, enabled } = useTrackToggle(trackRef);
 * return <button {...buttonProps}>{enabled ? 'disable' : 'enable'}</button>;
 * ```
 * @public
 */
export declare function useTrackToggle<T extends ToggleSource>({ source, onChange, initialState, captureOptions, ...rest }: UseTrackToggleProps<T>): {
    toggle: (forceState?: boolean | undefined, captureOptions?: import("@livekit/components-core").CaptureOptionsBySource<T> | undefined) => Promise<void>;
    enabled: boolean;
    pending: boolean;
    track: import("livekit-client").LocalTrackPublication | undefined;
    buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
};
//# sourceMappingURL=useTrackToggle.d.ts.map