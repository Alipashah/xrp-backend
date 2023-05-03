import { IPFSHTTPClient, create as ipfsHttpClient } from "ipfs-http-client";
import { resolve } from "path";
import { readFile } from "fs";
import { isUploadedIpfsFileI } from "../types/metadataTypes.js";

export class infuraIpfsClass {
  constructor(
    projectIdArg: string | undefined,
    projectSecretArg: string | undefined
  ) {
    if (projectIdArg) {
      if (projectSecretArg) {
        try {
          const auth = `Basic ${Buffer.from(
        
              authorization: auth,
            },
          });
        } catch (e) {
          console.error(e, "error creating INFURA IPFS client");
          throw e;
        }
      } else throw "INFURA_IPFS_PROJECT_SECRET NOT FOUND in env";
    } else throw "INFURA_IPFS_PROJECT_ID NOT FOUND in env";
  }

  protected client: IPFSHTTPClient;

  pin = async (fileData: any) => {
    const uploaded_file = await this.client.add(fileData);

    if (isUploadedIpfsFileI(uploaded_file)) {
      const ipfsGateway = `https://ipfs.io/ipfs/`;
      //I understand, I'm returning path and not cid, but the path is the cid
      const fileUrl = `${ipfsGateway}${uploaded_file.path}`;
      return fileUrl;
    } else {
      throw "uploaded file returned format malformed";
    }
  };

  pinFileAndGetImageUrl = async (imgPathArg: string) => {
    // sample path :"./assets/images/tortoise.jpg"
    try {
      const imgPath = resolve(imgPathArg); //path.resolve gets the absolute path from the relative path
      const imgData = await this.readImageFile(imgPath);

      const imgUrl = await this.pin(imgData);
      return imgUrl;
    } catch (e) {
      console.error(e, "error pinning image");
      throw e;
    }
  };

  protected readImageFile(filePath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      readFile(filePath, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    });
  }
}
