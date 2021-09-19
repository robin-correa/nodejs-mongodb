const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-practice");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

// Get all the published backend courses, sort them by their name, pick only their name and author, and display them.
async function getCourses() {
  return await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1, tags: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
