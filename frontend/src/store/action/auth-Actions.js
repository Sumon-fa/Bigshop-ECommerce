import { uiActions } from "../slice/ui-slice";
import { authActions } from "../slice/auth-slice";

export const login = (email, password) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(authActions.loader());
      const response = await fetch("/api/v1/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    };

    try {
      const userData = await fetchUserData();
      dispatch(
        authActions.authentication({
          user: userData.user,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(authActions.loader());
  };
};
export const register = (formData) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(authActions.loader());
      const response = await fetch("/api/v1/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const usersData = await fetchUserData();

      dispatch(
        authActions.userRegister({
          user: usersData.user,
          isAuthenticated: true,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
      dispatch(
        authActions.userRegister({
          user: null,
          isAuthenticated: false,
        })
      );
    }
    dispatch(authActions.loader());
  };
};
