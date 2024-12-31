import { ax } from "./axios";
import { BASE_URL } from "config";

export const logout = async () => {
  await ax.get("/users/sign-out");
};

export const deleteUser = async () => {
  await ax.delete(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

export interface UpdateProfileData {
  nickname: string;
  email: string;
}

export const updateProfile = async (data: UpdateProfileData) => {
  await ax.put("/users", data);
};
