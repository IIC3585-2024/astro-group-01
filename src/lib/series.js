import { db, eq, Series } from 'astro:db';
import { writable } from 'svelte/store';

const series = writable(null);

const addSeries = async (
    name,
    streamingService,
    episodesPerSeason,
    description,
    category,
    poster = null,
) => {
    const seriesDb = await db.select().from(Series);
    const newId = seriesDb[seriesDb.length - 1].id + 1;
    const newSeries = {
        id: newId,
        name,
        streamingService,
        episodesPerSeason,
        description,
        category,
        ratings: [],
        comments: [],
    };

    if (poster) newSeries.poster = poster;

    series.update((items) => {
        const updatedSeries = [
            ...items,
            newSeries,
        ];
        return updatedSeries;
    });

    await db.insert(Series).values(newSeries);
};

export {
    series,
    addSeries,
};
