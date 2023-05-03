import { Repository, Entity } from "redis-om";

class QueueEntity extends Entity {}

class jobInQueueEntity extends Entity {}

interface queueInitalizedI {
  queueRepository: Repository<QueueEntity>;
  id: string;
  jobInQueueRepository: Repository<jobInQueueEntity>;
}

interface QueueEntity {
  length: number;
  currentlyProcessing: number;
}

interface jobInQueueEntity {
  numberInQueue: number;
}

export { queueInitalizedI, QueueEntity, jobInQueueEntity };
