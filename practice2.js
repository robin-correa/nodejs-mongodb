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

// Get all the published frontend and backend courses, sort them by their price in a descending order, pick only their name and author, and display them.
async function getCourses() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] },
  })
    //.or([{ tags: "frontend" }, { tags: "backend" }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
