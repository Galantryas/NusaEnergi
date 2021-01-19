<template>
  <div class="image">
  <div class="tengah">
    <form @submit.prevent="register">
      <v-text-field color="white"
        v-model="username"
        v-validate="'required|max:10'"
        :counter="10"
        :error-messages="errors.collect('username')"
        label="Userame"
        data-vv-name="username"
        required
      ></v-text-field>
      <v-text-field color="white"
        v-model="email"
        type="email"
        v-validate="'required|email'"
        :error-messages="errors.collect('email')"
        label="E-mail"
        data-vv-name="email"
        required
      ></v-text-field>
      <v-text-field color="white"
        v-model="password"
        type="password"
        v-validate="'required|min:6'"
        :error-messages="errors.collect('password')"
        label="Password"
        data-vv-name="password"
        required
      ></v-text-field>
      <br/>
      <div class="kanan">
      <a >Already have an account? </a>
      <router-link to="/"><a >Login</a></router-link>
      </div>
      <br/>
      <br/>
      <br/>
      <v-btn @click="submit" type="submit">Register</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'

  Vue.use(VeeValidate)

  export default {
    $_veeValidate: {
      validator: 'new'
    },

    data: () => ({
      username : "",
      email : "",
      password : "",
      is_admin : null,
      dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        },
        custom: {
          username: {
            required: () => 'Userame can not be empty',
            max: 'The username field may not be greater than 10 characters'
            // custom messages
          }
        }
      }
    }),

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      submit () {
        this.$validator.validateAll()
      },
      clear () {
        this.name = ''
        this.email = ''
        this.password = ''
        this.$validator.reset()
      },
      register: function () {
        let data = {
          username: this.username,
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       // eslint-disable-next-line
       .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped>
    .tengah{
      opacity:0.9;
      float:right;
      width: 30%;
      max-width: 300;
      color: #222;
      background-color: #4b4d4d;
      height: 100vh;
      justify-content: center;
      align-items: center;
    }
    form{
      margin-top: 50%;
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
    }
    .kanan{
      float: right;
    }
    .image{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: url("https://images.wallpaperscraft.com/image/light_bulbs_light_electricity_141522_1280x720.jpg") no-repeat black;

    }
    a:link, a:visited {
      color: white;
      text-align: center; 
      text-decoration: none;
      display: inline-block;
    }
</style>