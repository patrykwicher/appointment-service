<template>
    <div class="container">
        <div class="icons">
            <img src="../assets/images/instagram-bw.png" alt="instagram" />
            <img src="../assets/images/facebook-bw.png" alt="instagram" />
            <img src="../assets/images/pinterest-bw.png" alt="instagram" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
})
</script>

<style lang="scss" scoped>
$footer-bg-color: #707c86;

@media (max-width: 320px) {
.container {
    background-color: $footer-bg-color;
    text-align: center;
    padding: 2rem 0;

    .icons {
        img {
            width: 2rem;
            margin: 0 1rem 0 1rem;
            cursor: pointer;
        }
    }
}
}

@media (min-width: 321px) {
.container {
    background-color: $footer-bg-color;
    text-align: center;
    padding: 2rem 0;

    .icons {
        img {
            width: 2rem;
            margin: 0 1rem 0 1rem;
            cursor: pointer;
        }
    }
}
}
</style>