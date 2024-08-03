import { IndexItem, MetadataFilter, MetadataTypes, QueryResult } from "../utils/types";
import { _SERVICE } from "../utils/blueband_db_provider.did";
/**
 * Local vector index instance.
 * @remarks
 * This class is used to create, update, and query a local vector index.
 * Each index is a folder on disk containing an index.json file and an optional set of metadata files.
 */
export declare class LocalIndex {
    private readonly _indexName;
    _actor: _SERVICE;
    private _data?;
    private _update?;
    /**
     * Creates a new instance of LocalIndex.
  
     * @param actor IC Actor
     * @param indexName Optional name of vector-store.
     */
    constructor(actor: _SERVICE, indexName?: string);
    /**
     * Optional name of the index store.
     */
    get indexName(): string | undefined;
    get actor(): _SERVICE | undefined;
    /**
     * Begins an update to the index.
     * @remarks
     * This method loads the index into memory and prepares it for updates.
     */
    beginUpdate(): Promise<void>;
    /**
     * Cancels an update to the index.
     * @remarks
     * This method discards any changes made to the index since the update began.
     */
    cancelUpdate(): void;
    /**
     * Ends an update to the index.
     * @remarks
     * This method updates the index on the cannister.
     */
    endUpdate(): Promise<void>;
    /**
     * Loads an index from disk and returns its stats.
     * @returns Index stats.
     */
    getIndexStats(): Promise<any>;
    /**
     * Returns an item from the index given its ID.
     * @param id ID of the item to retrieve.
     * @returns Item or undefined if not found.
     */
    getItem<TMetadata = Record<string, MetadataTypes>>(id: string): Promise<IndexItem<TMetadata> | undefined>;
    /**
     * Adds an item to the index.
     * @remarks
     * A new update is started if one is not already in progress. If an item with the same ID
     * already exists, an error will be thrown.
     * @param item Item to insert.
     * @returns Inserted item.
     */
    insertItem<TMetadata = Record<string, MetadataTypes>>(item: Partial<IndexItem<TMetadata>>): Promise<IndexItem<TMetadata>>;
    /**
     * Returns true if the index exists.
     */
    isIndexCreated(indexName: any | undefined): Promise<boolean>;
    /**
     * Returns all items in the index.
     * @remarks
     * This method loads the index into memory and returns all its items. A copy of the items
     * array is returned so no modifications should be made to the array.
     * @returns Array of all items in the index.
     */
    listItems<TMetadata = Record<string, MetadataTypes>>(): Promise<IndexItem<TMetadata>[]>;
    /**
     * Finds the top k items in the index that are most similar to the vector.
     * @remarks
     * This method loads the index into memory and returns the top k items that are most similar.
     * An optional filter can be applied to the metadata of the items.
     * @param vector Vector to query against.
     * @param topK Number of items to return.
     * @param filter Optional. Filter to apply.
     * @returns Similar items to the vector that matche the supplied filter.
     */
    queryItems<TMetadata = Record<string, MetadataTypes>>(vector: number[], topK: number, filter?: MetadataFilter): Promise<QueryResult<TMetadata>[]>;
    /**
     * Ensures that the index has been loaded into memory.
     */
    protected loadIndexData(): Promise<void>;
    private addItemToUpdate;
}
