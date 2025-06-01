import type { Participant, Room } from 'livekit-client';
import { BehaviorSubject } from 'rxjs';
/** @public */
export interface ChatMessage {
    timestamp: number;
    message: string;
}
/** @public */
export interface ReceivedChatMessage extends ChatMessage {
    from?: Participant;
}
/** @public */
export type MessageEncoder = (message: ChatMessage) => Uint8Array;
/** @public */
export type MessageDecoder = (message: Uint8Array) => ReceivedChatMessage;
/** @public */
export type ChatOptions = {
    messageEncoder?: (message: ChatMessage) => Uint8Array;
    messageDecoder?: (message: Uint8Array) => ReceivedChatMessage;
    channelTopic?: string;
};
export declare function setupChat(room: Room, options?: ChatOptions): {
    messageObservable: import("rxjs").Observable<ReceivedChatMessage[]>;
    isSendingObservable: BehaviorSubject<boolean>;
    send: (message: string) => Promise<void>;
};
//# sourceMappingURL=chat.d.ts.map