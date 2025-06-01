import * as React from 'react';
/** @public */
export interface RoomNameProps extends React.HTMLAttributes<HTMLSpanElement> {
    childrenPosition?: 'before' | 'after';
}
/**
 * The `RoomName` component renders the name of the connected LiveKit room inside a span tag.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <RoomName />
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function RoomName({ childrenPosition, children, ...htmlAttributes }: RoomNameProps): React.JSX.Element;
//# sourceMappingURL=RoomName.d.ts.map