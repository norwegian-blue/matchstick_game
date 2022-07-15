<template>
    <Row 
        v-for="(sticks, idx) in size"
        :key="idx"
        :sticks="sticks"
    />
</template>

<script>
import Row from "./Row.vue";
export default {
    name: "Board",
    components: {
        Row,
    },
    props: {
        size: Object,
    }
}
</script>