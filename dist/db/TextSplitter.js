import { GPT3Tokenizer } from "./GPT3Tokenizer";
var ALPHANUMERIC_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var TextSplitter = /** @class */ (function () {
    function TextSplitter(config) {
        this._config = Object.assign({
            keepSeparators: false,
            chunkSize: 400,
            chunkOverlap: 40,
        }, config);
        // Create a default tokenizer if none is provided
        if (!this._config.tokenizer) {
            this._config.tokenizer = new GPT3Tokenizer();
        }
        // Use default separators if none are provided
        if (!this._config.separators || this._config.separators.length === 0) {
            this._config.separators = this.getSeparators();
        }
        // Validate the config settings
        if (this._config.chunkSize < 1) {
            throw new Error("chunkSize must be >= 1");
        }
        else if (this._config.chunkOverlap < 0) {
            throw new Error("chunkOverlap must be >= 0");
        }
        else if (this._config.chunkOverlap > this._config.chunkSize) {
            throw new Error("chunkOverlap must be <= chunkSize");
        }
    }
    TextSplitter.prototype.split = function (text) {
        // Get basic chunks
        var chunks = this.recursiveSplit(text, this._config.separators, 0);
        var that = this;
        function getOverlapTokens(tokens) {
            if (tokens != undefined) {
                var len = tokens.length > that._config.chunkOverlap
                    ? that._config.chunkOverlap
                    : tokens.length;
                return tokens.slice(0, len);
            }
            else {
                return [];
            }
        }
        // Add overlap tokens and text to the start and end of each chunk
        if (this._config.chunkOverlap > 0) {
            for (var i = 1; i < chunks.length; i++) {
                var previousChunk = chunks[i - 1];
                var chunk = chunks[i];
                var nextChunk = i < chunks.length - 1 ? chunks[i + 1] : undefined;
                chunk.startOverlap = getOverlapTokens(previousChunk.tokens.reverse()).reverse();
                chunk.endOverlap = getOverlapTokens(nextChunk === null || nextChunk === void 0 ? void 0 : nextChunk.tokens);
            }
        }
        return chunks;
    };
    TextSplitter.prototype.recursiveSplit = function (text, separators, startPos) {
        var chunks = [];
        if (text.length > 0) {
            // Split text into parts
            var parts = void 0;
            var separator = "";
            var nextSeparators = separators.length > 1 ? separators.slice(1) : [];
            if (separators.length > 0) {
                // Split by separator
                separator = separators[0];
                parts =
                    separator == " " ? this.splitBySpaces(text) : text.split(separator);
            }
            else {
                // Cut text in half
                var half = Math.floor(text.length / 2);
                parts = [text.substring(0, half), text.substring(half)];
            }
            // Iterate over parts
            for (var i = 0; i < parts.length; i++) {
                var lastChunk = i === parts.length - 1;
                // Get chunk text and endPos
                var chunk = parts[i];
                var endPos = startPos + (chunk.length - 1) + (lastChunk ? 0 : separator.length);
                if (this._config.keepSeparators && !lastChunk) {
                    chunk += separator;
                }
                // Ensure chunk contains text
                if (!this.containsAlphanumeric(chunk)) {
                    continue;
                }
                // Optimization to avoid encoding really large chunks
                if (chunk.length / 6 > this._config.chunkSize) {
                    // Break the text into smaller chunks
                    var subChunks = this.recursiveSplit(chunk, nextSeparators, startPos);
                    chunks.push.apply(chunks, subChunks);
                }
                else {
                    // Encode chunk text
                    var tokens = this._config.tokenizer.encode(chunk);
                    if (tokens.length > this._config.chunkSize) {
                        // Break the text into smaller chunks
                        var subChunks = this.recursiveSplit(chunk, nextSeparators, startPos);
                        chunks.push.apply(chunks, subChunks);
                    }
                    else {
                        // Append chunk to output
                        chunks.push({
                            text: chunk,
                            tokens: tokens,
                            startPos: startPos,
                            endPos: endPos,
                            startOverlap: [],
                            endOverlap: [],
                        });
                    }
                }
                // Update startPos
                startPos = endPos + 1;
            }
        }
        return this.combineChunks(chunks);
    };
    TextSplitter.prototype.combineChunks = function (chunks) {
        var _a;
        var combinedChunks = [];
        var currentChunk;
        var currentLength = 0;
        var separator = this._config.keepSeparators ? "" : " ";
        for (var i = 0; i < chunks.length; i++) {
            var chunk = chunks[i];
            if (currentChunk) {
                var length_1 = currentChunk.tokens.length + chunk.tokens.length;
                if (length_1 > this._config.chunkSize) {
                    combinedChunks.push(currentChunk);
                    currentChunk = chunk;
                    currentLength = chunk.tokens.length;
                }
                else {
                    currentChunk.text += separator + chunk.text;
                    currentChunk.endPos = chunk.endPos;
                    (_a = currentChunk.tokens).push.apply(_a, chunk.tokens);
                    currentLength += chunk.tokens.length;
                }
            }
            else {
                currentChunk = chunk;
                currentLength = chunk.tokens.length;
            }
        }
        if (currentChunk) {
            combinedChunks.push(currentChunk);
        }
        return combinedChunks;
    };
    TextSplitter.prototype.containsAlphanumeric = function (text) {
        for (var i = 0; i < text.length; i++) {
            if (ALPHANUMERIC_CHARS.includes(text[i])) {
                return true;
            }
        }
        return false;
    };
    TextSplitter.prototype.splitBySpaces = function (text) {
        var parts = [];
        var words = text.split(" ");
        if (words.length > 0) {
            var part = words[0];
            for (var i = 1; i < words.length; i++) {
                var nextWord = words[i];
                if (this._config.tokenizer.encode(part + " " + nextWord).length <=
                    this._config.chunkSize) {
                    part += " " + nextWord;
                }
                else {
                    parts.push(part);
                    part = nextWord;
                }
            }
            parts.push(part);
        }
        else {
            parts.push(text);
        }
        return parts;
    };
    TextSplitter.prototype.getSeparators = function () {
        return [
            // For splitting by double newlines, useful for paragraphs
            "\n\n",
            // For splitting by single newlines, useful for lines or sentences
            "\n",
            // For splitting by spaces, useful for words
            " ",
            // JSON-specific separators, can be added if necessary
            // ",", // For array elements or object properties
            // ":", // For key-value pairs
        ];
    };
    return TextSplitter;
}());
export { TextSplitter };
