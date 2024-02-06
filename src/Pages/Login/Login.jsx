import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { useMutation } from "@tanstack/react-query";
import { verifyUser } from "./LoginApiSlice";
import { useState } from "react";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "../../utils/StorageUtils";
import axios from "axios";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const verifyUserMutation = useMutation({
    mutationFn: (formData) => {
      return verifyUser(formData.username, formData.password);
    },
    onSuccess: (data) => {
      if (data.status === true) {
        navigate("/");
        console.log("accessToken", data.payload.access_token);
        setTokenToLocalStorage(data.payload.access_token);
      }
    },
    onError: (error) => {
      if (error.response.status === 401) {
        setError("Unauthorized: Please log in with valid id.");
      }
    },
  });



  const formMethod = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethod;

  const submitData = (data) => {
    console.log(data);
    verifyUserMutation.mutate(data);
    setError(null);
  };
  const [showPassword, setShowPassword] = useState(false)
  const visiblePasswordFn = (e) => (
    e.preventDefault(),
    setShowPassword(prev => !prev)
  )


  return (
    <>
      <section className="main-container signup">
        <div className="user__auth">
          <div className="user__auth__content">
            <div className="user__auth--top">
              <div className="user__auth--heading">AMS</div>
              <div className="user__auth--para">
                <p>Assets management system</p>
              </div>
            </div>
            <FormProvider {...formMethod}>
              <form
                className="user__auth--form"
                onSubmit={handleSubmit(submitData)}
              >
                <h3 className="user__auth--title">Login</h3>
                <div className="group__form auth--form">
                  <div className="form__input--section">
                    <Label text="Username" />
                    <InputField
                      name="username"
                      register={register}
                      required={Model.Username.required}
                      value={Model.Username.pattern.value}
                      message={Model.Username.pattern.message}
                      errors={errors}
                      type={Model.Username.type}
                      placeholder={Model.Username.placeholder}
                      minLength={Model.Username.minLength.value}
                      minMessage={Model.Username.minLength.message}
                      maxLength={Model.Username.maxLength.value}
                      maxMessage={Model.Username.maxLength.message}
                    />
                  </div>
                  <div className="form__input--section form__input--section__password">
                    <Label text="Password" />
                    <InputField
                      name="password"
                      register={register}
                      // value={Model.Password.pattern.value}
                      // message={Model.Password.pattern.message}
                      required={Model.Password.required}
                      errors={errors}
                      type={Model.Password.type}
                      placeholder={Model.Password.placeholder}
                      // minLength={Model.Password.minLength.value}
                      // minMessage={Model.Password.minLength.message}
                      // maxLength={Model.Password.maxLength.value}
                      // maxMessage={Model.Password.maxLength.message}
                      showPassword={showPassword}
                      visiblePasswordFn={visiblePasswordFn}

                    >
                      <button className="toggleBtn__login" >
                      {showPassword?<BiSolidShow/>:<BiSolidHide/>}
                      </button>
                      </InputField>
                  </div>
                  <div className="form__input--secion login__remember">
                    <InputField
                      name="Checkbox"
                      register={register}
                      errors={errors}
                      type={Model.Checkbox.type}
                    />
                    <Label text="Remember Me" />
                  </div>

                  <div className="login__btn">
                    <Button
                      text="Login"
                      className={"user__auth--button"}
                      value="submit"
                    />
                    <div className="user__auth--ques login__ques">
                      <p>Dont have an account?</p>
                      <Link to="/signup">
                        <span>Signup</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
            {error && <h2>{error}</h2>}
            <div className="user__auth--bottom user__auth--bottom__padding">
              <p>
                Please contact the admin at{" "}
                <a href="mailto:admin@ams.com">admin@ams.com</a> for help
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;