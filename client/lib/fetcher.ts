import axios from "axios";

export const ENDPOINT = "http://localhost:4000"

// fetch(`${ENDPOINT}/${url}`).then((response) => response.json())
//axios.get(url).then((res) => res.data)
const fetcher = (url: string) => axios.get(`${ENDPOINT}/${url}`).then((res) => res.data);

export default fetcher;
