import {
  login as fLogin,
  logout as fLogout,
  setIsLoggedIn,
  updateUserSuccess
} from "../reducers/auth";

import axios from "axios";
import { setUser } from "../reducers/auth";
import { toast } from "react-toastify";

export const getProfile =()=>async(dispatch,getState)=>{
  try{
    // get token 
    const {token} =getState().auth;

    const response=await axios.get(`${process.env.REACT_APP_API}/Users/token`,{
      headers:{
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json",
        "token":`${token}`
      }
    });
    if(response.status !==200) throw new Error(`Opps get error when fetching  data ${response.status}`);
    // status ok
    dispatch(setUser(response.data.datas));
    // done
  }catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "absolute bottom-0 right-1/2",
      });
      return;
    }

    toast.error(error.msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "absolute bottom-0 right-1/2",
    });
  }
}
export const login =
  (data, navigate, resetUsername, resetPassword,url) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/Users/login`,
        {
          email:data.valueUsername,
          password:data.valuePassword
        },
        { "Content-Type": "application/json" }
      );

      if(response.data.status !=='200' ) throw new Error(`Opps got Error ${response.data.status} ${response?.data.msg}`);
      const token = response?.data.datas.token;
      dispatch(fLogin(token));
      dispatch(setIsLoggedIn(true));

      // reset password and username
      resetUsername();
      resetPassword();
      // redirect to home, don't forget to useNavigate in the component
      navigate(url);

    } catch (error) {
      if (error.response) {
        let errorMessage = "email atau password salah"; // Pesan kesalahan default
        const status = error.response.status;

        if (status === 401) {
          errorMessage = "Email atau password salah. Mohon periksa kembali.";
        } else if (status === 404) {
          errorMessage =
            "Akun tidak ditemukan. Mohon pastikan email yang Anda masukkan benar.";
        } else if (status === 500) {
          errorMessage = "Terjadi masalah pada server. Mohon coba lagi nanti.";
        }

        toast.error(errorMessage, {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "absolute bottom-0 right-1/2",
        });
      }
    }
  };

export const register =
  (
    data,
    navigate,
    resetUsername,
    resetPassword,
    resetFullName,
    resetPhone,
    setRequest
  ) =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        `https://novel-tomatoes-production.up.railway.app/Users/register`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
      const code = response?.data?.status;

      if (code === 200) {
        dispatch(setIsLoggedIn(true));

        // reset all fields
        resetUsername();
        resetFullName();
        resetPhone();
        resetPassword();

        // redirect to home, don't forget to useNavigate in the component
        toast.success(response?.data?.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "absolute bottom-0 right-1/2",
        });
        navigate("/auth/login");
      } else {
        // reset all fields
        resetUsername();
        resetFullName();
        resetPhone();
        resetPassword();

        toast.success(response?.data?.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "absolute bottom-0 right-1/2",
        });
        navigate("/auth/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "absolute bottom-0 right-1/2",
        });
        return;
      }

      // If it's not an Axios error, it's a different type of error.
      // Handle it accordingly.
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "absolute bottom-0 right-1/2",
      });
    }

    // if request has done
    setRequest(false);
  };

  export const logout = (navigate) => {
    return (dispatch) => {
      dispatch(fLogin());
      dispatch(fLogout());
      dispatch(setIsLoggedIn(false));
      navigate("/auth/login");
    };
  };
  
  export const updateUser = (data, setUpdate) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      const response = await axios.put(
        `https://novel-tomatoes-production.up.railway.app/Users/updateUser`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      const code = response?.data?.status;
  
      if (code === 200) {
        // Dispatch the updateUserSuccess action with the updated user data
        dispatch(updateUserSuccess(response?.data?.user));
  
        // Display success message
        toast.success(response?.data?.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "absolute bottom-0 right-1/2",
        });
      } else {
        toast.error("wait a minute for update.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "absolute bottom-0 right-1/2",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Display error message from the API response
        toast.error(error?.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "absolute bottom-0 right-1/2",
        });
      } else {
        // Display generic error message
        toast.error("An error occurred. Please try again later.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "absolute bottom-0 right-1/2",
        });
      }
    }
    // If the `setUpdate` function is available, set the state to false
    if (setUpdate) {
      setUpdate(false);
    }
  };
  