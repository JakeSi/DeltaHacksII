chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo && changeInfo.status == "complete"){
        chrome.tabs.executeScript(tabId, {file: "jquery-2.2.0.min.js"}, function(){
            chrome.tabs.executeScript(tabId, {file: "kiddify.js"});
        });
    }
});

