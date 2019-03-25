
let prevTabId, prevTabUrl;
let ytButton = `document.getElementsByClassName('ytp-play-button')[0]`;
chrome.tabs.getSelected(null, function (tab) {
    prevTabId = tab.id;
    prevTabUrl = tab.url;
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    console.log("tab changed", prevTabUrl);
    //previous tab ko pause krna hai and current tab ko play
    if (isYoutube(prevTabUrl)) {
        console.log("now file will run");
        if (chrome.tabs.executeScript(prevTabId,
            { file: script.js }, function (results) { console.log(results); }
        ));
        // { file: script }
        //chrome.tabs.executeScript(prevTabId,
        //     { code: ytButton + ".click()" }, function (results) { console.log(results); }
        // );
    }
    prevTabId = activeInfo.tabId; //also
    let currentTab = activeInfo.tabId; //play the current tab video
    chrome.tabs.getSelected(null, function (tab) {
        prevTabId = tab.id;
        prevTabUrl = tab.url;
    });
});




// chrome.tabs.getAllInWindow(null, function(tabs){
//     for (var i = 0; i < tabs.length; i++) {
//         //here i have all tabs and their url too
//         //first pause all the video and then play the active one.

//         if(isUdemy(tabs[i].url)){
//             console.log("inside udemy");
//             if(tabs[i].active){
//                 //dont pause, play it.
//                 chrome.tabs.executeScript(tabs[i].id,
//                     { code: "document.getElementsByClassName('vjs-play-control')[0].click()" }, function (results) { console.log(results); }
//                 );
//             }else{
//                 //pause udemy video
//                 chrome.tabs.executeScript(tabs[i].id,
//                     { code: "document.getElementsByClassName('vjs-play-control')[0].click()" }, function (results) { console.log(results); }
//                 );
//             }
//         }
//         if(isYoutube(tabs[i].url)){
//             console.log("inside youtube"); 
//             if(tabs[i].active){
//                 chrome.tabs.executeScript(tabs[i].id,
//                     { code: "document.getElementsByClassName('ytp-play-button')[0].click()" }, function (results) { console.log(results); }
//                 );
//             }else{
//                 //pause utube video 
//                 chrome.tabs.executeScript(tabs[i].id,
//                     { code: "document.getElementsByClassName('ytp-play-button')[0].click()" }, function (results) { console.log(results); }
//                 );
//             }
//         }
//     }
// });



function isUdemy(urll) {
    let arr = urll.split('/');
    let url = arr[0] + "//" + arr[2];
    if ((url == "https://udemy.com" || url == "https://ww.udemy.com") && urll.includes('learn') && urll.includes('lecture')) {
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





/*
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        let arr = tabs[0].url.split('/');
        let url = arr[0] + "//" + arr[2];
        let patt = /^watch/;
        let isVideo = patt.test(arr[3]);
        //check for youtube
        if ((url == "https://youtube.com" || url == "https://www.youtube.com") && isVideo) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                //null means current tab
                chrome.tabs.executeScript(null,
                    { code: "document.getElementsByClassName('ytp-play-button')[0].click()" }, function (results) { console.log(results); }
                );
            });
        }
    });
});
*/





/*
chrome.runtime.sendMessage({
                    msg: "youtube_action",
                    data: {
                        subject: "Loading",
                        content: "Just completed!"
                    }
                });
*/