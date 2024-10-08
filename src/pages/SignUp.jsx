import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {db} from "../firebase.config"
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {setDoc, doc, serverTimestamp} from "firebase/firestore"
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try{
        const auth = getAuth()

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredentials.user

        updateProfile(auth.currentUser, {
            displayName  : name
        })

        const formDataCopy = {...formData}
        delete formDataCopy.password
        formDataCopy.timestamp = serverTimestamp()

        await setDoc(doc(db, "users", user.uid), formDataCopy )

        navigate("/")
    }catch (error) {
      toast.error("Something went wrong with registration")
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
          <form onSubmit={onSubmit} action="">
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt=""
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

  

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          <div className="links">
            <Link to="/sign-in" className="registerLink">
            Sign In Instead
          </Link>
            </div>
          <OAuth/>
   
        </header>
      </div>
    </>
  );
}

export default SignUp;
