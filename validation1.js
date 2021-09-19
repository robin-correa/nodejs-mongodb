const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-practice")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

// Creating document
async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    author: "Robin",
    tags: ["node", "backend"],
    isPublished: true,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
}

createCourse();
