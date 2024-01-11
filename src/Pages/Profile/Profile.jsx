import React from 'react'
import './profile.css'
import { Label } from '../../Component/Label/Label'
import { InputField } from '../../Component/Input/InputField'
export const Profile = () => {
    return (
        <section className='main-container'>
            <div className='user__profile'>
                <div className='user__profile--header'></div> 
                <div className='user__profile--body'>
                    <div className='user__profile--image'>

                    </div>
                    <div className='user__profile--inputs'>
                        <form>
                            <Label/>
                        <InputField type="checkbox"/>
                        
                        </form>
                    </div>
                </div>

            </div>
        </section>
    )
}
