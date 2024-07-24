import WebNavigationCallbackDetails = chrome.webNavigation.WebNavigationFramedCallbackDetails;
import {trackingDomainToHandlerMap} from "./tracking-domains.js";

const beforeRequest = (details: WebNavigationCallbackDetails): void => {
    const parsedURL = new URL(details.url)

    const redirectURLHandler = trackingDomainToHandlerMap[parsedURL.hostname]
    if (!redirectURLHandler) {
        return;
    }

    const redirectURL = redirectURLHandler(parsedURL);
    if (!redirectURL) {
        return
    }

    chrome.tabs.update(details.tabId, {url: redirectURL})
        .catch(function (error) {
            console.error(error);
        })
}

chrome.webNavigation.onErrorOccurred.addListener(beforeRequest);
