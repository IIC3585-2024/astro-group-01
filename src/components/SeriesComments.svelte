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

    .no-comments {
        color: #c1c3c8;
        width: 100%;
        text-align: center;
    }

    .series-pop {
        display: flex;
        flex-direction: column;
        margin: 10px;
        padding: 10px;
        width: 80%;
        text-align: center;
    }

    .series-pop p{
        margin-bottom: 5px;
        margin-top: 5px;

    }

    .comments {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-top: 20px;
    }

    .comment h3 {
        margin-bottom: 2px;
    }
    .comment p {
        margin: 0;
        margin-top: 0.5rem;
        color: #c1c3c8;
        font-size: medium;
    }
    .star{
        color: gold;
    }
</style>

<div class="series-pop">
    <p>Rating: <span class="star">{rating.toFixed(1)} ★ ({ratingsCount})</span></p>
    <p>Comments:</p>
    <div class="comments">
        {#if comments.length === 0}
            <p class="no-comments">No comments yet</p>
        {:else}
            {#each comments as comment}
                <div class="comment">
                    <h3>{comment.username}:</h3>
                    <p>{comment.content}</p>
                    <p>Rating: <span class="star">{comment.rating}</span></p>
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
