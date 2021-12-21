const responseInterceptor = (instance) => {
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
      if (error.response.status === 401) {
        // console.log(error.response);
        localStorage.removeItem("token");
        window.location.pathname = "/login";
      }
      return Promise.reject(error);
    }
  );
};

export default responseInterceptor;
