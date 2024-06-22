<script>
    import { commentsStore, addComment } from "../assets/utils/commentsStore"
    import { get } from 'svelte/store';
    import { onMount } from 'svelte';

    export let name;
    export let toggleComments;

    let comments = [];
    let newComment = '';

    const unsubscribe = commentsStore.subscribe(value => {
        comments = value[name] || [];
    });

    onMount(() => {
        return () => {
            unsubscribe();
        };
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            addComment(name, 'User', newComment); 
            newComment = '';
        }
    };
</script>

<section>
    <div class="comment-box">
        {#each comments as comment}
            <div class="comment">
                <h3>{comment.user}</h3>
                <p>{comment.comment}</p>
            </div>
        {/each}
    </div>
    <form on:submit={handleSubmit}>
        <textarea bind:value={newComment}></textarea>
        <button type="submit">Send Comment</button>
    </form>
    <button on:click={toggleComments}>Go Back</button>
</section>

<style>
    .comment-box{
        text-align: left;
        width: 100%;
        height: 300px;
        overflow: scroll;
    }

    .comment{
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 10px;
    }

    .comment h3{
        margin: 0;
    }

    .comment p{
        margin: 0;
    }

    textarea{
        margin-top: 20px;
        resize: none;
        height: 100px;
        width: 100%;
    }
</style>