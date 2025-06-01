import * as React from 'react';
/** @public */
export interface ClearPinButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}
/**
 * The `ClearPinButton` is a basic html button with the added ability to signal
 * the `LayoutContext` that it should display the grid view again.
 * @remarks
 * This component works only inside a `LayoutContext`.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <ClearPinButton>Back to grid view</ClearPinButton>
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function ClearPinButton(props: ClearPinButtonProps): React.JSX.Element;
//# sourceMappingURL=ClearPinButton.d.ts.map