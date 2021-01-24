<template>
  <div class="login">
    <MyModal
      name="asd"
      :item="selectedItem"
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
              :items="calls"
              :headers="headers"
              :search="search"
            >
              <template v-slot:item="row">
                <tr>
                  <td class="is-full is-align-items-center">
                    <div class="">{{ calls.indexOf(row.item) + 1 }}</div>
                  </td>
                  <td>
                    <!-- <button class="button is-primary is-large modal-button" data-target="modal-ter" aria-haspopup="true">Launch card modal</button> -->
                    <v-btn
                      class="button p-2 py-5 modal-button"
                      x-small
                      color="white"
                      @click="
                        selectedItem = row.item;
                        show = true;
                      "
                    >
                      <!-- aria-haspopup="true" -->
                      <!-- @click="onButtonClick(row.item)" -->
                      <v-icon class="px-2 left">mdi-details</v-icon>
                      Detaylar
                    </v-btn>
                  </td>
                  <td>
                    <v-btn
                      class="m-2"
                      fab
                      dark
                      x-small
                      color="pink"
                       @click="$router.push('CallDetails/'+ row.item._id)"
                    >
                      <v-icon dark>mdi-arrow-right</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    
                    <v-btn
                      class="m-2"
                      fab
                      dark
                      x-small
                      color="pink"
                       @click="$router.push({ name: 'CallDetails', query: { callId: row.item._id }})"
                    >
                      <v-icon dark>mdi-heart</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn
                      class="m-2"
                      fab
                      dark
                      x-small
                      color="pink"
                      @click="onButtonClick(row.item)"
                    >
                      <v-icon dark>mdi-heart</v-icon>
                    </v-btn>
                  </td>
                  <td>{{ row.item.id }}</td>
                  <td>
                    <span
                      class="is-align-items-center is-flex"
                      v-if="row.item.user_creator"
                    >
                      {{
                        row.item.user_creator.id +
                        " - " +
                        row.item.user_creator.name +
                        " " +
                        row.item.user_creator.surname
                      }}
                    </span>
                  </td>
                  <!-- phone
build
user_attanded
description
category
createdAt
callType
callPriority
user_solver
updatedAt -->

                  <td>
                    <span
                      v-if="
                        row.item.user_creator && row.item.user_creator.phone
                      "
                    >
                      {{ row.item.user_creator.phone }}
                    </span>
                  </td>
                  <td>
                    <span
                      v-if="
                        row.item.user_creator && row.item.user_creator.build
                      "
                    >
                      {{ row.item.user_creator.build }}
                    </span>
                  </td>
                  <td>
                    
                  <!-- <td>{{ row.item.status[row.item.status.length - 1] != null ? row.item.status[row.item.status.length - 1].statusType : (row.item.status[row.item.status.length - 1] | row.item.status) }}</td> -->
                    <span
                      class="is-align-items-center is-flex"
                      v-if="row.item.status[row.item.status.length - 1] != null && row.item.status[row.item.status.length - 1].to != null"
                    >
                      {{
                        row.item.status[row.item.status.length - 1].to.id +
                        " - " +
                        row.item.status[row.item.status.length - 1].to.name +
                        " " +
                        row.item.status[row.item.status.length - 1].to.surname
                      }}
                    </span>
                  </td>
                  <td>{{ row.item.description }}</td>
                  <td>{{ row.item.category.title }}</td>
                  <td>{{ row.item.createdAt | formatDate }}</td>
                  <td>{{ row.item.call_type }}</td>
                  <td>{{ row.item.priority }}</td>
                  <td>{{ row.item.status[row.item.status.length - 1] != null ? row.item.status[row.item.status.length - 1].statusType : (row.item.status[row.item.status.length - 1] | row.item.status) }}</td>
                  <td>
                    <span
                      class="is-align-items-center is-flex"
                      v-if="row.item.user_solver"
                    >
                      {{
                        row.item.user_solver.id +
                        " - " +
                        row.item.user_solver.name +
                        " " +
                        row.item.user_solver.surname
                      }}
                    </span>
                  </td>
                  <td>{{ row.item.updatedAt | formatDate }}</td>
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
      calls: [],
      search: "",
            columnName:'id',
            isDescending:true,
      headers: [
        //           createdAt: (...)
        // description: (...)
        // id: (...)
        // updatedAt: (...)
        // user_attanded: (...)
        // user_creator: (...)
        // user_solver: (...)
        // __v: (...)
        // _id: (...)
        {
          text: "index",
          align: "start",
          value: "",
        },
        { text: "", value: "" },
        { text: "", value: "" },
        { text: "", value: "" },
        { text: "", value: "" },
        {
          text: "id",
          align: "start",
          value: "id",
        },
        { text: "user_creator", value: "user_creator" },
        { text: "phone", value: "description" },
        { text: "build", value: "description" },
        { text: "user_attanded", value: "user_attanded" },
        { text: "description", value: "description" },
        { text: "category", value: "category" },
        { text: "createdAt", value: "createdAt" },
        { text: "callType", value: "callType" },
        { text: "callPriority", value: "callPriority" },
        { text: "status", value: "status" },
        { text: "user_solver", value: "user_solver" },
        { text: "updatedAt", value: "updatedAt" },
      ],
    };
  },

  async beforeCreate() {
  },
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
    this.getCalls();
  },
  methods: {
    setUsers(value) {
      this.$emit('users', value)
    },
    onChildClick(value) {
      this.show = value;
      this.getCalls();
    },
    onButtonClick(item) {
      console.log("click on " + item.id);
    },
    onButtonRoute(item) {
      console.log("click on " + item._id);
    },

    getCalls() {
      console.log("getting");
      axios
        .get("http://127.0.0.1:3000/api/calls")
        .then((response) => {
          console.log(response.data);
          this.calls = response.data;
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