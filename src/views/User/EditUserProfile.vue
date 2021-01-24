<template>
  <div class="login">
    <ResponseText v-if="isRedirecting" :result="result" />
    <section class="hero" v-else>
      <div class="hero-body">
        <div class="columns is-centered">
          <div class="column is-three-quarters">
            <form @submit.prevent="submit" action="" class="columns box">
              <div class="column is-three-quarters">
                <div class="field">
                  <label for="" class="label">İsim</label>
                  <div class="control has-icons-left">
                    <input
                      @submit="submit"
                      v-model="user.name"
                      value=""
                      type="text"
                      placeholder="Başlık"
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
                      v-model="user.surname"
                      value=""
                      type="text"
                      placeholder="Başlık"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Email</label>
                  <div class="control has-icons-left">
                    <input
                      @submit="submit"
                      v-model="user.email"
                      value=""
                      type="text"
                      placeholder="Başlık"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Number</label>
                  <div class="control has-icons-left">
                    <input
                      @submit="submit"
                      v-model="user.phone"
                      value=""
                      type="text"
                      placeholder="Başlık"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>

               <div class="field">
                  <label for="" class="label">Bina</label>
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select v-model="user.building">
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
                <div class="field">
                  <input type="submit" class="button is-fullwidth is-success" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

export default {
  name: "EditUserProfile",
  data() {
    return {
      title: "",
      user: "",
      buildings: Vue.prototype.buildings,
      isRedirecting: false,
    };
  },
  async created() {
    // fetch the data when the view is created and the data is
    // already being observed

    await axios
      .get("http://127.0.0.1:3000/api/users/" + this.$store.getters.getUser.id)
      .then((response) => {
        console.log("response");
        console.log(response.data);
        this.user = response.data;
        console.log("ata");
        // this.setUsers);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    submit: function () {
      let _user = this.user;
      let _title = this.title;

      var postData = {
        user: _user,
        title: _title,
      };

      axios
        .post("http://127.0.0.1:3000/api/categories", postData, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getUser.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.result = response;
          if (response.data.id) {
            this.isRedirecting = true;
            this.result = "Kayıt başarılı yönlendiriliyorsunuz...";
            setTimeout(() => this.$router.push("categories"), 1000);
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