import type { ChatOptions, ReceivedChatMessage } from '@livekit/components-core';
/**
 * The `useChat` hook provides chat functionality for a LiveKit room.
 * It returns a simple `send` function to send chat messages and an array of `chatMessages` to hold received messages.
 * It also returns a `update` function that allows you to implement message-edit functionality.
 * @remarks
 * It is possible to pass configurations for custom message encoding and decoding and non-default topics on which to send the messages.
 * @public
 */
export declare function useChat(options?: ChatOptions): {
    send: ((message: string) => Promise<import("@livekit/components-core").ChatMessage>) | undefined;
    update: ((message: string, messageId: string) => Promise<import("@livekit/components-core").ChatMessage>) | undefined;
    chatMessages: ReceivedChatMessage[];
    isSending: boolean;
};
//# sourceMappingURL=useChat.d.ts.map