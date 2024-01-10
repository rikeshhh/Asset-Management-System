import React from 'react'
import { Label } from '../../Component/Label/Label'
import { InputField } from '../../Component/Input/InputField'
import Button from '../../Component/Button/Button'
import './Signup.css'
import { Link } from 'react-router-dom'
export const Signup = () => {
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
               <form className="user__auth--form">
                  <h3 className="user__auth--title">Signup</h3>
                  <div className="user__auth--input">
                     <Label text="Username" />
                     <InputField placeholder="Enter your username"  type="text" maxlength="12" minlength="4"/>
                     <Label text="Email" />
                     <InputField placeholder="Enter your email" type="email"  maxlength="12" minlength="4"/>
                     <Label text="Password" />
                     <InputField placeholder="Enter your password" type="password"  maxlength="12" minlength="4"/>
                     <Label text="Retype Password" />
                     <InputField placeholder="Enter your password" type="password"  maxlength="12" minlength="4"/>
                     <div className="user__auth--ques">
                        <p>Already have an account?</p>
                        <Link to="/login">
                           <span>Login</span>
                        </Link>
                     </div>
                     <Button text="Signup" className={"user__auth--button"} />
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
