<!-- MoviePoster.svelte -->
<script lang="ts">
    import Modal from './InfoModal.svelte';

    export let name: string;
    export let description: string;
    export let poster: string;
    export let categories: string[];
    export let streamingServices: {[key: string]: string} = {};
    export let language: string = "English";
    export let status: string = "Finished";
    export let rating: number[] = [];
    export let seasonsAndEpisodes: {number: string, episodeOrder: number}[] = [];

    // Estado para controlar la visibilidad de la modal
    let showModal = false;

    // Funciones para abrir y cerrar la modal
    function openModal() { showModal = true }

    function closeModal() { showModal = false }

    const updateRating = (newRating) => {
        rating = [...rating, newRating];
    };

    const undoCalification = (calification) => {
        let aux = [...rating]
        let index = aux.indexOf(calification);
        if (index !== -1) {
            aux.splice(index, 1);
            rating = aux;
        }
    };
</script>

<section>
    <button class="poster" on:click={openModal}>
        <img src={poster} alt="poster">
    </button>
</section>

{#if showModal}
    <Modal
        name={name}
        description={description}
        categories={categories}
        streamingServices={streamingServices}
        language={language}
        status={status}
        rating={rating}
        seasonsAndEpisodes={seasonsAndEpisodes}
        onClose={closeModal}
        {updateRating}
        {undoCalification}
    />
{/if}

<style>
    section{
        display: grid;
        place-content: center;
    }
    .poster {
        width: 200px;
        height: 300px;
        border: none;
        background: none;
        padding: 0;
    }
    img {
        width: 200px;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
        transition: ease 0.2s;
        box-shadow: 0px 0px 30px #000;
    }

    img:hover {
        scale: 1.05;
        cursor: pointer;
    }
</style>
