import { LocalIndex } from "./LocalIndex";
import { TextSplitterConfig } from "./TextSplitter";
import { MetadataFilter, EmbeddingsModel, Tokenizer, MetadataTypes } from "../utils/types";
import { LocalDocumentResult } from "./LocalDocumentResult";
import { LocalDocument } from "./LocalDocument";
import { _SERVICE } from "../utils/blueband_db_provider.did";
export interface DocumentQueryOptions {
    maxDocuments?: number;
    maxChunks?: number;
    filter?: MetadataFilter;
}
export interface LocalDocumentIndexConfig {
    actor: _SERVICE;
    indexName: string;
    apiKey: string;
    isCatalog?: boolean;
    _getDocumentId?: (documentUri: string) => Promise<string | undefined>;
    _getDocumentTitle?: (documentId: string) => Promise<string | undefined>;
    chunkingConfig?: Partial<TextSplitterConfig>;
}
export declare class LocalDocumentIndex extends LocalIndex {
    private readonly _tokenizer;
    private _apiKey;
    private readonly _embeddings?;
    private readonly isCatalog?;
    private readonly _chunkingConfig?;
    private _catalog?;
    private readonly _getDocumentId?;
    private readonly _getDocumentTitle?;
    private _newCatalog?;
    constructor(config: LocalDocumentIndexConfig);
    get embeddings(): EmbeddingsModel | undefined;
    get tokenizer(): Tokenizer;
    isCatalogCreated(): Promise<boolean>;
    getDocumentId(title: string): Promise<string | undefined>;
    getDocumentTitle(documentId: string): Promise<string | undefined>;
    addVectors(storeId: string, docTitle: string, docId: string): Promise<any>;
    upsertDocument(docId: string, title: string, text: string, metadata?: Record<string, MetadataTypes>): Promise<LocalDocument>;
    listDocuments(): Promise<LocalDocumentResult[]>;
    queryDocuments(queryEmbedding: any[], options?: DocumentQueryOptions): Promise<LocalDocumentResult[]>;
    beginUpdate(): Promise<void>;
    cancelUpdate(): void;
    endUpdate(): Promise<void>;
    formatBatch(batch: any[]): any[];
    protected loadIndexData(): Promise<void>;
}
