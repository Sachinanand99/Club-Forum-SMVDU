const sampleListings = [
  {
    title: "Comfortable Hostel Near Campus",
    description:
      "A cozy and affordable hostel room just 5 minutes from the university.",
    image: {
      url: "https://example.com/hostel.jpg",
      fileName: "hostel.jpg",
    },
    comments: [], // This should be filled with actual Comment IDs
    category: "Hostel",
    upVote: 5,
    downVote: 2,
  },
  {
    title: "Top-Rated School in the City",
    description:
      "An excellent school with a focus on academic excellence and extracurricular activities.",
    image: {
      url: "https://example.com/school.jpg",
      fileName: "school.jpg",
    },
    comments: [], // This should be filled with actual Comment IDs
    category: "School",
    upVote: 10,
    downVote: 1,
  },
  {
    title: "Affordable Mess with Tasty Food",
    description:
      "A well-managed mess offering delicious and nutritious meals at a reasonable price.",
    image: {
      url: "https://example.com/mess.jpg",
      fileName: "mess.jpg",
    },
    comments: [], // This should be filled with actual Comment IDs
    category: "Mess",
    upVote: 8,
    downVote: 3,
  },
];


module.exports = { data: sampleListings };

