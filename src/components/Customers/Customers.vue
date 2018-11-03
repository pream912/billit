<template>
    <v-container class="elevation-1">
        <v-layout>
            <v-flex>
                <v-btn round color="teal" dark to="/customers/create">Add Customer</v-btn>
            </v-flex>
        </v-layout>
        <v-layout >
            <v-flex >
                <v-progress-circular
                :size="70"
                :width="7"
                color="purple"
                indeterminate
                v-if="loading"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <template>
                    <v-card>
                        <v-card-title>
                            Customers
                            <v-spacer></v-spacer>
                            <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                            ></v-text-field>
                        </v-card-title>
                        <v-data-table
                        :headers="headers"
                        :items="items"
                        :search="search"
                        :loading="loading"
                        hide-actions
                        class="elevation-1"
                        >
                            <v-progress-linear slot="progress" color="teal" indeterminate></v-progress-linear>
                            <template slot="items" slot-scope="props">
                                <td class="text-xs-left">{{ props.item.c_name }}</td>
                                <td class="text-xs-left">{{ props.item.phone }}</td>
                                <td class="text-xs-left">{{ props.item.email }}</td>
                                <td class="text-xs-center">
                                    <div class="text-xs-center">
                                        <div>
                                            <v-btn color="green" fab small dark>
                                            <v-icon>visibility</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>   
                                </td>
                                <td class="text-xs-center">         
                                    <div class="text-xs-center">
                                        <div>
                                            <v-btn color="orange" fab small dark>
                                            <v-icon>edit</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>  
                                </td>
                            </template>
                        </v-data-table>
                    </v-card>
                </template>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        headers: [
            {text: 'Name', value: 'name'},
            {text: 'Phone', value: 'phone'},
            {text: 'Email', value: 'email'},
            {text: '', value: 'view'},
            {text: '', value: 'edit'}

        ],
        items: [],
        search: ''
        }),
    computed: {
        loading () {
            return this.$store.getters.loadingCustomers
        },
    },

    created () {
        const customers = this.$store.getters.loadedCustomers
        this.items = customers
    },
}
</script>
