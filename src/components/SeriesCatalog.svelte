<script lang="ts">
    import SearchSeries from "./SearchSeries.svelte";
    import { series } from "../lib/series";

    export let seriesList: any[] = [];
    $series = seriesList;

    $: filterSeries = $series;

    const handleSearch = (ev: CustomEvent) => {
        filterSeries = ev.detail.newSeriesList;
    };
</script>

<style scoped>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }

    .series-catalog {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 5rem;
    }

    .series-title {
        position: relative;
        top: -0.8rem;
        text-align: center;
        font-size: 1rem;
        color: white;
        background-color: #000;
        margin: 0;
        border-radius: 0 0 10px 10px;
    }

    a {
        width: 200px;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
        transition: ease 0.2s;
        box-shadow: 0px 0px 30px #000;
    }

    a:hover {
        scale: 1.05;
        cursor: pointer;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
</style>

<section>
    <SearchSeries on:search={handleSearch}/>
    <div class="series-catalog">
        {#if filterSeries.length === 0}
            <p>No series found</p>
        {:else}
            {#each filterSeries as s}
                <a href={`/series/${s.id}`}>
                    {#if s.poster}
                        <img src={s.poster} alt={s.name}/>
                    {:else}
                        <img src="/unavailable.png" alt={s.name}/>
                    {/if}
                    <p class="series-title">{s.name}</p>
                </a>
            {/each}
        {/if}
    </div>
</section>
