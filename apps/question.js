import { Router } from "express";

import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const questionRouter = Router();

questionRouter.get("/", async (req, res) => {
  const collection = db.collection("questions");

  try {
    const questions = await collection.find({}).limit(10).toArray();

    return res.json({ data: questions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
});

questionRouter.get("/:id", async function (req, res) {
  const collection = db.collection("questions");

  try {
    const questionId = new ObjectId(req.params.id);
    const questions = await collection.findOne({ _id: questionId });

    if (!questions) {
      return res.status(404).json({
        message: `Question not found`,
      });
    }

    return res.json({ data: questions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
});

questionRouter.post("/", async (req, res) => {
  const collection = db.collection("questions");

  try {
    const questionData = { ...req.body };
    const questions = await collection.insertOne(questionData);

    return res.json({
      message: `Question has been added successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
});

questionRouter.put("/:id", async function (req, res) {
  const collection = db.collection("questions");

  try {
    const questionId = new ObjectId(req.params.id);
    const newQuestionData = { ...req.body };

    await collection.updateOne(
      {
        _id: questionId,
      },
      {
        $set: newQuestionData,
      }
    );
    return res.json({
      message: `Question has been updated successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
});

questionRouter.delete("/:id", async function (req, res) {
  const collection = db.collection("questions");

  try {
    const questionId = new ObjectId(req.params.id);

    await collection.deleteOne({
      _id: questionId,
    });

    return res.json({
      message: `Question has been deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
});

export default questionRouter;
