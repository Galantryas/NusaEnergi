<template>
  <div class="image">
    <div class="tengah">
      <form light class="login" @submit.prevent="login">
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
        <a >Doesn't have an account? </a>
        <router-link to="/register"><a >Register</a></router-link>
        </div>
        <br/>
        <br/>
        <br/>
        <v-btn @click="submit" class="button" type="submit">Login</v-btn>
        <v-btn @click="clear" class="button">clear</v-btn>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    $_veeValidate: {
      validator: 'new'
    },

    data: () => ({
      
      email: "",
      password:"",
      dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters'
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
      login: function () {
        let email = this.email 
        let password = this.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/'))
       // eslint-disable-next-line
       .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped>
    .tengah{
      float:right;
      width: 30%;
      max-width: 300;
      color: rgb(255, 255, 255);
      background-color: rgba(107, 142, 194, 0.459);
      height: 100vh;
      justify-content: center;
      align-items: center;
      box-shadow:10px 10px rgb(243, 231, 164), -1em 0 .9em white;
    }
    form{
      margin-top: 50%;
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
      color:#E3F2FD;
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

    .button{
      opacity: 0.6;
      border: none;
    }

    .button:hover {
       box-shadow: 0 12px 16px 0 rgba(255, 238, 87, 0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
       opacity: 1;
    }

</style>