import axios from "axios";

export default axios.create({
  baseURL: "https://megoo.103-97-124-110.flashvps.xyz/be/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
