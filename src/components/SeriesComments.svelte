<script lang="ts">
    import NewComment from "./NewComment.svelte";

    export let astroOrigin: string;
    export let currentUser: any;
    export let seriesId: number;
    export let ratings: number[] = [];
    export let comments: { username: string, content: string, rating: number }[] = [];

    $: ratingsCount = ratings.length;
    $: ratingsSum = ratings.reduce((acc: number, rating: number) => acc + rating, 0);
    $: rating = ratings.length > 0 ? ratingsSum / ratingsCount : 0;

    const handleNewComment = async (event: CustomEvent) => {
        const { username, content, rating } = event.detail;

        ratings = [...ratings, rating];
        comments = [...comments, { username, content, rating }];
    };
</script>

<style scoped>
    p {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .series-pop {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        padding: 10px;
    }

    .comments {
        display: flex;
        flex-direction: column;
    }

    .comment {
        margin: 10px;
        padding: 10px;
    }
</style>

<div class="series-pop">
    <p>Rating: {rating} ({ratingsCount})</p>
    <p>Comments:</p>
    <div class="comments">
        {#if comments.length === 0}
            <p>No comments yet</p>
        {:else}
            {#each comments as comment}
                <div class="comment">
                    <p>{comment.username}:</p>
                    <p>{comment.content}</p>
                    <p>Rating: {comment.rating}</p>
                </div>
            {/each}
        {/if}
    </div>
    <NewComment
        astroOrigin={astroOrigin}
        currentUser={currentUser}
        seriesId={seriesId}
        on:newComment={handleNewComment}
    />
</div>
