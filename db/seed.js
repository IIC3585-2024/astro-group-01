import { db, Series } from "astro:db";

export default async function seed() {
  await db.insert(Series).values([
    {
      id: 0,
      name: "Breaking Bad",
      streamingService: "Netflix",
      episodesPerSeason: [7, 13, 13, 13, 16],
      description:
        "A high school chemistry teacher turned into a methamphetamine producer.",
      category: "Drama",
      poster:
        "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg",
      ratings: [9.5, 9.5, 9.5, 9.5, 9.5],
      comments: [],
    },
    {
      id: 1,
      name: "Stranger Things",
      streamingService: "Netflix",
      episodesPerSeason: [8, 9, 8, 9],
      description:
        "A group of kids in the 80s dealing with supernatural events in their small town.",
      category: "Horror",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
      ratings: [8.5, 8.5, 8.5, 8.5],
      comments: [],
    },
  ]);
}
