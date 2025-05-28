

export class Utility {

    static formatDate(date: Date, formatStr: string) {

        formatStr = formatStr.replace("yyyy", date.getFullYear().toString());
        formatStr = formatStr.replace("MM", (date.getMonth() + 1).toString().padStart(2, "0"));
        formatStr = formatStr.replace("dd", date.getDate().toString().padStart(2, "0"));

        formatStr = formatStr.replace("hh", date.getHours().toString().padStart(2, "0"));
        formatStr = formatStr.replace("mm", date.getMinutes().toString().padStart(2, "0"));
        formatStr = formatStr.replace("ss", date.getSeconds().toString().padStart(2, "0"));
        formatStr = formatStr.replace("ms", date.getMilliseconds().toString().padStart(3, "0"));

        return formatStr;
    }

    static formatUtcDate(date: Date, formatStr: string) {

        formatStr = formatStr.replace("yyyy", date.getUTCFullYear().toString());
        formatStr = formatStr.replace("MM", (date.getUTCMonth() + 1).toString().padStart(2, "0"));
        formatStr = formatStr.replace("dd", date.getUTCDate().toString().padStart(2, "0"));

        formatStr = formatStr.replace("hh", date.getUTCHours().toString().padStart(2, "0"));
        formatStr = formatStr.replace("mm", date.getUTCMinutes().toString().padStart(2, "0"));
        formatStr = formatStr.replace("ss", date.getUTCSeconds().toString().padStart(2, "0"));
        formatStr = formatStr.replace("ms", date.getUTCMilliseconds().toString().padStart(3, "0"));

        return formatStr;
    }

    static formatString(template: string, values: Array<any>) {

        values.forEach((value, index) => {
            template = template.replace("{" + index + "}", value);
        });

        return template;
    }

    static isDifferent(object1, object2) {
        return JSON.stringify(object1) != JSON.stringify(object2);
    }

    static getFgColours() {

        return [
            '#71bf44',
            //'#0F1229', navy
            //'#F3715F', red
            '#6A8BC7',
            '#29BAAB',
            '#AA8AB6',
            '#F2C23E'
        ];

    }
}