<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let astroOrigin: string;
    export let currentUser: any;
    export let seriesId: number;

    let messageInput = "";
    let ratingInput = 0;

    const dispatch = createEventDispatcher();

    const handleNewComment = async () => {
        if (messageInput === "" || ratingInput === -1) {
            alert("Please fill in all fields");
            return;
        }

        if (ratingInput < 1 || ratingInput > 10) {
            alert("Rating must be between 1 and 10");
            return;
        }

        try {
            const response = await fetch(`${astroOrigin}/api/series/${seriesId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: currentUser.username,
                    content: messageInput,
                    rating: ratingInput,
                }),
            });
            if (!response.ok) throw new Error(response.statusText);
        } catch (error) {
            alert(`Failed to post comment: ${error.message}`);
            return;
        }

        dispatch("newComment", { username: currentUser.username, content: messageInput, rating: ratingInput });

        messageInput = "";
        ratingInput = 0;
    };
</script>

<style>
    .new-comment{
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 20px;
    }

    textarea{
        resize: none;
        width: 100%;
    }

    .inputs{
        margin-top: 0;
        display: flex;
        gap: 20px;
    }

    p{
        margin: 0;
    }

    button {
        padding: 0.5rem;
        border-radius: 0.25rem;
        color: #232328;
        border: none;
        background-color: hsl(224, 100%, 85%);
        width: 70%;
        margin: auto;
        font-weight: 600;
        transition: ease 0.2s;
    }

    button:hover {
        cursor: pointer;
        scale: 1.05;
        box-shadow: 0px 0px 5px hsl(224, 100%, 85%);
    }

</style>

<div class="new-comment">
    {#if currentUser}
        <p>Post a comment and rating:</p>
        <div class="inputs">
            <textarea bind:value={messageInput} placeholder="Message" />
            <input type="number" bind:value={ratingInput} placeholder="Rating" min="1" max="10" />
        </div>
        <button on:click={handleNewComment}>Post Comment</button>
    {:else}
        <p>Please log in to post a comment</p>
    {/if}
</div>
