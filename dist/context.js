var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import React, { createContext, useContext, useRef } from "react";
import { LocalDocumentIndex } from "./db/LocalDocumentIndex";
import { Colorize } from "./utils/Colorize";
var VectorDBContext = createContext(undefined);
export var VectorDBProvider = function (_a) {
    var children = _a.children;
    var _b = React.useState(null), localIndex = _b[0], setLocalIndex = _b[1];
    // const [actor, setActor] = React.useState<_SERVICE | null>(null);
    var actor = useRef(null);
    var _c = React.useState(null), store = _c[0], setStore = _c[1];
    var _d = React.useState(false), isEmbedding = _d[0], setIsEmbedding = _d[1];
    var _e = React.useState(false), isQuerying = _e[0], setIsQuerying = _e[1];
    var IsDocExists = function (storeId) { return __awaiter(void 0, void 0, void 0, function () {
        var info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!storeId || !actor || !actor.current) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, actor.current.getMetadataList(storeId)];
                case 1:
                    info = _a.sent();
                    if (info && info.length > 0) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    }); };
    // creates an instance of localDocument index
    var init = function (newActor, _store, api_key) { return __awaiter(void 0, void 0, void 0, function () {
        var isCatalog, newLocalIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, IsDocExists(_store)];
                case 1:
                    isCatalog = _a.sent();
                    newLocalIndex = new LocalDocumentIndex({
                        actor: newActor,
                        indexName: _store,
                        apiKey: api_key,
                        isCatalog: isCatalog,
                        chunkingConfig: {
                            chunkSize: 502,
                        },
                    });
                    actor.current = newActor;
                    setStore(_store);
                    setLocalIndex(newLocalIndex);
                    return [2 /*return*/];
            }
        });
    }); };
    // creates and saves embeddings of already added document
    var saveEmbeddings = function (docTitle, docId) { return __awaiter(void 0, void 0, void 0, function () {
        var id, documentResult, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!localIndex || !store || !actor.current) {
                        throw new Error("Index not initialized");
                    }
                    setIsEmbedding(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, localIndex.addVectors(store, docTitle, docId)];
                case 2:
                    //addvectors
                    documentResult = _a.sent();
                    console.log(documentResult);
                    id = documentResult.id;
                    return [4 /*yield*/, actor.current.endUpdate(docId)];
                case 3:
                    result = _a.sent();
                    console.log(Colorize.replaceLine(Colorize.success("embeddings finished for document-id:\"\n".concat(result))));
                    setIsEmbedding(false);
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.log(Colorize.replaceLine(Colorize.error("Error indexing: \"".concat(docTitle, "\"\n").concat(err_1.message))));
                    setIsEmbedding(false);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, { docTitle: docTitle, id: id }];
            }
        });
    }); };
    // Performs a similarity check - TODO: customize chunk config
    var similarityQuery = function (promptEmbedding) { return __awaiter(void 0, void 0, void 0, function () {
        var queryResults, results, _loop_1, _i, results_1, result, contextArray, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!localIndex || !store || !actor) {
                        throw new Error("LocalIndex-query not initialized");
                    }
                    queryResults = [];
                    setIsQuerying(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 10, , 11]);
                    return [4 /*yield*/, localIndex.queryDocuments(promptEmbedding, {
                            maxDocuments: 4,
                            maxChunks: 512,
                        })];
                case 2:
                    results = _a.sent();
                    _loop_1 = function (result) {
                        var resultObj, tokens, sectionCount, overlap, sections;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    resultObj = {
                                        tile: result.title,
                                        score: result.score,
                                        chunks: result.chunks.length,
                                        sections: [],
                                    };
                                    tokens = 500;
                                    sectionCount = 1;
                                    overlap = true;
                                    return [4 /*yield*/, result.renderSections(tokens, sectionCount, overlap)];
                                case 1:
                                    sections = _b.sent();
                                    resultObj.sections = sections.map(function (section, index) { return ({
                                        title: sectionCount === 1 ? "Section" : "Section ".concat(index + 1),
                                        score: section.score,
                                        tokens: section.tokenCount,
                                        text: section.text,
                                    }); });
                                    queryResults.push(resultObj);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, results_1 = results;
                    _a.label = 3;
                case 3:
                    if (!(_i < results_1.length)) return [3 /*break*/, 6];
                    result = results_1[_i];
                    return [5 /*yield**/, _loop_1(result)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log("these are the query results", queryResults);
                    if (!(queryResults && queryResults.length > 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, Promise.all(queryResults.map(function (x) { return __awaiter(void 0, void 0, void 0, function () {
                            var id;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, ((_a = actor.current) === null || _a === void 0 ? void 0 : _a.titleToDocumentID(store, x.tile))];
                                    case 1:
                                        id = _b.sent();
                                        return [2 /*return*/, __assign(__assign({ tile: x.tile, id: id }, x), { sections: x.sections.map(function (y) { return ({
                                                    text: y.text
                                                        .replace(/\n+/g, "\n")
                                                        .replace(/\n/g, "\\n")
                                                        .replace(/"/g, '\\"'),
                                                    tokens: y.tokens,
                                                }); }) })];
                                }
                            });
                        }); }))];
                case 7:
                    contextArray = _a.sent();
                    setIsQuerying(false);
                    return [2 /*return*/, contextArray !== null && contextArray !== void 0 ? contextArray : queryResults];
                case 8:
                    setIsQuerying(false);
                    return [2 /*return*/, queryResults];
                case 9: return [3 /*break*/, 11];
                case 10:
                    err_2 = _a.sent();
                    setIsQuerying(false);
                    Colorize.replaceLine(Colorize.error("Error quering prompt embeddings: \n".concat(err_2.message)));
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(VectorDBContext.Provider, { value: {
            store: store,
            isEmbedding: isEmbedding,
            isQuerying: isQuerying,
            init: init,
            saveEmbeddings: saveEmbeddings,
            similarityQuery: similarityQuery,
        } }, children));
};
export var useVectorDB = function () {
    var context = useContext(VectorDBContext);
    if (context === undefined) {
        throw new Error("useVectorDB must be used within a VectorDBProvider");
    }
    return context;
};
