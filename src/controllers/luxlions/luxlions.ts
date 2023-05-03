import { PayloadAndSubscription } from "xumm-sdk/dist/src/types/index.js";

import {
  isNotXummSignedResponse,
  isXummSignedResponse,
  mintTxObjectI,
  mintPayloadForSigningI,
  signingFailedI,
  signingResultType,
  signingSuccessI,
  xummSignedResponseI,
  mintObjectArgI,
  txTypeMint,
  userSetAsMinterI,
  accountSetType,
  nftAccountInfoType,
  isMintingSuccessType,
} from "../../types/xrpTypes.js";

import { parentNftModel } from "../../models/parentNft.js";
import { isBreedRequestBodyI, traitsI } from "../../types/nftTypes.js";
import {
  AccountNFTokenI,
  AttributeI,
  getUriArgs as getUriArgsI,
  isArrayOfNftWithContents,
  isNftContents,
  isUploadedIpfsFileI,
  nftContentsI,
  nftWithContentsI,
} from "../../types/metadataTypes.js";
import {
  AccountNFTsRequest,
  AccountNFTsResponse,
  AccountSetAsfFlags,
  Client,
  convertHexToString,
  convertStringToHex,
} from "xrpl";
import { NETWORKS, collectionAccount, ipfs } from "../../config/config.js";

import { Request, Response } from "express";
import got from "got";
import { XummSdkJwt } from "xumm-sdk";
import BeeQueue from "bee-queue";
import xrpSocket from "./xrpSocket.js";
import { breedPairAndGetChildId } from "../childNft.js";
import { childNftModel } from "../../models/childNft.js";
import MintQueue from "../../models/queue/queue.js";
import { writeFileSync } from "fs";

const mintAfterSigningQueue = new BeeQueue("mintJobsQueue");

class luxlionsClass {
  mint = async (req: Request, res: Response) => {
  
            console.log("mint request rejected");
            parentNftModel.deleteManyParents(toMintIds);
            childNftModel.deleteTentativeChild(createdChildId);
            xrpSocket.emitSigned(userAccount, false);
            // sign request rejected
          }
        } else {
          res
            .status(400)
            .json({ message: "account does not own nfts it wants to mint" });
          return;
        }
      } else {
        res
          .status(400)
          .json({ message: "mint Request does not conform to mint interface" });
        return;
      }
    } catch (error) {
      console.error(error, "mint_Token error");
      if (!isResponseSent)
        res
          .status(500)
          .json({ message: "something went wrong. Please try again in a bit" });
    }
    return;
  };

  mintSigned = async ({
    userAccount,
    jwt,
    signingResult,
  }: mintAfterSigningDataI) => {
    const isUserSetAsMinter = await this.setUserAccountasNFTokenMinter(
      userAccount
    );

      const nftsByGender = await this.splitNftsByGender(getNFtAccountResponse);

      res.status(200).json(nftsByGender);
    } catch (e) {
      console.error(e, "error-getAccountNfts");
      res.sendStatus(500);
    }
  };

  protected getAccountNfts = async (
    userAccount: string
  ): Promise<AccountNFTsResponse> => {
    const getNftRequest: AccountNFTsRequest = {
      command: "account_nfts",
      account: userAccount,
    };

    const client = new Client(NETWORKS.TESTNET);
    await client.connect();

    const getNFtAccountResponse: AccountNFTsResponse = await client.request(
      getNftRequest
    );

    client.disconnect();
    return getNFtAccountResponse;
  };

  protected doesAccountPossess_ToMint_Nfts = async (
    userAccount: string,
    toMintNfts: string[]
  ) => {
    const getAccountNftsResponse = await this.getAccountNfts(userAccount);
    const ownedNftIdsArr = getAccountNftsResponse.result.account_nfts.map(
      (nft) => nft.NFTokenID
    );
    const ownedNftIdsSet = new Set(ownedNftIdsArr);
    const possessedToMintIds = toMintNfts.filter((id) =>
      ownedNftIdsSet.has(id)
    );
    if (possessedToMintIds.length === toMintNfts.length) return true;
    else return false;
  };

  protected splitNftsByGender = async (
    nftAccountResponse: AccountNFTsResponse
  ) => {
    const nftsWithContents = await this.getValidNftsWithContent(
      nftAccountResponse
    );

    return { maleNfts: maleNftsArr, femaleNfts: femaleNftsArr };
  };

  protected findGenderAttribute = (attributes: AttributeI[]) => {
    const foundGenderAttribute = attributes.find(
      (attribute) => attribute.trait_type === "gender"
    );
    return foundGenderAttribute;
  };

  protected getValidNftsWithContent = async (
    nftAccountResponse: AccountNFTsResponse
  ) => {
    const validNfts = await this.getValidNfts(nftAccountResponse);
    const nftsWithContents = await this.getNftsWithContents(validNfts);
    return nftsWithContents;
  };

  // getValidNfts function performs two checks:
  // 1. the issuer of the token is the previos collectionAccount
  // 2. nft is not already minted
  protected getValidNfts = async (nftAccountResponse: AccountNFTsResponse) => {
    const ownedNfts = nftAccountResponse.result.account_nfts;
    const ownedNftIds = ownedNfts.map((nft) => nft.NFTokenID);
    const alreadyParentIds =
      await parentNftModel.filterAlreadyParentIdsFromIdsList(ownedNftIds);
    const ourIssuedNfts = ownedNfts.filter((nft) => {
      if (nft.Issuer === collectionAccount.previousCollectionIssuer) {
        const nfTokenIdAlreadyMinted = alreadyParentIds.includes(nft.NFTokenID);
        // making sure fetched nft not already minted
        if (!nfTokenIdAlreadyMinted) if (nft.URI !== undefined) return true;
      }
    });
    return ourIssuedNfts;
  };


const AccountSetTransactionType: accountSetType = "AccountSet";

const luxlions = new luxlionsClass();

export default luxlions;

mintAfterSigningQueue.process(
  async (job: BeeQueue.Job<mintAfterSigningDataI>) => {
    const currentlyProcessing = await MintQueue.getCurrentlyProcessing();
    xrpSocket.emitQueueProgress(currentlyProcessing);
    const isMintSucessful = await afterMintProcessJob(job);
    return isMintSucessful;
  }
);



mintAfterSigningQueue.on("succeeded", (job, result) => {
  console.log(`Job ${job.id} succeeded with result: ${result}`);
});

interface mintAfterSigningDataI {
  userAccount: string;
  jwt: string;
  signingResult: signingSuccessI;
  createdChildId: number;
  parentIds: string[];
  newJobInQueueId: string;
}

function saveImageFromUri(req: Request, id: number) {
  console.log(id,"pic")
  try {
    const base64Image = req.body.uri.split(";base64,").pop(); // remove data URI prefix
    const localPath = `assets/mints/${id}.png`;

    writeFileSync(localPath, Buffer.from(base64Image, "base64"));
    return localPath;
  } catch (e) {
    console.error(e, "error saving Image from Uri");
    throw e;
  }
}
