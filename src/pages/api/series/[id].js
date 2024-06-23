import { db, eq, Series } from "astro:db";

export async function GET(context) {
    const seriesId = context.params.id;

    let series;
    try {
        series = await db.select().from(Series).where(eq(Series.id, seriesId)).limit(1);
        if (series.length === 0) {
            return new Response(JSON.stringify({ error: "Series not found" }), {
                status: 404
            });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error fetching series" }), {
            status: 500
        });
    }

	return new Response(JSON.stringify(series[0]));
}
