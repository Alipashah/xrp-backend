import { Request, Response } from "express";
import { parentNftModel } from "../models/parentNft.js";


export const getParentNftByRecordId = async (req: Request, res: Response) => {
  const recordId = Number(req.query.id);
  try {
    const foundParentNftRecord = await parentNftModel.getParentByRecordId(
      recordId
    );
    const tokenId = foundParentNftRecord?.tokenId.toString();
    if (tokenId) {
      res.status(200).json(tokenId);
    } else res.status(200).json({ message: "no record found" });
  } catch (error) {
    console.error(error, "getParentNftByRecordId");
    if (error instanceof Error) res.status(500).send(error.message);
    else res.sendStatus(500);
  }
};
