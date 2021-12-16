import AppRouter from "components/Router";
import { useState, useEffect } from "react";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUserObj({
        //   displayName: user.displayName,
        //   uid: user.uid.refreshUser,
        //   updateProfile: (args) => user.updateProfile(args),
        // });
        setUserObj(user);

        const uid = user.uid;
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    // setUserObj({
    //   displayName: user.displayName,
    //   uid: user.uid.refreshUser,
    //   updateProfile: (args) => user.updateProfile(args),
    // });
    setUserObj(Object.assign({}, user));
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}
export default App;
