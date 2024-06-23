import { column, defineDb, defineTable } from 'astro:db';

const Series = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    streamingService: column.text(),
    episodesPerSeason: column.json(),
    description: column.text(),
    category: column.text(),
    poster: column.text({ optional: true }),
    ratings: column.json(),
    comments: column.json(),
  }
});

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text(),
    password: column.text(),
  }
});

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    expiresAt: column.date(),
  }
});

export default defineDb({
  tables: { Series, User, Session },
});
