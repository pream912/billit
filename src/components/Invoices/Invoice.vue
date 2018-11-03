<template>
    <v-container class="elevation-12">
        <v-layout>
            <v-layout row>
                <v-flex justify-start="true">
                    <v-layout row>
                        <v-flex md4>
                            <v-autocomplete
                                label="Customer"
                                required
                                outline
                                item-value="id"
                                item-text="c_name"
                                :items="customers"
                                v-model="customer"
                                @input="getCustomer"
                                ></v-autocomplete>
                        </v-flex>
                        <v-flex md4>
                            <v-text-field
                                label="Email"
                                required
                                outline
                                v-model="email"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex md4>
                            <v-textarea
                                label="Billing address"
                                required
                                outline
                                v-model="address"
                            ></v-textarea>
                        </v-flex>
                        <v-flex md4>
                            <v-menu
                            ref="menu1"
                            :close-on-content-click="false"
                            v-model="menu1"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                            >
                                <v-text-field
                                slot="activator"
                                v-model="dateFormatted"
                                label="Bill Date"
                                persistent-hint
                                outline
                                prepend-icon="event"
                                @blur="date = parseDate(dateFormatted)"
                                ></v-text-field>
                                <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                            </v-menu>
                            <p> {{phone}} </p>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex md12>
                            <template>
                                <v-data-table
                                :headers="headers"
                                :items="items"
                                hide-actions
                                class="elevation-1"
                                >
                                    <template slot="items" slot-scope="props">
                                        <td class="text-xs-left">{{ props.item.p_name }}</td>
                                        <td class="text-xs-left">{{ props.item.description }}</td>
                                        <td class="text-xs-left">{{ props.item.hsn }}</td>
                                        <td class="text-xs-left">{{ props.item.quantity }}</td>
                                        <td class="text-xs-left">{{ props.item.uom }}</td>
                                        <td class="text-xs-left">{{ props.item.price }}</td>
                                        <td class="text-xs-left">{{ props.item.gst }}</td>
                                        <td class="text-xs-left">{{ props.item.amount }}</td>
                                    </template>
                                </v-data-table>
                            </template>
                            <v-container>
                            <v-layout xs2 offset-xs10 class="text-xs-right">
                                <v-flex>
                                    <v-spacer></v-spacer>
                                    <h3> Total: {{total}}</h3>
                                </v-flex> 
                            </v-layout>   
                            </v-container> 
                            <v-layout>
                                <v-flex>
                                    <v-dialog v-model="dialog" persistent max-width="600px">
                                        <v-btn slot="activator" round color="teal" dark>Add item</v-btn>
                                        <v-card>
                                        <v-card-title>
                                            <span class="headline">User Profile</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container grid-list-md>
                                            <v-layout wrap>
                                                <v-flex xs12 sm6 md4>
                                                <v-autocomplete item-value="id"
                                                item-text="p_name"
                                                :items="products"
                                                v-model="product"
                                                @input="getProduct" label="Product name*" required></v-autocomplete>
                                                </v-flex>
                                                <v-flex xs12 sm6 md4>
                                                <v-text-field v-model="hsn" label="HSN" required=""></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm6 md4>
                                                <v-text-field
                                                    label="UOM"
                                                    v-model="uom"
                                                    required
                                                ></v-text-field>
                                                </v-flex>
                                                <v-flex xs12>
                                                <v-textarea v-model="description" label="Description" required></v-textarea>
                                                </v-flex>
                                                <v-flex xs12 sm4>
                                                <v-text-field 
                                                    label="Quantity" 
                                                    required
                                                    @input="calcAmount"
                                                    v-model="quantity"
                                                ></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm4>
                                                <v-text-field
                                                    label="Unit price"
                                                    v-model="price"
                                                    required
                                                    
                                                ></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm4>
                                                <v-text-field
                                                    v-model="gst"
                                                    label="GST %"
                                                    
                                                ></v-text-field>
                                                <v-flex xs12>
                                                <!-- <v-text-field :value="calcAmount" label="Amount" required></v-text-field> -->
                                                <v-text-field @blur="calcPrice" v-model="amount" label="Amount" required></v-text-field>
                                                </v-flex>
                                                </v-flex>
                                            </v-layout>
                                            </v-container>
                                            <small>*indicates required field</small>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                                            <v-btn color="blue darken-1" flat @click.native="addItem">Save</v-btn>
                                        </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>


<script>
  export default {
    data: () => ({
        headers: [
            { text: 'Item', value: 'item' },
            { text: 'Description', value: 'description' },
            { text: 'HSN', value: 'hsn' },
            { text: 'Quantity', value: 'quantity' },
            { text: 'UOM', value: 'uom' },
            { text: 'Unit Price', value: 'price' },
            { text: 'GST %', value: 'gst' },
            { text: 'Subtotal', value: 'subtotal' },
            ],
        date: null,
        dateFormatted: null,
        menu1: false,
        menu2: false,
        phone: null,
        email: null,
        address: null,
        customer: null, 
        products: [],
        items: [],
        item: {  },
        product: '',
        dialog: false,
        p_name: null,
        description: null,
        uom: null,
        hsn: null,
        price: 0,
        gst: 0,
        quantity: 0,
        amount: 0,
        total: 0
    }),

    computed: {
        // calcAmount () {
        //     if ( this.gst == 0 ) {
        //         return this.price * this.quantity
        //     }
        //     else {
        //         return this.price * this.quantity + ( ( this.price * this.quantity ) * ( this.gst / 100 ) )
        //     }
        // },
        computedDateFormatted () {
            return this.formatDate(this.date)
        },
        customers () {
            return this.$store.getters.loadedCustomers
        }
    },

    watch: {
        // eslint-disable-next-line
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    
    created () {
        this.products = this.$store.getters.loadedProducts
    },

    methods: {
        addItem () {
            const Id = this.items.length + 1
            this.items.push( {
                id: Id,
                p_name: this.p_name,
                description: this.description,
                quantity: this.quantity,
                uom: this.uom,
                hsn: this.hsn,
                gst: this.gst,
                price: this.price,
                amount: this.amount
            } )
            this.p_name = null
            this.description = null
            this.hsn = null
            this.uom = null
            this.quantity = 0
            this.price = 0
            this.gst = 0
            this.total = this.total + this.amount
            this.amount = 0
            this.dialog = false
        },

        calcAmount () {
            if ( this.gst == 0 ) {
                this.amount = this.price * this.quantity
            }
            else {
                this.amount = this.price * this.quantity + ( ( this.price * this.quantity ) * ( this.gst / 100 ) )
            }
        },

        calcPrice () {
            if ( this.gst == 0 ) {
                this.amount = this.price 
            }
            else {
                this.price = this.amount - ( ( this.price * this.quantity ) * ( this.gst / 100 ) )
            }
        },
        
        getCustomer () {
            const s_customer = this.$store.getters.loadedCustomer(this.customer)
            this.phone = s_customer.phone
            this.address = s_customer.address
            this.email = s_customer.email 
        },
        getProduct () {
            const s_product = this.$store.getters.loadedProduct(this.product)
            this.p_name = s_product.p_name
            this.description = s_product.description
            this.uom = s_product.uom
            this.price = s_product.price
            this.gst = s_product.gst
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        }
    }
  }
</script>
