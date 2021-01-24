<template>
  <div class="modal" v-bind:class="{ 'is-active': isShowModal }">
    <div class="modal-background"></div>
    <div class="modal-card" v-click-outside="clickOutside">
      <header class="modal-card-head">
        <p class="modal-card-title" v-if="item">Başlık - {{ title }}</p>
        <!-- <button class="delete" aria-label="close"></button> -->
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="submit" action="" class="box">
          <div class="field">
            <label for="" class="label">Açıklama</label>
            <div class="control has-icons-left">
              <!-- @submit="submit" -->
              <input
                v-model="aciklama"
                value="asd"
                type="text"
                placeholder="Açıklama giriniz"
                class="input"
                required
              />
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label for="" class="label">Yeni Statü</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="selectedStatus">
                  <option value="">Birini seçiniz</option>
                  <option
                    required
                    v-bind:key="en"
                    v-for="en in status_enums"
                    :value="en"
                  >
                    {{ en }}
                  </option>
                </select>
              </div>
              <!-- <p>Message is: {{ building }}</p> -->
            </div>
          </div>
          <div class="field">
            <label for="" class="label">Atanacak Kişi</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="selectedUser">
                  <option value="">Birini seçiniz</option>
                  <option
                    required
                    v-bind:key="user._id"
                    v-for="user in users_x"
                    :value="user._id"
                  >
                    {{ user.email }}
                  </option>
                </select>
              </div>
              <!-- <p>Message is: {{ building }}</p> -->
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success right" @click="submit">
          {{ btnSucess }}
        </button>
        <!-- <button class="button">{{ btnCancel }}</button> -->
      </footer>
    </div>
  </div>
</template>
<script>
import enums from "../assets/Enums";
import axios from "axios";
import Vue from "vue";

Vue.directive("click-outside", {
  bind() {
    this.event = (event) => this.vm.$emit(this.expression, event);
    this.el.addEventListener("click", this.stopProp);
    document.body.addEventListener("click", this.event);
  },
  unbind() {
    this.el.removeEventListener("click", this.stopProp);
    document.body.removeEventListener("click", this.event);
  },

  stopProp(event) {
    event.stopPropagation();
  },
});
export default {
  name: "MyModal",
  //   data: () => {
  //       return {
  //           isShowModal : false,
  //       }
  //   },
  data() {
    return {
      lastState: false,
      status_enums: enums.status_enum,
      selectedUser: "",
      selectedStatus: "",
      users_x: this.usersx,
      aciklama: "",
      result: "",
    };
  },
  methods: {
    clickOutside: function () {
      console.log("this.isShowModal" + this.isShowModal);
      if (this.lastState && this.isShowModal) {
        this.isShowModal = false;
        console.log("emits");
        this.emitToParent();
      }
      this.lastState = this.isShowModal;
    },
    submit: async function () {
      // let _mail = this.email;
      // let _name = this.name;
      // let _surname = this.surname;
      // let _password = this.password;
      // let _building = this.building;
      // var postData = {
      //   name: _name,
      //   surname: _surname,
      //   email: _mail,
      //   password: _password,
      // };
      // if (_building && _building.length > 0) {
      //   postData.building = _building;
      // }
      //   console.log("asd");
      await axios
        .post(
          "http://127.0.0.1:3000/api/calls/" + this.item._id + "/addStatus",
          {
            statusType: this.selectedStatus,
            aciklama: this.aciklama,
            to: this.selectedUser,
          }
        )
        .then((response) => {
          console.log(response);
          this.result = response;
          if (response.data.id) {
            this.$router.go();
            // this.isRedirecting = true;
            // this.result = "Kayıt başarılı yönlendiriliyorsunuz...";
            // setTimeout(() => this.$router.push("login"), 5000);
          }
        })
        .catch((error) => {
          console.log(error);
          this.result = error;
        });

      this.emitToParent();
      this.counter++;
    },
    emitToParent() {
      this.isShowModal = false;
      this.$emit("childToParent", this.isShowModal);
    },
  },
  watch: {
    usersx: function (newVal) {
      // watch it
      console.log("xxx" + newVal);
      this.users_x = newVal;
    },
  },
  props: {
    usersx: Array,
    item: Object,
    isShowModal: Boolean,
    title: String,
    btnSucess: String,
    btnCancel: String,
  },
};
</script>
