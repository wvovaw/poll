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
}

export const wsManager = WebSocketManager.getInstance();
