interface ExtendedError extends Error {
  data?: any;
}

export class ExtendedErrorClass extends Error implements ExtendedError {
  public data?: any;

  constructor(message: string, data?: any) {
    super(message);
    this.name = this.constructor.name;
    this.data = data;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export type socketNextType = (err?: ExtendedErrorClass) => void;

export interface ServerToClientEvents {
  "mint/signed": (didUserSign: { didUserSign: boolean }) => void;
  "queue/progress": (currentlyProcessing: {
    currentlyProcessing: number;
  }) => void;
  "queue/completed": (txnHash: {
    txnHash: string;
  }) => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userAccount: string;
}
