"use strict";
const child_process = require("child_process");
const electron = require("electron");
const path = require("path");
const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
const path__default = /* @__PURE__ */ _interopDefaultLegacy(path);
function domReady(condition = ["complete", "interactive"]) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}
const safeDOM = {
  append(parent, child) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent, child) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  }
};
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");
  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;
  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    }
  };
}
const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);
window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};
electron.contextBridge.exposeInMainWorld("pwr", {
  node: () => {
    const __dirname = path__default.default.resolve();
    const child_argv = ["codegen", ""];
    child_process.fork(__dirname + "/node_modules/playwright-core/cli.js", child_argv);
  },
  node2: async () => {
    let result = "";
    await child_process.exec('echo "hi"', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      result = stdout;
    });
    console.error(`result: ${result}`);
    return result;
  }
});
setTimeout(removeLoading, 4999);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VsZWN0cm9uL3ByZWxvYWQvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYywgZm9yayB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBjb250ZXh0QnJpZGdlIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5mdW5jdGlvbiBkb21SZWFkeShcbiAgY29uZGl0aW9uOiBEb2N1bWVudFJlYWR5U3RhdGVbXSA9IFtcImNvbXBsZXRlXCIsIFwiaW50ZXJhY3RpdmVcIl1cbikge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBpZiAoY29uZGl0aW9uLmluY2x1ZGVzKGRvY3VtZW50LnJlYWR5U3RhdGUpKSB7XG4gICAgICByZXNvbHZlKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb25kaXRpb24uaW5jbHVkZXMoZG9jdW1lbnQucmVhZHlTdGF0ZSkpIHtcbiAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCBzYWZlRE9NID0ge1xuICBhcHBlbmQocGFyZW50OiBIVE1MRWxlbWVudCwgY2hpbGQ6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKCFBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZmluZCgoZSkgPT4gZSA9PT0gY2hpbGQpKSB7XG4gICAgICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICB9XG4gIH0sXG4gIHJlbW92ZShwYXJlbnQ6IEhUTUxFbGVtZW50LCBjaGlsZDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmZpbmQoKGUpID0+IGUgPT09IGNoaWxkKSkge1xuICAgICAgcmV0dXJuIHBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgfVxuICB9LFxufTtcblxuLyoqXG4gKiBodHRwczovL3RvYmlhc2FobGluLmNvbS9zcGlua2l0XG4gKiBodHRwczovL2Nvbm5vcmF0aGVydG9uLmNvbS9sb2FkZXJzXG4gKiBodHRwczovL3Byb2plY3RzLmx1a2VoYWFzLm1lL2Nzcy1sb2FkZXJzXG4gKiBodHRwczovL21hdGVqa3VzdGVjLmdpdGh1Yi5pby9TcGluVGhhdFNoaXRcbiAqL1xuZnVuY3Rpb24gdXNlTG9hZGluZygpIHtcbiAgY29uc3QgY2xhc3NOYW1lID0gYGxvYWRlcnMtY3NzX19zcXVhcmUtc3BpbmA7XG4gIGNvbnN0IHN0eWxlQ29udGVudCA9IGBcbkBrZXlmcmFtZXMgc3F1YXJlLXNwaW4ge1xuICAyNSUgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgwKTsgfVxuICA1MCUgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgxODBkZWcpOyB9XG4gIDc1JSB7IHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMCkgcm90YXRlWSgxODBkZWcpOyB9XG4gIDEwMCUgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApIHJvdGF0ZVkoMCk7IH1cbn1cbi4ke2NsYXNzTmFtZX0gPiBkaXYge1xuICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBhbmltYXRpb246IHNxdWFyZS1zcGluIDNzIDBzIGN1YmljLWJlemllcigwLjA5LCAwLjU3LCAwLjQ5LCAwLjkpIGluZmluaXRlO1xufVxuLmFwcC1sb2FkaW5nLXdyYXAge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogIzI4MmMzNDtcbiAgei1pbmRleDogOTtcbn1cbiAgICBgO1xuICBjb25zdCBvU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIGNvbnN0IG9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIG9TdHlsZS5pZCA9IFwiYXBwLWxvYWRpbmctc3R5bGVcIjtcbiAgb1N0eWxlLmlubmVySFRNTCA9IHN0eWxlQ29udGVudDtcbiAgb0Rpdi5jbGFzc05hbWUgPSBcImFwcC1sb2FkaW5nLXdyYXBcIjtcbiAgb0Rpdi5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiPjxkaXY+PC9kaXY+PC9kaXY+YDtcblxuICByZXR1cm4ge1xuICAgIGFwcGVuZExvYWRpbmcoKSB7XG4gICAgICBzYWZlRE9NLmFwcGVuZChkb2N1bWVudC5oZWFkLCBvU3R5bGUpO1xuICAgICAgc2FmZURPTS5hcHBlbmQoZG9jdW1lbnQuYm9keSwgb0Rpdik7XG4gICAgfSxcbiAgICByZW1vdmVMb2FkaW5nKCkge1xuICAgICAgc2FmZURPTS5yZW1vdmUoZG9jdW1lbnQuaGVhZCwgb1N0eWxlKTtcbiAgICAgIHNhZmVET00ucmVtb3ZlKGRvY3VtZW50LmJvZHksIG9EaXYpO1xuICAgIH0sXG4gIH07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgeyBhcHBlbmRMb2FkaW5nLCByZW1vdmVMb2FkaW5nIH0gPSB1c2VMb2FkaW5nKCk7XG5kb21SZWFkeSgpLnRoZW4oYXBwZW5kTG9hZGluZyk7XG5cbndpbmRvdy5vbm1lc3NhZ2UgPSAoZXYpID0+IHtcbiAgZXYuZGF0YS5wYXlsb2FkID09PSBcInJlbW92ZUxvYWRpbmdcIiAmJiByZW1vdmVMb2FkaW5nKCk7XG59O1xuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKFwicHdyXCIsIHtcbiAgbm9kZTogKCkgPT4ge1xuICAgIGNvbnN0IF9fZGlybmFtZSA9IHBhdGgucmVzb2x2ZSgpO1xuICAgIGNvbnN0IGNoaWxkX2FyZ3YgPSBbXCJjb2RlZ2VuXCIsIFwiXCJdO1xuICAgIGNvbnN0IGNoaWxkX2V4ZWNBcmd2ID0gW1wiY29kZWdlblwiXTtcbiAgICBmb3JrKF9fZGlybmFtZSArIFwiL25vZGVfbW9kdWxlcy9wbGF5d3JpZ2h0LWNvcmUvY2xpLmpzXCIsIGNoaWxkX2FyZ3YpO1xuICB9LFxuICBub2RlMjogYXN5bmMgKCkgPT4ge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGF3YWl0IGV4ZWMoJ2VjaG8gXCJoaVwiJywgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYGV4ZWMgZXJyb3I6ICR7ZXJyb3J9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGBzdGRvdXQ6ICR7c3Rkb3V0fWApO1xuICAgICAgY29uc29sZS5lcnJvcihgc3RkZXJyOiAke3N0ZGVycn1gKTtcbiAgICAgIHJlc3VsdCA9IHN0ZG91dDtcbiAgICB9KTtcbiAgICBjb25zb2xlLmVycm9yKGByZXN1bHQ6ICR7cmVzdWx0fWApO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICAvLyBub2RlMjogKCkgPT4ge1xuICAvLyAgIHJlcXVpcmUoJy9ub2RlX21vZHVsZXMvcGxheXdyaWdodC1jb3JlL2NsaS5qcycpLnNwYXduKHByb2Nlc3MuZXhlY1BhdGgsIFtcbiAgLy8gICAgICctLXN0YXJ0LXNlcnZlcicsXG4gIC8vICAgXSk7XG4gIC8vIH0sXG59KTtcblxuc2V0VGltZW91dChyZW1vdmVMb2FkaW5nLCA0OTk5KTtcbiJdLCJuYW1lcyI6WyJjb250ZXh0QnJpZGdlIiwicGF0aCIsImZvcmsiLCJleGVjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSxTQUFTLFNBQ1AsWUFBa0MsQ0FBQyxZQUFZLGFBQWEsR0FDNUQ7QUFDTyxTQUFBLElBQUksUUFBUSxDQUFDLFlBQVk7QUFDOUIsUUFBSSxVQUFVLFNBQVMsU0FBUyxVQUFVLEdBQUc7QUFDM0MsY0FBUSxJQUFJO0FBQUEsSUFBQSxPQUNQO0FBQ0ksZUFBQSxpQkFBaUIsb0JBQW9CLE1BQU07QUFDbEQsWUFBSSxVQUFVLFNBQVMsU0FBUyxVQUFVLEdBQUc7QUFDM0Msa0JBQVEsSUFBSTtBQUFBLFFBQ2Q7QUFBQSxNQUFBLENBQ0Q7QUFBQSxJQUNIO0FBQUEsRUFBQSxDQUNEO0FBQ0g7QUFFQSxNQUFNLFVBQVU7QUFBQSxFQUNkLE9BQU8sUUFBcUIsT0FBb0I7QUFDMUMsUUFBQSxDQUFDLE1BQU0sS0FBSyxPQUFPLFFBQVEsRUFBRSxLQUFLLENBQUMsTUFBTSxNQUFNLEtBQUssR0FBRztBQUNsRCxhQUFBLE9BQU8sWUFBWSxLQUFLO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPLFFBQXFCLE9BQW9CO0FBQzFDLFFBQUEsTUFBTSxLQUFLLE9BQU8sUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLE1BQU0sS0FBSyxHQUFHO0FBQ2pELGFBQUEsT0FBTyxZQUFZLEtBQUs7QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFDRjtBQVFBLFNBQVMsYUFBYTtBQUNwQixRQUFNLFlBQVk7QUFDbEIsUUFBTSxlQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FPcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW9CSyxRQUFBLFNBQVMsU0FBUyxjQUFjLE9BQU87QUFDdkMsUUFBQSxPQUFPLFNBQVMsY0FBYyxLQUFLO0FBRXpDLFNBQU8sS0FBSztBQUNaLFNBQU8sWUFBWTtBQUNuQixPQUFLLFlBQVk7QUFDakIsT0FBSyxZQUFZLGVBQWU7QUFFekIsU0FBQTtBQUFBLElBQ0wsZ0JBQWdCO0FBQ04sY0FBQSxPQUFPLFNBQVMsTUFBTSxNQUFNO0FBQzVCLGNBQUEsT0FBTyxTQUFTLE1BQU0sSUFBSTtBQUFBLElBQ3BDO0FBQUEsSUFDQSxnQkFBZ0I7QUFDTixjQUFBLE9BQU8sU0FBUyxNQUFNLE1BQU07QUFDNUIsY0FBQSxPQUFPLFNBQVMsTUFBTSxJQUFJO0FBQUEsSUFDcEM7QUFBQSxFQUFBO0FBRUo7QUFJQSxNQUFNLEVBQUUsZUFBZSxrQkFBa0I7QUFDekMsV0FBVyxLQUFLLGFBQWE7QUFFN0IsT0FBTyxZQUFZLENBQUMsT0FBTztBQUN0QixLQUFBLEtBQUssWUFBWSxtQkFBbUIsY0FBYztBQUN2RDtBQUVBQSxTQUFBQSxjQUFjLGtCQUFrQixPQUFPO0FBQUEsRUFDckMsTUFBTSxNQUFNO0FBQ0osVUFBQSxZQUFZQyxzQkFBSztBQUNqQixVQUFBLGFBQWEsQ0FBQyxXQUFXLEVBQUU7QUFFNUJDLGtCQUFBQSxLQUFBLFlBQVksd0NBQXdDLFVBQVU7QUFBQSxFQUNyRTtBQUFBLEVBQ0EsT0FBTyxZQUFZO0FBQ2pCLFFBQUksU0FBUztBQUNiLFVBQU1DLGNBQUssS0FBQSxhQUFhLENBQUMsT0FBTyxRQUFRLFdBQVc7QUFDakQsVUFBSSxPQUFPO0FBQ0QsZ0JBQUEsTUFBTSxlQUFlLE9BQU87QUFDcEM7QUFBQSxNQUNGO0FBQ1EsY0FBQSxJQUFJLFdBQVcsUUFBUTtBQUN2QixjQUFBLE1BQU0sV0FBVyxRQUFRO0FBQ3hCLGVBQUE7QUFBQSxJQUFBLENBQ1Y7QUFDTyxZQUFBLE1BQU0sV0FBVyxRQUFRO0FBRTFCLFdBQUE7QUFBQSxFQUNUO0FBT0YsQ0FBQztBQUVELFdBQVcsZUFBZSxJQUFJOyJ9
