chrome.browserAction.onClicked.addListener(() => {
    const queryInfo = {
        currentWindow: true,
        url: ['https://nhentai.net/g/*'],
    };

    chrome.tabs.query(queryInfo, (tabs) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        if (!tabs.length) {
            console.log('No tabs found...');
            return;
        }

        let text = '';
        let cnt = 0;
        for (tab of tabs) {
            // tab.index, tabs.title
            text += tab.url + '\n';
            cnt++;
        }
        text += '\n\n' + cnt;
        downloadTextFile(text);
    });
});

function downloadTextFile(text) {
    const blob = new Blob([text], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    const date = getDate();
    link.download = `urls-opened-now_${date}.txt`;
    link.click();
}

function getDate() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth(); // 月だけ0ベース
    const date = d.getDate();

    return `${year}年${month}月${date}日`;
}
