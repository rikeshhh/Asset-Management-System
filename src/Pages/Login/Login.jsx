import "./Login.css";
import { Link } from "react-router-dom";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { ApiUrl } from "../../Component/APIUrl/ApiUrl";

const Login = () => {
  // const mutation = useMutation({
  //   mutationFn: (newTodo) => {
  //     return axios.post(`${ApiUrl}/login`, username, password);
  //   },
  // });

  const formMethod = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethod;

  const submitData = (data) => {
    console.log(data.username, data.password);
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
                <div className="form__input--section">
                  <Label text="Password" />
                  <InputField
                    name="password"
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
                  />
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
          <div className="user__auth--bottom user__auth--bottom__padding">
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

export default Login;
