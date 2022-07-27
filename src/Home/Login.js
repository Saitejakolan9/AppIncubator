import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../LoggedInContext/LoggedInContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const {setLoggedIn} = useContext(LoggedInContext);
  const [error, setError] = useState({ emailError: "", passwordError: "" });
  const [LoginDisabled, setLoginDisabled] = useState(true);
  const [user, setUser] = useState({ name: "", password: "" });

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.name === "email") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      setError({
        ...error,
        emailError: !pattern.test(e.target.value)
          ? "Not a valid email address"
          : "",
      });
      setUser({ ...user,name : !pattern.test(e.target.value) ? '' : e.target.value });
    }
    if (e.target.name === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;

      if (
        !uppercaseRegExp.test(e.target.value) ||
        !lowercaseRegExp.test(e.target.value) ||
        !digitsRegExp.test(e.target.value) ||
        !specialCharRegExp.test(e.target.value) ||
        e.target.value.length < 8
      ) {
        setError({
          ...error,
          passwordError:
            "Min. 8 charecters must incl. atleast 1 Upper case, 1 lowercase, 1 digit and 1 special charecter",
        });
        setUser({ ...user,password : '' });
      } else {
        setUser({ ...user,password : e.target.value });
        setError({ ...error, passwordError: '' });
      }
    }
    setLoginDisabled(
      user.name === '' || user.password === '' ? true : false
    );
  };

  const Login = (e) => {
    e.preventDefault();
    setLoggedIn(true)
    navigate("/home", { replace: true });
  };

  return (
      <div className="main-bg vh-100">
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-6 col-xl-4 col-md-8 col-sm-10">
              <div className="card shadow">
                <div className="card-title text-center border-bottom">
                  <h2 className="p-3">Login</h2>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-4">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className={
                          error.emailError !== ""
                            ? "form-control  is-invalid"
                            : "form-control"
                        }
                        name="email"
                        onChange={(e) => handleChange(e)}
                      />
                      <div
                        className={
                          error.emailError !== "" ? "invalid-feedback" : ""
                        }
                      >
                        {error.emailError}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className={
                          error.passwordError !== ""
                            ? "form-control  is-invalid"
                            : "form-control"
                        }
                        name="password"
                        onChange={(e) => handleChange(e)}
                      />
                      <div
                        className={
                          error.passwordError !== "" ? "invalid-feedback" : ""
                        }
                      >
                        {error.passwordError}
                      </div>
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className={
                          LoginDisabled
                            ? "btn btn-secondary text-light main-bg"
                            : "btn btn-success text-light main-bg"
                        }
                        disabled={LoginDisabled}
                        onClick={(e) => Login(e)}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;
