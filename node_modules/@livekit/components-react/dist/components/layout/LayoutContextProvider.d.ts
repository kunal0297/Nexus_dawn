import type { PinState, WidgetState } from '@livekit/components-core';
import * as React from 'react';
import type { LayoutContextType } from '../../context';
/** @alpha */
export interface LayoutContextProviderProps {
    value?: LayoutContextType;
    onPinChange?: (state: PinState) => void;
    onWidgetChange?: (state: WidgetState) => void;
}
/** @alpha */
export declare function LayoutContextProvider({ value, onPinChange, onWidgetChange, children, }: React.PropsWithChildren<LayoutContextProviderProps>): React.JSX.Element;
//# sourceMappingURL=LayoutContextProvider.d.ts.map