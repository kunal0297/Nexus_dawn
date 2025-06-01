import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import * as React from 'react';
/**
 * This context provides a `TrackReferenceOrPlaceholder` to all child components.
 * @public
 */
export declare const TrackRefContext: React.Context<TrackReferenceOrPlaceholder | undefined>;
/**
 * @public
 * @deprecated `TrackContext` has been renamed to `TrackRefContext`, use this as a drop in replacement.
 */
export declare const TrackContext: React.Context<TrackReferenceOrPlaceholder | undefined>;
/**
 * Ensures that a track reference is provided via context.
 * If not inside a `TrackRefContext`, an error is thrown.
 * @public
 * @deprecated `useTrackContext` has been renamed to `useTrackRefContext`, use this as a drop in replacement.
 */
export declare function useTrackContext(): TrackReferenceOrPlaceholder;
/**
 * Ensures that a track reference is provided via context.
 * If not inside a `TrackRefContext`, an error is thrown.
 * @public
 */
export declare function useTrackRefContext(): TrackReferenceOrPlaceholder;
/**
 * Returns a track reference from the `TrackContext` if it exists, otherwise `undefined`.
 * @public
 * @deprecated `useMaybeTrackContext` has been renamed to `useMaybeTrackRefContext`, use this as a drop in replacement.
 */
export declare function useMaybeTrackContext(): TrackReferenceOrPlaceholder | undefined;
/**
 * Returns a track reference from the `TrackRefContext` if it exists, otherwise `undefined`.
 * @public
 */
export declare function useMaybeTrackRefContext(): TrackReferenceOrPlaceholder | undefined;
/**
 * Ensures that a track reference is provided, either via context or explicitly as a parameter.
 * If not inside a `TrackContext` and no track reference is provided, an error is thrown.
 * @public
 * @deprecated `useEnsureTrackReference` has been renamed to `useEnsureTrackRef`, use this as a drop in replacement.
 */
export declare function useEnsureTrackReference(track?: TrackReferenceOrPlaceholder): TrackReferenceOrPlaceholder;
/**
 * Ensures that a track reference is provided, either via context or explicitly as a parameter.
 * If not inside a `TrackRefContext` and no track reference is provided, an error is thrown.
 * @public
 */
export declare function useEnsureTrackRef(trackRef?: TrackReferenceOrPlaceholder): TrackReferenceOrPlaceholder;
//# sourceMappingURL=track-reference-context.d.ts.map