import ErrorMessageList from "@/shared/components/error-message-list";
import Button from "@/shared/components/form/button";
import InputText from "@/shared/components/form/input-text";
import HelperMsg from "@/shared/components/msg/helper-msg";
import { jwtLogin, setAuthStatus } from "@/store/reducers/auth-slice.reducer";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function LoginComponent() {
  const dispatch = useDispatch();
  const { jwtLoginData } = useSelector((state: any) => state.auth);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const [generalErrorMsg, setGeneralErrorMsg] = useState<[]>([]);
  const [showGeneralErrorMsg, setShowGeneralErrorMsg] =
    useState<boolean>(false);
  const [loginButtonDisabled, setLoginButtonDisabled] =
    useState<boolean>(false);

  // handle login response
  useEffect(() => {
    if (jwtLoginData.success) {
      setCookie(
        `${process.env.NEXT_PUBLIC_COOKIE_PREFIX}at`,
        jwtLoginData.data.accessToken
      );
      setCookie(
        `${process.env.NEXT_PUBLIC_COOKIE_PREFIX}rt`,
        jwtLoginData.data.refreshToken
      );

      dispatch(setAuthStatus(true));
    } else {
      setLoginButtonDisabled(false);
    }

    if (!jwtLoginData.success && jwtLoginData.messages) {
      const findMsgByParam = (param: string) => {
        return (
          jwtLoginData.messages.find((obj: any) => obj.param === param)?.msg ||
          ""
        );
      };

      setUsernameErrorMsg(findMsgByParam("username"));
      setPasswordErrorMsg(findMsgByParam("password"));

      const selectedParams = ["username", "password"];

      if (showGeneralErrorMsg) {
        setGeneralErrorMsg(
          jwtLoginData.messages.filter(function (obj: any) {
            return !selectedParams.includes(obj.param);
          })
        );
      }
    }
  }, [jwtLoginData]);

  // validation
  const validate = (name: string, value: string) => {
    let message = "";

    switch (name) {
      case "username":
        if (!value) {
          message = "Username is required";
        }
        setUsernameErrorMsg(message);
        break;
      case "password":
        if (!value) {
          message = "Password is required";
        }
        setPasswordErrorMsg(message);
        break;
    }

    const success = message ? false : true;
    return success;
  };

  // handle login submit
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let validationStatus = true;

    const ct = event.currentTarget;

    const data = {
      username: ct.username.value,
      password: ct.password.value,
    };

    Object.entries(data).map(([k, v]) => {
      const validationStatusEach = validate(k, v);
      validationStatus =
        validationStatusEach && validationStatus ? true : false;
      return validationStatus;
    });

    if (validationStatus) {
      dispatch(jwtLogin(data));

      setGeneralErrorMsg([]);
      setShowGeneralErrorMsg(true);
      setLoginButtonDisabled(true);
    }
  };

  return (
    <div>
      <form className="" onSubmit={handleLoginSubmit}>
        <div>
          <h2>Login</h2>
          <hr />
        </div>
        <ErrorMessageList errorMessageList={generalErrorMsg} />
        <div className="mb-2.5 flex-row md:flex">
          <label htmlFor="username" className="w-1/4 pt-1.5 pr-2 font-semibold">
            Username
          </label>
          <div className="flex-row md:w-3/4 py-1.5 md:py-0">
            <InputText
              name="username"
              id="username"
              alertType={`${usernameErrorMsg ? "danger" : "default"}`}
              onChange={(e) => validate(e.target.name, e.target.value)}
              onBlur={(e) => validate(e.target.name, e.target.value)}
            />
            <HelperMsg alertType={usernameErrorMsg ? "danger" : "default"}>
              {usernameErrorMsg}
            </HelperMsg>
          </div>
        </div>
        <div className="pb-2.5 flex-row md:flex">
          <label htmlFor="password" className="w-1/4 pt-1.5 pr-2 font-semibold">
            Password
          </label>
          <div className="flex-row md:w-3/4 py-1.5 md:py-0">
            <InputText
              type="password"
              name="password"
              id="password"
              alertType={passwordErrorMsg ? "danger" : "default"}
              onChange={(e) => validate(e.target.name, e.target.value)}
              onBlur={(e) => validate(e.target.name, e.target.value)}
            />
            <HelperMsg alertType={passwordErrorMsg ? "danger" : "default"}>
              {passwordErrorMsg}
            </HelperMsg>
          </div>
        </div>
        <div className="flex pt-2.5">
          <div className="w-1/4"></div>
          <div className="flex-row w-3/4">
            <Button disabled={loginButtonDisabled}>Login</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
