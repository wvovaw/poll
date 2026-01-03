import type { AnswerKeys } from "~~/types";
import { pollRepository } from "../repositories/poll-repository";

interface Peer {
  send: (message: string) => void;
}

class WebSocketManager {
  private static instance: WebSocketManager;
  private peers: Set<Peer> = new Set();

  private constructor() {}

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  public addPeer(peer: Peer): void {
    this.peers.add(peer);
  }

  public removePeer(peer: Peer): void {
    this.peers.delete(peer);
  }

  public broadcast(message: string): void {
    for (const peer of this.peers) {
      try {
        peer.send(message);
      } catch (error) {
        console.error("Error broadcasting to peer:", error);
      }
    }
  }

  public async sendCurrentPoll(peer: Peer): Promise<void> {
    const poll = await pollRepository.getPoll();
    peer.send("update:" + JSON.stringify(poll));
  }

  public async handleMessage(peer: Peer, message: string): Promise<void> {
    const text = message;
    const command = text.split(" ")[0];

    switch (command) {
      case "ping": {
        const [_, fp] = text.split(" ");
        await this.handlePing(peer, fp);
        break;
      }
      case "vote": {
        const [_, vote, fp] = text.split(" ");
        await this.handleVote(peer, vote as AnswerKeys, fp);
        break;
      }
      default:
        break;
    }
  }

  private async handlePing(peer: Peer, fp: string): Promise<void> {
    const hasVoted = await pollRepository.hasVoted(fp);
    peer.send(hasVoted ? "status:already_voted" : "status:can_vote");
  }

  private async handleVote(
    peer: Peer,
    vote: AnswerKeys,
    fp: string,
  ): Promise<void> {
    if (!["fw", "lib"].includes(vote)) {
      peer.send("error:invalid_vote");
      return;
    }

    if (await pollRepository.hasVoted(fp)) {
      peer.send("error:already_voted");
      return;
    }

    const poll = await pollRepository.getPoll();
    poll[vote] += 1;
    await pollRepository.savePoll(poll);
    await pollRepository.markVoted(fp);

    this.broadcast("update:" + JSON.stringify(poll));
    peer.send("vote:success");
  }
}

export const wsManager = WebSocketManager.getInstance();
