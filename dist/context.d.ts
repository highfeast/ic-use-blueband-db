import React, { ReactNode } from "react";
interface VectorDBIndexContextType {
    store: string | null;
    isEmbedding: boolean;
    isQuerying: boolean;
    init: (actor: any, store: string, config: any) => void;
    saveEmbeddings: (docTitle: string, docId: string) => Promise<{
        docTitle: string;
        id: string | undefined;
    }>;
    similarityQuery: (promptEmbedding: any) => Promise<any[]>;
}
export declare const VectorDBProvider: React.FC<{
    children: ReactNode;
}>;
export declare const useVectorDB: () => VectorDBIndexContextType;
export {};
