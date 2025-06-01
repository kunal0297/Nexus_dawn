import * as React from 'react';
/** @public */
export interface DisconnectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    stopTracks?: boolean;
}
/**
 * The `DisconnectButton` is a basic html button with the added ability to disconnect from a LiveKit room.
 * Normally this is the big red button that allows end users to leave the video or audio call.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <DisconnectButton>Leave room</DisconnectButton>
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function DisconnectButton(props: DisconnectButtonProps): React.JSX.Element;
//# sourceMappingURL=DisconnectButton.d.ts.map