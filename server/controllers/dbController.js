const Task = require('../models/Task'); 


// פונקציה לקבלת כל המשימות ממסד הנתונים
async function getTasks(req, res) {
  try {
    const tasks = await Task.find({}); 
    res.status(200).json(tasks); 
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: err.message });
  }
}

// פונקציה להוספת משימה חדשה למסד הנתונים
async function addTask(req, res) {
  const { title } = req.body;
  const newTask = new Task({
    title: title 
  });
  try {
    const savedTask = await newTask.save(); 
    res.status(201).json(savedTask); 
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(400).json({ message: err.message }); 
  }
}


//   פונקציה עבור שינוי המצב במשימות במסד הנתונים 
async function toggleTask(req, res) {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.done = !task.done;
    const updatedTask = await task.save();
    res.status(200).json(updatedTask); 
  } catch (err) {
    console.error("Error toggling task:", err);
    res.status(500).json({ message: err.message });
  }
}

// פונקציה למחיקת משימה ממסד הנתונים לפי ID
async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully', deletedTask });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: err.message });
  }
}
module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};
