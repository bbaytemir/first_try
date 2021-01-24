<template>
  <div class="login">
    <ResponseText v-if="isRedirecting" :result="this.response" />
    <section class="hero" v-else>
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form @submit.prevent="submit" action="" class="box">
                <div class="field">
                  <label for="" class="label">Mail Adresi</label>
                  <div class="control has-icons-left">
                    <input
                      @submit="submit"
                      v-model="email"
                      value="asd"
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Şifre</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="password"
                      value="asd"
                      type="password"
                      placeholder="*******"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <!-- <div class="field">
                  <label for="" class="checkbox">
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div> -->
                <div class="field">
                  <p>Message is: {{ response }}</p>
                  <input type="submit" class="button is-fullwidth is-success" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import ResponseText from "../components/ResponseText";

export default {
  name: "Login",
  components: {
    ResponseText,
  },
  data() {
    return {
      email: "string@string.com",
      password: "string",
      response: "",
      isRedirecting: false,
    };
  },
  props: {},
  methods: {
    submit: function () {
      let mail = this.email;
      let pwd = this.password;
      console.log("asd");
      axios
        .post("http://127.0.0.1:3000/login", {
          email: mail,
          password: pwd,
        })
        .then((response) => {
          if (response.data.token) {
            this.isRedirecting = true;
            this.$store.commit("setUser", response.data);
            this.response = "Giriş başarılı yönlendiriliyorsunuz";
            setTimeout(() => this.$router.push("/"), 1000);
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
