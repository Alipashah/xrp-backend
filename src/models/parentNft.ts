import { Prisma, PrismaClient } from "@prisma/client";
import { alreadyParentI, parentNftI } from "../types/nftTypes.js";

const prisma = new PrismaClient();

class parentNftModelClass {
  async createManyParents(parentsArr: parentNftI[]) {
    try {
      await prisma.parentNft.createMany({
        data: parentsArr,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          console.error(
            "There is a unique constraint violation on -> " + error.meta?.target
          );
        }
      }
      throw error;
    }
  }

  async deleteManyParents(parentTokenIds: string[]) {
    const parentIdsBuffer = parentTokenIds.map((tokenIdStr) =>
      Buffer.from(tokenIdStr)
    );
    try {
      await prisma.parentNft.deleteMany({
        where: { tokenId: { in: parentIdsBuffer } },
      });
    } catch (error) {
      console.error(error, "error-deleteManyParents");
      throw error;
    }
  }

  async updateParentsToAreBred(parentTokenIds: Buffer[]) {
    try {
      await prisma.parentNft.updateMany({
        where: {
          tokenId: {
            in: parentTokenIds,
          },
        },
        data: {
          isBred: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getParentNftByTokenId(tokenId: Buffer) {
    try {
      const foundParentNft = await prisma.parentNft.findUnique({
        where: { tokenId },
      });
      return foundParentNft;
    } catch (error) {
      throw error;
    }
  }

  async getParentByRecordId(recordId: number) {
    try {
      console.log(recordId, "recordId");
      const foundParentNft = await prisma.parentNft.findUnique({
        where: { parentId: recordId },
      });
      console.log(foundParentNft, "foundParentNft");
      return foundParentNft;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  protected getAlreadyParentIds = (
    idsList: string[],
    alreadyParentIds: string[]
  ): alreadyParentI[] => {
    const alreadyParentNftIds: alreadyParentI[] = [];
    const alreadyParentNftIds_Set = new Set(alreadyParentIds);

    idsList.forEach((tokenId) => {
      alreadyParentNftIds.push({
        tokenId,
        isAlreadyParent: alreadyParentNftIds_Set.has(tokenId),
      });
    });

    return alreadyParentNftIds;
  };

  filterAlreadyParentIdsFromIdsList = async (
    idsList: string[]
  ): Promise<string[]> => {
    const buffers = idsList.map((id) => Buffer.from(id));
    const tokenIds = await prisma.parentNft.findMany({
      where: {
        tokenId: {
          in: buffers,
        },
      },
      select: {
        tokenId: true,
      },
      distinct: "tokenId",
    });

    const alreadyParentFromGivenIds: string[] = [];
    tokenIds.forEach((token) => {
      alreadyParentFromGivenIds.push(token.tokenId.toString("utf-8"));
    });
    return alreadyParentFromGivenIds;
  };
}

export const parentNftModel = new parentNftModelClass();
