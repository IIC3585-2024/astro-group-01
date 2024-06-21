<script>
    import MovieCard from '../components/MovieCard.svelte';
    import { parseHtmlToText } from "../assets/utils/parser";
    import {assingExtraData} from "../assets/utils/assingExtraData"
    import { ratingStore, agregar, existe, actualizarValor } from './../assets/utils/ratingStore.js';

    const fetchMovieData = async (id) => {
        const res = await fetch(`https://api.tvmaze.com/shows/${id}?embed=seasons`);
        const data = await res.json();
        agregar(data.name, false)
        assingExtraData(data)
        return data;
    };

    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let moviesData = [];

    const loadMoviesData = async () => {
        const promises = ids.map(id => fetchMovieData(id));
        moviesData = await Promise.all(promises);
    };

    loadMoviesData();
</script>

<section>
    {#if moviesData.length > 0}
        {#each moviesData as movieData}
            <MovieCard
                name={movieData.name}
                description={parseHtmlToText(movieData.summary)}
                poster={movieData.image.original}
                categories={movieData.genres}
                lenguage={movieData.language}
                status={movieData.status}
                rating={movieData.rating}
                seasonsAndEpisodes={movieData["_embedded"].seasons}
                streamingServices={{
                    "netflix": "https://www.justwatch.com/images/icon/207360008/s100/netflix.{format}/icon.webp",
                    "prime": "https://www.justwatch.com/images/icon/52449861/s100/amazonprimevideo.{format}/icon.webp",
                    "max": "https://images.justwatch.com/icon/305458112/s100/max.{format}/icon.webp",
                    "disney": "https://www.justwatch.com/images/icon/313118777/s100/disneyplus.{format}/icon.webp",
                }}
            />
        {/each}
    {/if}
</section>

<style>
    section{
        width: 80%;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 40px
    }
</style>
