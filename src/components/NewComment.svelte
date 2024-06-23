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

</style>

<div class="new-comment">
    {#if currentUser}
        <p>Post a comment:</p>
        <textarea bind:value={messageInput} placeholder="Message" />
        <input type="number" bind:value={ratingInput} placeholder="Rating" min="1" max="10" />
        <button on:click={handleNewComment}>Post Comment</button>
    {:else}
        <p>Please log in to post a comment</p>
    {/if}
</div>
