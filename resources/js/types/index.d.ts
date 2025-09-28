export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

// Node = point d'intersection
export interface Nodes {
  id: string;
  top: string;  // ex: "50%"
  left: string; // ex: "50%"
}

// Edge = connexion entre 2 nodes
export type Edge = [string, string];
