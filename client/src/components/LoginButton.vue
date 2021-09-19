<template>
        <button class="login-button">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent ({
    props: {
        text: String
    },
})
</script>

<style lang="scss" scoped>
$login-color: #5aabe4;
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');

@media (max-width: 320px) {
        .login-button {
            cursor: pointer;
            border: 1px solid $login-color;
            font-weight: 700;
            color: $login-color;
            border-radius: 50px;
            padding: 0.6rem 2rem;
            transition: ease-in .2s;
            text-align: center;
            background-color: white;
            font-size: 1rem;
            font-family: 'Open Sans', sans-serif;
            box-sizing: border-box;
            width: 92%;

            &:hover {
                background-color: $login-color;
                color: white;
            }
        }
}


@media (min-width: 321px) {
    .login-button {
        cursor: pointer;
        border: 1px solid $login-color;
        font-weight: 700;
        color: $login-color;
        border-radius: 50px;
        padding: 0.8rem 2rem;
        transition: ease-in .2s;
        text-align: center;
        background-color: white;
        font-size: 0.9rem;
        font-family: 'Open Sans', sans-serif;
        box-sizing: border-box;
        width: 92%;

        &:hover {
            background-color: $login-color;
            color: white;
        }
    }
}

</style>