import  { useState, type FormEvent } from "react";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = UserAuth();


  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    try {
      await signUp(email,password)
      navigate('/account')
    } catch (e : unknown) {
      if (e instanceof Error) {
        setError(e.message);
        console.log(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  }
  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        {error && <p className="bg-red-300 p-3 my-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label>Email</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-primary border border-input rounded-2xl outline-none"
                type="email"
                value={email}
                required
              />
              <AiOutlineMail className="absolute right-2 top-3 text-gray-400" />
            </div>
          </div>
          <div className="my-4">
            <label>Password</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-primary border border-input rounded-2xl outline-none"
                type="password"
                value={password}
                required
              />
              <AiFillLock className="absolute right-2 top-3 text-gray-400" />
            </div>
          </div>
          <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
            Sign up
          </button>
        </form>
        <p className="my-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-accent">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
