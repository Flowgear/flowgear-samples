"use strict";
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
var Flowgear;
(function (Flowgear) {
    var Sdk;
    (function (Sdk) {
        var FgSdkMessage = /** @class */ (function () {
            function FgSdkMessage() {
            }
            return FgSdkMessage;
        }());
        var _lastMessageId = 0;
        var _awaitedResponses = {};
        var ConfirmResult;
        (function (ConfirmResult) {
            ConfirmResult[ConfirmResult["Yes"] = 0] = "Yes";
            ConfirmResult[ConfirmResult["No"] = 1] = "No";
        })(ConfirmResult = Sdk.ConfirmResult || (Sdk.ConfirmResult = {}));
        var GetTextResult;
        (function (GetTextResult) {
            GetTextResult[GetTextResult["Ok"] = 0] = "Ok";
            GetTextResult[GetTextResult["Cancel"] = 1] = "Cancel";
        })(GetTextResult = Sdk.GetTextResult || (Sdk.GetTextResult = {}));
        var AlertMessageTypes;
        (function (AlertMessageTypes) {
            AlertMessageTypes[AlertMessageTypes["Info"] = 0] = "Info";
            AlertMessageTypes[AlertMessageTypes["Warning"] = 1] = "Warning";
            AlertMessageTypes[AlertMessageTypes["Error"] = 2] = "Error";
            AlertMessageTypes[AlertMessageTypes["Success"] = 3] = "Success";
            AlertMessageTypes[AlertMessageTypes["Help"] = 4] = "Help";
            AlertMessageTypes[AlertMessageTypes["Running"] = 5] = "Running";
        })(AlertMessageTypes = Sdk.AlertMessageTypes || (Sdk.AlertMessageTypes = {}));
        var AlertDismissOptions;
        (function (AlertDismissOptions) {
            AlertDismissOptions[AlertDismissOptions["ViewChange"] = 0] = "ViewChange";
            AlertDismissOptions[AlertDismissOptions["Auto"] = 1] = "Auto";
            AlertDismissOptions[AlertDismissOptions["Tap"] = 2] = "Tap"; // alert will dismiss when tapped or when view changes
        })(AlertDismissOptions = Sdk.AlertDismissOptions || (Sdk.AlertDismissOptions = {}));
        function init() {
            // this is only a warning - in dev of Console we'll be using http
            if (window.location.protocol.indexOf("https") == -1) {
                console.log("Flowgear Web Apps must be bound to https.");
            }
            if (window.top == window) {
                var url = "https://my.flowgear.net/r/sites/{siteId}/apps/debug/?debugUrl=" + encodeURIComponent(window.location.toString());
                console.log("This Flowgear Web App should run embedded in the Console. Use the following URL to debug: " + url);
                return;
            }
            window.addEventListener("message", function (messageEvent) {
                // fire the appropriate callback for the message ID
                var message = messageEvent.data;
                if (message.messageId) {
                    var callback = _awaitedResponses[message.messageId];
                    delete _awaitedResponses[message.messageId];
                    callback(message.result);
                }
            });
        }
        Sdk.init = init;
        /**
         * Applies Flowgear Stylesheets (includes support for themes)
        */
        function applyStylesheets() {
            return __awaiter(this, void 0, void 0, function () {
                var stylesheetUrls, head;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Flowgear.Sdk.getStylesheetUrls()];
                        case 1:
                            stylesheetUrls = _a.sent();
                            head = document.head || document.getElementsByTagName('head')[0];
                            // todo: delete pre-existing fg stylesheets (shouldn't be necessary
                            // unless applyStylesheets() is called more than once
                            stylesheetUrls.forEach(function (stylesheetUrl) {
                                var style = document.createElement("link");
                                style.setAttribute("rel", "stylesheet");
                                style.setAttribute("type", "text/css");
                                style.setAttribute("href", stylesheetUrl);
                                head.appendChild(style);
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
        Sdk.applyStylesheets = applyStylesheets;
        /**
         * returns the URL's of all style sheets that should be referenced so that the web app skins correctly for the theme
         * @param result
         */
        function getStylesheetUrls() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sendMessage("getStylesheetUrls", {})];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
        Sdk.getStylesheetUrls = getStylesheetUrls;
        /**
         * substitute this method for ajax calls
         * @param url
         * @param method
         * @param contentType
         * @param payload
         * @param callback
         */
        function invoke(url, method, contentType, payload) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!method) {
                                method = "GET";
                            }
                            return [4 /*yield*/, sendMessage("invoke", {
                                    "url": url,
                                    "method": method,
                                    "contentType": contentType,
                                    "payload": payload
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
        Sdk.invoke = invoke;
        function getAuth() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sendMessage("getAuth", {})];
                        case 1: return [2 /*return*/, (_a.sent()).auth];
                    }
                });
            });
        }
        Sdk.getAuth = getAuth;
        function getContext() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sendMessage("getContext", {})];
                        case 1: return [2 /*return*/, (_a.sent())];
                    }
                });
            });
        }
        Sdk.getContext = getContext;
        function confirmModal(title, description, confirmText) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sendMessage("confirmModal", {
                                title: title,
                                description: description,
                                confirmText: confirmText
                            })];
                        case 1: return [2 /*return*/, (_a.sent()).result];
                    }
                });
            });
        }
        Sdk.confirmModal = confirmModal;
        function getTextModal(title, description, defaultValue) {
            return __awaiter(this, void 0, void 0, function () {
                var resultValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sendMessage("getTextModal", {
                                title: title,
                                description: description,
                                confirmText: defaultValue
                            })];
                        case 1:
                            resultValue = _a.sent();
                            return [2 /*return*/, {
                                    result: resultValue.result.result,
                                    text: resultValue.result.text
                                }];
                    }
                });
            });
        }
        Sdk.getTextModal = getTextModal;
        function setAlert(text, alertType, dismissOption) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sendMessage("setAlert", {
                                text: text,
                                alertType: alertType,
                                dismissOption: dismissOption
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
        Sdk.setAlert = setAlert;
        function openUrl(url, target) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sendMessage("openUrl", {
                                url: url,
                                target: target
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
        Sdk.openUrl = openUrl;
        function sendMessage(name, parameters) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var message;
                            return __generator(this, function (_a) {
                                if (window.top == window) {
                                    console.log("Message can't be sent - web app must run embedded into the Console.");
                                    return [2 /*return*/];
                                }
                                _lastMessageId++;
                                message = new FgSdkMessage();
                                message.messageId = _lastMessageId;
                                message.name = name;
                                message.parameters = parameters;
                                _awaitedResponses[_lastMessageId] = resolve;
                                window.top.postMessage(message, "*");
                                return [2 /*return*/];
                            });
                        }); })];
                });
            });
        }
    })(Sdk = Flowgear.Sdk || (Flowgear.Sdk = {}));
})(Flowgear = exports.Flowgear || (exports.Flowgear = {}));
//# sourceMappingURL=flowgearSdk.js.map