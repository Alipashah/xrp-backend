import { Gender } from "@prisma/client";

export interface parentNftI {
  tokenId: Buffer;
  isBred: boolean;
  gender: Gender;
  spouseId: Buffer;
  childId: number;
}

export interface traitsI {
  gender: Gender;
  background: string;
  skin: string;
  eyewear: string;
  mouth: string;
  clothing: string;
  eyes: string;
  headgear: string;
  accesories: string;
}

export interface breedRequestBodyI {
  male: {
    tokenId: string;
  };
  female: {
    tokenId: string;
  };
  childTraits: traitsI;
  jwt: string;
  userAccount: string;
  uri: string;
}

export interface parentPairObjI {
  fatherNft: parentNftI;
  motherNft: parentNftI;
}

export interface alreadyParentI {
  tokenId: string;
  isAlreadyParent: boolean;
}

export function isBreedRequestBodyI(arg: any): arg is breedRequestBodyI {
  if (typeof arg === "object") {
    if (typeof arg.male === "object" && typeof arg.male.tokenId === "string") {
      if (
        typeof arg.female === "object" &&
        typeof arg.female.tokenId === "string"
      ) {
        if (typeof arg.childTraits === "object" && isTraitsI(arg.childTraits)) {
          if (arg.jwt !== undefined)
            if (arg.userAccount !== undefined && typeof arg.uri === "string")
              return true;
        }
      }
    }
  }
  return false;
}

function isTraitsI(object: any): object is traitsI {
  const keys = Object.keys(object);
  return (
    keys.includes("gender") &&
    keys.includes("background") &&
    keys.includes("skin") &&
    keys.includes("eyewear") &&
    keys.includes("mouth") &&
    keys.includes("clothing") &&
    keys.includes("eyes") &&
    keys.includes("headgear") &&
    keys.includes("accesories")
  );
}
