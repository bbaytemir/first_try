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
                  <label for="" class="label">Tanım</label>
                  <div class="control has-icons-left">
                    <input
                      @submit="submit"
                      v-model="description"
                      value=""
                      type="text"
                      placeholder="Çok kötü bir hata"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Açıklama</label>
                  <div class="control has-icons-left">
                    <v-textarea
                      v-model="details"
                      solo
                      placeholder="Çok kötü bir hata"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
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
                  <p>Message is: {{ call_type }}</p>
                  <p>Message is: {{ this.description }}</p>
                  <input type="submit" class="button is-fullwidth is-success" />
                </div>
              </div>

              <div class="column">
                <div class="field">
                  <label for="" class="label">Kategori</label>
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select v-model="category" required>
                        <option value="">Birini seçiniz</option>
                        <option
                          v-bind:key="e._id"
                          v-for="e in categories"
                          :value="e._id"
                        >
                          {{ e.title }}
                        </option>
                      </select>
                    </div>
                    <!-- <p>Message is: {{ building }}</p> -->
                  </div>
                </div>

                <div class="field">
                  <label for="" class="label">Öncelik</label>
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select v-model="priority" required>
                        <option value="">Birini seçiniz</option>
                        <option
                          v-bind:key="e"
                          v-for="e in priority_enum"
                          :value="e"
                        >
                          {{ e }}
                        </option>
                      </select>
                    </div>
                    <!-- <p>Message is: {{ building }}</p> -->
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Çağrı tipi</label>
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select v-model="call_type" required>
                        <option value="">Birini seçiniz</option>
                        <option
                          v-bind:key="e"
                          v-for="e in call_type_enum"
                          :value="e"
                        >
                          {{ e }}
                        </option>
                      </select>
                    </div>
                    <!-- <p>Message is: {{ building }}</p> -->
                  </div>
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
import enums from "../../assets/Enums";
// import store from "../store/index";

export default {
  name: "AddCall",
  data() {
    return {
      categories: [],
      priority_enum: enums.priority_enum,
      call_type_enum: enums.call_type_enum,
      priority: "",
      call_type: "",
      category: "",
      details: "",
      description: "",
      isRedirecting: false,
    };
  },
    async created() {
    // fetch the data when the view is created and the data is
    // already being observed

    await axios
      .get("http://127.0.0.1:3000/api/categories")
      .then((response) => {
        console.log("response");
        console.log(response.data);
        this.categories = response.data;
        console.log("ata");
        // this.setUsers);
      })
      .catch((error) => console.log(error));
    console.log("assss");
  },
  methods: {
    submit: function () {
      console.log("asd this");
      console.log(this);
      console.log("asd ____ this");
      let _priority = this.priority;
      let _call_type = this.call_type;
      let _category = this.category;
      let _details = this.details;
      let _description = this.description;

      var postData = {
        priority: _priority,
        call_type: _call_type,
        category: _category,
        details: _details,
        description: _description,
      };
      // if (_building && _building.length > 0) {
      //   postData.building = _building;
      // }
      //   console.log("asd");
      axios
        .post("http://127.0.0.1:3000/api/calls", postData, {
          headers: {
            "Authorization": "Bearer " + this.$store.getters.getUser.token,
          },
        })
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