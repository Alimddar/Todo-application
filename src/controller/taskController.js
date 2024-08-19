import { Task } from "../model/tasks.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      userId: req.user.id,
    });

    return res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
