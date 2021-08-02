import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../actions/userActions.js";
import Layout from "../../core/Layout.js";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Layout>
      <div className="login">
        <div className="formwrapper">
          <div className="messages">
            {error && <h2>{error}</h2>}
            {loading && <h2>Loading...</h2>}
          </div>

          <div className="formwrapper">
            <div className="title">
              <h2>Giriş Yap</h2>
            </div>
            <form onSubmit={submitHandler} className="form">
              <div className="inputbox">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="inputbox">
                <label htmlFor="password">Şifre</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <button type="submit"></button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginScreen;
