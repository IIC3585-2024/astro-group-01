const localData = [
  {
    rating: [10, 5, 5, 6, 7, 8, 9],
    comments: [
      { user: "Anonimo 1", comment: "Wow this is amazing!!!" },
      { user: "Anonimo 2", comment: "Wow this is Legendary!!" },
      { user: "Anonimo 2", comment: "Wow this is Legendary!!" },
      { user: "Anonimo 2", comment: "Wow this is Legendary!!" },
      { user: "Anonimo 2", comment: "Wow this is Legendary!!" },
      { user: "Anonimo 2", comment: "Wow this is Legendary!!" },
      { user: "Anonimo 2", comment: "Wow this is Legendary!!" },
    ],
  },

  {
    rating: [1, 2, 9, 4],
  },
  {
    rating: [4, 5, 6, 7],
  },
  {
    rating: [1, 10],
  },
  {
    rating: [5, 5, 5, 5, 5, 10, 10],
  },
  {
    rating: [8, 8, 8, 7],
  },
  {
    rating: [9, 5, 6, 9],
  },
  {
    rating: [3, 3, 3, 3, 3, 4],
  },
  {
    rating: [6, 7, 6, 8, 8],
  },
  {
    rating: [4, 4, 4, 4, 4, 6, 6, 6, 6, 6],
  },
  {
    rating: [1, 2],
  },
];

export function assingExtraData(data) {
  console.log("Entra a asignar");
  data["rating"] = localData[data.id - 1].rating;
  data["comments"] = localData[data.id - 1].comments;
}
