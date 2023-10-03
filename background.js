  chrome.webNavigation.onCommitted.addListener(function(details) {
        var url = details.url;
    if (url.indexOf("youtube.com/watch?v=") != -1) {
            var videoId = url.substring(url.indexOf("youtube.com/watch?v=") + 23);
      var request = new XMLHttpRequest();
      request.open("GET", "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoId + "&key=AIzaSyC4ZpyPe5lx2oSdmtOk5XAOTItbdNqtORo");
      request.onload = function() {
        var response = JSON.parse(request.responseText);
        var videoLocation = response.items[0].snippet.location;
         if ((videoLocation.indexOf("India") != -1) || (indianEnglishKeywords.some(keyword => videoLocation.indexOf(keyword) != -1))) {
          chrome.tabs.executeScript(details.tabId, {
            code: "document.querySelector('video-element').style.display = 'none';"
          });
          chrome.tabs.executeScript(details.tabId, {
            code: "alert('This video is blocked due to its location or language.');"
          });
        }
      };
      request.send();
    }
  });
    var indianEnglishKeywords = ["hindi", "urdu", "bengali", "punjabi", "tamil", "telugu", "kannada", "malayalam", "marathi"];
  
