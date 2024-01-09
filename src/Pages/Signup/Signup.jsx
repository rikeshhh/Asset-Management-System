import React, { useState } from 'react'
import './Signup.css'
import { Label } from '../../Component/Label/Label';
import { Link } from 'react-router-dom';
export const Signup = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    return (
        <section className='main-container signup'>
            <div className='user__auth'>
                <div>
                    <h2 className='user__auth--heading'>AMS</h2>
                    <div className=''>
                        <p>Asset Management System</p>
                    </div>
                </div>
                <form action="" className='user__auth--form'>
                    <h3>Signup</h3>
                    <div>
                        <Label text ={"username"}></Label>
                    
                        <input type="text" placeholder='Enter your username' />
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter your username' />
                        <label htmlFor="password">Password</label>
                        <input placeholder='Enter your password'
                            type={
                                showPassword ? "text" : "password"
                            }
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                        <label for="retype">Retype password: </label>
                        <input
                            id="pass"
                            type={
                                showPassword ? "text" : "password"
                            }
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <label for="check">Show Password</label>
                        <input
                            id="check"
                            type="checkbox"
                            value={showPassword}
                            onChange={() =>
                                setShowPassword((prev) => !prev)
                            }
                        />
                    </div>
                    <div>
                        <p>already have an account?<span>Login</span></p>
                    </div>
                  <Link to="/"><button>Signup</button></Link> 
                </form>
                <div className='user__auth__ques'>
                    <span>Please contact the admin at admin@ams.com for help</span>
                </div>
            </div>
        </section>
    )
}
