<!-- MoviePoster.svelte -->
<script>
    import Modal from './InfoModal.svelte';

    export let name;
    export let description;
    export let poster;
    export let categories;
    export let streamingServices;
    export let lenguage;
    export let status;
    export let rating;
    export let seasonsAndEpisodes;

    // Estado para controlar la visibilidad de la modal
    let showModal = false;

    // Funciones para abrir y cerrar la modal
    function openModal() {
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

  
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
    <img src={poster} alt="poster" on:click={openModal}>
</section>

{#if showModal}
    <Modal name={name} 
           description={description} 
           categories={categories} 
           streamingServices={streamingServices} 
           lenguage={lenguage} 
           status={status} 
           rating={rating} 
           seasonsAndEpisodes={seasonsAndEpisodes} 
           onClose={closeModal} 
           {updateRating}
           {undoCalification}/>
{/if}

<style>
    section{
        display: grid;
        place-content: center;
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
