<template>
    <v-container class="elevation-1">
        <v-layout>
            <v-flex>
                <v-btn round color="teal" dark to="/products/create">Add Product</v-btn>
            </v-flex>
        </v-layout> 
        <v-layout >
            <v-flex>
                <v-progress-circular
                :size="70"
                :width="7"
                color="purple"
                indeterminate
                v-if="loading"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout v-if="!loading">
            <v-flex>
                <v-list subheader>
                    <v-subheader>Products</v-subheader>
                    <v-list-tile
                    v-for="product in products"
                    :key="product.id"
                    avatar
                    to="/products/id"
                    >
                    <v-list-tile-content>
                    <v-list-tile-title v-html="product.p_name"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        headers: [
            {text: 'Id', value: 'id'},
            {text: 'Name', value: 'name'},
            {text: 'Phone', value: 'phone'}
        ],
        items: []
        }),
    computed: {
        products () {
            const products = this.$store.getters.loadedProducts
            return products
        },
        loading () {
            return this.$store.getters.loadingProducts
        }
    }
}
</script>
