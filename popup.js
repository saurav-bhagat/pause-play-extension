function main(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        let arr = tabs[0].url.split('/');
        let url = arr[0] + "//" + arr[2];
        if(url=="https://youtube.com" && /^watch/.test(arr[3])){
            document.getElementsByClassName("ytp-play-button")[0].click();
        }
    });
}

main();
