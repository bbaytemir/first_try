<template>
  <div class="login">
     <ResponseText v-if="isRedirecting" :result="result" />
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
                  <label for="" class="label">İsim</label>
                  <div class="control has-icons-left">
                    <input
                      @submit="submit"
                      v-model="name"
                      value="asd"
                      type="text"
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
                  <label for="" class="label">Soyisim</label>
                  <div class="control has-icons-left">
                    <input
                      @submit="submit"
                      v-model="surname"
                      value="asd"
                      type="text"
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
                <div class="field">
                  <label for="" class="label">Bina</label>
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select v-model="building">
                        <option value="">Birini seçiniz</option>
                        <option
                          v-bind:key="build._id"
                          v-for="build in this.buildings"
                          :value="build._id"
                        >
                          {{ build.name }}
                        </option>
                      </select>
                    </div>
                    <!-- <p>Message is: {{ building }}</p> -->
                  </div>
                </div>
                <!-- <div class="field">
                    <label for="" class="checkbox">
                        <input type="checkbox" />
                        Remember me
                    </label>
                    </div> -->
                <div class="field">
                  <p>Message is: {{ password }}</p>
                  <p>Message is: {{ result }}{{ counter }}</p>
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
import Vue from "vue";
import ResponseText from "../components/ResponseText";

export default {
  name: "Register",
  components:{
    ResponseText
  },

  data() {
    return {
      email: "string@string.com",
      name: "burak",
      surname: "deneme",
      password: "string",
      building: "",
      buildings: Vue.prototype.buildings,
      result: "not send",
      counter: 0,
      isRedirecting: false,
    };
  },
  props: {},
  methods: {
    submit: function () {
      let _mail = this.email;
      let _name = this.name;
      let _surname = this.surname;
      let _password = this.password;
      let _building = this.building;
      var postData = {
        name: _name,
        surname: _surname,
        email: _mail,
        password: _password,
      };
      if (_building && _building.length > 0) {
        postData.building = _building;
      }
      //   console.log("asd");
      axios
        .post("http://127.0.0.1:3000/api/users", postData)
        .then((response) => {
          console.log(response);
          this.result = response;
          if (response.data.id) {
            this.isRedirecting = true;
            this.result = "Kayıt başarılı yönlendiriliyorsunuz...";
            setTimeout(() => this.$router.push("login"), 5000);
          }
        })
        .catch((error) => {
          console.log(error);
          this.result = error;
        });
      this.counter++;
    },
  },
};
</script>
