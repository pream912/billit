<template>
    <v-container class="elevation-12" >
        <v-layout>
            <v-flex>
                <form @submit.prevent="onAddProduct">
                    <v-layout row>
                        <v-flex>
                            <v-text-field
                            name="p_name"
                            label="Product Name"
                            v-model="p_name"
                            required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-text-field
                            name="code"
                            label="Product Code"
                            v-model="code"
                            required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-text-field
                            name="hsn"
                            label="HSN code"
                            v-model="hsn"
                            required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-textarea
                            name="description"
                            label="Description"
                            v-model="description"
                            required>
                            </v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-select
                            name="uom"
                            :items="items"
                            v-model="uom"
                            label="UOM"
                            required
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-text-field
                            name="gst"
                            label="GST %"
                            v-model="gst">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-text-field
                            name="price"
                            label="Unit Price"
                            v-model="price">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-btn round color="teal" dark type="submit">Add Product</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        p_name: '',
        description: '',
        hsn: '',
        code: '',
        uom: '',
        gst: '',
        price: null,

        items: ['Pieces', 'Boxes', 'Kg', 'Liters', 'Hours', 'Days', 'Weeks', 'Months'],
    }),
    methods: {
        onAddProduct () {
            const NewProduct = {
                p_name: this.p_name,
                description: this.description,
                hsn: this.hsn,
                code: this.code,
                uom: this.uom,
                gst: this.gst,
                price: this.price
            }
            this.$store.dispatch('createProduct', NewProduct)
        }
    }
}
</script>
