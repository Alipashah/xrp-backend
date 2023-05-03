import { xrpAccountClass } from "./collection.js";
import { infuraIpfsClass } from "./ipfs.js";
import dotenv from "dotenv";

dotenv.config();

export const XUMM_JWKS_URL = "https://oauth2.xumm.app/certs";

export const NETWORKS = {
  TESTNET: "wss://s.altnet.rippletest.net:51233",
};


export const collectionAccount = new xrpAccountClass(
  COLLECTION_ACCOUNT_UNTYPED,
  COLLECTION_ACCOUNT_SEED_UNTYPED,
  PREVIOUS_COLLECTION_ISSUER_UNTYPED
);



const INFURA_ENDPOINT = "https://ipfs.infura.io:5001";

export const ipfs = new infuraIpfsClass(
  INFURA_IPFS_PROJECT_ID_UNTYPED,
  INFURA_IPFS_PROJECT_SECRET_UNTYPED
);
