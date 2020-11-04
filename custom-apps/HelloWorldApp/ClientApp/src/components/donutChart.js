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
var utility_1 = require("../utility");
var google = window.google;
var DonutChart = /** @class */ (function (_super) {
    __extends(DonutChart, _super);
    function DonutChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MAX_CONCURRENT_LINES = 20;
        return _this;
    }
    DonutChart.prototype.componentWillMount = function () {
        this.initChart();
    };
    DonutChart.prototype.initChart = function () {
        var _this = this;
        var saveThis = this;
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(function () {
            var table = new google.visualization.DataTable();
            table.addColumn("string");
            table.addColumn("number");
            var hadRows = false;
            Object.keys(saveThis.props.values).map(function (key) {
                var value = saveThis.props.values[key];
                if ((!key) || (!value)) {
                    return;
                }
                table.addRow([key, value]);
                hadRows = true;
            });
            if (!hadRows) {
                table.addRow(["No data", 1]);
            }
            var options = {
                legend: { position: 'bottom' },
                pieHole: 0.6,
                colors: hadRows ? utility_1.Utility.getFgColours() : ["#eeeeee"],
                chartArea: {
                    width: "100%"
                },
                pieSliceTextStyle: {
                    // label doesn't look good on donut charts
                    opacity: 0
                },
                backgroundColor: "transparent",
            };
            var chart = new google.visualization.PieChart(_this.refs["chart"]);
            chart.draw(table, options);
        });
    };
    DonutChart.prototype.render = function () {
        return (React.createElement("div", { style: { width: "100%" } },
            React.createElement("div", { style: { textAlign: "center" } }, this.props.title),
            React.createElement("div", { style: { width: "100%" }, ref: "chart" })));
    };
    return DonutChart;
}(React.Component));
exports.DonutChart = DonutChart;
//# sourceMappingURL=donutChart.js.map