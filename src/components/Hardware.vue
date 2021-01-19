<template>
    <div>
        <Sidebar/>
        <v-content>
            <HTab/>
        </v-content>
    </div>
</template>

<script>
import Sidebar from'./Sidebar.vue';
import HTab from './HardwareTab';

export default {
    name: 'Hardware',
    components: {
        Sidebar,
        HTab
    }
}
</script>

