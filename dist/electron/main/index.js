"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const electron = require("electron");
const os = require("os");
const path = require("path");
require("reflect-metadata");
const typeorm = require("typeorm");
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key, result);
  return result;
};
let User = class extends typeorm.BaseEntity {
  constructor() {
    super(...arguments);
    __publicField(this, "id");
    __publicField(this, "firstName");
    __publicField(this, "lastName");
    __publicField(this, "age");
  }
};
__decorateClass([
  typeorm.PrimaryGeneratedColumn()
], User.prototype, "id", 2);
__decorateClass([
  typeorm.Column("text")
], User.prototype, "firstName", 2);
__decorateClass([
  typeorm.Column("text")
], User.prototype, "lastName", 2);
__decorateClass([
  typeorm.Column("text")
], User.prototype, "age", 2);
User = __decorateClass([
  typeorm.Entity()
], User);
const AppDataSource = new typeorm.DataSource({
  type: "sqlite",
  database: "eshop.sqlite",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: []
});
if (os.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const ROOT_PATH = {
  dist: path.join(__dirname, "../.."),
  public: path.join(__dirname, electron.app.isPackaged ? "../.." : "../../../public")
};
let win = null;
const preload = path.join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = path.join(ROOT_PATH.dist, "index.html");
async function createWindow() {
  win = new electron.BrowserWindow({
    title: "Main window",
    icon: path.join(ROOT_PATH.public, "favicon.svg"),
    webPreferences: {
      contextIsolation: true,
      preload,
      nodeIntegration: true
    }
  });
  if (electron.app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", new Date().toLocaleString());
  });
  win.webContents.setWindowOpenHandler(({ url: url2 }) => {
    if (url2.startsWith("https:"))
      electron.shell.openExternal(url2);
    return { action: "deny" };
  });
}
electron.app.whenReady().then(() => {
  AppDataSource.initialize().then(async () => {
    console.log("Inserting a new user into the database...", __dirname);
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);
    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);
    console.log("Here you can setup and run express / fastify / any other framework.");
  }).catch((error) => console.log("Database Error", error));
  createWindow();
});
electron.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin")
    electron.app.quit();
});
electron.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});
electron.app.on("activate", () => {
  const allWindows = electron.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
electron.ipcMain.on("ipc-example", async (event, arg) => {
  const msgTemplate = (pingPong) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply("ipc-example", msgTemplate("pong"));
});
electron.ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new electron.BrowserWindow({
    webPreferences: {
      preload
    }
  });
  if (electron.app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    childWindow.loadURL(`${url}/#${arg}`);
  }
});
exports.ROOT_PATH = ROOT_PATH;
//# sourceMappingURL=index.js.map
