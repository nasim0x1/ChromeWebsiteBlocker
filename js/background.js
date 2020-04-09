window.onload = function(){
    const json = "http://quran10.com/data.json";
    $.getJSON(json, function(result){
        var result = JSON.stringify(result);
        var allowed = JSON.parse(result).allow;
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        var isForbidden = allowed.every(function(url) {
            return details.url.indexOf(url) == -1;
        });
        if(isForbidden){
            return {redirectUrl: chrome.extension.getURL("error.html")};
        }
    }, {urls: ["<all_urls>"]}, ["blocking"]);
})
};