// nwgui = window.require("nw.gui");
// nwwin = nwgui.Window.get(window);
// process.removeAllListeners("uncaughtException");
// process.on("uncaughtException", function(e) {
//   var ref;
//   if (!window.CRASHED) {
//     window.CRASHED = true;
//     if (typeof console !== "undefined" && console !== null) {
//       if (typeof console.warn === "function") {
//         console.warn("CRASH");
//       }
//     }
//     nwwin.showDevTools();
//   }
//   if (((ref = nwgui.App.manifest.window) != null ? ref.show : void 0) === false) {
//     return nwwin.show();
//   }
// });
if(!window.isSubwindow) {
  window.addEventListener("keydown", function(e) {
      var ref;
      var nwWin = nw.Window.get(window);
    
      switch ((ref = e.key) != null ? ref : e.keyIdentifier) {
        case "F12":
          return nwWin.showDevTools();
        case "F5":
          return nwWin.reload();
        case "Enter":
          alert(nw.process.pid);
          break;
      }
    });
}