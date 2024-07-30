import { encode, decode } from "gpt-tokenizer";
var GPT3Tokenizer = /** @class */ (function () {
    function GPT3Tokenizer() {
    }
    GPT3Tokenizer.prototype.decode = function (tokens) {
        return decode(tokens);
    };
    GPT3Tokenizer.prototype.encode = function (text) {
        return encode(text);
    };
    return GPT3Tokenizer;
}());
export { GPT3Tokenizer };
