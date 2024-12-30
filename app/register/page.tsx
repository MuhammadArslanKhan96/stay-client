import Link from "next/link";
const handleRegister = () => {};
const handleLogin = () => {};
export default function PopupSignup({ isLogin }: any) {
  return (
    <>
      {/* <div
        className="popup-signup"
        // style={{ display: `${isRegister ? "block" : "none"}` }}
        style={{ display: "block" }}
      > */}
      <div
        className="popup-container"
        style={{
          maxWidth: "500px",
          margin: "auto",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <div className="popup-content d-flex-col justify-content-center">
          {" "}
          {/* <a className="close-popup-signup" /> */}
          <div className="d-flex gap-2 align-items-center">
            <Link href="#">
              <img src="/assets/imgs/template/popup/logo.svg" alt="StayChain" />
            </Link>
            <h4 className="neutral-1000">Register</h4>
          </div>
          <div className="box-button-logins">
            {" "}
            <Link className="btn btn-login btn-google mr-10" href="#">
              <img
                src="/assets/imgs/template/popup/google.svg"
                alt="StayChain"
              />
              <span className="text-sm-bold">Sign up with Google</span>
            </Link>
            <Link className="btn btn-login mr-10" href="#">
              <img
                src="/assets/imgs/template/popup/facebook.svg"
                alt="StayChain"
              />
            </Link>
            <Link className="btn btn-login" href="#">
              <img
                src="/assets/imgs/template/popup/apple.svg"
                alt="StayChain"
              />
            </Link>
          </div>
          <div className="form-login">
            <form>
              <div className="form-group">
                <label className="text-sm-medium">Username *</label>
                <input
                  className="form-control username"
                  type="text"
                  placeholder="Email / Username"
                />
              </div>
              <div className="form-group">
                <label className="text-sm-medium">Your email *</label>
                <input
                  className="form-control email"
                  type="text"
                  placeholder="Email / Username"
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label className="text-sm-medium">Password *</label>
                    <input
                      className="form-control password"
                      type="password"
                      placeholder="***********"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label className="text-sm-medium">Confirm Password *</label>
                    <input
                      className="form-control password"
                      type="password"
                      placeholder="***********"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="box-remember-forgot">
                  <div className="remeber-me">
                    <label className="text-xs-medium neutral-500">
                      <input className="cb-remember" type="checkbox" />I agree
                      to term and conditions
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group mt-45 mb-30">
                {" "}
                <button className="btn btn-black-lg" type="submit">
                  Create New Account
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 15L15 8L8 1M15 8L1 8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm-medium neutral-500">
                Already have an account?
                <a
                  className="neutral-1000 btn-signin"
                  // onClick={() => {
                  //   //   handleRegister();
                  //   //   handleLogin();
                  // }}
                >
                  {" "}
                  Login Here !
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
