import { db, Series } from "astro:db";

export async function GET(context) {
    let series;
    try {
        series = await db.select().from(Series);
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error fetching series" }), {
            status: 500
        });
    }

	return new Response(JSON.stringify(series));
}

export async function POST(context) {
    const formData = await context.request.formData();
    const name = formData.get('name');
    const streamingService = formData.get('streamingService');
    const episodesPerSeason = formData.get('episodesPerSeason');
    const description = formData.get('description');
    const category = formData.get('category');
    const poster = formData.get('poster');

    const newSeries = {};

    newSeries.name = name || 'Unknown';
    newSeries.streamingService = streamingService || 'Unknown';

    try {
        if (!/^[^,\D]([\d]*,[\d]*)+[^,\D]$/.test(episodesPerSeason))
            throw new Error('Invalid format for episodes per season');
        newSeries.episodesPerSeason = episodesPerSeason.split(',').map((value) => {
            const num = parseInt(value, 10);
            if (isNaN(num)) throw new Error('Invalid format for episodes per season');
            return num;
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Invalid episodes per season" }), {
            status: 400
        });
    }

    newSeries.description = description || 'No description available';
    newSeries.category = category || 'Unknown';
    if (poster) newSeries.poster = poster;

	try {
        const seriesDb = await db.select().from(Series);
        const newId = seriesDb.length > 0 ? seriesDb[seriesDb.length - 1].id + 1 : 0;
        newSeries.id = newId;
        newSeries.ratings = [];
        newSeries.comments = [];
        await db.insert(Series).values(newSeries);
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error adding series" }), {
            status: 500
        });
    }

	return context.redirect("/catalog");
}
