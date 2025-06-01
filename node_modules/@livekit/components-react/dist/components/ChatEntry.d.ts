import type { ReceivedChatMessage } from '@livekit/components-core';
import * as React from 'react';
/** @public */
export type MessageFormatter = (message: string) => React.ReactNode;
/**
 * ChatEntry composes the HTML div element under the hood, so you can pass all its props.
 * These are the props specific to the ChatEntry component:
 * @public
 */
export interface ChatEntryProps extends React.HTMLAttributes<HTMLLIElement> {
    /** The chat massage object to display. */
    entry: ReceivedChatMessage;
    /** Hide sender name. Useful when displaying multiple consecutive chat messages from the same person. */
    hideName?: boolean;
    /** Hide message timestamp. */
    hideTimestamp?: boolean;
    /** An optional formatter for the message body. */
    messageFormatter?: MessageFormatter;
}
/**
 * The `ChatEntry` component holds and displays one chat message.
 *
 * @example
 * ```tsx
 * <Chat>
 *   <ChatEntry />
 * </Chat>
 * ```
 * @see `Chat`
 * @public
 */
export declare function ChatEntry({ entry, hideName, hideTimestamp, messageFormatter, ...props }: ChatEntryProps): React.JSX.Element;
/** @public */
export declare function formatChatMessageLinks(message: string): React.ReactNode;
//# sourceMappingURL=ChatEntry.d.ts.map