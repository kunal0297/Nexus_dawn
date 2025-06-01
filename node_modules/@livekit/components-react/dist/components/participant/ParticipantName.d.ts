import * as React from 'react';
import type { UseParticipantInfoOptions } from '../../hooks';
/** @public */
export interface ParticipantNameProps extends React.HTMLAttributes<HTMLSpanElement>, UseParticipantInfoOptions {
}
/**
 * The `ParticipantName` component displays the name of the participant as a string within an HTML span element.
 * If no participant name is undefined the participant identity string is displayed.
 *
 * @example
 * ```tsx
 * <ParticipantName />
 * ```
 * @public
 */
export declare function ParticipantName({ participant, ...props }: ParticipantNameProps): React.JSX.Element;
//# sourceMappingURL=ParticipantName.d.ts.map