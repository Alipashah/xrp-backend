import { Request, Response, NextFunction } from "express";
import { jwtVerify, createRemoteJWKSet, decodeJwt } from "jose";
import { XUMM_JWKS_URL } from "../config/config.js";
import { Socket } from "socket.io";
import { ExtendedErrorClass, socketNextType } from "../types/xrpSocketTypes.js";

async function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
 
async function socketAuthenticateJwt(socket: Socket, next: socketNextType) {
  try {
    const xummJwk = getXummJwks();

    const token = socket.handshake.auth.token;
    if (token) {
      try {
        await jwtVerify(token, xummJwk);
      
    } else {
      socketErrorOut("not authorized", "please connect", next);
      return;
    }
  } catch (e) {
    console.error(e, "error authenticateJWT");
    socketErrorOut(
      "error authenticating socket jwt",
      "please try again later",
      next
    );
  }
}

export { authenticateJwt, socketAuthenticateJwt };

function getXummJwks() {
  return createRemoteJWKSet(new URL(XUMM_JWKS_URL));
}

function socketErrorOut(
  errMessage: string,
  errContent: string,
  next: socketNextType
) {
  const err = new ExtendedErrorClass(errMessage);
  err.data = { content: errContent }; // additional details
  next(err);
}
