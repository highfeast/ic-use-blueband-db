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
import { LocalDocumentIndex } from "./db/LocalDocumentIndex";
import dotenv from "dotenv";
dotenv.config();
var OPENAI_KEY = process.env.OPENAI_KEY;
var BlueBand = /** @class */ (function () {
    function BlueBand(actor, collectionId, logFunction) {
        var _this = this;
        this.actor = actor;
        this.logFunction = logFunction;
        this.getCollectionPrincipal = function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.collectionId)
                            throw new Error("Sign in required");
                        return [4 /*yield*/, this.actor.getCollectionPrincipal(this.collectionId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.getDocumentID = function (title) { return __awaiter(_this, void 0, void 0, function () {
            var info, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.actor || !this.collectionId)
                            throw new Error("Index is not initialized");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.actor.titleToDocumentID(this.collectionId, title)];
                    case 2:
                        info = _a.sent();
                        return [2 /*return*/, info[0]];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getDocumentTitle = function (docId) { return __awaiter(_this, void 0, void 0, function () {
            var info, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.collectionId)
                            throw new Error("Sign in required");
                        return [4 /*yield*/, this.actor.documentIDToTitle(this.collectionId, docId)];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/, info[0]];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.collectionId = collectionId;
    }
    BlueBand.prototype.log = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.logFunction) {
                    this.logFunction(text);
                }
                else {
                    console.log(text);
                }
                return [2 /*return*/];
            });
        });
    };
    BlueBand.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isCatalog, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!OPENAI_KEY)
                            throw new Error("OPENAI_KEY is not defined");
                        return [4 /*yield*/, this.IsDocExists(this.collectionId)];
                    case 1:
                        isCatalog = _a.sent();
                        if (this.collectionId) {
                            config = {
                                actor: this.actor,
                                indexName: this.collectionId,
                                apiKey: OPENAI_KEY,
                                isCatalog: isCatalog,
                                _getDocumentId: this.getDocumentID,
                                _getDocumentTitle: this.getDocumentTitle,
                                chunkingConfig: {
                                    chunkSize: 502,
                                },
                            };
                            return [2 /*return*/, new LocalDocumentIndex(config)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BlueBand.prototype.IsDocExists = function (collectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!collectionId || !this.actor)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, this.actor.getMetadataList(collectionId)];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/, info && info.length > 0];
                }
            });
        });
    };
    BlueBand.prototype.addDocumentAndVector = function (index, title, parsedContent) {
        return __awaiter(this, void 0, void 0, function () {
            var result, bucketPrincipal, documentId, documentResult;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.log("Adding document: ".concat(title));
                        return [4 /*yield*/, this.actor.addDocument(this.collectionId, title, parsedContent)];
                    case 1:
                        result = _c.sent();
                        bucketPrincipal = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.collection[0];
                        documentId = (_b = result[0]) === null || _b === void 0 ? void 0 : _b.documentId[0];
                        this.log("Document added. ID: ".concat(documentId, ", Bucket: ").concat(bucketPrincipal.toText()));
                        if (!documentId || !bucketPrincipal) {
                            throw new Error("Failed to add document");
                        }
                        return [4 /*yield*/, index.addVectors(this.collectionId, title, documentId)];
                    case 2:
                        documentResult = _c.sent();
                        this.log("Vector added for document. ID: ".concat(documentResult.id));
                        return [4 /*yield*/, this.actor.endUpdate(this.collectionId, documentResult.id)];
                    case 3:
                        _c.sent();
                        this.log("Vector update frozen for document");
                        return [2 /*return*/, {
                                documentId: documentId,
                                bucketPrincipal: bucketPrincipal.toText(),
                                vectorId: documentResult.id,
                            }];
                }
            });
        });
    };
    BlueBand.prototype.similarityQuery = function (index, prompt) {
        return __awaiter(this, void 0, void 0, function () {
            var response, embedding, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        this.log("Generating embedding for prompt: ".concat(prompt));
                        return [4 /*yield*/, this.actor.generateEmbeddings([prompt], OPENAI_KEY)];
                    case 2:
                        response = _a.sent();
                        if (!("success" in response)) return [3 /*break*/, 4];
                        embedding = JSON.parse(response.success).data[0].embedding;
                        this.log("Embedding generated successfully");
                        return [4 /*yield*/, index.queryDocuments(embedding, {
                                maxDocuments: 4,
                                maxChunks: 512,
                            })];
                    case 3:
                        results = _a.sent();
                        this.log("Query returned ".concat(results.length, " results"));
                        return [2 /*return*/, Promise.all(results.map(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var sections, id;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, result.renderSections(500, 1, true)];
                                        case 1:
                                            sections = _a.sent();
                                            console.log("assumed title", result.title);
                                            return [4 /*yield*/, this.getDocumentID(result.title)];
                                        case 2:
                                            id = _a.sent();
                                            return [2 /*return*/, {
                                                    title: result.title,
                                                    id: id,
                                                    score: result.score,
                                                    chunks: result.chunks.length,
                                                    sections: sections.map(function (section) { return ({
                                                        text: section.text
                                                            .replace(/\n+/g, "\n")
                                                            .replace(/\n/g, "\\n")
                                                            .replace(/"/g, '\\"'),
                                                        tokens: section.tokenCount,
                                                    }); }),
                                                }];
                                    }
                                });
                            }); }))];
                    case 4: throw new Error("Error generating embedding");
                }
            });
        });
    };
    BlueBand.prototype.getDocuments = function (collectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, embedding;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!collectionId || !this.actor)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.actor.getMetadataList(collectionId)];
                    case 1:
                        result = _a.sent();
                        if (!result[0]) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.actor.getIndex(collectionId)];
                    case 2:
                        embedding = _a.sent();
                        return [2 /*return*/, { documents: result[0], embedding: embedding }];
                    case 3: return [2 /*return*/, { documents: [], embedding: null }];
                }
            });
        });
    };
    return BlueBand;
}());
export { BlueBand };
