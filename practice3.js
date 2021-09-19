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

// Get all the published courses that are $15 or more, or have a word "by" in their title.
async function getCourses() {
  return await Course.find({
    isPublished: true,
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
