import React from 'react'
import { InputField } from '../../Component/Input/InputField'
import { Label } from '../../Component/Label/Label'
import { useForm } from 'react-hook-form'
import './profile.css'
import Button from '../../Component/Button/Button'
export const Profile = () => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();
    return (
        <section className='main-container'>
            <div className='user__profile'>
                <div className='user__profile--header'>
                    <h2>Amod Suman</h2>
                    <span>Developer | Frontend</span>
                </div>


                <div className='user__profile--body'>
                  <div className="user__profile__body--image">
                  <div className='user__profile--image'>
                        <figure>
                            <img src="" alt="amod suman" />
                        </figure>
                        <Button text="Upload a new photo" className={'user__profile--image button'} />
                        <span>
                            Max file size: 3MB
                            Larger image will be resized automatically.
                        </span>
                        <p><span>Created on</span>:24th September 2019</p>
                    </div>
                  </div>


                    <div className='user__profile--inputs'>
                        <form onSubmit={handleSubmit()} className='user__profile--form'>
                            <Label text="Name" />
                            <InputField placeholder="example123_ABC" name="Username"
                                register={register}
                                errors={errors}
                                pattern={{
                                    value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                                    message: 'Invalid username format (alphanumeric characters and underscores)',
                                }}
                            />
                            <Label text="Designation" />
                            <InputField placeholder="example123_ABC" name="Username"
                                register={register}
                                errors={errors}
                                pattern={{
                                    value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                                    message: 'Invalid username format (alphanumeric characters and underscores)',
                                }}
                            />
                            <Label text="Deepartment" />
                            <InputField placeholder="example123_ABC" name="Username"
                                register={register}
                                errors={errors}
                                pattern={{
                                    value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                                    message: 'Invalid username format (alphanumeric characters and underscores)',
                                }}
                            />
                            <Label text="Email" />
                            <InputField placeholder="example123_ABC" name="Username"
                                register={register}
                                errors={errors}
                                pattern={{
                                    value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                                    message: 'Invalid username format (alphanumeric characters and underscores)',
                                }}
                            />
                            <Label text="Phone Number" />
                            <InputField placeholder="example123_ABC" name="Username"
                                register={register}
                                errors={errors}
                                pattern={{
                                    value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                                    message: 'Invalid username format (alphanumeric characters and underscores)',
                                }}
                            />
                            <Button value="submit" text="cancel" />
                        </form>
                    </div>
                </div>

            </div>
        </section>
    )
}
