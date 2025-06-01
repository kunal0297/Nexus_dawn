import type { Participant, RemoteParticipant, Room, TrackPublication } from 'livekit-client';
import { ParticipantEvent, RoomEvent } from 'livekit-client';
import { Observable } from 'rxjs';
import type { ParticipantEventCallbacks } from 'livekit-client/dist/src/room/participant/Participant';
import type { TrackIdentifier } from '../types';
import { TrackReferenceOrPlaceholder } from '../track-reference';
export declare function observeParticipantEvents<T extends Participant>(participant: T, ...events: ParticipantEvent[]): Observable<T>;
export interface ParticipantMedia<T extends Participant = Participant> {
    isCameraEnabled: boolean;
    isMicrophoneEnabled: boolean;
    isScreenShareEnabled: boolean;
    microphoneTrack?: TrackPublication;
    cameraTrack?: TrackPublication;
    participant: T;
}
export declare function observeParticipantMedia<T extends Participant>(participant: T): Observable<ParticipantMedia<T>>;
export declare function createTrackObserver(participant: Participant, options: TrackIdentifier): Observable<{
    publication: TrackPublication | undefined;
}>;
export declare function participantInfoObserver(participant: Participant): Observable<{
    name: string | undefined;
    identity: string;
    metadata: string | undefined;
} | {
    name: string | undefined;
    identity: string;
    metadata: string | undefined;
}>;
export declare function createConnectionQualityObserver(participant: Participant): Observable<import("livekit-client").ConnectionQuality>;
export declare function participantEventSelector<T extends ParticipantEvent>(participant: Participant, event: T): Observable<Parameters<ParticipantEventCallbacks[Extract<T, keyof ParticipantEventCallbacks>]>>;
export declare function mutedObserver(trackRef: TrackReferenceOrPlaceholder): Observable<boolean>;
export declare function createIsSpeakingObserver(participant: Participant): Observable<boolean>;
type ConnectedParticipantsObserverOptions = {
    additionalRoomEvents?: RoomEvent[];
};
export declare function connectedParticipantsObserver(room: Room, options?: ConnectedParticipantsObserverOptions): Observable<RemoteParticipant[]>;
export type ConnectedParticipantObserverOptions = {
    additionalEvents?: ParticipantEvent[];
};
export declare function connectedParticipantObserver(room: Room, identity: string, options?: ConnectedParticipantObserverOptions): Observable<RemoteParticipant | undefined>;
export declare function participantPermissionObserver(participant: Participant): Observable<import("livekit-client/dist/src/proto/livekit_models_pb").ParticipantPermission | undefined>;
export {};
//# sourceMappingURL=participant.d.ts.map