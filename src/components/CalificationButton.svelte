<script>
    import { ratingStore, actualizarValor, obtenerValor } from './../assets/utils/ratingStore.js';
    import { onDestroy, onMount } from 'svelte';

    export let updateRating;
    export let undoCalification;
    export let name;
    let calification = 0;

    let rated = obtenerValor(name);
    let calificado = rated === true;


    const IncrementCalification = () => {
        if (calification < 10) 
            calification++;
    };

    const DecrementCalification = () => {
        if (calification > 0) 
            calification--;
    };

    const submitCalification = () => {
        actualizarValor(name, true);
        updateRating(calification);
        rated = true; // Actualiza la variable reactiva
    };

    const handleUndoCalification = () => {
        actualizarValor(name, false);
        undoCalification(calification);
        rated = false;
    };

    const unsubscribe = ratingStore.subscribe(() => {
        rated = obtenerValor(name);
        calificado = rated === true;
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<section>
    <div class="increment-decrement">
        {#if calificado}
            <button disabled on:click={DecrementCalification}>Lower</button>
            <div>{calification}</div>
            <button disabled on:click={IncrementCalification}>Upper</button>
        {:else}
            <button on:click={DecrementCalification}>Lower</button>
            <div>{calification}</div>
            <button on:click={IncrementCalification}>Upper</button>
        {/if}
       
    </div>
    

    {#if calificado}
        <button on:click={handleUndoCalification}>Undo Calification</button>   
    {:else}
        <button on:click={submitCalification}>Submit</button>
    {/if}
</section>



<style>
    section{
        color: #fff;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .increment-decrement{
        display: flex;
        gap: 10px;
    }

    button{
        padding: 5px 10px;
        background-color: #e74c3c;
        border: none;
        color: #fff;
        font-weight: 600;
        border-radius: 5px;
        transition: ease 0.2s;
        
    }

    button:hover{
        cursor: pointer;
        background-color: #fff;
        color: #e74c3c;
        scale: 1.05;
    }

    button:disabled{
        opacity: 0.6;
    }

    

    
</style>