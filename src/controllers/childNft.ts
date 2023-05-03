import { Prisma, Gender } from "@prisma/client";
import { parentNftModel } from "../models/parentNft.js";
import {
  breedRequestBodyI,
  parentNftI,
  parentPairObjI,
} from "../types/nftTypes.js";
import { childNftModel } from "../models/childNft.js";

async function breedPairAndGetChildId(
  breedRequestBody: breedRequestBodyI
): Promise<number> {
 \
}

function getParentPairObjFromReqBody(
  body: breedRequestBodyI,
  childId: number
): parentPairObjI {
 

 

  return { fatherNft, motherNft };
}

export { breedPairAndGetChildId };
