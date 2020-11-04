"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var flowgearSdk_1 = require("./flowgearSdk");
var utility_1 = require("../utility");
var google = window.google;
var TimeChart = /** @class */ (function (_super) {
    __extends(TimeChart, _super);
    function TimeChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MAX_CONCURRENT_LINES = 20;
        return _this;
    }
    TimeChart.prototype.componentWillMount = function () {
        this.initChart();
    };
    TimeChart.prototype.initChart = function () {
        var _this = this;
        var saveThis = this;
        google.charts.load('current', { 'packages': ['corechart', 'line'] });
        google.charts.setOnLoadCallback(function () {
            var table = new google.visualization.DataTable();
            var hashTable = {};
            var timeProperty = saveThis.props.timeProperty;
            var seriesNames = [];
            saveThis.props.data.forEach(function (element) {
                var timestamp = element[timeProperty];
                if (!hashTable[timestamp]) {
                    hashTable[timestamp] = {};
                }
                Object.keys(saveThis.props.series).forEach(function (seriesName) {
                    if (seriesNames.indexOf(seriesName) == -1) {
                        seriesNames.push(seriesName);
                    }
                    hashTable[timestamp][seriesName] = parseFloat(element[saveThis.props.series[seriesName]]);
                });
            });
            var arrayTable = new Array();
            // put the series names in row 1
            arrayTable.push(["Timestamp"].concat(seriesNames));
            // load in the rest of the data as a set of rows
            Object.keys(hashTable).forEach(function (timestamp) {
                var cells = [timestamp];
                seriesNames.forEach(function (seriesName) { cells.push(hashTable[timestamp][seriesName]); });
                arrayTable.push(cells);
            });
            var options = {
                legend: {
                    position: "bottom",
                    textStyle: {
                        fontSize: 14
                    }
                },
                lineWidth: 3,
                colors: utility_1.Utility.getFgColours(),
                theme: "dark",
                hAxis: {
                    slantedText: true,
                    showTextEvery: 10
                },
                vAxis: {
                    baseline: 0
                },
                chartArea: {
                    top: 20,
                    bottom: 100,
                    left: 50,
                    right: 0,
                    height: "100%",
                    width: "100%"
                },
                backgroundColor: "transparent"
            };
            var dataTable = google.visualization.arrayToDataTable(arrayTable);
            // charts crash the browser when there are too many
            var excluded = 0;
            while (dataTable.getNumberOfColumns() > _this.MAX_CONCURRENT_LINES + 1) {
                dataTable.removeColumn(dataTable.getNumberOfColumns() - 1);
                excluded++;
            }
            if (excluded > 0) {
                flowgearSdk_1.Flowgear.Sdk.setAlert("Only showing first 20 lines,", flowgearSdk_1.Flowgear.Sdk.AlertMessageTypes.Warning, flowgearSdk_1.Flowgear.Sdk.AlertDismissOptions.Auto);
            }
            var chart = new google.visualization.LineChart(_this.refs["chart"]);
            chart.draw(dataTable, options);
        });
    };
    TimeChart.prototype.render = function () {
        return (React.createElement("div", { style: { width: "100%" } },
            React.createElement("div", { style: { textAlign: "center" } }, this.props.title),
            React.createElement("div", { style: { width: "100%" }, ref: "chart" })));
    };
    return TimeChart;
}(React.Component));
exports.TimeChart = TimeChart;
//# sourceMappingURL=timeChart.js.map