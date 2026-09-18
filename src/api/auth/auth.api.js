import ApiRoutes from "../../config/endpoint.config"; // Import the API Routes
import HttpClient from "../index.api";
import { decryptData, encryptData } from "../../utils/encryptdecrypt";
import { toast } from "react-toastify";
import { getTokenLocal } from "@localStorage.util";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

class Auth extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${getTokenLocal() || ""}`;
      // config.headers["authKey"] = process.env.NEXT_PUBLIC_API_AUTH_KEY;
      // config.headers["Content-Type"] = "text/plain";

      return config;
    });
  };

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      async (response) => {
        let data;
        if (response) {
          data = await decryptData(response); // Decrypt response body
          if (data.status == "success") {
          } else if (data.status == "fail") {
            toast.error(data.message);
          }
        } else {
          toast.error(response.message);
          // console.log("No encryptedData found in response.");
        }
        return data;
      },
      (error) => Promise.reject(error)
    );
  };

  // **Auth APIs with Encrypted Requests**
  login = async (reqBody) => {
    return this.instance({
      method: ApiRoutes.Auth.Login.Method,
      url: ApiRoutes.Auth.Login.Endpoint,
      data: encryptData(reqBody),
    });
  };
}

//  Export an instance of the `Auth` class
const authInstance = new Auth();
export default authInstance;
