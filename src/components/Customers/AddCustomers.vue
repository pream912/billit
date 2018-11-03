<template>
    <v-container class="elevation-12">
        <v-layout>
            <v-flex xs12>
                <form @submit.prevent="onSubmit">
                    <v-layout row>
                        <v-flex>
                            <v-text-field
                            name="c_name"
                            label="Customer Name"
                            v-model="c_name"
                            required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-text-field
                            name="phone"
                            label="Phone Number"
                            v-model="phone"
                            required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-text-field
                            name="email"
                            label="Email"
                            v-model="email"
                            required
                            type="email">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-textarea
                            name="address"
                            label="Address"
                            v-model="address"
                            required>
                            </v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-text-field
                            name="gst"
                            label="GST Number (if available)"
                            v-model="gst">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                            <v-btn round color="teal" dark type="submit">Add Customer</v-btn>
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
        c_name: '',
        phone: '',
        email: '',
        address: '',
        gst: '',
    }),
    methods: {
        onSubmit () {
            const NewCustomer = {
                c_name: this.c_name,
                phone: this.phone,
                email: this.email,
                address: this.address,
                gst: this.gst,
                id: this.id
            }
            this.$store.dispatch('createCustomer', NewCustomer)
        }
    }
}
</script>
