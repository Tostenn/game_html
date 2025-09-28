import { Edge, Nodes } from "@/types";
import { Pawn } from "./Pawn";

export class Board {
    nodes: Nodes[];
    edges: Edge[];
    pawns: { [id: string]: Pawn };
    winningLines: string[][];

    constructor(nodes: Nodes[], edges: Edge[], winningLines: string[][]) {
        this.nodes = nodes;
        this.edges = edges;
        this.pawns = {};
        this.winningLines = winningLines;
    }

    /**
     * Vérifie si deux nœuds sont connectés
     */
    isConnected(a: string, b: string): boolean {
        return this.edges.some(
            ([n1, n2]) => (n1 === a && n2 === b) || (n1 === b && n2 === a)
        );
    }

    /**
     * Retourne un nœud par son ID
     */
    getNode(id: string): Nodes | undefined {
        return this.nodes.find((n) => n.id === id);
    }

    /**
     * Retourne les nœuds voisins (connectés) d'un nœud
     */
    getNeighbors(id: string): string[] {
        return this.edges
            .filter(([n1, n2]) => n1 === id || n2 === id)
            .map(([n1, n2]) => (n1 === id ? n2 : n1));
    }

    /**
     * Ajoute un pion sur le plateau
     */
    addPawn(id: string, pawn: Pawn) {
        if (!this.pawns[id]) this.pawns[id] = pawn;
    }

    /**
     * Retourne le Node le plus proche d'une position donnée
     * @param top top en % (number, ex: 50)
     * @param left left en % (number, ex: 25)
     */
    getClosestNode(top: number, left: number): Nodes | undefined {
        let closestNode: Nodes | undefined = undefined;
        let minDist = Infinity;

        this.nodes.forEach((node) => {
            const nodeX = parseFloat(node.left); // "50%" -> 50
            const nodeY = parseFloat(node.top); // "25%" -> 25
            const dist = Math.hypot(left - nodeX, top - nodeY);
            if (dist < minDist) {
                minDist = dist;
                closestNode = node;
            }
        });

        return closestNode;
    }

    /**
     * Vérifie si un nœud est occupé par un pion
     * @param nodeId l'ID du nœud à vérifier
     * @returns true si occupé, false sinon
     */
    isOccupied(nodeId: string): boolean {
        return Object.values(this.pawns).some(
            (pawn) => pawn.current === nodeId
        );
    }

    /**
     * Retourne le Node le plus proche parmi les voisins d'un nœud
     * (utile pour snap uniquement sur les lignes connectées)
     */
    getClosestNeighbor(
        currentNodeId: string,
        top: number,
        left: number
    ): Nodes | undefined {
        const neighbors = this.getNeighbors(currentNodeId);
        let closestNode: Nodes | undefined = undefined;
        let minDist = Infinity;

        neighbors.forEach((nid) => {
            const node = this.getNode(nid);
            if (!node) return;
            const nodeX = parseFloat(node.left);
            const nodeY = parseFloat(node.top);
            const dist = Math.hypot(left - nodeX, top - nodeY);
            if (dist < minDist) {
                minDist = dist;
                closestNode = node;
            }
        });

        return closestNode;
    }

    /**
     * Vérifie si une couleur a gagné
     * @returns color du vainqueur ou null
     */
    checkWinnerByColor(color: string): boolean {
        // recuperation des positions des pions
        const positions = Object.values(this.pawns).map((pawn) => pawn.color === color ? pawn.current : null).filter((pos) => pos !== null) as string[];
        console.log(positions);

        // verification des lignes
        for (const line of this.winningLines) {
            if (line.every((pos) => positions.includes(pos))) {
                return true;
            }
        }

        return false;
    }
}
