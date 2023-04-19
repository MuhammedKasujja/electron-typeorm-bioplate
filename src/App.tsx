import { useState } from "react";
import electron from "/electron.png";
import react from "/react.svg";
import vite from "/vite.svg";
import styles from "styles/app.module.scss";
import { User } from "./entity";
import AppDataSource from "./data-source";

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState('')

  const handleClick =async () => {
    try{
    // alert(3);
    //@ts-ignore
    // pwr.node();
    //window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
    // window?.webContents.send("main-process-message", new Date().toLocaleString());
    const user = new User();
    // const userRepository = AppDataSource.getRepository(User)
    const newUser = await user.save()
    // userRepository.save(user)
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await AppDataSource.manager.save(user);
    setCount((prev)=> prev+1)
    console.log('handleClick')
    }catch(error){
     setError(error)
    }

  };

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <div className={styles.logos}>
          <div className={styles.imgBox}>
            <img
              src={electron}
              style={{ height: "24vw" }}
              className={styles.appLogo}
              alt="electron"
            />
          </div>
          <div className={styles.imgBox}>
            <img src={vite} style={{ height: "19vw" }} alt="vite" />
          </div>
          <div className={styles.imgBox}>
            <img
              src={react}
              style={{ maxWidth: "100%" }}
              className={styles.appLogo}
              alt="logo"
            />
          </div>
        </div>
        <p>Hello Electron + Vite + React! {count}</p>
        <p>
          <button onClick={handleClick}>TEST</button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <div>
          <p>
            {`${error}`}
          </p>
          <a
            className={styles.appLink}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className={styles.appLink}
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
          <div className={styles.staticPublic}>
            Place static files into the <code>/public</code> folder
            <img style={{ width: 77 }} src="./node.png" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
