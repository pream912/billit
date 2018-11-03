<template>
    <v-layout>
        <v-container>
            <v-layout xs12 ms6 offset-ms3>
                <v-flex>
                      <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            :counter="10"
                            label="Name"
                            required
                            ></v-text-field>
                            <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            ></v-text-field>
                            <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            type="password"
                            required
                            ></v-text-field>
                            <v-text-field
                            v-model="c_password"
                            :rules="c_passwordRules"
                            label="Confirm Password"
                            type="password"
                            required
                            ></v-text-field>                            
                            <v-btn
                            :disabled="!valid"
                            @click="submit"
                            >
                            Sign up
                            </v-btn>
                            <v-btn @click="clear">clear</v-btn>
                        </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>

  export default {
    data: () => ({
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 5) || 'Password must be more than 4 characters'
        ],
        c_password: '',
        c_passwordRules: [
            v => !!v || 'Confirm Password is required',
            v => (v && v.length >= 5) || 'Password mismatch'
        ],
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>