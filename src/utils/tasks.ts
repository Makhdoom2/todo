import fs from "fs";
import path from "path";

//  to read tasks from the JSON file
export const getTasks = () => {
  const filePath = path.join(process.cwd(), "data", "tasks.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData).tasks;
};

//  to save tasks to the JSON file
export const saveTasks = (
  tasks: { id: string; title: string; description: string; status: string }[]
) => {
  const filePath = path.join(process.cwd(), "data", "tasks.json");
  const dataToSave = JSON.stringify({ tasks }, null, 2);
  fs.writeFileSync(filePath, dataToSave, "utf-8");
};
