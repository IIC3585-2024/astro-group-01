import { writable } from "svelte/store";

export const commentsStore = writable({});

export function addComment(movieId, user, comment) {
  commentsStore.update((comments) => {
    const movieComments = comments[movieId] || [];
    return {
      ...comments,
      [movieId]: [...movieComments, { user, comment }],
    };
  });
}
