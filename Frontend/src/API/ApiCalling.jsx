import { AdminTokenRequest, basicRequest, TokenRequest } from '../AxiosCreate';
import { LoginData } from '../Redux/UserSlice'

export const SignupAPI = async (data) => {
  try {
    // Send data to the backend
    const response = await AdminTokenRequest.post('/admin/Executivesignup', data);
    // Display the backend response in the alert box
    alert(response.data);

  } catch (err) {
    // Log the error and show an error message in the alert box
    console.error("SignupAPI Error:", err);
    alert(err.response?.data?.message || 'An error occurred during signup.');
  }
};


export const loginUser = async (data, dispatch) => {
  try {
    const response = await basicRequest.post('/user/login', data);
    console.log(response.data);
    dispatch(LoginData(response.data));

  } catch (err) {
    // Check the error response for specific status or message
    if (err.response && err.response.status === 401) {
      alert('Invalid email or password');
    } else if (err.response && err.response.status === 500) {
      alert('Internal Server Error. Please try again later.');
    } else {
      alert('An unexpected error occurred. Please check your connection.');
    }
    console.error(err);
  }
};

export const addcustomer = async (data) => {
  try {
    // Send data to the backend
    const response = await TokenRequest.post('/user/addCustomer', data);
    alert(response.data);

  } catch (err) {
    console.error("Data not Error:", err);
    alert(err.response?.data?.message || 'An error occurred during signup.');
  }

}

export const fetchcustomers = async (findid) => {
  console.log("api>>>>>>",findid);
  
  try {
    const response = await TokenRequest.get("/user/allCustomerId", {
      params: { id: findid }
    });
    return response
  } catch (err) {
    console.error("Data not Error:", err);
  }
}

export const Getoneupdatecustomer = async (findid) => {
  console.log('from api>>>>>>>', findid);
  try {
      // Sending 'findid' as a query parameter
      const response = await TokenRequest.get("/user/getOnecustomerdatabyid", {
          params: { id: findid }
      });
      return response;
  } catch (err) {
      console.log(err);
  }
};
