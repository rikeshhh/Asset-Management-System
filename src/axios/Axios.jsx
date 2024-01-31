import axios from "axios";
import { ApiUrl } from "../Component/APIUrl/ApiUrl";

const instance = axios.create({
  baseURL: ApiUrl,
});

export default instance;
