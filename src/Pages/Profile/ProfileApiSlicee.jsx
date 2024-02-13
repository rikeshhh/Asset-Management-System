import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
export const employeeEdit = async (employeeData) => {
    const employeeDeleteRequest = await instance.put(`/user`, {
        "username": employeeData.employeeData.username,
        "password": "xddfxdfx",
        "email": employeeData.employeeData.email,
        "name": employeeData.employeeData.username
    },
        {
            params: {
                id: employeeData.id
            },
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        },

    );
};
export const employeeProfile = async (employeeData) => {
    const employeeAddRequest = await instance.post("/user", {
        "username": employeeData.username,
        "password": "adminadmin",
        "email": employeeData.email,
        "name": employeeData.username
    },
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        },

    );
};


