var currentTabID = 0;
function rename(e) {
    var title = escapeInput(document.getElementById('title').value);
    chrome.tabs.executeScript(null,
        {
            code: "document.getElementsByTagName('title').innerHTML='" + title + "';" +
            "document.title='" + title + "';"
        });
    window.close();
}

function closeTab(e) {
    doInCurrentTab(function (tab) {
            currentTabID = tab.id;
            chrome.tabs.remove(currentTabID);

        }
    );
}
function doInCurrentTab(tabCallback) { //http://stackoverflow.com/questions/7303452/how-to-get-current-tabid-from-background-page
    chrome.tabs.query(
        {currentWindow: true, active: true},
        function (tabArray) {
            tabCallback(tabArray[0]);
        }
    );
}
function escapeInput(input) {
    return input.replace(/'/g, "\\'");
}

document.addEventListener('DOMContentLoaded', function () {
    var renameButton = document.getElementById('rename');
    renameButton.addEventListener('click', rename);

    var closeButton = document.getElementById('close');
    closeButton.addEventListener('click', closeTab);
});
