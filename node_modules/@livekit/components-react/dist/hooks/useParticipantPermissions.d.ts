import type { Participant } from 'livekit-client';
/**
 * The `useParticipantPermissions` hook returns the permissions of a given participant.
 *
 * @example
 * ```tsx
 * const permissions = useParticipantPermissions({ participant });
 * ```
 * @public
 */
export interface UseParticipantPermissionsOptions {
    participant?: Participant;
}
/** @public */
export declare function useParticipantPermissions(options?: UseParticipantPermissionsOptions): import("livekit-client/dist/src/proto/livekit_models_pb").ParticipantPermission | undefined;
//# sourceMappingURL=useParticipantPermissions.d.ts.map