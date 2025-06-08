interface AlgoSignerAccount {
  address: string;
  name?: string;
}

interface AlgoSigner {
  connect(): Promise<AlgoSignerAccount[]>;
  accounts(params: { ledger: string }): Promise<AlgoSignerAccount[]>;
}

interface MyAlgoConnect {
  connect(): Promise<AlgoSignerAccount[]>;
}

declare global {
  interface Window {
    AlgoSigner: AlgoSigner;
    MyAlgoConnect: new () => MyAlgoConnect;
  }
} 