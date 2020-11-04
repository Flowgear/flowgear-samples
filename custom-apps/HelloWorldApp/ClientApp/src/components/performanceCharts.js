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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var flowgearSdk_1 = require("./flowgearSdk");
var timeChart_1 = require("./timeChart");
var keys_1 = require("../types/keys");
var utility_1 = require("../utility");
var PerformanceCharts = /** @class */ (function (_super) {
    __extends(PerformanceCharts, _super);
    function PerformanceCharts(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            perfKeyFields: keys_1.Keys.ENG_SITEID,
            perfChartData: null,
        };
        return _this;
    }
    PerformanceCharts.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (utility_1.Utility.isDifferent(this.props, prevProps)) {
            this.handleRefresh();
        }
    };
    PerformanceCharts.prototype.render = function () {
        if (!this.state.perfChartData) {
            return null;
        }
        return (React.createElement("div", null,
            React.createElement("div", { className: "big-text" }, "Performance"),
            React.createElement("div", null,
                React.createElement("div", { className: "chart-block" },
                    React.createElement(timeChart_1.TimeChart, { timeProperty: keys_1.Keys.GEN_SNAPSHOTTIME, series: {
                            "All": keys_1.Keys.ENG_ACTIVETASKS,
                        }, title: "Active Workflows", data: this.state.perfChartData })),
                React.createElement("div", { className: "chart-block" },
                    React.createElement(timeChart_1.TimeChart, { timeProperty: keys_1.Keys.GEN_SNAPSHOTTIME, series: {
                            "API": keys_1.Keys.ENG_ACTIVETASKS_API,
                            "Always On": keys_1.Keys.ENG_ACTIVETASKS_ALWAYSON,
                            "Other": keys_1.Keys.ENG_ACTIVETASKS_OTHER,
                        }, title: "Active Workflows by Mode", data: this.state.perfChartData })),
                React.createElement("div", { className: "chart-block" },
                    React.createElement(timeChart_1.TimeChart, { timeProperty: keys_1.Keys.GEN_SNAPSHOTTIME, series: {
                            "Workflows": keys_1.Keys.ENG_TOPWORKFLOWSTART,
                            "Sub-Workflows": keys_1.Keys.ENG_SUBWORKFLOWSTART,
                        }, title: "Workflow Starts", data: this.state.perfChartData })),
                React.createElement("div", { className: "chart-block" },
                    React.createElement(timeChart_1.TimeChart, { timeProperty: keys_1.Keys.GEN_SNAPSHOTTIME, series: {
                            "Total": keys_1.Keys.ENG_NODEINVOKESTART,
                            "Errors": keys_1.Keys.ENG_NODEINVOKEEXCEPTION
                        }, title: "Node Invokes", data: this.state.perfChartData })))));
    };
    PerformanceCharts.prototype.handleRefresh = function () {
        if (this.props.timeSecs == 0) {
            this.setState({
                perfChartData: null
            });
            return;
        }
        var endDate = new Date();
        var startDate = new Date();
        startDate.setSeconds(startDate.getSeconds() - this.props.timeSecs);
        this.handleGetPerfData(startDate, endDate);
    };
    PerformanceCharts.prototype.handleGetPerfData = function (startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var timeResSecs, urlTemplate, url, perfChartData, saveThis;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timeResSecs = 14400;
                        if (this.props.timeSecs <= 3600) {
                            // up to 1 hour, use a 1 minute resolution
                            timeResSecs = 60;
                        }
                        else if (this.props.timeSecs <= 14400) {
                            // up to 4 hours, use a 5 minute resolution
                            timeResSecs = 300;
                        }
                        else if (this.props.timeSecs <= 86400) {
                            // up to 1 day, use a 15 minute resolution
                            timeResSecs = 900;
                        }
                        else {
                            // more than 1 day, use a 4 hour resolution
                            timeResSecs = 14400;
                        }
                        urlTemplate = "https://api{0}.flowgear.net/sites/{1}/performance/?startDate={2}&endDate={3}&keyFields={4}&timeResSecs={5}";
                        url = utility_1.Utility.formatString(urlTemplate, [
                            this.props.pod,
                            this.props.siteId,
                            utility_1.Utility.formatUtcDate(startDate, "yyyy-MM-dd hh:mm"),
                            utility_1.Utility.formatUtcDate(endDate, "yyyy-MM-dd hh:mm"),
                            this.state.perfKeyFields,
                            timeResSecs
                        ]);
                        return [4 /*yield*/, flowgearSdk_1.Flowgear.Sdk.invoke(url)];
                    case 1:
                        perfChartData = (_a.sent()).response;
                        this.prepareChartData(perfChartData);
                        saveThis = this;
                        if (perfChartData.length == 0) {
                            perfChartData = this.generateDummyPerfChartData();
                        }
                        this.setState({
                            perfChartData: null
                        }, function () {
                            saveThis.setState({
                                perfChartData: perfChartData
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PerformanceCharts.prototype.prepareChartData = function (chartData) {
        for (var i = 0; i < chartData.length; i++) {
            var dateTime = chartData[i][keys_1.Keys.GEN_SNAPSHOTTIME];
            // if you're gonna put this back, make sure it looks ok
            if (this.props.timeSecs <= 86400) {
                // if we're looking at less than 24 hrs, format hh:mm
                chartData[i][keys_1.Keys.GEN_SNAPSHOTTIME] = utility_1.Utility.formatDate(new Date(chartData[i][keys_1.Keys.GEN_SNAPSHOTTIME]), "hh:mm");
            }
            else {
                chartData[i][keys_1.Keys.GEN_SNAPSHOTTIME] = utility_1.Utility.formatDate(new Date(chartData[i][keys_1.Keys.GEN_SNAPSHOTTIME]), "dd/MM hh:mm");
            }
            // other invoke types is the difference between total tasks and api + always on tasks
            chartData[i][keys_1.Keys.CLIENTSIDE_ACTIVETASKS_OTHER] = chartData[i][keys_1.Keys.ENG_ACTIVETASKS] - (chartData[i][keys_1.Keys.ENG_ACTIVETASKS_API] + chartData[i][keys_1.Keys.ENG_ACTIVETASKS_ALWAYSON]);
            // implement the series name property. this is a composite of multiple properties but must be bound from a single property
            var siteId = chartData[i][keys_1.Keys.ENG_SITEID];
        }
    };
    PerformanceCharts.prototype.generateDummyPerfChartData = function () {
        var data = new Array();
        var currentDateTime = Date.now();
        for (var i = 0; i < 60; i++) {
            var row = new Object();
            row[keys_1.Keys.GEN_SNAPSHOTTIME] = utility_1.Utility.formatDate(new Date(currentDateTime), "hh:mm");
            data.unshift(row);
            currentDateTime -= 60000;
        }
        return data;
    };
    return PerformanceCharts;
}(React.Component));
exports.PerformanceCharts = PerformanceCharts;
//# sourceMappingURL=performanceCharts.js.map