const checkListModel = require("../models/checkListModel");

const getCheckList = async (req, res) => {
  try {
    const checkList = await checkListModel.find({ user: req.user.id });
    res.status(200).json(checkList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Try catch error: ${error}` });
  }
};

const createCheckList = async (req, res) => {
  const { title, isDone } = req.body;

  if (!title || !isDone)
    return res.json({ message: "All fields are required" });

  try {
    await checkListModel.create({
      user: req.user.id,
      title,
      isDone,
    });
    res.status(201).json({ message: "Item added" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Try catch error: ${error}` });
  }
};

const updatedCheckList = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const checkListData = await checkListModel.findById({ _id: id });

    if (checkListData) {
      // Check if the user id stickynote and current logged in user id is matched
      if (checkListData.user.toString() === req.user._id.toString()) {
        const updatedCheckList = await checkListModel.findByIdAndUpdate(
          id,
          data,
          {
            new: true,
          }
        );
        if (!updatedCheckList) {
          return res.status(404).json({
            message: "It's your checklist note, but there is an error",
          });
        }
        res.status(201).json({ message: "Updated successfully" });
      } else {
        return res.status(400).json({ message: "That's not your sticky note" });
      }
    } else {
      return res.status(404).json({
        message: "Checklist note not found",
      });
    }
  } catch (error) {
    console.log(`Try catch error ${error}`);
    res.json({ message: error });
  }
};

const deleteCheckList = async (req, res) => {
  const id = req.params.id;

  try {
    const checkListData = await checkListModel.findById({ _id: id });

    if (checkListData) {
      // Check if the user id stickynote and current logged in user id is matched
      if (checkListData.user.toString() === req.user._id.toString()) {
        const deleteCheckList = await checkListModel.findByIdAndRemove({
          _id: id,
        });
        if (!deleteCheckList) {
          return res.status(404).json({
            message: "It's your checklist note, but there is an error",
          });
        }
        res.status(200).json({ message: "Deleted successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "That's not your checklist note" });
      }
    } else {
      return res.status(404).json({
        message: "Checklist note not found",
      });
    }
  } catch (error) {
    console.log(`Try catch error ${error}`);
    res.json({ message: error });
  }
};

module.exports = {
  getCheckList,
  createCheckList,
  updatedCheckList,
  deleteCheckList,
};
