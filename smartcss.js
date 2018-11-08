
document.getElementById('start-btn').addEventListener('click', setup)

function setup () {

    let params = {
        active: true,
        currentWindow: true
    }
    chrome.tabs.query(params, gotTabs)
    function gotTabs (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {status: "start"}, function(response) {
            document.getElementById('start-btn').classList.add('rotate')
            document.querySelector('#start-btn > span').innerText = 'Starting'
            setTimeout(function() {window.close()}, 1000)
        });

    }
   
}