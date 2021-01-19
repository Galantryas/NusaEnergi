<template>
    <div>
        <Sidebar/>
        <v-content>
            <UTab/>
        </v-content>
    </div>
</template>

<script>
import Sidebar from'./Sidebar.vue';
import UTab from './UsageTab.vue';

export default {
    name: 'usage',
    components: {
        Sidebar,
        UTab
    }
}
</script>

