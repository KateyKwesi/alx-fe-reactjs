import axios from "axios";

export async function fetchUserData(username) {
  if (!username) throw new Error("Username is required");

  const response = await axios.get(`https://api.github.com/users/${username}`);

  return response.data;
}
