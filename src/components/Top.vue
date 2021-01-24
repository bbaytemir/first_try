<template>
  <div>
    <v-app-bar dense color="primary" dark>
      <div class="d-flex align-center">
        <v-btn to="/" text>
          <span class="mx-3 px-1">Home</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>
        <span class="mx-3 px-1">|</span>

        <v-btn to="/about" text>
          <span class="mx-3 px-1">About</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>

        <v-btn to="/login" v-if="!isLogin" text>
          <span class="mx-3 px-1">login</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>
        <v-btn to="/register" v-if="!isLogin" text>
          <span class="mx-3 px-1">register</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>
        <v-btn to="/Calls" v-if="isLogin" text>
          <span class="mx-3 px-1">Calls</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>
        <v-btn to="/AddCall" v-if="isLogin" text>
          <span class="mx-3 px-1">Add Call</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> --> 
        </v-btn>
        <v-btn to="/Categories" v-if="isLogin" text>
          <span class="mx-3 px-1">Categories</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>
        <v-btn to="/AddCategory" v-if="isLogin" text>
          <span class="mx-3 px-1">Add Category</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>
        <v-btn to="/EditProfile" v-if="isLogin" text>
          <span class="mx-3 px-1">EditProfile</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>
      </div>
      <v-spacer></v-spacer>

      <div v-if="isLogin" class="d-flex align-center">
        <v-btn v-on:click="logout" text>
          <span class="mx-3 px-1">Logout</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Top",
  props: {
    msg: String,
  },
  computed: {
    isLogin () {
      return this.$store.getters.isUser
    }
  },
  methods: {
    logout() {
      this.$store.commit("setUser");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
