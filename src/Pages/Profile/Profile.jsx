import React from "react";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import { useForm } from "react-hook-form";
import "./profile.css";
import Button from "../../Component/Button/Button";
import { SelectInput } from "../../Component/Input/SelectInput";
import userProf from "/src/assets/userProf.svg";
export const Profile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
 
  return (
    <section className="content-wrapper">
      <div className="user__profile content-radius">
        <div className="user__profile--header">
          <h2>Amod Suman</h2>
          <span>Developer | Frontend</span>
        </div>
        <div className="user__profile--body">
          <div className="user__profile--left">
            <div className="user__profile--image">
              <figure>
                <img src={userProf} alt="amod suman" />
              </figure>
              <Button
                text="Upload new photo"
                className={"user__profile--image button"}
              />
              <span>
                Max file size: 3MB <br /> Larger image will be resized
                automatically. <br />
                Supported File Type: JPG, PNG
              </span>
              <p>
                <span style={{ fontSize: "0.875rem" }}>Created on: </span>24th
                September 2019
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit()} className="user__profile--form">
            <div className="user__profile--section">
              <Label text="Name" />
              <InputField
                placeholder="example123_ABC"
                name="Username"
                register={register}
                errors={errors}
                isDisabled={true}
                pattern={{
                  value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                  message:
                    "Invalid username format (alphanumeric characters and underscores)",
                }}
              />
            </div>

            <div className="user__profile--section">
              <Label text="Job Type" />
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div className="checkbox__input--label">
                  <InputField
                    placeholder="example123_ABC"
                    name="radio"
                    register={register}
                    errors={errors}
                    isDisabled={true}
                    pattern={{
                      value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                      message:
                        "Invalid username format (alphanumeric characters and underscores)",
                    }}
                  />
                  <Label text="Permanent" />
                </div>
                <div className="checkbox__input--label">
                  <InputField
                    placeholder="example123_ABC"
                    name="radio"
                    register={register}
                    errors={errors}
                    isDisabled={true}
                    pattern={{
                      value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                      message:
                        "Invalid username format (alphanumeric characters and underscores)",
                    }}
                  />
                  <Label text="Temporary" />
                </div>
              </div>
            </div>
            <div className="user__profile--section">
              <Label text="Designation" />
              <InputField
                placeholder="example123_ABC"
                name="Username"
                register={register}
                errors={errors}
                isDisabled={true}
                pattern={{
                  value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                  message:
                    "Invalid username format (alphanumeric characters and underscores)",
                }}
              />
            </div>
            <div className="user__profile--section">
              <Label text="Department" />
              <SelectInput />
            </div>
            <div className="user__profile--section">
              <Label text="Email" />
              <InputField
                placeholder="example123_ABC"
                name="Username"
                register={register}
                errors={errors}
                isDisabled={true}
                pattern={{
                  value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                  message:
                    "Invalid username format (alphanumeric characters and underscores)",
                }}
              />
            </div>
            <div className="user__profile--section">
              <Label text="Phone Number" />
              <InputField
                placeholder="example123_ABC"
                name="Username"
                register={register}
                errors={errors}
                pattern={{
                  value: /^[a-zA-Z0-9_]+$/, // Example username pattern (alphanumeric characters and underscores)
                  message:
                    "Invalid username format (alphanumeric characters and underscores)",
                }}
                isDisabled={true}
              />
            </div>
            <Button value="submit" text="Cancel" isDisabled={true} />
          </form>
        </div>
      </div>
    </section>
  );
};
