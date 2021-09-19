const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-practice")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

// Querying document
async function getCourses() {
  const courses = await Course.find({});
  console.log(courses);
}

getCourses();
