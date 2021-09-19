const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
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

// Creating document
async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    author: "Robin",
    tags: ["node", "backend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// Querying document
async function getCourses() {
  // Pagination
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ isPublished: true })

    // Comparison
    .find({ price: { $gte: 10, $lte: 20 } })
    .find({ price: { $in: [10, 15, 20] } })
    .find({ price: { $gte: 10, $lte: 20 } })

    // Logical
    .find()
    .or([{ author: "Author" }, { isPublished: true }])
    .and([{}, {}])

    // Starts with Robin
    .find({ author: /^Robin/ })

    // Ends with Correa
    .find({ author: /Correai$/i })

    // Contains with Robin
    .find({ author: /.*Robin.*/i })

    // With pagination
    // .skip((pageNumber -1) * pageSize)
    // .limit(pageSize)

    // Result
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // Count (Note: select() must be removed)
  //.count();
  console.log(courses);
}

getCourses();
