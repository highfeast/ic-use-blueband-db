var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { GPT3Tokenizer } from "./GPT3Tokenizer";
import { LocalIndex } from "./LocalIndex";
import { TextSplitter } from "./TextSplitter";
import { LocalDocumentResult } from "./LocalDocumentResult";
import { LocalDocument } from "./LocalDocument";
var LocalDocumentIndex = /** @class */ (function (_super) {
    __extends(LocalDocumentIndex, _super);
    function LocalDocumentIndex(config) {
        var _this = _super.call(this, config.actor, config.indexName) || this;
        _this._apiKey = config.apiKey;
        _this._chunkingConfig = Object.assign({
            keepSeparators: true,
            chunkSize: 512,
            chunkOverlap: 0,
        }, config.chunkingConfig);
        _this._tokenizer = new GPT3Tokenizer();
        _this._chunkingConfig.tokenizer = _this._tokenizer;
        _this.isCatalog = config.isCatalog;
        return _this;
    }
    Object.defineProperty(LocalDocumentIndex.prototype, "embeddings", {
        get: function () {
            return this._embeddings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LocalDocumentIndex.prototype, "tokenizer", {
        get: function () {
            return this._tokenizer;
        },
        enumerable: false,
        configurable: true
    });
    LocalDocumentIndex.prototype.isCatalogCreated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, (_a = this.isCatalog) !== null && _a !== void 0 ? _a : false];
            });
        });
    };
    LocalDocumentIndex.prototype.getDocumentId = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.loadIndexData()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, ((_a = this.actor) === null || _a === void 0 ? void 0 : _a.titleToDocumentID(this.indexName, title))];
                    case 2:
                        x = _c.sent();
                        return [2 /*return*/, (_b = x[0]) !== null && _b !== void 0 ? _b : undefined];
                }
            });
        });
    };
    LocalDocumentIndex.prototype.getDocumentTitle = function (documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var x, e_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.loadIndexData()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, ((_a = this.actor) === null || _a === void 0 ? void 0 : _a.documentIDToTitle(this.indexName, documentId))];
                    case 2:
                        x = _c.sent();
                        console.log("found uri", x);
                        return [2 /*return*/, (_b = x[0]) !== null && _b !== void 0 ? _b : undefined];
                    case 3:
                        e_1 = _c.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LocalDocumentIndex.prototype.addVectors = function (storeId, docTitle, docId) {
        return __awaiter(this, void 0, void 0, function () {
            var recoveredChunks, content, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._actor.getChunks(storeId, docId)];
                    case 1:
                        recoveredChunks = _a.sent();
                        if (!recoveredChunks[0]) return [3 /*break*/, 3];
                        content = recoveredChunks[0];
                        return [4 /*yield*/, this.upsertDocument(docId, docTitle, content)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LocalDocumentIndex.prototype.upsertDocument = function (docId, title, text, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var documentId, splitter, chunks, totalTokens, chunkBatches, currentBatch, _i, chunks_1, chunk, embeddings, _a, chunkBatches_1, rawBatch, result, batch, response, x, err_1, _b, result_1, embedding, i, chunk, embedding, chunkMetadata, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        documentId = docId;
                        if (!documentId) {
                            throw new Error("No document ID given");
                        }
                        splitter = new TextSplitter();
                        chunks = splitter.split(text);
                        totalTokens = 0;
                        chunkBatches = [];
                        currentBatch = [];
                        for (_i = 0, chunks_1 = chunks; _i < chunks_1.length; _i++) {
                            chunk = chunks_1[_i];
                            totalTokens += chunk.tokens.length;
                            if (totalTokens > 8000) {
                                chunkBatches.push(currentBatch);
                                currentBatch = [];
                                totalTokens = chunk.tokens.length;
                            }
                            currentBatch.push(chunk.text.replace(/\n/g, " "));
                        }
                        if (currentBatch.length > 0) {
                            chunkBatches.push(currentBatch);
                        }
                        embeddings = [];
                        _a = 0, chunkBatches_1 = chunkBatches;
                        _c.label = 1;
                    case 1:
                        if (!(_a < chunkBatches_1.length)) return [3 /*break*/, 7];
                        rawBatch = chunkBatches_1[_a];
                        result = void 0;
                        batch = this.formatBatch(rawBatch);
                        console.log("this batch", batch);
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this._actor.generateEmbeddings(batch, this._apiKey)];
                    case 3:
                        response = _c.sent();
                        x = JSON.parse(result);
                        result = x;
                        console.log(result);
                        if (response.status < 300) {
                            result = response.data.data
                                .sort(function (a, b) { return a.index - b.index; })
                                .map(function (item) { return item.embedding; });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _c.sent();
                        throw new Error("Error generating embeddings: ".concat(err_1.toString()));
                    case 5:
                        if (result) {
                            for (_b = 0, result_1 = result; _b < result_1.length; _b++) {
                                embedding = result_1[_b];
                                embeddings.push(embedding);
                            }
                        }
                        _c.label = 6;
                    case 6:
                        _a++;
                        return [3 /*break*/, 1];
                    case 7:
                        console.log("this is the embeddings before insertion", embeddings);
                        // Add document chunks to index
                        return [4 /*yield*/, this.beginUpdate()];
                    case 8:
                        // Add document chunks to index
                        _c.sent();
                        _c.label = 9;
                    case 9:
                        _c.trys.push([9, 15, , 16]);
                        i = 0;
                        _c.label = 10;
                    case 10:
                        if (!(i < chunks.length)) return [3 /*break*/, 13];
                        chunk = chunks[i];
                        embedding = embeddings[i];
                        chunkMetadata = Object.assign({
                            documentId: documentId,
                            startPos: chunk.startPos,
                            endPos: chunk.endPos,
                        }, metadata);
                        return [4 /*yield*/, this.insertItem({
                                id: v4(),
                                metadata: chunkMetadata,
                                vector: embedding,
                            })];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12:
                        i++;
                        return [3 /*break*/, 10];
                    case 13: 
                    // Commit changes
                    return [4 /*yield*/, this.endUpdate()];
                    case 14:
                        // Commit changes
                        _c.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        err_2 = _c.sent();
                        // Cancel update and raise error
                        this.cancelUpdate();
                        throw new Error("Error adding document \"".concat(title, "\": ").concat(err_2.toString()));
                    case 16: 
                    // Return document
                    return [2 /*return*/, new LocalDocument(this, documentId, title)];
                }
            });
        });
    };
    LocalDocumentIndex.prototype.listDocuments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var docs, chunks, results, _a, _b, _c, _i, documentId, title, documentResult;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        docs = {};
                        return [4 /*yield*/, this.listItems()];
                    case 1:
                        chunks = _d.sent();
                        chunks.forEach(function (chunk) {
                            var metadata = chunk.metadata;
                            //TODO: verify this
                            if (docs[metadata.documentId] == undefined ||
                                docs[metadata.documentId].length < 1) {
                                docs[metadata.documentId] = [];
                            }
                            docs[metadata.documentId].push({ item: chunk, score: 1.0 }); //TODO: replace
                        });
                        results = [];
                        _a = docs;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 4];
                        documentId = _c;
                        return [4 /*yield*/, this.getDocumentTitle(documentId)];
                    case 3:
                        title = _d.sent();
                        documentResult = new LocalDocumentResult(this, documentId, title, docs[documentId], this._tokenizer);
                        results.push(documentResult);
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, results];
                }
            });
        });
    };
    LocalDocumentIndex.prototype.queryDocuments = function (queryEmbedding, options) {
        return __awaiter(this, void 0, void 0, function () {
            var results, documentChunks, _i, results_1, result, metadata, documentResults, _a, _b, _c, _d, documentId, chunks, title, documentResult;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        // Ensure options are defined
                        options = Object.assign({
                            maxDocuments: 10,
                            maxChunks: 1500,
                        }, options);
                        // Check for error
                        if (!queryEmbedding) {
                            throw new Error("no embeddings  found for query");
                        }
                        return [4 /*yield*/, this.queryItems(queryEmbedding, options.maxChunks, options.filter)];
                    case 1:
                        results = _e.sent();
                        console.log("returned query embedding", results);
                        documentChunks = {};
                        for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                            result = results_1[_i];
                            metadata = result.item.metadata;
                            if (documentChunks[metadata.documentId] == undefined) {
                                documentChunks[metadata.documentId] = [];
                            }
                            documentChunks[metadata.documentId].push(result);
                        }
                        documentResults = [];
                        _a = documentChunks;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _d = 0;
                        _e.label = 2;
                    case 2:
                        if (!(_d < _b.length)) return [3 /*break*/, 5];
                        _c = _b[_d];
                        if (!(_c in _a)) return [3 /*break*/, 4];
                        documentId = _c;
                        chunks = documentChunks[documentId];
                        console.log("new chunks id", documentId);
                        if (!documentId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getDocumentTitle(documentId)];
                    case 3:
                        title = _e.sent();
                        documentResult = new LocalDocumentResult(this, documentId, title, chunks, this._tokenizer);
                        documentResults.push(documentResult);
                        _e.label = 4;
                    case 4:
                        _d++;
                        return [3 /*break*/, 2];
                    case 5: 
                    // Sort document results by score and return top results
                    return [2 /*return*/, documentResults
                            .sort(function (a, b) { return b.score - a.score; })
                            .slice(0, options.maxDocuments)];
                }
            });
        });
    };
    LocalDocumentIndex.prototype.beginUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.beginUpdate.call(this)];
                    case 1:
                        _a.sent();
                        this._newCatalog = Object.assign({}, this._catalog);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalDocumentIndex.prototype.cancelUpdate = function () {
        _super.prototype.cancelUpdate.call(this);
        this._newCatalog = undefined;
    };
    LocalDocumentIndex.prototype.endUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.endUpdate.call(this)];
                    case 1:
                        _a.sent();
                        try {
                            // Save catalog on smart contract
                            this._catalog = this._newCatalog;
                            this._newCatalog = undefined;
                        }
                        catch (err) {
                            throw new Error("Error saving document catalog: ".concat(err.toString()));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalDocumentIndex.prototype.formatBatch = function (batch) {
        return batch.map(function (item) { return item.replace(/"/g, '\\"'); });
    };
    LocalDocumentIndex.prototype.loadIndexData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.loadIndexData.call(this)];
                    case 1:
                        _a.sent();
                        if (this._catalog) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.isCatalogCreated()];
                    case 2:
                        //creating catalog on the smart contract
                        if (_a.sent()) {
                            this._catalog = {
                                version: 0,
                                count: 0,
                                uriToId: {},
                                idToUri: {},
                            };
                        }
                        else {
                            this._catalog = {
                                version: 0,
                                count: 0,
                                uriToId: {},
                                idToUri: {},
                            };
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return LocalDocumentIndex;
}(LocalIndex));
export { LocalDocumentIndex };
