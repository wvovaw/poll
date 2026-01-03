import type { AnswerKeys, Poll } from "~~/types";

class PollRepository {
  async getPoll(): Promise<Poll> {
    const storage = useStorage("poll");
    return (await storage.getItem<Poll>("poll")) || { fw: 0, lib: 0 };
  }

  async savePoll(poll: Poll): Promise<void> {
    const storage = useStorage("poll");
    await storage.setItem("poll", poll);
  }

  async hasVoted(fp: string): Promise<boolean> {
    const votedStorage = useStorage("voted");
    return !!(await votedStorage.getItem(fp));
  }

  async markVoted(fp: string): Promise<void> {
    const votedStorage = useStorage("voted");
    await votedStorage.setItem(fp, true);
  }
}

export const pollRepository = new PollRepository();