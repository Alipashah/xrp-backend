export interface AttributeI {
  description: string;
  trait_type: string;
  value: string;
}

export interface collectionI {
  name: string;
  family: string;
}

export interface nftContentsI {
  attributes: AttributeI[];
  collection: collectionI;
  name: string;
  description: string;
  schema: string;
  image: string;
  taxon: number;
  nftType: string;
}


export interface nftWithContentsI {
  Flags: number;
  Issuer: string;
  NFTokenID: string;
  NFTokenTaxon: number;
  URI: string;
  nft_serial: number;
  contents: nftContentsI;
}

export interface AccountNFTokenI {
  Flags: number;
  Issuer: string;
  NFTokenID: string;
  NFTokenTaxon: number;
  URI?: string;
  nft_serial: number;
}

export interface getUriArgs {
  attributes: AttributeI[];
  serialNumber: number;
  imageUrl: string;
}

export interface uploadedIpfsFileI {
  path: string;
  cid: string;
  size: number;
}

export function isUploadedIpfsFileI(arg: any): arg is uploadedIpfsFileI {
  if (
    typeof arg === "object" &&
    typeof arg.path === "string" &&
    typeof arg.cid === "object" &&
    typeof arg.cid["/"] !== undefined &&
    typeof arg.size === "number"
  )
    return true;
  else {
    return false;
  }
}

 function isAttribute(obj: any): obj is AttributeI {
  return (
    obj && typeof obj.description === "string" && typeof obj.trait_type === "string" && typeof obj.value === "string"
  );
}

 function isCollection(obj: any): obj is collectionI {
  return obj && typeof obj.name === "string" && typeof obj.family === "string";
}

export function isNftContents(obj: any): obj is nftContentsI {
  if (
    !obj ||
    !Array.isArray(obj.attributes) ||
    !isCollection(obj.collection) ||
    typeof obj.name !== "string" ||
    typeof obj.description !== "string" ||
    typeof obj.schema !== "string" ||
    typeof obj.image !== "string" ||
    typeof obj.taxon !== "number" ||
    typeof obj.nftType !== "string"
  ) {
    return false;
  }
  for (const attr of obj.attributes) {
    if (!isAttribute(attr)) {
      return false;
    }
  }
  return true;
}

export function isNftWithContents(obj: any): obj is nftWithContentsI {
  return 'Flags' in obj && 'Issuer' in obj && 'NFTokenID' in obj && 
         'NFTokenTaxon' in obj && 'URI' in obj && 'nft_serial' in obj &&
         isNftContents(obj.contents);
}

export function isArrayOfNftWithContents(arr: any[]): arr is nftWithContentsI[] {
  return Array.isArray(arr) && arr.every((item) => isNftWithContents(item));
}