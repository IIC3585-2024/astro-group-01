<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { series } from "../lib/series";

    const dispatch = createEventDispatcher();

    let name = '';
    let streamingService = '';
    let category = '';
    let minimumRating = 0;

    const getMeanRating = (s: any) => {
        if (s.ratings.length === 0) return 0;
        return s.ratings.reduce((acc: number, rating: number) => acc + rating, 0) / s.ratings.length;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();

        const newSeriesList = $series.filter((s: any) => {
            if (name && !s.name.toLowerCase().includes(name.toLowerCase())) return false;
            if (streamingService && s.streamingService !== streamingService) return false;
            if (category && s.category !== category) return false;
            if (minimumRating && getMeanRating(s) < minimumRating) return false;
            return true;
        });

        console.log(newSeriesList);

        dispatch("search", { newSeriesList });
    };

</script>

<style>
    .search-container {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .search-input {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    label {
        font-size: 1rem;
    }

    input, select {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    button {
        background-color: hsl(224, 100%, 85%);
        padding: 10px 20px;
        font-weight: 600;
        color: #232328;
        transition: ease 0.2s;
        border-radius: 0.4rem;
        border: none;
        font-size: 15px;
    }

    button:hover {
        box-shadow: 0px 0px 5px hsl(224, 100%, 85%);
        cursor: pointer;
    }

    @media (max-width: 720px) {
        .search-container {
            flex-direction: column;
        }
    }
</style>

<div class="search-container">
    <div class="search-input">
        <label for="name">Search for series:</label>
        <input id="name" type="text" placeholder="Inception" bind:value={name}/>
    </div>
    <div class="search-input">
        <label for="streamingService">Filter by streaming service:</label>
        <select id="streamingService" bind:value={streamingService}>
            <option value="">All streaming services</option>
            <option value="Netflix">Netflix</option>
            <option value="Amazon Prime">Amazon Prime</option>
            <option value="Disney+">Disney+</option>
            <option value="HBO">HBO</option>
            <option value="Hulu">Hulu</option>
            <option value="Apple TV+">Apple TV+</option>
            <option value="Peacock">Peacock</option>
            <option value="Paramount+">Paramount+</option>
            <option value="Discovery+">Discovery+</option>
            <option value="Other">Other</option>
        </select>
    </div>
    <div class="search-input">
        <label for="category">Filter by category:</label>
        <select id="category" bind:value={category}>
            <option value="">All categories</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Historical">Historical</option>
            <option value="Horror">Horror</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Thriller">Thriller</option>
            <option value="Western">Western</option>
            <option value="Other">Other</option>
        </select>
    </div>
    <div class="search-input">
        <label for="minRating">Filter by minimum rating:</label>
        <input id="minRating" type="number" placeholder="Minimum rating" bind:value={minimumRating} min="0" max="10"/>
    </div>
    <button on:click={handleSubmit}>Search</button>
</div>
