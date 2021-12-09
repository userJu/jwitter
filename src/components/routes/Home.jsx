import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "fbase";

const Home = () => {
  const [jweet, setJweet] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "jweets"), {
        jweet,
        createdAt: Date.now(),
      });
      console.log("try");
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("catch");
      console.error("Error adding document: ", error);
    }
    setJweet("");
  };

  // try catch와 async await을 다 지웠을 때  setJweet("")은 작동하지만 undefined가 뜬다

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setJweet(value);
    console.log(value);
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
    </div>
  );
};

export default Home;
