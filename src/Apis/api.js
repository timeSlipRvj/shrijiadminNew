import axios from "axios";
import {getAuthToken} from '../Utils/Local'
import { siteUrl} from '../Utils/util'

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

if (getAuthToken()) {
  axios.defaults.headers.common["token"] = getAuthToken();
}else {
  delete axios.defaults.headers.common["token"];
}
export default axios.create({
  baseURL: siteUrl,
  headers: {
    Accept: "applications/json",    
  },
});
