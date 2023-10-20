"use client";

import { store, useAppDispatch, useAppSelector } from "@/app/store";
import { useCallback, useEffect, useState } from "react";
import useApi from "@/hooks/api/useApi";
import { updateText } from "@/app/store/slices/authSlice";
import withAuth from "@/hocs/withAuth";

const ClientStuff = () => {
  const [username, setUsername] = useState("");
  const jid = store.getState().auth.jid;
  const api = useApi();
  const dispatch = useAppDispatch();
  const { text } = useAppSelector((state) => state.auth);
  useEffect(() => {}, [jid]);

  const onClickButton = useCallback(() => {
    dispatch(updateText(api));
  }, [api, dispatch]);

  return (
    <div>
      <h3 className="font-bold text-4xl">Welcome {username}!</h3>
      <div>{text}</div>
      <button onClick={onClickButton}>click me to update text</button>
    </div>
  );
};

export default withAuth(ClientStuff);
