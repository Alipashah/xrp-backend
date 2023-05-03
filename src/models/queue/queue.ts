import { Schema, Client } from "redis-om";
import {
  QueueEntity,
  jobInQueueEntity,
  queueInitalizedI,
} from "../../types/queueTypes.js";
import dotenv from "dotenv";
import * as fs from "fs";
import { resolve } from "path";

dotenv.config();

const queueIdJsonPath = "src/models/queue/queueId.json";

class MintQueueClass {
  constructor() {}

  async init(REDIS_URL_UNTYPED: string | undefined) {
    if (REDIS_URL_UNTYPED) {
      const queueSchema = new Schema(
        QueueEntity,
        {
          length: { type: "number" },
          currentlyProcessing: { type: "number" },
        },
        { dataStructure: "HASH" }
      );

      const client = await new Client().open(REDIS_URL_UNTYPED);

      const queueRepository = client.fetchRepository(queueSchema);

      let queueId = getQueueId(queueIdJsonPath);

      console.log(queueId, "queueId");

      if (!queueId) {
        const queue = await queueRepository.createAndSave({
          length: 0,
          currentlyProcessing: 0,
        });

        queueId = queue.entityId;

        console.log("queueId-2:", queueId);

        updateQueueId(queueId, queueIdJsonPath);
      }

      const jobInQueueSchema = new Schema(
        jobInQueueEntity,
        {
          numberInQueue: { type: "number" },
        },
        { dataStructure: "HASH" }
      );

      const jobInQueueRepository = client.fetchRepository(jobInQueueSchema);

      this.queue = {
        queueRepository,
        id: queueId,
        jobInQueueRepository,
      };
    } else {
      throw "redis url not provided";
    }
  }

  addNewJobAndGetJobId = async (): Promise<string> => {
    if (!this.queue) throw "queue not initialized";
    const newJob = await this.queue.jobInQueueRepository.createAndSave({
      numberInQueue: this.fetchQueue.length + 1,
    });
    await this.incrementTotalLength();
    return newJob.entityId;
  };

  completeJob = async (jobId: string) => {
    if (!this.queue) throw "queue not initialized";
    await this.queue.jobInQueueRepository.remove(jobId);
    await this.incrementCurrentlyProcessing();
  };

  //this returns the length of all items that have ever been in the queue, not those currently in the queue
  getQueueLength = async (): Promise<number> => {
    const fetchedQueue = await this.fetchQueue();
    return fetchedQueue.length;
  };

  getCurrentlyProcessing = async (): Promise<number> => {
    const fetchedQueue = await this.fetchQueue();
    return fetchedQueue.currentlyProcessing;
  };





  protected fetchQueue = async () => {
    if (!this.queue) throw "queue not initialized";
    return await this.queue.queueRepository.fetch(this.queue.id);
  };

  protected queue: queueInitalizedI | undefined;
}

const REDIS_URL_UNTYPED = process.env.REDIS_URL;

const MintQueue = new MintQueueClass();
MintQueue.init(REDIS_URL_UNTYPED);

export default MintQueue;


interface QueueConfig {
  queueId: string;
  // other properties
}

function updateQueueId(queueId: string, jsonPath: string): void {
  let config: QueueConfig = { queueId: "" };
  if (fs.existsSync(jsonPath)) {
    const fileContents = fs.readFileSync(jsonPath, "utf-8");
    config = JSON.parse(fileContents) as QueueConfig;
  }
  config.queueId = queueId;
  fs.writeFileSync(jsonPath, JSON.stringify(config));
}
