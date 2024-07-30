import * as colorizer from "json-colorizer";
import * as colorette from "colorette";
/**
 * @private
 */
var Colorize = /** @class */ (function () {
    function Colorize() {
    }
    Colorize.replaceLine = function (text) {
        return "\x1b[A\x1b[2K" + text;
    };
    Colorize.error = function (error) {
        if (typeof error === "string") {
            return "\u001B[31;1m".concat(error, "\u001B[0m");
        }
        else {
            return "\u001B[31;1m".concat(error.message, "\u001B[0m");
        }
    };
    Colorize.output = function (output, quote, units) {
        if (quote === void 0) { quote = ""; }
        if (units === void 0) { units = ""; }
        if (typeof output === "string") {
            return "\u001B[32m".concat(quote).concat(output).concat(quote, "\u001B[0m");
        }
        else if (typeof output === "object" && output !== null) {
            return colorizer.colorize(output, {
                indent: 2,
                colors: {
                    Brace: colorette.white,
                    Bracket: colorette.white,
                    Colon: colorette.white,
                    Comma: colorette.white,
                    StringKey: colorette.white,
                    StringLiteral: colorette.green,
                    NumberLiteral: colorette.blue,
                    BooleanLiteral: colorette.blue,
                    NullLiteral: colorette.blue,
                    Whitespace: colorette.white,
                },
            });
        }
        else if (typeof output == "number") {
            return "\u001B[34m".concat(output).concat(units, "\u001B[0m");
        }
        else {
            return "\u001B[34m".concat(output, "\u001B[0m");
        }
    };
    Colorize.progress = function (message) {
        return message;
    };
    Colorize.success = function (message) {
        return "\u001B[32;1m".concat(message, "\u001B[0m");
    };
    Colorize.title = function (title) {
        return "\u001B[35;1m".concat(title, "\u001B[0m");
    };
    Colorize.value = function (field, value, units) {
        if (units === void 0) { units = ""; }
        return "".concat(field, ": ").concat(Colorize.output(value, '"', units));
    };
    Colorize.warning = function (warning) {
        return "\u001B[33m".concat(warning, "\u001B[0m");
    };
    return Colorize;
}());
export { Colorize };
