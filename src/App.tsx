import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { FormView } from "./components/FormView";
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDwHN6nc1sE-3s4ayo6kVTwp45P32Aumks",
  authDomain: "test-task-5fbe2.firebaseapp.com",
  databaseURL: "https://test-task-5fbe2-default-rtdb.firebaseio.com",
  projectId: "test-task-5fbe2",
  storageBucket: "test-task-5fbe2.appspot.com",
  messagingSenderId: "381359981691",
  appId: "1:381359981691:web:287327e68dbe44ff128ede",
  measurementId: "G-JXYGNWR5JV"
};

const app = initializeApp(firebaseConfig);

function App() {
  const [userData, setUserdata] = useState<any>()

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `userData`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setUserdata(snapshot.val())
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div className="App">
      <FormView userData={userData?.values}/>
    </div>
  );
}

export default App;
