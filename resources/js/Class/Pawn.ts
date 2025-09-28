import { Nodes } from "@/types";
import { Board } from "./Board";

export class Pawn {
  board: Board;
  current: string;
  color: string;

  constructor(board: Board, startNodeId: string, color: string) {
    this.board = board;
    this.current = startNodeId;
    this.color = color;
  }

  moveTo(targetNodeId: string): boolean {
    if (this.board.isConnected(this.current, targetNodeId)) {
      this.current = targetNodeId;
      return true;
    }
    return false;
  }

  getPosition(): Nodes | undefined {
    return this.board.getNode(this.current);
  }

  setPosition(id: string) {
    this.current = id;
    
  }
}
