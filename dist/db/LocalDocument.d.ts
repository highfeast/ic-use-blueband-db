import { MetadataTypes } from "../utils/types";
import { LocalDocumentIndex } from "./LocalDocumentIndex";
/**
 * Represents an indexed document stored on filecoin.
 */
export declare class LocalDocument {
    private readonly _index;
    private readonly _id;
    private readonly _title;
    private _metadata;
    private _text;
    constructor(index: LocalDocumentIndex, id: string, title: string);
    get id(): string;
    get title(): string;
    getLength(): Promise<number>;
    hasMetadata(): Promise<boolean>;
    loadMetadata(): Promise<Record<string, MetadataTypes>>;
    loadText(): Promise<string>;
}
