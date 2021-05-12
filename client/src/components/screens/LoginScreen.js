import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {login} from '../../actions/userActions.js';

const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('mertuygur02@gmail.com');
    const [password, setPassword] = useState('123456');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const {loading, error, userInfo} = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))

    }
    return (
        <div className="login">

            <div className="login__left">
                <div className="login__left__messages">
                    {error && <h2>{error}</h2>}
                    {loading && <h2>Loading...</h2>}
                    <div className="back">
                        <Link to="/"><i class="fas fa-chevron-left"></i>Geri Dön</Link>
                    </div>
                    
                </div>
                <div className="login__left__formcontainer">
                    <form onSubmit={submitHandler} className="form">
                        <div className="form__inputbox">
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="form__inputbox">
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="form__buttonbox">
                            <button type="submit">Log In</button>
                        </div>
                    </form>
                </div>

                <div className="login__left__redirect">
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register Instead</Link>
                </div>
            </div>

            <div className="login__right">
                <img src="/images/red_half.svg" alt="scene red" />
            </div>
        </div>
    )
}

export default LoginScreen
