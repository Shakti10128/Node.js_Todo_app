import { task } from "../models/task.js";

/* ------------------------------    Create New Task     ------------------------------- */
export const newTask = async (req, res, next) => {
  try {
    let { Task, Description } = req.body;

    await task.create({ Task, Description, user: req.User._id });

    res.json({
      success: true,
      message: "created successfully",
    });
  } catch (error) {
    next(error);
  }
};
/* ------------------------------    Get All Task     ------------------------------- */

export const getAllTask = async (req, res, next) => {
  try {
    const User_id = req.User._id;
    const tasks = await task.find({ user: User_id });
    res.json({
      success: true,
      message: tasks.length === 0 ? "No Task" : tasks,
    });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------    Update Task     ------------------------------- */

export const updateTask = async (req, res, next) => {
  try {
    const Task = await task.findById(req.params.id);
    if (!Task) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }
    Task.isCompleted = !Task.isCompleted;
    await Task.save();
    return res.json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------    Delete Task     ------------------------------- */

export const deleteTask = async (req, res, next) => {
  try {
    const Task = await task.findById(req.params.id);
    if (!Task) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }
    // is isCompleted false we can't deletd Task
    const isTaskCompleted = Task.isCompleted;
    if (Task && !isTaskCompleted) {
      return res.json({
        success: false,
        message: "Task not completed yet",
      });
    }
    //   if isCompleted is true delete it or remove it from the database
    await task.findByIdAndDelete(Task._id);
    res.json({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
