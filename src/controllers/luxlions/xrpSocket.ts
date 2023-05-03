import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import { socketAuthenticateJwt } from "../../middleware/authenticateJwt.js";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../../types/xrpSocketTypes.js";

class xrpSocketClass {
  constructor(SOCKET_PORT_ARG: string | undefined) {
    if (SOCKET_PORT_ARG) {
      const app = express();
      const httpServer = createServer(app);
      const constructorIo = new Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
      >(httpServer, {
        cors: {
          origin: "*",
        },
      });

      constructorIo.use((socket, next) => socketAuthenticateJwt(socket, next));

      constructorIo.on("connection", (socket) => {
        console.log(socket.id, "- socket connected");
        const userAccountUntyped = socket.data.userAccount;
        if (userAccountUntyped) {
          socket.join(userAccountUntyped);
        } else throw "userAccount not found in socket";
      });

      httpServer.listen(Number(SOCKET_PORT_ARG), () =>
        console.log(`Listening on port ${SOCKET_PORT_ARG}`)
      );
      this.io = constructorIo;
    } else throw "SOCKET_PORT not set";
  }
  protected io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
  emitSigned = (userAccount: string, didUserSign: boolean) => {
    this.io.to(userAccount).emit("mint/signed", { didUserSign });
  };

  emitQueueProgress = (currentlyProcessing: number) => {
    this.io.emit("queue/progress", { currentlyProcessing });
  };

  emitQueueComplete = (txnHash: string) => {
    this.io.emit("queue/completed", { txnHash });
  };
}

const SOCKET_PORT_UNTYPED = process.env.SOCKET_PORT;

const xrpSocket = new xrpSocketClass(SOCKET_PORT_UNTYPED);

export default xrpSocket;
