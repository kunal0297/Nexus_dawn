export type GridLayoutDefinition = {
    /** Layout name (convention `<column_count>x<row_count>`). */
    name: string;
    /** Column count of the layout. */
    columns: number;
    /** Row count of the layout. */
    rows: number;
    /** Minimum number of tiles needed to use this layout. */
    minTiles: number;
    /** Maximum tiles that fit into this layout. */
    maxTiles: number;
    /** Minimum width required to use this layout. */
    minWidth: number;
    /** Minimum height required to use this layout. */
    minHeight: number;
};
export declare const GRID_LAYOUTS: GridLayoutDefinition[];
export declare function selectGridLayout(layouts: GridLayoutDefinition[], participantCount: number, width: number, height: number): GridLayoutDefinition;
//# sourceMappingURL=grid-layouts.d.ts.map