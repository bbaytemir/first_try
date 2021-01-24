<template>
  <div class="categories">
    <!-- <ResponseText v-if="isRedirecting" :result="this.response" /> -->
    <section class="hero">
      <div class="hero-body">
        <div class="is-fullwidth">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              class="is-fullwidth"
              :items="categories"
              :headers="headers"
              :search="search"
            >
              <template v-slot:item="row">
                <tr>
                  <td class="is-full is-align-items-center">
                    <div class="">{{ categories.indexOf(row.item) + 1 }}</div>
                  </td>
                  <!-- <td>{{ row.item._id }}</td> -->
                  <td>
                    <input
                      v-model="row.item.title"
                      value=""
                      type="text"
                      placeholder="Başlık"
                      class="input"
                      required
                    />
                  </td>
                  <td class="is-full is-align-items-center">
                    <div class="select is-fullwidth">
                      <select v-model="row.item.user">
                        <option value="">Birini seçiniz</option>
                        <option
                          v-bind:key="e._id"
                          v-for="e in users"
                          :value="e._id"
                        >
                          {{
                            e.name + " " + e.surname + " ( " + e.email + " )"
                          }}
                        </option>
                      </select>
                    </div>
                  </td>
                    <td>
                    <v-btn
                      class="m-2"
                      dark
                      large
                      color="green"
                      @click="onButtonClick(row.item)"
                    >
                      <v-icon dark>mdi-update</v-icon>
                       - Güncelle
                    </v-btn>
                    <!-- <v-btn
                      class="m-2"
                      dark
                      large
                      color="red"
                      @click="onButtonClickDelete(row.item)"
                    >
                      <v-icon dark>mdi-delete</v-icon>
                       - Sil
                    </v-btn> -->
                  </td>
                  <td>{{ row.item.updatedAt | formatDate }}</td>
                  <td>{{ row.item.createdAt | formatDate }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      calls: [],
      search: "",
      headers: [
        {
          text: "index",
          align: "center",
          value: "",
        },
        {
          text: "Title",
          align: "center",
          value: "id",
        },
        { text: "User Atended", value: "user_creator" },
        { text: "ACtions", value: "user_creator" },
        { text: "Updated", value: "description", align: "center" },
        { text: "Create", value: "description", align: "center" },
      ],
    };
  },

  async beforeCreate() {},
  async created() {
    // fetch the data when the view is created and the data is
    // already being observed

    await axios
      .get("http://127.0.0.1:3000/api/users")
      .then((response) => {
        console.log("response");
        console.log(response.data);
        this.users = response.data;
        console.log("ata");
        // this.setUsers);
      })
      .catch((error) => console.log(error));
    console.log("assss");
    this.getCategories();
  },
  methods: {
    setUsers(value) {
      this.$emit("users", value);
    },
    onChildClick(value) {
      this.show = value;
    },
    onButtonClickDelete(item) {
      
      axios
        .delete("http://127.0.0.1:3000/api/categories/" + item._id, {
          headers: {
            "Authorization": "Bearer " + this.$store.getters.getUser.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.result = response;
          if (response.data._id) {
            this.getCategories();
          }
        })
        .catch((error) => {
          console.log(error);
          this.result = error;
        });

    },
    onButtonClick(item) {
      console.log(item.user._id);
      
      axios
        .put("http://127.0.0.1:3000/api/categories/" + item._id, item, {
          headers: {
            "Authorization": "Bearer " + this.$store.getters.getUser.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.result = response;
          if (response.data.id) {
            // this.isRedirecting = true;
            this.result = "Kayıt başarılı yönlendiriliyorsunuz...";
            // setTimeout(() => this.$router.push("categories"), 1000);
          }
        })
        .catch((error) => {
          console.log(error);
          this.result = error;
        });


    },

    getCategories() {
      console.log("getting");
      axios
        .get("http://127.0.0.1:3000/api/categories")
        .then((response) => {
          console.log(response.data);
          this.categories = response.data;
          //   if (response.data.token) {
          //     this.calls = "Giriş başarılı yönlendiriliyorsunuz";
          //   }
        })
        .catch((error) => console.log(error));
    },
  },
};
// getUsers();
</script>
<style scoped>
td {
  vertical-align: middle;
}
</style>