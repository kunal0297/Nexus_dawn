interface RegExOptions {
    /**
          Only match an exact string. Useful with `RegExp#test` to check if a string is a URL.
          @default false
          */
    readonly exact?: boolean;
    /**
          Force URLs to start with a valid protocol or `www`. If set to `false` it'll match the TLD against a list of valid [TLDs](https://github.com/stephenmathieson/node-tlds).
          @default false
      @deprecated This option will be removed in the next major version and has already no effect.
          */
    readonly strict?: boolean;
}
export declare function createUrlRegExp(options: RegExOptions): RegExp;
export {};
//# sourceMappingURL=url-regex.d.ts.map