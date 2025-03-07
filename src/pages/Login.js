import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd';
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from '../components/Spinner';
import "../styles/Loginpage.css";

const Login = () => {
    const img="https://bsmedia.business-standard.com/_media/bs/img/article/2019-08/29/full/1567092671-9184.jpg?im=FeatureCrop,size=(826,465)";
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const submitHandler = async(values) => {
            try{
              setLoading(true);
              const {data} = await axios.post('https://expenseback-2-j1ah.onrender.com/api/v1/users/login',values);
              setLoading(false);
              message.success('login success');
              localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
              navigate('/')
            }catch(error){
              setLoading(false);
              message.error('something is wrong');
            }
        };
        useEffect(() => {
          if(localStorage.getItem("User")){
            navigate('/');
          }
        },[navigate]);

  return (
    <>
      <div className="login-page ">
        {loading && <Spinner />}
        <div className="row container">
          <h1>Expense Tracker</h1>
          <div className="col-md-6">
            <img src={img} alt="login-img" width={"100%"} height="100%" />
          </div>
          <div className="col-md-4 login-form">
            <Form layout="vertical" onFinish={submitHandler}>
              <h1>Login Form</h1>

              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" required />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <Link to="/register">
                  Not a user ? Click Here to regsiter !
                </Link>
                <button className="btn">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
