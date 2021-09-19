const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-practice")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (value) {
        return value && value.length > 0;
      },
      message: "A course should have at least one tag.",
    },
  },
  date: Date,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema);

// Creating document
async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    category: "web",
    author: "Robin",
    //tags: ["web"],
    isPublished: true,
    price: 10,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
}

createCourse();
