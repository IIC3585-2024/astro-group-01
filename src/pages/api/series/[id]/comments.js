import { db, eq, Series } from "astro:db";

export async function POST(context) {
    const seriesId = context.params.id;
    const req = await context.request.json();
    const { username, content, rating } = req;

    let series;
    try {
        series = await db.select().from(Series).where(eq(Series.id, seriesId)).limit(1);

        if (series.length === 0)
            return new Response(JSON.stringify({ error: "Series not found" }), {
                status: 404
            });

        series = series[0];

        series.ratings.push(rating);
        series.comments.push({
            username,
            content,
            rating,
        });

        await db.update(Series).set({
            ratings: series.ratings,
            comments: series.comments,
        }).where(eq(Series.id, seriesId));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error updating series" }), {
            status: 500
        });
    }

	return new Response({ message: 'Comment and rating added successfully' });
}
