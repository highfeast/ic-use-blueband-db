# IC-Blueband-db

React library for interacting with the `Blueband-db`. It exports functions to load indexes into system memory, save new items and compare similarity between saved documents and a prompt using in-memory operations.

[Demo]()

## Getting Started

**Prerequisites**

```json
{
  "blueband_db_provider": {
    "type": "custom",
    "candid": "https://github.com/acgodson/blueband-db/releases/download/v0.0.9/blueband-db-backend.did",
    "wasm": "https://github.com/acgodson/blueband-db/releases/download/v0.0.9/blueband-db-backend.wasm.gz"
  }
}
```


## Usage

    1.	Initialize an Index

Connect to the actor and initialize an index:

```typescript
import {actor} from "./provider_actor_path";
import { useBlueBand } from "ic-use-blueband";

const ReactComponent = () = {
const { initializeIndex} = useBlueband();

const collectionId = "";

const {initializeIndex}   useBlueBand();

await initializeIndex(actor, collectionId,/*config*/);
```

    2.	Add Items

Add documents to the index:

```typescript
const { AddItem, Query } = useBlueband();

const title = "Document Title or Url";
const content = "Document content...";

await AddItem(title, content);
```

    3.  Query Items

Query the index to find documents similar to a given prompt:

```typescript
const { Query } = useBlueband();

const results = await Query("query text");
console.log(results);

//Results are ranked by similarity scores:

// [
//   {
//     "title": "Document Title",
//     "id": "document_id",
//     "score": 0.951178544877223,
//     "chunks": 1,
//     "sections": [
//       /*...*/
//     ],
//     "tokens": 156
//   },
//   {
//     "title": "Document Title",
//     "id": "document_id",
//     "score": 0.726565512777365,
//     "chunks": 4,
//     "sectio ns": [
//       /*...*/
//     ],
//     "tokens": 500
//   }
// ]
```
