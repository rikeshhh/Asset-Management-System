import React, { useState } from "react";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import Button from "../../Component/Button/Button";
import "./Signup.css";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Model from "../../Component/Model/Model";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

export const Signup = () => {
  const formMethod = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = formMethod;
  const submitData = (data) => {
    console.log(data);
  };
  // password showing features
  const [showPassword, setShowPassword] = useState(false)
  const[showResetPassword,setShowResetPassword]=useState(false)
  const visiblePasswordFn = (e) => (
    e.preventDefault(),
    setShowPassword((prev) => !prev)
  )
  const visibleResetPasswordFn = (e) => (
    e.preventDefault(),
    setShowResetPassword((prev) => !prev)
  )
  return (
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
              <h3 className="user__auth--title">Signup</h3>
              <div className="group__form auth--form">
                <div className="form__input--section">
                  <Label text="Username" />
                  <InputField
                    name="Username"
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
                <div className="form__input--section">
                  <Label text="Email" />
                  <InputField
                    name="Email"
                    register={register}
                    value={Model.Email.pattern.value}
                    message={Model.Email.pattern.message}
                    required={Model.Email.required}
                    errors={errors}
                    type={Model.Email.type}
                    placeholder={Model.Email.placeholder}
                    maxLength={Model.Email.maxLength.value}
                    maxMessage={Model.Email.maxLength.message}
                  />
                </div>
                <div className="form__input--section form__input--section__password">
                  <Label text="Password" />
                  <InputField
                    name="Password"
                    register={register}
                    value={Model.Password.pattern.value}
                    message={Model.Password.pattern.message}
                    required={Model.Password.required}
                    errors={errors}
                    type={Model.Password.type}
                    placeholder={Model.Password.placeholder}
                    minLength={Model.Password.minLength.value}
                    minMessage={Model.Password.minLength.message}
                    maxLength={Model.Password.maxLength.value}
                    maxMessage={Model.Password.maxLength.message}
                    showPassword={showPassword}
                    visiblePasswordFn={visiblePasswordFn}
                  >
                    <button className="toggleBtn__signUp"  type="button">
                      {showPassword?<BiSolidShow />:<BiSolidHide />}
                      </button>
                    </InputField>
                </div>
                <div className="form__input--section form__input--section__password">
                  <Label text="RetypePassword" />
                  <input
                    className="retype-password"
                    name="RetypePassword"
                    type={showResetPassword?'text':'password'}
                    placeholder="Enter your password again"
                    {...register("RetypePassword", {
                      required: "Retype Password is required",
                      validate: (value) =>
                        value === watch("Password") || "Passwords do not match",
                    })}
                  />
                    <button onClick={visibleResetPasswordFn} className="toggleBtn__signUp__retype__password"  type="button">
                      {showResetPassword?<BiSolidShow />:<BiSolidHide />}
                      </button>
              
                  {errors.RetypePassword && (
                    <p className="retype__error">
                      {errors.RetypePassword.message}
                    </p>
                  )}

                  <div className="user__auth--ques">
                    <p>Already have an account?</p>
                    <Link to="/login">
                      <span>Login</span>
                    </Link>
                  </div>
                </div>
                <Button
                  text="Signup"
                  className={"user__auth--button"}
                  value="submit"
                />
              </div>
            </form>
          </FormProvider>
          <div className="user__auth--bottom">
            <p>
              Please contact the admin at{" "}
              <a href="mailto:admin@ams.com">admin@ams.com</a> for help
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
