<template>
  <div class="login">
    <section class="hero">
      <div class="hero-body">
        <div class="columns">
          <div class="column card is-half">
            <div class="card-content">
              <div class="content">
                <div class="columns">
                  <div class="column">
                    <div class="row">Açıldığı Tarih:</div>
                    <div class="row">Çağrı No:</div>
                    <div class="row">Çağrı Önceliği:</div>
                    <div class="row">Çağrıyı Açan Personel:</div>
                    <div class="row">Adına Çağrı Açılan:</div>
                  </div>
                  <div class="column">
                    <div class="row">
                      {{ call.createdAt | formatDate }}
                    </div>
                    <div class="row">
                      {{ call.id }}
                    </div>
                    <div class="row">
                      {{ call.priority }}
                    </div>
                    <div class="row">
                      {{
                        call.user_creator.name + " " + call.user_creator.surname
                      }}
                    </div>
                    <div class="row" v-if="call.user_solver != null">
                      {{
                        call.user_solver.name + " " + call.user_solver.surname
                      }}
                    </div>
                    <div class="row" v-else>-</div>
                  </div>
                  <div class="column">
                    <div class="row">Güncellenme Tarihi:</div>
                    <div class="row">Çağrı Tipi:</div>
                    <div class="row">Ana Kategori:</div>
                    <div class="row">Ulaşılacak Telefon:</div>
                    <div class="row">Atanan:</div>
                  </div>
                  <div class="column">
                    <div class="row">
                      {{ call.updatedAt | formatDate }}
                    </div>
                    <div class="row">
                      {{ call.call_type }}
                    </div>
                    <div class="row">
                      {{ call.category.title }}
                    </div>
                    <div class="row">
                      <span
                        class="is-align-items-center is-flex"
                        v-if="
                          call.user_creator != null &&
                          call.user_creator.phone != null
                        "
                      >
                        {{ call.user_creator.phone }}
                      </span>
                      <span v-else>-</span>
                    </div>
                    <div class="row">
                      <span
                        class="is-align-items-center is-flex"
                        v-if="
                          call.status[call.status.length - 1] != null &&
                          call.status[call.status.length - 1].to != null
                        "
                      >
                        {{
                          call.status[call.status.length - 1].to.name +
                          " " +
                          call.status[call.status.length - 1].to.surname
                        }}
                      </span>
                    </div>
                  </div>
                </div>
                <!-- {{ call._id }}
                <a href="#">@bulmaio</a>. <a href="#">#css</a>
                <a href="#">#responsive</a>
                <br /> -->
              </div>
            </div>
            <footer class="card-footer">
              <v-btn
                @click="
                  show = true;
                "
                class="card-footer-item has-background-link has-text-link-light"
                >Cağrıyı Güncelle</v-btn
              >
              <!-- <v-btn
                class="card-footer-item has-background-danger has-text-link-light"
                >İptal Et</v-btn
              > -->
            </footer>
          </div>
        </div>
      </div>
    </section>
    <MyModal
      name="asd"
      :item="call"
      title="asd"
      btnSucess="asdsss"
      v-on:childToParent="onChildClick"
      btnCancel="sdads"
      :usersx="users"
      :isShowModal="show"
    >
      asd
    </MyModal>
    <!-- <ResponseText v-if="isRedirecting" :result="this.response" /> -->
    <section class="hero">
      <div class="hero-body">
        <div class="is-fullwidth">
          <v-card>
            <v-card-title>
              <!-- {{ call.status }} -->
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
              :sort-by.sync="columnName"
              :sort-desc.sync="isDescending"
              :items="call.status"
              :headers="headers"
              :search="search"
            >
              <template v-slot:item="row">
                <tr>
                  <td class="is-left">{{ row.item.statusType }}</td>
                  <td>{{ row.item.createdAt | formatDate }}</td>
                  <td>{{ row.item.to.name + " " + row.item.to.surname }}</td>
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
import MyModal from "../../components/MyModal";

// usxers =[];
// async function getUsers() {
//   await axios
//     .get("http://127.0.0.1:3000/api/users")
//     .then((response) => {
//       console.log(response.data);
//       this.users = response.data;
//     })
//     .catch((error) => console.log(error));
// }
export default {
  components: { MyModal },

  data() {
    return {
      users: [],
      selectedItem: undefined,
      show: false,
      call: undefined,
      search: "",
      columnName: "id",
      isDescending: true,
      headers: [
        { text: "Durum", align: "center", value: "row.item.statusType" },
        { text: "Atanan", align: "center", value: "row.item.statusType" },
        {
          text: "Atanma Tarihi",
          align: "center",
          value: "row.item.statusType",
        },
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
    this.getCall();
  },
  methods: {
    setUsers(value) {
      this.$emit("users", value);
    },
    onChildClick(value) {
      this.show = value;
      this.getCall();
    },
    onButtonClick(item) {
      console.log("click on " + item.id);
    },

    getCall() {
      var id = this.$route.params.callId;
      console.log("getting");
      axios
        .get("http://127.0.0.1:3000/api/calls/" + id)
        .then((response) => {
          console.log(response.data);
          this.call = response.data;
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