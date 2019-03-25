

console.log("from content script");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("request is" ,request);
    if (request.msg === "youtube_action") {
        console.log(request.data.subject)
        // alert("kdjfnodf");
    }
    return true;
});

let main = () => {
    console.log("Inside content.js")
}


