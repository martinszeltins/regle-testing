<template>
    <div class="mx-auto max-w-4xl p-10">
        <NuxtPage />
    </div>
</template>

<style>
    /*
    Pretty scrollbars instead of the ugly default ones.
*/

::-webkit-scrollbar {
    @apply size-[6px];
}

::-webkit-scrollbar-track {
    @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
    @apply bg-transparent rounded-full border-2 border-transparent bg-clip-content;
}

::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-700;
}

*:hover::-webkit-scrollbar-thumb {
    @apply bg-gray-700;
}

</style>
