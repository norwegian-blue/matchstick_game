<template>
    <div class="container-flex mt-5">
    <form class="row justify-content-center">
        <button type="submit" class="btn btn-primary mx-4 col-3 my-auto">Start new game</button>
        <div class="form-check text-start col-2 my-auto mx-0">
            <input class="form-check-input my-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
            <label class="form-check-label" for="flexRadioDefault1">
                Player vs Player
            </label>
        </div>
        <div class="col-6 row">
            <div class="form-check text-start col-5 my-auto">
                <input class="form-check-input my-1" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                <label class="form-check-label" for="flexRadioDefault2">
                    Player vs Computer
                </label>
            </div>
            <div class="form-check text-start col-4 my-auto">
                <input class="form-check-input my-1" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    Play first turn
                </label>
            </div>
        </div>
    </form>
    </div>
</template>

<script>
export default {
    name: "NewGame",
}
</script>

<style scoped>
.form-check {
    font-size: .85em;
}
</style>