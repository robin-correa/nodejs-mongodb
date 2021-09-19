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

async function updateCourse(id) {
  // Approach: Query first (in case validating the record first before update)
  // findById()
  // Modify its properties
  // save()

  /*
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";
  const result = await course.save();
  console.log(result);
  */

  // Approach: Update first
  // Update directly
  // Optionally: get the updated document

  //   course.set({
  //     isPublished: true,
  //     author: "Another Author",
  //   });

  /*
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Robin",
        isPublished: false,
      },
    }
  );
  */

  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Robin Correa",
        isPublished: false,
      },
    },
    { new: true }
  );

  console.log(result);
}

updateCourse("5a68fdf95db93f6477053ddd");
