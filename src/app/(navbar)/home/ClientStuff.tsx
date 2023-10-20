"use client";

import { store, useAppDispatch, useAppSelector } from "@/app/store";
import { useCallback, useEffect, useState } from "react";
import useApi from "@/hooks/api/useApi";
import { updateText } from "@/app/store/slices/authSlice";
import withAuth from "@/hocs/withAuth";

const ClientStuff = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const jid = store.getState().auth.jid;
  const api = useApi();
  const dispatch = useAppDispatch();
  const { text } = useAppSelector((state) => state.auth);
  useEffect(() => {
    // const getData = async () => {
    //   try {
    //     const res = await fetch("http://localhost:3002/user/profile", {
    //       headers: { Authorization: `Bearer ${jid}` },
    //       mode: "cors",
    //     });
    //     const data = await res.json();
    //     setUsername(data.sub);
    //     setLoading(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    //
    // getData();
  }, [jid]);

  const onClickButton = useCallback(() => {
    dispatch(updateText(api));
  }, [api, dispatch]);
  //
  // if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="font-bold text-4xl">Welcome {username}!</h3>
      <div>{text}</div>
      <button onClick={onClickButton}>click me to update text</button>
    </div>
  );
};

export default withAuth(ClientStuff);
