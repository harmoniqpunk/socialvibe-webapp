<script lang="ts">
    export let count: number;
    export let isActive: boolean = false;
</script>

<button 
    class="flex items-center gap-1 p-1.5 rounded-md hover:bg-light-positive-muted/10 dark:hover:bg-dark-positive-muted/10"
    on:click
>
    <slot></slot>
    <span class={isActive ? 'text-light-positive-secondary dark:text-dark-positive-secondary' : 'text-light-positive-primary dark:text-dark-positive-primary'}>
        {count}
    </span>
</button> 