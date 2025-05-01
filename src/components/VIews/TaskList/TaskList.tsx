"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { deleteTask, fetchTasks } from "@/store/tasksSlice";
import { Task, TaskStatus } from "@/types/task";
import { useRouter } from "next/navigation";
import { FilterButton, FilterContainer, TaskContainer } from "./styles";
import Cookies from "js-cookie";
import TaskCard from "../../TaskCard/TaskCard";

const TaskList = () => {
  const [filter, setFilter] = useState<TaskStatus | "ALL">("ALL");
  //in case of endpoint didnt send any data to avoid infinit loop endpoint call
  const [hasFetched, setHasFetched] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const tasks = useSelector((state: RootState) => state?.tasks?.tasks);

  const filteredTasks =
    filter.toLowerCase() === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter.toLowerCase());

  const handleDelete = async (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    try {
      const token = Cookies.get("token");
      //  endpoint call to delete the task
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("TESTING++ before", response);
      if (response.ok) {
        dispatch(deleteTask(taskId));
      } else {
        console.error("failed to delete task.");
      }
    } catch (error) {
      console.error("error deleting task:", error);
    }
  };

  const handleEdit = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
    // router.push(`/tasks?id=${taskId}`);
  };

  useEffect(() => {
    ////intially update the store by endpoint
    if (tasks.length === 0 && !hasFetched) {
      dispatch(fetchTasks());
      setHasFetched(true);
    }
  }, [dispatch, tasks]);

  return (
    <div>
      <FilterContainer>
        {["ALL", "TODO", "IN-PROGRESS", "DONE"].map((status) => (
          <FilterButton
            key={status}
            $active={filter === status}
            onClick={() => setFilter(status as TaskStatus | "ALL")}
          >
            {status}
          </FilterButton>
        ))}
      </FilterContainer>

      <TaskContainer>
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          filteredTasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </TaskContainer>
    </div>
  );
};

export default TaskList;
