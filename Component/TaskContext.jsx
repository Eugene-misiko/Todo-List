import { createContext, useEffect, useState } from "react";


export const TaskContext = createContext();


export const TaskProvider = ({children}) => {
    const [tasks, setTasks] =  useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchTasks();
    }, []);

 const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  

}