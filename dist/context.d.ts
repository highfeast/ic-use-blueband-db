import React, { ReactNode } from "react";
type QueryResult = undefined | {
    title: any;
    id: any;
    score: any;
    chunks: any;
    sections: any;
}[];
interface VectorDBIndexContextType {
    isSaving: boolean;
    isQuerying: boolean;
    logs: string[];
    documents: any[];
    getStorePrincipal: () => Promise<any | undefined | string>;
    initializeIndex: (actor: any, store: string, config?: any) => void;
    AddItem: (title: string, content: string) => Promise<void>;
    Query: (prompt: string) => Promise<QueryResult>;
}
export declare const BluebandProvider: React.FC<{
    children: ReactNode;
}>;
export declare const useBlueBand: () => VectorDBIndexContextType;
export {};
