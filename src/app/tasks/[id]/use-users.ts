import { AssignedTo } from "@/types/task";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/signup");
        const data = await res.json();
        return data as AssignedTo[];
      } catch (error) {
        console.log("Error occured while calling /api/signup", error);
        return [];
      }
    },
    initialData: [],
  });
};

export default useUsers;
