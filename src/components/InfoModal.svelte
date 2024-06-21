<!-- Modal.svelte -->
<script lang="ts">
    import { fade } from "svelte/transition";
    import {ratingCalculator} from "../utils/ratingCalculator"
    import type { MouseEventHandler } from "svelte/elements";

    export let name: string;
    export let description: string;
    export let onClose: MouseEventHandler<HTMLButtonElement>;
    export let categories: string[];
    export let streamingServices: {[key: string]: string} = {};
    export let language: string = "English";
    export let status: string = "Finished";
    export let rating: number[] = [];
    export let seasonsAndEpisodes: {number: string, episodeOrder: number}[] = [];

    let numbersOfStars = ratingCalculator(rating);
    let numberOfReviews = rating.length
</script>

<button class="overlay" on:click={onClose}  transition:fade={{ delay: 150, duration: 200 }}></button>
<div class="modal fade" transition:fade={{ delay: 150, duration: 200 }}>
    <div class="modal-content">
        <button class="close" on:click={onClose}>&times;</button>

        <div class="header">
            <h2>{name}</h2>
            <div class="star">
                {numbersOfStars} ★ {`( ${numberOfReviews} )`}
            </div>
        </div>

        <div class="categories">
            {#each categories as category}
                <p class="category">{category}</p>
            {/each}
        </div>

        {#if description.length > 330}
            <p class="description">{description.substring(0, 330) + '...'}</p>
        {/if}
        {#if description.length <= 330}
            <p class="description">{description}</p>
        {/if}

        <div class="streaming-services">
            {#each Object.keys(streamingServices) as service}
                <img src={streamingServices[service]} alt={service}>
            {/each}
        </div>

        <div class="categories">
            <p class="category">{language}</p>
            <p class="category">{status}</p>
        </div>

        <div class="seasons">
            {#each seasonsAndEpisodes as season}
                <p>Temporada {season.number}: {season.episodeOrder} episodios</p>
            {/each}
        </div>
    </div>
</div>

<style>
    .modal {
        display: block;
        position: fixed;
        z-index: 10;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: rgb(23 23 23);
        color: #fff;
        box-shadow: 0px 0px 30px #e74d3c48;
        z-index: 11; /* Más alto que el modal */
        padding: 20px;
        border: 0.5px solid #e74c3c;
        width: 80%;
        width: 500px;
        height: 500px;
        border-radius: 10px;
        position: relative;
    }

    .close {
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    .close:hover,
    .close:focus {
        color: #e74c3c;
        text-decoration: none;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        z-index: 9;
    }

    .categories{
        display: flex;
        gap: 10px
    }

    .streaming-services {
        display: flex;
        gap: 10px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .streaming-services img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%;
        object-fit:cover
    }

    h2{
        font-weight: 600;
    }

    .category{
        margin-top: 0;
        background-color: #ffffff4e;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .star{
        color: gold;
    }

    .header{
        display: flex;
        align-items: center;
        gap: 25px;
    }

    .description{
        text-align: left;
    }

    .seasons{
        margin-top: 20px;
        display: flex;
        height: 100px;
        flex-direction: column;
        gap: 10px;
        overflow: scroll;
    }

    .seasons p{
        margin: 0;
        font-weight: 600;
        text-align: left;
    }
</style>
