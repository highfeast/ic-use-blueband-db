import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponsePayload {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface Main {
  'addRecipe' : ActorMethod<
    [string, string],
    [] | [{ 'recipe_id' : [] | [string], 'bucket' : [] | [Principal] }]
  >,
  'createEmbeddings' : ActorMethod<[Array<string>], string>,
  'embedRecipe' : ActorMethod<
    [string, string, bigint, bigint, Array<number>],
    string
  >,
  'endUpdate' : ActorMethod<[string], undefined>,
  'fetchQueryResponse' : ActorMethod<[string, string], string>,
  'generateUserName' : ActorMethod<[string], string>,
  'getAddress' : ActorMethod<[string], string>,
  'getChunks' : ActorMethod<[string, string], [] | [string]>,
  'getIndex' : ActorMethod<[string], [] | [{ 'items' : VectorStore }]>,
  'getMetadata' : ActorMethod<[string, string], [] | [RecipeInfo__1]>,
  'getMyProfile' : ActorMethod<[], [] | [UserProfile]>,
  'getRecipeID' : ActorMethod<[string, string], [] | [string]>,
  'initSiweProviderCanister' : ActorMethod<[Principal], undefined>,
  'listProfiles' : ActorMethod<[], Array<[string, UserProfile]>>,
  'metadata' : ActorMethod<[string], [] | [Metadata]>,
  'myStorePrincipal' : ActorMethod<[], [] | [Principal]>,
  'recipeIDToTitle' : ActorMethod<[string, string], [] | [string]>,
  'saveMyProfile' : ActorMethod<[string, string, string], undefined>,
  'titleToRecipeID' : ActorMethod<[string, string], [] | [string]>,
  'transform' : ActorMethod<[TransformArgs], HttpResponsePayload>,
  'updateMyProfile' : ActorMethod<[string, string], undefined>,
  'wallet_receive' : ActorMethod<[], undefined>,
}
export type Metadata = Array<RecipeInfo>;
export interface RecipeInfo {
  'chunkStartId' : bigint,
  'name' : string,
  'size' : bigint,
  'recipe_id' : string,
  'isEmbedded' : boolean,
  'chunkCount' : bigint,
  'chunkEndId' : bigint,
}
export interface RecipeInfo__1 {
  'chunkStartId' : bigint,
  'name' : string,
  'size' : bigint,
  'recipe_id' : string,
  'isEmbedded' : boolean,
  'chunkCount' : bigint,
  'chunkEndId' : bigint,
}
export type StoreId = string;
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponsePayload,
}
export interface UserProfile {
  'name' : string,
  'store' : StoreId,
  'avatarUrl' : string,
  'address' : string,
}
export interface VectorData {
  'startPos' : bigint,
  'recipe_id' : string,
  'vectorId' : string,
  'vector' : Array<number>,
  'endPos' : bigint,
}
export type VectorStore = Array<VectorData>;
export interface _SERVICE extends Main {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
