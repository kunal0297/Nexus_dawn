import type { ParticipantEvent, RemoteParticipant } from 'livekit-client';
/** @public */
export interface UseRemoteParticipantOptions {
    /**
     * To optimize performance, you can use the `updateOnlyOn` property to decide on what `ParticipantEvents` the hook updates.
     * By default it updates on all relevant ParticipantEvents to keep the returned participant up to date.
     */
    updateOnlyOn?: ParticipantEvent[];
}
/**
 * The `useRemoteParticipant` hook returns the RemoteParticipant with the given `identity`.
 * @remarks
 * To optimize performance, you can use the `updateOnlyOn` property to decide on what `ParticipantEvents` the hook updates.
 *
 * @example
 * ```tsx
 * const participant = useRemoteParticipant('Russ');
 * ```
 * @public
 */
export declare function useRemoteParticipant(identity: string, options?: UseRemoteParticipantOptions): RemoteParticipant | undefined;
//# sourceMappingURL=useRemoteParticipant.d.ts.map