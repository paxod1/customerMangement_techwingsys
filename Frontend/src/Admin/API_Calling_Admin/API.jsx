import { AdminTokenRequest, basicRequest } from '../../AxiosCreate';
import { LoginData } from '../../Redux/AdminSlice'


export const SignupAPI = async (data) => {
    try {
        // Send data to the backend
        const response = await basicRequest.post('/admin/signup', data);

        // Display the backend response in the alert box
        alert(response.data);

    } catch (err) {
        // Log the error and show an error message in the alert box
        console.error("SignupAPI Error:", err);
        alert(err.response?.data?.message || 'An error occurred during signup.');
    }
};

export const loginAdmin = async (data, dispatch) => {
    try {
        const LoginInfo = await basicRequest.post("/admin/login", data)
        console.log(LoginInfo.data)
        dispatch(LoginData(LoginInfo.data))


    } catch (err) {
        console.log(err)
    }
}

export const AllExecutivesData = async () => {
    try {
        const datas = await AdminTokenRequest.get("/admin/allExecutives")
        return datas
    } catch (err) {
        console.log(err)
    }
}

export const GetUpdateExecutivesData = async (findid) => {
    console.log('from api>>>>>>>', findid);

    try {
        // Sending 'findid' as a query parameter
        const response = await AdminTokenRequest.get("/admin/getOneExecutiveDatabyId", {
            params: { id: findid }
        });
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const allfetchcustomers = async () => {
    console.log("api>>>>>>");

    try {
        const response = await AdminTokenRequest.get("/admin/allCustomerAdmin");
        return response
    } catch (err) {
        console.error("Data not Error:", err);
    }
}
export const Getoneupdatecustomer = async (findid) => {
    console.log('from api>>>>>>>', findid);
    try {
        // Sending 'findid' as a query parameter
        const response = await AdminTokenRequest.get("/user/getOnecustomerdatabyid", {
            params: { id: findid }
        });
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const DeleteCustomerdata = async (findid) => {
    console.log('from api>>>>>>>', findid);
    try {
        const response = await AdminTokenRequest.delete("/admin/DeleteCustomerdataid", {
            params: { id: findid }
        });
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting customer:", error);
        throw error;
    }
};

