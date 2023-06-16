import ErrorMessageList from "@/shared/components/error-message-list";
import Button from "@/shared/components/form/button";
import InputText from "@/shared/components/form/input-text";
import HelperMsg from "@/shared/components/msg/helper-msg";
import {
  PW_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/shared/constants/register-auth";
import {
  jwtRegister,
  setAuthStatus,
} from "@/store/reducers/auth-slice.reducer";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function RegisterComponent() {
  const dispatch = useDispatch();
  const { jwtRegisterData } = useSelector((state: any) => state.auth);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const [passwordConfirmationErrorMsg, setPasswordConfirmationErrorMsg] =
    useState<string>("");
  const [generalErrorMsg, setGeneralErrorMsg] = useState<[]>([]);
  const [showGeneralErrorMsg, setShowGeneralErrorMsg] =
    useState<boolean>(false);
  const [registerButtonDisabled, setRegisterButtonDisabled] =
    useState<boolean>(false);

  // handle register response
  useEffect(() => {
    if (jwtRegisterData.success) {
      setCookie(
        `${process.env.NEXT_PUBLIC_COOKIE_PREFIX}at`,
        jwtRegisterData.data.accessToken
      );
      setCookie(
        `${process.env.NEXT_PUBLIC_COOKIE_PREFIX}rt`,
        jwtRegisterData.data.refreshToken
      );

      dispatch(setAuthStatus(true));
    } else {
      setRegisterButtonDisabled(false);
    }

    if (!jwtRegisterData.success && jwtRegisterData.messages) {
      const findMsgByParam = (param: string) => {
        return (
          jwtRegisterData.messages.find((obj: any) => obj.param === param)
            ?.msg || ""
        );
      };

      setUsernameErrorMsg(findMsgByParam("username"));
      setPasswordErrorMsg(findMsgByParam("password"));
      setPasswordConfirmationErrorMsg(findMsgByParam("passwordConfirmation"));

      const selectedParams = ["username", "password", "passwordConfirmation"];

      if (showGeneralErrorMsg) {
        setGeneralErrorMsg(
          jwtRegisterData.messages.filter(function (obj: any) {
            return !selectedParams.includes(obj.param);
          })
        );
      }
    }
  }, [jwtRegisterData]);

  // validation
  const validate = (name: string, value: string) => {
    let message = "";

    switch (name) {
      case "username":
        if (!value) {
          message = "Username is required";
        } else if (!value.match(/^[a-z0-9-]+$/)) {
          message = "Lowercase letters, numbers and hyphen only";
        } else if (value.length < USERNAME_MIN_LENGTH) {
          message = `Username must be at least ${USERNAME_MIN_LENGTH} characters`;
        } else if (value.length > USERNAME_MAX_LENGTH) {
          message = `Username can be maximum ${USERNAME_MAX_LENGTH}} characters`;
        }
        setUsernameErrorMsg(message);
        break;
      case "password":
        if (!value) {
          message = "Password is required";
        } else if (value.length < PW_MIN_LENGTH) {
          message = `Password must be at least ${PW_MIN_LENGTH} characters`;
        } else if (!value.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).+$/)) {
          message = "Must contain at least one letter, number, and symbol";
        }
        setPasswordErrorMsg(message);
        if (value && passwordConfirmation && value != passwordConfirmation) {
          setPasswordConfirmationErrorMsg(
            "Confirmation password does not match password"
          );
        } else {
          setPasswordConfirmationErrorMsg("");
        }
        break;
      case "passwordConfirmation":
        if (!value) {
          message = "Password Confirmation is required";
        } else if (value !== password) {
          message = "Confirmation password does not match password";
        }
        setPasswordConfirmationErrorMsg(message);
        break;
    }

    const success = message ? false : true;
    return success;
  };

  // handle register submit
  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let validationStatus = true;

    const ct = event.currentTarget;

    const data = {
      username: ct.username.value,
      password: ct.password.value,
      passwordConfirmation: ct.passwordConfirmation.value,
    };

    Object.entries(data).map(([k, v]) => {
      const validationStatusEach = validate(k, v);
      validationStatus =
        validationStatusEach && validationStatus ? true : false;
      return validationStatus;
    });

    if (validationStatus) {
      dispatch(jwtRegister(data));

      setGeneralErrorMsg([]);
      setShowGeneralErrorMsg(true);
      setRegisterButtonDisabled(true);
    }
  };

  return (
    <div>
      <form className="" onSubmit={handleRegisterSubmit}>
        <div>
          <h2>Create Account</h2>
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
              onChange={(e) => {
                setPassword(e.target.value);
                validate(e.target.name, e.target.value);
              }}
              onBlur={(e) => validate(e.target.name, e.target.value)}
            />
            <HelperMsg alertType={passwordErrorMsg ? "danger" : "default"}>
              {passwordErrorMsg}
            </HelperMsg>
          </div>
        </div>
        <div className="pb-2.5 flex-row md:flex">
          <label
            htmlFor="passwordConfirmation"
            className="w-1/4 pt-1.5 pr-2 font-semibold"
          >
            Confirm Password
          </label>
          <div className="flex-row md:w-3/4 py-1.5 md:py-0">
            <InputText
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              alertType={passwordConfirmationErrorMsg ? "danger" : "default"}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
                validate(e.target.name, e.target.value);
              }}
              onBlur={(e) => validate(e.target.name, e.target.value)}
            />
            <HelperMsg
              alertType={passwordConfirmationErrorMsg ? "danger" : "default"}
            >
              {passwordConfirmationErrorMsg}
            </HelperMsg>
          </div>
        </div>
        <div className="flex pt-2.5">
          <div className="w-1/4"></div>
          <div className="flex-row w-3/4">
            <Button disabled={registerButtonDisabled}>Create Account</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
