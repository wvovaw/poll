import type { AnswerKeys, Poll } from "~~/types";

interface DbData {
  poll: Poll;
  voted: Record<string, boolean>;
}

class PollRepository {
  private async getDb(): Promise<DbData> {
    const storage = useStorage("db");
    return (await storage.getItem<DbData>("db")) || { poll: { fw: 0, lib: 0 }, voted: {} };
  }

  private async saveDb(data: DbData): Promise<void> {
    const storage = useStorage("db");
    await storage.setItem("db", data);
  }

  async getPoll(): Promise<Poll> {
    const db = await this.getDb();
    return db.poll;
  }

  async savePoll(poll: Poll): Promise<void> {
    const db = await this.getDb();
    db.poll = poll;
    await this.saveDb(db);
  }

  async hasVoted(fp: string): Promise<boolean> {
    const db = await this.getDb();
    return !!db.voted[fp];
  }

  async markVoted(fp: string): Promise<void> {
    const db = await this.getDb();
    db.voted[fp] = true;
    await this.saveDb(db);
  }
}

export const pollRepository = new PollRepository();