import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { dbService, storage } from "fbase.js";
import Jweet from "components/Jweet";

const Home = ({ userObj }) => {
  // console.log(userObj);
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]);
  const [attachment, setAttachment] = useState("");
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
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const uploadFile = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      console.log(uploadFile);
      attachmentUrl = await getDownloadURL(ref(storage, attachmentRef));
    }
    const jweetObj = {
      text: jweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, "jweets"), jweetObj);

    setJweet("");
    setAttachment("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setJweet(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      //readAsDataURL이 끝나면 finishedEvent를 받음
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // 파일을 읽기 시작
  };
  const onClearAttachment = () => {
    setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Jweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
