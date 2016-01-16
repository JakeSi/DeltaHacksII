chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("NO FAP TODAY...")
  chrome.tabs.executeScript(null, {
    file: "nofap.js"
  });
});
