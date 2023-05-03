import xrpl from "xrpl";

export class xrpAccountClass {
  constructor(
    accountArg: string | undefined,
    accountSeedArg: string | undefined,
    previousCollectionIssuerArg: string | undefined
  ) {
    if (previousCollectionIssuerArg) {
      if (accountArg) {
        =
        } else throw "ACCOUNT_SEED NOT FOUND in env";
      } else throw "ACCOUNT NOT FOUND in env";
    } else throw "PREVIOUS_COLLECTION_ISSUER NOT FOUND IN ENV";
  }
  wallet: xrpl.Wallet;
  account: string;
  previousCollectionIssuer: string;
}
