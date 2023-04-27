<template>
  <div class="wrapper text-center">
    <b-container class="">
      <b-row>
        <b-col class="mt-2">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Search for"
          ></b-form-input>
        </b-col>
        <b-col class="mt-2">
          <b-pagination
            class="rocci_page p-0 m-0"
            v-model="currentPage"
            :total-rows="users.length"
            :per-page="perPage"
            align="fill"
          ></b-pagination>
        </b-col>
        <b-col class="mt-2 ltr">
          <b-input-group append="Capacity">
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              :options="pageOptions"
            ></b-form-select>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-table
          ref="vol-table"
          class="w100"
          hover
          bordered
          no-border-collapse
          head-variant="dark"
          :sticky-header="height"
          :fields="fields"
          :items="users"
          :busy="isBusy"
          :filter="filter"
          small
          :current-page="currentPage"
          :per-page="perPage"
        >
          <template slot="table-busy">
            <b-spinner class="align-middle"></b-spinner>
          </template>
          <template v-slot:cell(actions)="user">
            <b-button
              class="rocci_btn pr-2 pl-2 ml-2"
              variant="dark"
              size="sm"
              title="Details"
              v-if="auth('acl100')"
              @click="showuserDetails(user.item)"
            >
              <b-icon icon="person-circle"></b-icon>
            </b-button>
            <b-button
              class="rocci_btn pr-2 pl-2 ml-2"
              variant="dark"
              size="sm"
              title="Details"
              v-if="auth('acl100')"
              @click="showuserSub(user.item)"
            >
              <b-icon icon="eye"></b-icon>
            </b-button>
            <b-button
              v-if="auth('acl104') && !user.item.isBlocked"
              class="rocci_btn pr-2 pl-2 ml-2"
              variant="dark"
              size="sm"
              title="Block"
              @click="showBlockuser(user.item)"
            >
              <b-icon icon="lock"></b-icon>
            </b-button>
            <b-button
              v-else-if="auth('acl104')"
              class="rocci_btn pr-2 pl-2 ml-2"
              variant="dark"
              size="sm"
              title="Unblock"
              @click="showUnblockuser(user.item)"
            >
              <b-icon icon="unlock"></b-icon>
            </b-button>
            <!-- <b-button
              class="rocci_btn pr-2 pl-2 ml-2"
              variant="dark"
              size="sm"
              title="Delete"
              v-if="auth('acl103')"
              @click="showDeluser(user.item)"
            >
              <b-icon icon="trash"></b-icon>
            </b-button> -->
          </template>
        </b-table>
      </b-row>
    </b-container>

    <b-modal
      dir="ltr"
      id="modal-detailsuser"
      size="lg"
      centered
      title="User Details"
      @show="modals++"
      @hidden="modals--"
    >
      <b-overlay :show="isBusy" rounded="md" no-wrap></b-overlay>
      <b-input-group class="gp-30 mb-2" size="lg" prepend="Name">
        <b-form-input
          size="md"
          dir="ltr"
          type="text"
          :value="currentUser.name"
          disabled
        ></b-form-input>
      </b-input-group>
      <b-input-group class="gp-30 mb-2" size="lg" prepend="Surname">
        <b-form-input
          size="md"
          dir="ltr"
          type="text"
          :value="currentUser.surname"
          disabled
        ></b-form-input>
      </b-input-group>
      <b-input-group prepend="Email" size="lg" class="mb-2 gp-30">
        <b-form-input
          size="md"
          type="text"
          :value="currentUser.email"
          disabled
        ></b-form-input>
      </b-input-group>
      <b-input-group prepend="Last login" class="mb-2 ltr gp-30">
        <b-form-input
          size="md"
          class="ltr"
          type="text"
          :value="currentUser.last_login"
          disabled
        ></b-form-input>
      </b-input-group>
      <b-input-group prepend="Blocked" class="mb-2 ltr gp-30">
        <b-form-input
          v-if="currentUser.isBlocked"
          class="redText"
          size="md"
          type="text"
          :value="makeBlockText(currentUser.isBlocked)"
          disabled
        ></b-form-input>
        <b-form-input
          v-if="!currentUser.isBlocked"
          class="greenText"
          size="md"
          type="text"
          value="Active"
          disabled
        ></b-form-input>
      </b-input-group>
      <b-input-group prepend="Deleted" class="mb-2 ltr gp-30">
        <b-form-input
          v-if="currentUser.isDeleted"
          class="redText"
          size="md"
          type="text"
          :value="makeBlockText(currentUser.isDeleted)"
          disabled
        ></b-form-input>
        <b-form-input
          v-if="!currentUser.isDeleted"
          class="greenText"
          size="md"
          type="text"
          value="NOT DELETED"
          disabled
        ></b-form-input>
      </b-input-group>
      <template v-slot:modal-footer="{ ok }">
        <b-button
          class="centered rocci_btn"
          variant="dark"
          :disabled="isBusy"
          @click="ok"
          >Close</b-button
        >
      </template>
    </b-modal>
    <b-modal
      id="modal-deluser"
      size="md"
      centered
      title="Delete user"
      @show="modals++"
      @hidden="modals--"
    >
      <b-overlay :show="isBusy" rounded="md" no-wrap></b-overlay>
      <h2 class="text-center" v-if="currentUser">{{ currentUser.name }}</h2>
      <template v-slot:modal-footer="">
        <b-button
          class="centered rocci_btn"
          variant="dark"
          :disabled="isBusy"
          @click="deluser"
          >Delete</b-button
        >
      </template>
    </b-modal>
    <b-modal
      id="modal-blockuser"
      size="md"
      centered
      title="Block User"
      @show="modals++"
      @hidden="modals--"
    >
      <b-overlay :show="isBusy" rounded="md" no-wrap></b-overlay>
      <h2 class="text-center" v-if="currentUser">{{ currentUser.name +' '+currentUser.surname }}</h2>

      <template v-slot:modal-footer="">
        <b-button
          class="centered rocci_btn"
          variant="dark"
          :disabled="isBusy"
          @click="blockuser"
          >Block</b-button
        >
      </template>
    </b-modal>
    <b-modal
      id="modal-unblockuser"
      size="md"
      centered
      title="Unblock User"
      @show="modals++"
      @hidden="modals--"
    >
      <b-overlay :show="isBusy" rounded="md" no-wrap></b-overlay>
      <h2 class="text-center" v-if="currentUser">{{ currentUser.name }}</h2>
      <template v-slot:modal-footer="">
        <b-button
          class="centered rocci_btn"
          variant="dark"
          :disabled="isBusy"
          @click="unblockuser"
          >Unblock</b-button
        >
      </template>
    </b-modal>
    <b-modal
      id="modal-userSub"
      size="xl"
      centered
      title="User Subscriptions"
      @show="modals++"
      @hidden="modals--"
    >
      <b-row>
        <b-col class="mt-2">
          <b-form-input
            v-model="subFilter"
            type="search"
            id="filterInput"
            placeholder="Search for"
          ></b-form-input>
        </b-col>
        <b-col class="mt-2">
          <b-pagination
            class="rocci_page p-0 m-0"
            v-model="subCurrentPage"
            :total-rows="sub.length"
            :per-page="subPerPage"
            align="fill"
          ></b-pagination>
        </b-col>
        <b-col class="mt-2 ltr">
          <b-input-group append="Capacity">
            <b-form-select
              v-model="subPerPage"
              id="perPageSelect"
              :options="subPageOptions"
            ></b-form-select>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-table
          ref="vol-table"
          class="w100"
          hover
          bordered
          no-border-collapse
          head-variant="dark"
          :sticky-header="height"
          :fields="subFields"
          :items="sub"
          :busy="isBusy"
          :filter="subFilter"
          small
          :current-page="subCurrentPage"
          :per-page="subPerPage"
        >
          <template slot="table-busy">
            <b-spinner class="align-middle"></b-spinner>
          </template>
        </b-table>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      modals: 0,
      users: [],
      sub: [],
      filter: "",
      subFilter: "",
      subCurrentPage: 0,
      currentPage: 0,
      perPage: 20,
      subPerPage: 20,
      isBusy: false,
      pageOptions: [10, 20, 50, 100],
      subPageOptions: [10, 20, 50, 100],
      fields: [
        {
          key: "name",
          label: "Name",
          sortable: true,
          thStyle: { width: "25% !important" },
        },
        {
          key: "surname",
          label: "surname",
          sortable: true,
          thStyle: { width: "25% !important" },
        },
        {
          key: "email",
          label: "email",
          sortable: true,
          thStyle: { width: "15% !important" },
        },
        {
          key: "actions",
          label: "settings",
          thStyle: { width: "20% !important" },
        },
      ],
      subFields: [
        {
          key: "payment_name",
          label: "Payment name",
          sortable: true,
          thStyle: { width: "20% !important" },
        },
        {
          key: "payment_surname",
          label: "Payment surname",
          sortable: true,
          thStyle: { width: "20% !important" },
        },
        {
          key: "payment_date",
          label: "Payment date",
          sortable: true,
          thStyle: { width: "25% !important" },
        },
        {
          key: "duration",
          label: "Duration",
          sortable: true,
          thStyle: { width: "5% !important" },
        },
        {
          key: "cost.total",
          label: "Total",
          sortable: true,
          thStyle: { width: "15% !important" },
        },
        {
          key: "cost.currency",
          label: "Currency",
          sortable: true,
          thStyle: { width: "15% !important" },
        },
        {
          key: "discount",
          label: "Discount",
          sortable: true,
          thStyle: { width: "10% !important" },
        },
        {
          key: "isActive",
          label: "isActive",
          sortable: true,
          thStyle: { width: "5% !important" },
        },
        {
          key: "validTill",
          label: "validTill",
          sortable: true,
          thStyle: { width: "30% !important" },
        },
      ],
      //   sub: {
      //     payment_name: "",
      //     payment_surname: "",
      //     payment_date: "",
      //     duration: "",
      //     subscription_date: "",
      //     currency: "",
      //     total: "",
      //     discount: "",
      //     isActive: "",
      //     validTill: "",
      //   },
      new_User: {
        _id: "",
        name: "",
        surname: "",
        isBlocked: null,
        email: "",
        isDeleted: null,
        last_login: "",
      },
      currentUser: {
        _id: "",
        name: "",
        surname: "",
        isBlocked: null,
        email: "",
        isDeleted: null,
        last_login: "",
      },
    };
  },
  computed: {
    height() {
      return `${window.innerHeight - 100}px`;
    },
  },
  created() {
    this.getusers();
  },
  methods: {
    getusers() {
      this.isBusy = true;
      this.$service.getusersAbstract((err, users) => {
        this.isBusy = false;
        console.log(users);
        this.users = users;
        console.log(this.users[0].email);
      });
    },
    // --------------------------------------------------------------------
    showuserDetails(user) {
      if (this.modals) return;
      this.isBusy = true;
      this.$service.getuserDetails(user._id, (err, user) => {
        this.isBusy = false;
        if (err) return this.showErrorTemp(err);
        this.currentUser = JSON.parse(JSON.stringify(user));
        this.$bvModal.show("modal-detailsuser");
      });
    },
    // --------------------------------------------------------------------
    showuserSub(user) {
      if (this.modals) return;
      this.isBusy = true;
      this.$service.getuserSub(user._id, (err, sub) => {
        this.isBusy = false;
        if (err) return this.showErrorTemp(err);
        this.sub = JSON.parse(JSON.stringify(sub));
        this.$bvModal.show("modal-userSub");
      });
    },
    // --------------------------------------------------------------------
    showDeluser(user) {
      if (this.modals) return;
      this.currentUser = user;
      this.$bvModal.show("modal-deluser");
    },
    deluser() {
      this.isBusy = true;
      this.$service.deluser(this.currentUser._id, (err) => {
        if (err) {
          this.isBusy = false;
          return this.showErrorTemp(err);
        }
        this.$service.getusersAbstract((err, users) => {
          this.isBusy = false;
          if (err) return this.showErrorTemp(err);
          this.users = users;
          this.showSuccessTemp("Use Deleted");
          this.$bvModal.hide("modal-deluser");
        });
      });
    },
    // --------------------------------------------------------------------
    showUnblockuser(user) {
      if (this.modals) return;
      this.currentUser = user;
      this.$bvModal.show("modal-unblockuser");
    },
    unblockuser() {
      this.isBusy = true;
      this.$service.unblockuser(this.currentUser._id, (err) => {
        if (err) {
          this.isBusy = false;
          return this.showErrorTemp(err);
        }
        this.$service.getusersAbstract((err, users) => {
          this.isBusy = false;
          if (err) return this.showErrorTemp(err);
          this.users = users;
          this.showSuccessTemp("User Activated");
          this.$bvModal.hide("modal-unblockuser");
        });
      });
    },
    // --------------------------------------------------------------------
    showBlockuser(user) {
      if (this.modals) return;
      this.currentUser = user;
      this.$bvModal.show("modal-blockuser");
    },
    blockuser() {
      this.isBusy = true;
      this.$service.blockuser(this.currentUser._id, (err) => {
        if (err) {
          this.isBusy = false;
          return this.showErrorTemp(err);
        }
        this.$service.getusersAbstract((err, users) => {
          this.isBusy = false;
          if (err) return this.showErrorTemp(err);
          this.users = users;
          this.showSuccessTemp("User Blocked");
          this.$bvModal.hide("modal-blockuser");
        });
      });
    },
    // --------------------------------------------------------------------
  },
};
</script>

<style >
/* .modal-xl {
  max-width: 1240px !important;
} */
.grb .dropdown-toggle {
  padding-top: 2px !important;
  padding-bottom: 2px !important;
  color: rgb(254, 224, 81) !important;
  background-color: rgb(44, 49, 54) !important;
  border-color: rgb(44, 49, 54) !important;
}
.grb .dropdown-toggle::after {
  display: none !important;
}
.grb .dropdown-menu {
  width: 300px !important;
}
</style>
