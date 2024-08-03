var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { v4 } from "uuid";
import { ItemSelector } from "./ItemSelector";
/**
 * Local vector index instance.
 * @remarks
 * This class is used to create, update, and query a local vector index.
 * Each index is a folder on disk containing an index.json file and an optional set of metadata files.
 */
var LocalIndex = /** @class */ (function () {
    /**
     * Creates a new instance of LocalIndex.
  
     * @param actor IC Actor
     * @param indexName Optional name of vector-store.
     */
    function LocalIndex(actor, indexName) {
        this._indexName = indexName;
        this._actor = actor;
    }
    Object.defineProperty(LocalIndex.prototype, "indexName", {
        /**
         * Optional name of the index store.
         */
        get: function () {
            return this._indexName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LocalIndex.prototype, "actor", {
        get: function () {
            return this._actor;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Begins an update to the index.
     * @remarks
     * This method loads the index into memory and prepares it for updates.
     */
    LocalIndex.prototype.beginUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._update) {
                            throw new Error("Update already in progress");
                        }
                        return [4 /*yield*/, this.loadIndexData()];
                    case 1:
                        _a.sent();
                        if (this._data) {
                            this._update = Object.assign({}, this._data);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Cancels an update to the index.
     * @remarks
     * This method discards any changes made to the index since the update began.
     */
    LocalIndex.prototype.cancelUpdate = function () {
        this._update = undefined;
    };
    /**
     * Ends an update to the index.
     * @remarks
     * This method updates the index on the cannister.
     */
    LocalIndex.prototype.endUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, item, vectorId, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this._update) {
                            throw new Error("No update in progress");
                        }
                        if (!this._actor) {
                            throw new Error("No actor found at endUpdate");
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        _i = 0, _a = this._update.items;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        item = _a[_i];
                        return [4 /*yield*/, this._actor.putVector(item.metadata.documentId.toString(), item.id, BigInt(item.metadata.startPos), BigInt(item.metadata.endPos), item.vector)];
                    case 3:
                        vectorId = _b.sent();
                        // Step 3: Handle successful publication
                        if (vectorId) {
                            console.log("vector added: ", vectorId);
                            this._data = this._update;
                            this._update = undefined;
                        }
                        else {
                            throw new Error("Failed to update index");
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _b.sent();
                        throw new Error("Error commiting vector to cannister: ".concat(err_1.message));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Loads an index from disk and returns its stats.
     * @returns Index stats.
     */
    LocalIndex.prototype.getIndexStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadIndexData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                metadata_config: this._data.metadata_config,
                                items: this._data.items.length,
                            }];
                }
            });
        });
    };
    /**
     * Returns an item from the index given its ID.
     * @param id ID of the item to retrieve.
     * @returns Item or undefined if not found.
     */
    LocalIndex.prototype.getItem = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadIndexData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this._data.items.find(function (i) { return i.id === id; })];
                }
            });
        });
    };
    /**
     * Adds an item to the index.
     * @remarks
     * A new update is started if one is not already in progress. If an item with the same ID
     * already exists, an error will be thrown.
     * @param item Item to insert.
     * @returns Inserted item.
     */
    LocalIndex.prototype.insertItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._update) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.addItemToUpdate(item, true)];
                    case 1: return [2 /*return*/, (_a.sent())];
                    case 2: return [4 /*yield*/, this.beginUpdate()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.addItemToUpdate(item, true)];
                    case 4:
                        newItem = _a.sent();
                        return [4 /*yield*/, this.endUpdate()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, newItem];
                }
            });
        });
    };
    /**
     * Returns true if the index exists.
     */
    LocalIndex.prototype.isIndexCreated = function (indexName //store name
    ) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!indexName) {
                            console.log("error, no index name or cannister principal given");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this._actor.getMetadataList(indexName)];
                    case 1:
                        data = _a.sent();
                        if (data[0]) {
                            return [2 /*return*/, true];
                        }
                        else {
                            false;
                        }
                        return [2 /*return*/, false];
                    case 2:
                        err_2 = _a.sent();
                        console.error("Error checking if index is created:", err_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns all items in the index.
     * @remarks
     * This method loads the index into memory and returns all its items. A copy of the items
     * array is returned so no modifications should be made to the array.
     * @returns Array of all items in the index.
     */
    LocalIndex.prototype.listItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadIndexData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this._data.items.slice()];
                }
            });
        });
    };
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
    LocalIndex.prototype.queryItems = function (vector, topK, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var items, norm, distances, i, item, distance, top;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadIndexData()];
                    case 1:
                        _a.sent();
                        items = this._data.items;
                        if (filter) {
                            items = items.filter(function (i) { return ItemSelector.select(i.metadata, filter); });
                        }
                        norm = ItemSelector.normalize(vector);
                        distances = [];
                        for (i = 0; i < items.length; i++) {
                            item = items[i];
                            distance = ItemSelector.normalizedCosineSimilarity(vector, norm, item.vector, item.norm ? item.norm : 1 //remove after demo and replace from contract
                            );
                            distances.push({ index: i, distance: distance });
                        }
                        // Sort by distance DESCENDING
                        distances.sort(function (a, b) { return b.distance - a.distance; });
                        top = distances.slice(0, topK).map(function (d) {
                            return {
                                item: Object.assign({}, items[d.index]),
                                score: d.distance,
                            };
                        });
                        return [2 /*return*/, top];
                }
            });
        });
    };
    /**
     * Ensures that the index has been loaded into memory.
     */
    LocalIndex.prototype.loadIndexData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var storeId, vectors, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._data && !this._indexName) {
                            console.error("data is not there");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.isIndexCreated(this._indexName)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error("Index does not exist or is empty");
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        storeId = this._indexName;
                        if (!storeId) {
                            console.log("no cannister or store id not found");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this._actor.getIndex(storeId)];
                    case 3:
                        vectors = _a.sent();
                        if (!vectors[0]) {
                            console.log("no vectors found", vectors);
                            return [2 /*return*/];
                        }
                        if (vectors[0]) {
                            result = vectors[0].items;
                            if (result.length > 0) {
                                this._data = {
                                    cannisterId: storeId,
                                    items: [
                                        {
                                            id: result[0].vectorId,
                                            metadata: {
                                                documentId: result[0].recipe_id,
                                                startPos: Number(result[0].startPos),
                                                endPos: Number(result[0].startPos),
                                            },
                                            vector: result[0].vector,
                                            norm: 0, //add this to vector-data on chain
                                        },
                                    ],
                                };
                            }
                            else {
                                this._data = {
                                    cannisterId: storeId,
                                    items: [],
                                };
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error loading index data:", error_1);
                        throw new Error("Failed to load index data");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LocalIndex.prototype.addItemToUpdate = function (item, unique) {
        return __awaiter(this, void 0, void 0, function () {
            var id, existing, metadata, newItem, existing;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                // Ensure vector is provided
                if (!item.vector) {
                    throw new Error("Vector is required");
                }
                id = (_a = item.id) !== null && _a !== void 0 ? _a : v4();
                if (unique) {
                    existing = (((_b = this._update) === null || _b === void 0 ? void 0 : _b.items) || []).find(function (i) { return i.id && i.id === id; });
                    if (existing) {
                        throw new Error("Item with id ".concat(id, " already exists"));
                    }
                }
                metadata = {};
                if (this._update && item.metadata) {
                    metadata = item.metadata;
                }
                else if (item.metadata) {
                    metadata = item.metadata;
                }
                newItem = {
                    id: id,
                    metadata: metadata,
                    vector: item.vector,
                    norm: ItemSelector.normalize(item.vector),
                };
                // Add item to index
                if (!unique) {
                    existing = (((_c = this._update) === null || _c === void 0 ? void 0 : _c.items) || []).find(function (i) { return i.id && i.id === id; });
                    if (existing) {
                        existing.metadata = newItem.metadata;
                        existing.vector = newItem.vector;
                        existing.metadataFile = newItem.metadataFile;
                        return [2 /*return*/, existing];
                    }
                    else {
                        (_d = this._update) === null || _d === void 0 ? void 0 : _d.items.push(newItem);
                        console.log("this item was added", newItem);
                        return [2 /*return*/, newItem];
                    }
                }
                else {
                    (_e = this._update) === null || _e === void 0 ? void 0 : _e.items.push(newItem);
                    console.log("this item was added", newItem);
                    return [2 /*return*/, newItem];
                }
                return [2 /*return*/];
            });
        });
    };
    return LocalIndex;
}());
export { LocalIndex };
