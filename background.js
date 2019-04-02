
let prevTabId, prevTabUrl, currentTabId, currentTabUrl;
chrome.tabs.getSelected(null, function (tab) {
    prevTabId = tab.id;
    prevTabUrl = tab.url;
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    

    chrome.tabs.getSelected(null, function (tab) {
        currentTabId = tab.id;
        currentTabUrl = tab.url;
        

        if(isValidUrl(currentTabUrl)){
            //if current tab is any of course or youtube then goto prev tab

            if (isYoutube(prevTabUrl)) {
                chrome.tabs.executeScript(prevTabId,
                    { file: 'content.js' }, function (results) {  }
                );
            }
            else if (isUdemy(prevTabUrl)) {
                chrome.tabs.executeScript(prevTabId,
                    { file: 'udemy.js' }, function (results) {  }
                );
            }
        }

        if (isYoutube(currentTabUrl)) {
            chrome.tabs.executeScript(currentTabId,
                { file: 'content.js' }, function (results) {  }
            )
        }
        else if (isUdemy(currentTabUrl)) {
            console.log("current tab is udemy");
            chrome.tabs.executeScript(currentTabId,
                { file: 'udemy.js' }, function (results) {  }
            )
        }
        prevTabUrl = currentTabUrl;
        prevTabId  = currentTabId;
    });   

});

function isUdemy(urll) {
    let arr = urll.split('/');
    let url = arr[0] + "//" + arr[2];
    if ((url == "https://udemy.com" || url == "https://www.udemy.com") && urll.includes('learn') && urll.includes('lecture')) {
        return true;
    }
    return false;
}

function isYoutube(urll) {
    let arr = urll.split('/');
    let url = arr[0] + "//" + arr[2];
    if ((url == "https://youtube.com" || url == "https://www.youtube.com") && urll.includes('watch')) {
        return true;
    }
    return false;
}

function isValidUrl(urll){
    if(isYoutube(urll) || isUdemy(urll)){
        return true;
    }
    return false;
}
