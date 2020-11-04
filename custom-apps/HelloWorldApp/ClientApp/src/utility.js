"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utility = /** @class */ (function () {
    function Utility() {
    }
    Utility.formatDate = function (date, formatStr) {
        formatStr = formatStr.replace("yyyy", date.getFullYear().toString());
        formatStr = formatStr.replace("MM", (date.getMonth() + 1).toString().padStart(2, "0"));
        formatStr = formatStr.replace("dd", date.getDate().toString().padStart(2, "0"));
        formatStr = formatStr.replace("hh", date.getHours().toString().padStart(2, "0"));
        formatStr = formatStr.replace("mm", date.getMinutes().toString().padStart(2, "0"));
        formatStr = formatStr.replace("ss", date.getSeconds().toString().padStart(2, "0"));
        formatStr = formatStr.replace("ms", date.getMilliseconds().toString().padStart(3, "0"));
        return formatStr;
    };
    Utility.formatUtcDate = function (date, formatStr) {
        formatStr = formatStr.replace("yyyy", date.getUTCFullYear().toString());
        formatStr = formatStr.replace("MM", (date.getUTCMonth() + 1).toString().padStart(2, "0"));
        formatStr = formatStr.replace("dd", date.getUTCDate().toString().padStart(2, "0"));
        formatStr = formatStr.replace("hh", date.getUTCHours().toString().padStart(2, "0"));
        formatStr = formatStr.replace("mm", date.getUTCMinutes().toString().padStart(2, "0"));
        formatStr = formatStr.replace("ss", date.getUTCSeconds().toString().padStart(2, "0"));
        formatStr = formatStr.replace("ms", date.getUTCMilliseconds().toString().padStart(3, "0"));
        return formatStr;
    };
    Utility.formatString = function (template, values) {
        values.forEach(function (value, index) {
            template = template.replace("{" + index + "}", value);
        });
        return template;
    };
    Utility.isDifferent = function (object1, object2) {
        return JSON.stringify(object1) != JSON.stringify(object2);
    };
    Utility.getFgColours = function () {
        return [
            '#71bf44',
            //'#0F1229', navy
            //'#F3715F', red
            '#6A8BC7',
            '#29BAAB',
            '#AA8AB6',
            '#F2C23E'
        ];
    };
    return Utility;
}());
exports.Utility = Utility;
//# sourceMappingURL=utility.js.map