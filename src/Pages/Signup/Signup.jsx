import React from "react";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import Button from "../../Component/Button/Button";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import validationRules from "../../Component/Validation/Validation";
import Model from "../../Component/Model/Model";
export const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const submitData = (data) => {
    console.log(data);
  };
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
          <form
            className="user__auth--form"
            onSubmit={handleSubmit(submitData)}
          >
            <h3 className="user__auth--title">Signup</h3>
            <div className="user__auth--input">
              <Label text="Username" />
              <InputField
                name="Username"
                register={register}
                pattern={Model.Username.pattern}
                required={Model.Username.required}
                errorMessage={Model.Username.errorMessage}
                errors={errors}
                type={Model.Username.type}
                placeholder={Model.Username.placeholder}
                minLength={Model.Username.minLength}
                maxLength={Model.Username.maxLength}
              />
              <Label text="Email" />
              <InputField
                name="Email"
                register={register}
                pattern={Model.Email.pattern}
                required={Model.Email.required}
                errorMessage={Model.Email.errorMessage}
                errors={errors}
                type={Model.Email.type}
                placeholder={Model.Email.placeholder}
                minLength={Model.Email.minLength}
                maxLength={Model.Email.maxLength}
              />
              <Label text="Password" />
              <InputField
                name="Password"
                register={register}
                pattern={Model.Password.pattern}
                required={Model.Password.required}
                errorMessage={Model.Password.errorMessage}
                errors={errors}
                type={Model.Password.type}
                placeholder={Model.Password.placeholder}
                minLength={Model.Password.minLength}
                maxLength={Model.Password.maxLength}
              />
              <Label text="RetypePassword" />
              <InputField
                name="RetypePassword"
                register={register}
                pattern={Model.RetypePassword.pattern}
                required={Model.RetypePassword.required}
                errorMessage={Model.RetypePassword.errorMessage}
                errors={errors}
                type={Model.RetypePassword.type}
                placeholder={Model.RetypePassword.placeholder}
                minLength={Model.RetypePassword.minLength}
                maxLength={Model.RetypePassword.maxLength}
              />


              <div className="user__auth--ques">
                <p>Already have an account?</p>
                <Link to="/login">
                  <span>Login</span>
                </Link>
              </div>
              <Button
                text="Signup"
                className={"user__auth--button"}
                value="submit"
              />
            </div>
          </form>
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
