"use strict";

function Widget(options) {
    this.options = options;
}

Widget.prototype.loadSlots = function(slots) {
    window.artRec = window.artRec || {
        "cmd": []
    };
    window.artRec.cmd.push(function() {
        slots.forEach(function(slot) {
            window.artRec.defineSlot(slot);
        });
        window.artRec.start();
    });
    var host = this.options.host;
    window.artRecGetRecommendationsUrl = function(to, count) {
        return "http://" + host + "/recommendations.js?" +
            "to=" + encodeURIComponent(to) +
            "&count=" + encodeURIComponent(count);
    };
    var artRecScript = document.createElement("script");
    artRecScript.async = true;
    artRecScript.type = "text/javascript";
    artRecScript.src = "http://" + host + "/js/main.js";
    var node = document.getElementsByTagName("script")[0];
    node.parentNode.insertBefore(artRecScript, node);
};


module.exports = Widget;
