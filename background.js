chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        let arr = tabs[0].url.split('/');
        let url = arr[0] + "//" + arr[2];
        let patt =/^watch/;
        let isVideo = patt.test(arr[3]);
        console.log(url);
        if((url=="https://youtube.com" || url=="https://www.youtube.com") && isVideo){
            // console.log("clicked");
            // document.getElementsByClassName("ytp-play-button")[0].click();
            //we can't directly access DOM of page from here, that we can only do from content scripts
            //now what to do ??
        }
    });
    // alert("tab changed");
    let bkg = chrome.extension.getBackgroundPage();
    // bkg.console.log("tab changed");
});