import React from 'react'
import { Label } from '../../Component/Label/Label'
import { InputField } from '../../Component/Input/InputField'
import Button from '../../Component/Button/Button'
import './Signup.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import validationRules from "../../Component/Validation/Validation.json"
export const Signup = () => {
   const {
      register,
      formState: { errors },
      handleSubmit
   } = useForm();
const submitData=(data)=> {
   console.log(data)
}
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
                  onSubmit={handleSubmit(submitData)}
               >
                  <h3 className="user__auth--title">Signup</h3>
                  <div className="user__auth--input">

                  {Object.keys(validationRules).map((fieldName) => {
  const rule = validationRules[fieldName];

  return (
    <>
      <label>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:</label>
      <input
        placeholder={rule.placeholder}
        name={fieldName}
        type={rule.type === 'password' ? 'password' : 'text'}
        disabled={false} 
        {...register(fieldName, {
          required: rule.required && rule.errorMessage,
          pattern: rule.type !== 'password' && rule.pattern && {
            value: new RegExp(rule.pattern.value),
            message: rule.pattern.message,
          },
          minLength: rule.minLength && { value: rule.minLength, message: rule.errorMessage },
          maxLength: rule.maxLength && { value: rule.maxLength, message: rule.errorMessage },
        })}
      />
      {errors[fieldName] && <p className='error-message'>{errors[fieldName].message || rule.errorMessage}</p>}
    </>
  );
})}
             
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
