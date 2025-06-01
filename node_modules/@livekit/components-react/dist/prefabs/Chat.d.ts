import type { ChatOptions } from '@livekit/components-core';
import * as React from 'react';
import type { MessageFormatter } from '../components/ChatEntry';
/** @public */
export interface ChatProps extends React.HTMLAttributes<HTMLDivElement>, ChatOptions {
    messageFormatter?: MessageFormatter;
}
/**
 * The Chat component adds a basis chat functionality to the LiveKit room. The messages are distributed to all participants
 * in the room. Only users who are in the room at the time of dispatch will receive the message.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <Chat />
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function Chat({ messageFormatter, messageDecoder, messageEncoder, channelTopic, ...props }: ChatProps): React.JSX.Element;
//# sourceMappingURL=Chat.d.ts.map