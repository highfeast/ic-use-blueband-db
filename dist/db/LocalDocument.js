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
/**
 * Represents an indexed document stored on filecoin.
 */
var LocalDocument = /** @class */ (function () {
    function LocalDocument(index, id, title) {
        this._index = index;
        this._id = id;
        this._title = title;
    }
    Object.defineProperty(LocalDocument.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LocalDocument.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: false,
        configurable: true
    });
    LocalDocument.prototype.getLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            var text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadText()];
                    case 1:
                        text = _a.sent();
                        if (text.length <= 40000) {
                            return [2 /*return*/, this._index.tokenizer.encode(text).length];
                        }
                        else {
                            return [2 /*return*/, Math.ceil(text.length / 4)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalDocument.prototype.hasMetadata = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, false];
                }
                catch (err) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    //TODO: Implement metadata
    LocalDocument.prototype.loadMetadata = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                if (this._metadata == undefined) {
                    json = void 0;
                    try {
                        json = "";
                    }
                    catch (err) {
                        throw new Error("Error reading metadata for document \"".concat(this._title, "\": ").concat(err.toString()));
                    }
                    try {
                        this._metadata = JSON.parse(json);
                    }
                    catch (err) {
                        throw new Error("Error parsing metadata for document \"".concat(this._title, "\": ").concat(err.toString()));
                    }
                }
                return [2 /*return*/, this._metadata];
            });
        });
    };
    LocalDocument.prototype.loadText = function () {
        return __awaiter(this, void 0, void 0, function () {
            var documentID, store, _a, fullDocument, err_1;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(this._text == undefined)) return [3 /*break*/, 8];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this._index.getDocumentId(this._title)];
                    case 2:
                        documentID = _d.sent();
                        //then we use this ID to fetch all the chunks (texts) saved of that document
                        if (!documentID) {
                            console.log("no document ID returned");
                            throw new Error();
                        }
                        if (!((_b = this._index.indexName) !== null && _b !== void 0)) return [3 /*break*/, 3];
                        _a = _b;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this._index._actor.getMyProfile()];
                    case 4:
                        _a = (_c = (_d.sent())[0]) === null || _c === void 0 ? void 0 : _c.store;
                        _d.label = 5;
                    case 5:
                        store = _a;
                        return [4 /*yield*/, this._index._actor.getChunks(store, documentID)];
                    case 6:
                        fullDocument = _d.sent();
                        if (fullDocument) {
                            this._text = fullDocument[0];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _d.sent();
                        throw new Error("Error reading text file for document \"".concat(this.title, "\": ").concat(err_1.toString()));
                    case 8: return [2 /*return*/, this._text || ""];
                }
            });
        });
    };
    return LocalDocument;
}());
export { LocalDocument };
