import { LocalDocumentIndex } from "./db/LocalDocumentIndex";
export declare class BlueBand {
    private actor;
    private logFunction?;
    private collectionId;
    constructor(actor: any, collectionId: string, logFunction?: ((message: string) => void) | undefined);
    log(text: string): Promise<void>;
    getCollectionPrincipal: () => Promise<any>;
    initialize(): Promise<LocalDocumentIndex | undefined>;
    IsDocExists(collectionId: string): Promise<any>;
    getDocumentID: (title: string) => Promise<any>;
    getDocumentTitle: (docId: string) => Promise<any>;
    addDocumentAndVector(index: LocalDocumentIndex, title: string, parsedContent: string): Promise<{
        documentId: any;
        bucketPrincipal: any;
        vectorId: any;
    }>;
    similarityQuery(index: LocalDocumentIndex, prompt: string): Promise<{
        title: any;
        id: any;
        score: any;
        chunks: any;
        sections: any;
    }[]>;
    getDocuments(collectionId: string): Promise<{
        documents: any;
        embedding: any;
    } | undefined>;
}
