import type { Room } from 'livekit-client';
import * as React from 'react';
/** @public */
export interface ConnectionStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The room from which the connection status should be displayed.
     */
    room?: Room;
}
/**
 * The `ConnectionState` component displays the connection status of the room as strings
 * (`"connected" | "connecting" | "disconnected" | "reconnecting"`).
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <ConnectionState />
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function ConnectionState({ room, ...props }: ConnectionStatusProps): React.JSX.Element;
//# sourceMappingURL=ConnectionState.d.ts.map