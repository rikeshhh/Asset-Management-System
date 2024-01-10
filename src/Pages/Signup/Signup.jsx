import React from 'react'
import { Label } from '../../Component/Label/Label'
import { InputField } from '../../Component/Input/InputField'
import Button from '../../Component/Button/Button'
import './Signup.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
export const Signup = () => {
   const {
      register,
      formState: { errors },
      handleSubmit
   } = useForm();

   return (
      <section className='main-container signup'>
         <div className="user__auth">
            <div className="user__auth__content">
               <div className="user__auth--top">
                  <div className="user__auth--heading">AMS</div>
                  <div className="user__auth--para">
                     <p>Assets management system</p>
                  </div>
               </div>
               <form className="user__auth--form"
                  onSubmit={handleSubmit()}
               >
                  <h3 className="user__auth--title">Signup</h3>
                  <div className="user__auth--input">
                     <Label text="Username" />
                     <InputField placeholder="Enter your username" name="Username"
                        register={register}
                        errors={errors}
                        pattern={{
                           value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                           message: 'Invalid username format',
                        }}
                     />
                     <Label text="Email" />
                     <InputField placeholder="Enter your email" name="Email"
                        register={register}
                        pattern={{
                           value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                           message: "Please Enter the valid email address",
                        }}
                        errors={errors} />
                     <Label text="Password" />
                     <InputField placeholder="Enter your password"
                        name="Password"
                        pattern={{
                           value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Example password pattern (at least 8 characters, at least one letter, and one number)
                           message: 'Invalid password format',
                        }}
                        register={register}
                        errors={errors} />
                     <Label text="Retype Password" />
                     <InputField placeholder="Enter your password" name="Password" register={register} errors={errors} />
                     <div className="user__auth--ques">
                        <p>Already have an account?</p>
                        <Link to="/login">
                           <span>Login</span>
                        </Link>
                     </div>
                     <Button text="Signup" className={"user__auth--button"} value="submit" />
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
   )
}
