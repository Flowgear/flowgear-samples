
export module Flowgear {

    export module Sdk {

        class FgSdkMessage {
            messageId: number;

            name: string;

            parameters: { [index: string]: any };

            result: any;
        }

        var _lastMessageId = 0;
        var _awaitedResponses: { [index: string]: (result) => void } = {};

        export enum ConfirmResult {
            Yes,
            No,
        }

        export enum GetTextResult {
            Ok,
            Cancel
        }


        export enum AlertMessageTypes {
            Info,
            Warning,
            Error,
            Success,
            Help,
            Running
        }

        export enum AlertDismissOptions {
            ViewChange, // alert will dismiss when the view changes
            Auto,       // alert will dismiss after 3 seconds
            Tap         // alert will dismiss when tapped or when view changes
        }

        export function init() {

            // this is only a warning - in dev of Console we'll be using http
            if (window.location.protocol.indexOf("https") == -1) {
                console.log("Flowgear Web Apps must be bound to https.");
            }

            if (window.top == window) {
                var url = "https://my.flowgear.net/r/sites/{siteId}/apps/debug/?debugUrl=" + encodeURIComponent(window.location.toString());
                console.log("This Flowgear Web App should run embedded in the Console. Use the following URL to debug: " + url);
                return;
            }

            window.addEventListener("message", messageEvent => {

                // fire the appropriate callback for the message ID
                var message: FgSdkMessage = messageEvent.data;

                if (message.messageId) {
                    var callback = _awaitedResponses[message.messageId];

                    delete _awaitedResponses[message.messageId];
                    callback(message.result);
                }
            });

        }

        /**
         * Applies Flowgear Stylesheets (includes support for themes)
        */
        export async function applyStylesheets() {

            var stylesheetUrls = await Flowgear.Sdk.getStylesheetUrls();

            var head = document.head || document.getElementsByTagName('head')[0];

            // todo: delete pre-existing fg stylesheets (shouldn't be necessary
            // unless applyStylesheets() is called more than once

            stylesheetUrls.forEach(stylesheetUrl => {

                var style = document.createElement("link");

                style.setAttribute("rel", "stylesheet");
                style.setAttribute("type", "text/css");
                style.setAttribute("href", stylesheetUrl);

                head.appendChild(style);
            });

        }

        /**
         * returns the URL's of all style sheets that should be referenced so that the web app skins correctly for the theme
         * @param result
         */
        export async function getStylesheetUrls(): Promise<string[]> {

            return await sendMessage(
                "getStylesheetUrls",
                {}
            );
        }


        /**
         * substitute this method for ajax calls
         * @param url
         * @param method
         * @param contentType
         * @param payload
         * @param callback
         */
        export async function invoke(url, method?: string, contentType?: string, payload?: any): Promise<{ success: boolean, response: any }> {

            if (!method) {
                method = "GET";
            }

            return await sendMessage(
                "invoke",
                {
                    "url": url,
                    "method": method,
                    "contentType": contentType,
                    "payload": payload
                });

        }

        export async function getAuth(): Promise<string> {

            return (await sendMessage(
                "getAuth",
                {
                })).auth;

        }

        export async function getUser(): Promise<any> {

            return (await sendMessage(
                "getUser",
                {
                })).user;

        }

        export async function getContext(): Promise<{ siteId: string, pod: number, theme: string }> {

            return (await sendMessage(
                "getContext",
                {
                }));

        }

        export async function confirmModal(title: string, description: string, confirmText: string): Promise<ConfirmResult> {

            return (await sendMessage(
                "confirmModal",
                {
                    title: title,
                    description: description,
                    confirmText: confirmText
                })
            ).result;

        }


        export async function getTextModal(title: string, description: string, defaultValue: string): Promise<{ result: GetTextResult, text: string }> {

            var resultValue = await sendMessage(
                "getTextModal",
                {
                    title: title,
                    description: description,
                    confirmText: defaultValue
                });

            return {
                result: resultValue.result.result,
                text: resultValue.result.text
            };

        }

        export async function setAlert(text: string, alertType: AlertMessageTypes, dismissOption: AlertDismissOptions): Promise<any> {

            return await sendMessage(
                "setAlert",
                {
                    text: text,
                    alertType: alertType,
                    dismissOption: dismissOption
                });
        }

        export async function openUrl(url: string, target?: string): Promise<any> {

            return await sendMessage(
                "openUrl",
                {
                    url: url,
                    target: target
                });

        }

        async function sendMessage(name: string, parameters: { [index: string]: any }): Promise<any> {

            return new Promise(async (resolve, reject) => {

                if (window.top == window) {
                    console.log("Message can't be sent - web app must run embedded into the Console.");
                    return;
                }

                _lastMessageId++;

                var message = new FgSdkMessage();
                message.messageId = _lastMessageId;
                message.name = name;
                message.parameters = parameters;

                _awaitedResponses[_lastMessageId] = resolve;

                window.top.postMessage(message, "*");

            });

        }
    }

}

