<template>
    <div class="my-4">
        <p class="my-2 fst-italic">Player 1 turn</p>
        <div class="row justify-content-center"> 
            <button type="button" class="btn btn-primary col-1"><font-awesome-icon icon="backward-step"/></button>
            <button type="button" class="btn btn-primary col-2 mx-2">Next</button>
            <button type="button" class="btn btn-primary col-1"><font-awesome-icon icon="forward-step"/></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Progress",
}
</script>