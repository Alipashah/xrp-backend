import { Prisma, PrismaClient } from "@prisma/client";
import { traitsI } from "../types/nftTypes.js";

const prisma = new PrismaClient();

class childNftModelClass {
  async createTentativeChildAndGetId(childTraitsArg: traitsI): Promise<number> {
    const childTraits: Prisma.childNftCreateArgs = {
      data: {
        ...childTraitsArg,
        isBorn: false,
      },
    };
    try {
      const createChildResult = await prisma.childNft.create(childTraits);
      return createChildResult.childId;
    } catch (error) {
      console.error(error, "error creating child");
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.code, "prisma error - creating child");
      }
      throw error;
    }
  }

  async materializeChild(childId: number, txnHash: string) {
    try {
      await prisma.childNft.update({
        where: {
          childId,
        },
        data: { txnHash, isBorn: true, bornAt: new Date() },
      });
    } catch (error) {
      console.error(error, "error materializing child");
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(error.code, "prisma error materializing child");
      }
      throw error;
    }
  }

  async deleteTentativeChild(childIdToDelete: number) {
    try {
      await prisma.childNft.delete({
        where: {
          childId: childIdToDelete,
        },
      });
    } catch (e) {
      console.error(e, "error deleting tentative child");
      throw e;
    }
  }

  async getNftWithTraits(traits: traitsI) {
    const nftWithMatchingTraits = await prisma.childNft.findUnique({
      where: {
        traits: traits,
      },
    });
    return nftWithMatchingTraits;
  }
}

export const childNftModel = new childNftModelClass();
