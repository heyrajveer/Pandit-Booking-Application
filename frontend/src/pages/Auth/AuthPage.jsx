import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
   <div className="d-flex justify-content-center align-items-center vh-82 auth-bg">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        
       <h3 className="text-center mb-3 auth-title">
  🪔 {isLogin ? "User Login" : "Join as Pandit / User"}
</h3>

        {isLogin ? <Login /> : <Register />}

        <div className="text-center mt-3">
          <small>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </small>
          <br />
          <button
            className="btn btn-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AuthPage;