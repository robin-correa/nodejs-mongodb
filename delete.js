const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-practice")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function removeCourse(id) {
  //const result = await Course.deleteOne({ _id: id });
  //const result = await Course.deleteMany({ isPublished: true });

  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

removeCourse("5a68ff090c553064a218a547");
