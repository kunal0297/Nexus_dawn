import type { LocalParticipant, Participant, Room } from 'livekit-client';
import { DataPacket_Kind } from 'livekit-client';
import { Observable } from 'rxjs';
export declare const DataTopic: {
    readonly CHAT: "lk-chat-topic";
};
export type DataSendOptions = {
    kind?: DataPacket_Kind;
    destination?: string[];
};
/** Publish data from the LocalParticipant. */
export declare function sendMessage(localParticipant: LocalParticipant, payload: Uint8Array, topic?: string, options?: DataSendOptions): Promise<void>;
export interface BaseDataMessage<T extends string | undefined> {
    topic?: T;
    payload: Uint8Array;
}
export interface ReceivedDataMessage<T extends string | undefined = string> extends BaseDataMessage<T> {
    from?: Participant;
}
export declare function setupDataMessageHandler<T extends string>(room: Room, topic?: T, onMessage?: (msg: ReceivedDataMessage<T>) => void): {
    messageObservable: Observable<{
        payload: Uint8Array;
        topic: T;
        from: import("livekit-client").RemoteParticipant | undefined;
    }>;
    isSendingObservable: Observable<boolean>;
    send: (payload: Uint8Array, options?: DataSendOptions) => Promise<void>;
};
//# sourceMappingURL=dataChannel.d.ts.map