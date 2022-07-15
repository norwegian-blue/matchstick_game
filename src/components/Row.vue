<template>
    <p>row</p>
    <img v-for="idx in this.indexes"
        :key="idx"
        src="match.png"
    />
</template>

<script>
export default {
    name: "Row",
    props: {
        sticks: Number,
    },
    computed: {
        indexes() {
            return [...Array(this.sticks).keys()];
        },
    },
}
</script>