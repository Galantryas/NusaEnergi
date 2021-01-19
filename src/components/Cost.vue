<template>
    <div>
        <Sidebar/>
        <v-content>
            <CTab/>
        </v-content>
    </div>
</template>

<script>
import Sidebar from'./Sidebar.vue';
import CTab from './CostTab.vue';

export default {
    name: 'Cost',
    components: {
        Sidebar,
        CTab
    }
}
</script>

