import React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { dbService } from "fbase.js";
import Jweet from "components/Jweet";

const Home = ({ userObj }) => {
  // console.log(userObj);
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]);
  // const getJweets = async () => {
  //   const dbJweets = await getDocs(collection(dbService, "jweets"));
  //   dbJweets.forEach((doc) => {
  //     const jweetObject = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setJweets((prev) => [jweetObject, ...prev]);
  //   });
  // };  // 구식방법이라 하고 지우심
  useEffect(() => {
    // getJweets();
    const q = query(collection(dbService, "jweets"));
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJweets(nweetArray);
      // 여기까지가 새로운 방법
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "jweets"), {
        text: jweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (error) {}
    setJweet("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setJweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={jweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type="submit" value="Jweet" />
      </form>
      <div>
        {jweets.map((jweet) => (
          <Jweet
            key={jweet.id}
            jweetObj={jweet}
            isOwner={jweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
