import fs from "fs";
import path from "path";

// to read users from the JSON file
export const getUsers = () => {
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData).users;
};

//to save data
export const saveUsers = (
  users: { id: string; username: string; password: string; role: string }[]
) => {
  const filePath = path.join(process.cwd(), "data", "users.json");

  const dataToSave = JSON.stringify({ users }, null, 2);
  fs.writeFileSync(filePath, dataToSave, "utf-8");
};
