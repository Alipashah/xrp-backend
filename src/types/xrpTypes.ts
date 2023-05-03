import { AccountInfoResponse } from "xrpl";
import { traitsI } from "./nftTypes.js";

export function isXummSignedResponse(res: unknown): res is xummSignedResponseI {
  if (res !== undefined && res !== null && typeof res === "object") {
    if ("payload_uuidv4" in res && "user_token" in res && "signed" in res) {
      return true;
    }
    return false;
  }
  return false;
}

export type mintTransaction_Type = "NFTokenMint";

export interface xummSignedResponseI {
  payload_uuidv4: string;
  reference_call_uuidv4: string;
  signed: boolean;
  user_token: boolean;
  return_url: {
    app: null | string;
    web: null | string;
  };
  txid: string;
  opened_by_deeplink: boolean;
  custom_meta: {
    identifier: any;
    blob: any;
    instruction: any;
  };
}

export interface mintObjectArgI {
  TransferFee: number;
  nfTokenTaxon: number;
  traits: traitsI;
}

export interface mintTxObjectI {
  TransactionType: "NFTokenMint";
  Account?: string;
  URI: string;
  Flags: 8;
  TransferFee: number;
  Issuer: string;
  NFTokenTaxon: number;
}

interface mintPayloadI {
  [key: string]: any;
}

export interface mintPayloadForSigningI extends mintPayloadI {
  txjson: mintTxObjectI;
  options: {
    expire: 10;
    submit: false;
  };
  TransactionType: mintTransaction_Type;
}

export type accountSetType = "AccountSet";

export type nftAccountInfoType = AccountInfoResponse & {
  result: {
    account_data: {
      NFTokenMinter?: string;
    };
  };
};

export type isMintingSuccessType = mintingFailedI | mintingSucceededI;

interface mintingFailedI {
  isMintingSuccess: false;
  message: string;
}

interface mintingSucceededI {
  isMintingSuccess: true;
  message: string;
  hash: string;
  // tokenId: string;
}

export interface userSetAsMinterI {
  isUserSetAsMinterSuccess: true;
  message: "user set as collection minter";
}

export type signingResultType = signingFailedI | signingSuccessI;

export interface signingSuccessI {
  didUserSign: true;
  message: string;
  userMintTxResolved: xummSignedResponseI;
}

export interface signingFailedI {
  didUserSign: false;
  message: string;
}

export interface mintPayloadSignedI extends mintPayloadI {
  txblob: string;
}

export const isNotXummSignedResponse = new Error("is not isXummSignedResponse");

export const txTypeMint: mintTransaction_Type = "NFTokenMint";
