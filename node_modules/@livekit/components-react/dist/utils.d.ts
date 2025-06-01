import * as React from 'react';
/** @internal */
export declare function isProp<U extends HTMLElement, T extends React.HTMLAttributes<U>>(prop: T | undefined): prop is T;
/** @internal */
export declare function mergeProps<U extends HTMLElement, T extends Array<React.HTMLAttributes<U> | undefined>>(...props: T): React.HTMLAttributes<U>;
/** @internal */
export declare function cloneSingleChild(children: React.ReactNode | React.ReactNode[], props?: Record<string, any>, key?: any): (string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>)[] | null | undefined;
/**
 * @internal
 */
export declare function warnAboutMissingStyles(el?: HTMLElement): void;
//# sourceMappingURL=utils.d.ts.map