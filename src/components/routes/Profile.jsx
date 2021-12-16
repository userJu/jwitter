import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { query, where, collection, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  useEffect(() => {
    getMyJweets();
  }, []);
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const getMyJweets = async () => {
    const jweets = query(
      collection(dbService, "jweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt")
    );
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
      console.log(userObj.displayName);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={newDisplayName}
          type="text"
          placeholder="Display name"
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
