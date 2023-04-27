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
            :total-rows="discounts.length"
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
        <b-col class="mt-2">
          <b-button
            variant="dark"
            class="toklah_btn"
            @click="showAddDiscount"
            :disabled="isBusy"
            v-if="auth('acl101')"
            >New Discount</b-button
          >
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-table
          ref="vol-table"
          class="w100"
          hover
          bordered
          responsive
          no-border-collapse
          head-variant="dark"
          :sticky-header="height"
          :fields="fields"
          :items="discounts"
          :busy="isBusy"
          :filter="filter"
          small
          :current-page="currentPage"
          :per-page="perPage"
        >
          <template slot="table-busy">
            <b-spinner class="align-middle"></b-spinner>
          </template>
          <template v-slot:cell(actions)="discount">
            <b-button
              v-if="discount.item.isActive"
              class="rocci_btn pr-2 pl-2 ml-2"
              variant="dark"
              size="sm"
              title="disable"
              @click="showDisablediscount(discount.item)"
            >
              <b-icon icon="chevron-double-down"></b-icon>
            </b-button>
            <b-button
              v-else
              class="rocci_btn pr-2 pl-2 ml-2"
              variant="dark"
              size="sm"
              title="Enable"
              @click="showEnablediscount(discount.item)"
            >
              <b-icon icon="chevron-double-up"></b-icon>
            </b-button>
          </template>
        </b-table>
      </b-row>
    </b-container>
    <b-modal
      id="modal-deldiscount"
      size="md"
      centered
      title="Delete discount"
      @show="modals++"
      @hidden="modals--"
    >
      <b-overlay :show="isBusy" rounded="md" no-wrap></b-overlay>
      <h2 class="text-center" v-if="currentdiscount">
        {{ currentdiscount.name }}
      </h2>
      <template v-slot:modal-footer="">
        <b-button
          class="centered rocci_btn"
          variant="dark"
          :disabled="isBusy"
          @click="deldiscount"
          >Delete</b-button
        >
      </template>
    </b-modal>
    <b-modal
      id="modal-disablediscount"
      size="md"
      centered
      title="Disable discount"
      @show="modals++"
      @hidden="modals--"
    >
      <b-overlay :show="isBusy" rounded="md" no-wrap></b-overlay>
      <h2 class="text-center" v-if="currentdiscount">
        {{ currentdiscount.discount_code }}
      </h2>

      <template v-slot:modal-footer="">
        <b-button
          class="centered rocci_btn"
          variant="dark"
          :disabled="isBusy"
          @click="disablediscount"
          >Disable</b-button
        >
      </template>
    </b-modal>
    <b-modal
      id="modal-enablediscount"
      size="md"
      centered
      title="Enable discount"
      @show="modals++"
      @hidden="modals--"
    >
      <b-overlay :show="isBusy" rounded="md" no-wrap></b-overlay>
      <h2 class="text-center" v-if="currentdiscount">
        {{ currentdiscount.discount_code }}
      </h2>
      <template v-slot:modal-footer="">
        <b-button
          class="centered rocci_btn"
          variant="dark"
          :disabled="isBusy"
          @click="enablediscount"
          >Enable</b-button
        >
      </template>
    </b-modal>
    <b-modal
      id="modal-addDiscount"
      size="lg"
      centered
      title="New Discount"
      @show="modals++"
      @hidden="modals--"
    >
      <b-overlay :show="isBusy" rounded="md" no-wrap></b-overlay>
      <b-input-group append="Code" class="mb-2 ltr gp-30">
        <b-form-input
          size="md"
          type="text"
          placeholder="Discount Code"
          v-model="new_Discount.discount_code"
        ></b-form-input>
      </b-input-group>
      <b-input-group append="Percentage" class="mb-2 ltr gp-30">
        <b-form-input
          size="md"
          type="number"
          :min="0"
          :max="100"
          placeholder="From 0 to 100 ONLY"
          v-model="new_Discount.value"
        ></b-form-input>
      </b-input-group>
      <b-input-group append="Valid from" class="mb-2 ltr gp-30">
        <b-form-input
          size="md"
          class="ltr"
          type="date"
          v-model="new_Discount.valid_from"
        ></b-form-input>
      </b-input-group>
      <b-input-group append="Valid to" class="mb-2 ltr gp-30">
        <b-form-input
          size="md"
          class="ltr"
          type="date"
          v-model="new_Discount.valid_to"
        ></b-form-input>
      </b-input-group>
      <template v-slot:modal-footer="{}">
        <b-button
          class="centered toklah_btn"
          variant="dark"
          :disabled="isBusy"
          @click="addDiscount"
          >Add</b-button
        >
      </template>
    </b-modal>
  </div>
</template>
  
  <script>
export default {
  name: "discounts",
  data() {
    return {
      modals: 0,
      discounts: [],
      filter: "",
      currentPage: 0,
      perPage: 20,
      isBusy: false,
      pageOptions: [10, 20, 50, 100],
      fields: [
        {
          key: "discount_code",
          label: "Discount code",
          sortable: true,
          thStyle: { width: "15% !important" },
        },
        {
          key: "value",
          label: "Value",
          sortable: true,
          thStyle: { width: "5% !important" },
        },
        {
          key: "valid_from",
          label: "Valid from",
          sortable: true,
          thStyle: { width: "25% !important" },
        },
        {
          key: "valid_to",
          label: "Valid to",
          sortable: true,
          thStyle: { width: "14% !important" },
        },
        {
          key: "isActive",
          label: "Status",
          sortable: true,
          thStyle: { width: "15% !important" },
        },
        {
          key: "actions",
          label: "settings",
          thStyle: { width: "25% !important" },
        },
      ],
      new_Discount: {
        discount_code: "",
        valid_from: "",
        valid_to: "",
        value: 0,
        isActive: true,
        isDeleted: false,
      },
      currentdiscount: {
        _id: "",
        discount_code: "",
        valid_from: "",
        valid_to: "",
        value: 0,
        isActive: null,
        isDeleted: null,
      },
    };
  },
  computed: {
    height() {
      return `${window.innerHeight - 100}px`;
    },
  },
  created() {
    this.getdiscounts();
  },
  methods: {
    getdiscounts() {
      this.isBusy = true;
      this.$service.getdiscountsAbstract((err, discounts) => {
        this.isBusy = false;
        console.log(discounts);
        this.discounts = discounts;
      });
    },
    // --------------------------------------------------------------------
    showdiscountDetails(discount) {
      if (this.modals) return;
      this.isBusy = true;
      this.$service.getdiscountDetails(discount._id, (err, discount) => {
        this.isBusy = false;
        if (err) return this.showErrorTemp(err);
        this.currentdiscount = JSON.parse(JSON.stringify(discount));
        this.$bvModal.show("modal-detailsdiscount");
      });
    },
    // --------------------------------------------------------------------
    showdiscountsub(discount) {
      if (this.modals) return;
      this.isBusy = true;
      this.$service.getdiscountsub(discount._id, (err, sub) => {
        this.isBusy = false;
        if (err) return this.showErrorTemp(err);
        this.sub = JSON.parse(JSON.stringify(sub));
        this.$bvModal.show("modal-discountsub");
      });
    },
    // --------------------------------------------------------------------
    // --------------------------------------------------------------------
    showEnablediscount(discount) {
      if (this.modals) return;
      this.currentdiscount = discount;
      this.$bvModal.show("modal-enablediscount");
    },
    enablediscount() {
      this.isBusy = true;
      this.$service.enablediscount(this.currentdiscount._id, (err) => {
        if (err) {
          this.isBusy = false;
          return this.showErrorTemp(err);
        }
        this.$service.getdiscountsAbstract((err, discounts) => {
          this.isBusy = false;
          if (err) return this.showErrorTemp(err);
          this.discounts = discounts;
          this.showSuccessTemp("discount Activated");
          this.$bvModal.hide("modal-enablediscount");
        });
      });
    },
    // --------------------------------------------------------------------
    showDisablediscount(discount) {
      if (this.modals) return;
      this.currentdiscount = discount;
      this.$bvModal.show("modal-disablediscount");
    },
    disablediscount() {
      this.isBusy = true;
      this.$service.disablediscount(
        this.currentdiscount._id,
        (err) => {
          if (err) {
            this.isBusy = false;
            return this.showErrorTemp(err);
          }
          this.$service.getdiscountsAbstract((err, discounts) => {
            this.isBusy = false;
            if (err) return this.showErrorTemp(err);
            this.discounts = discounts;
            this.showSuccessTemp("discount diasbled");
            this.$bvModal.hide("modal-disablediscount");
          });
        }
      );
    },
    // --------------------------------------------------------------------
    showAddDiscount() {
      if (this.modals) return;
      this.clear();
      this.$bvModal.show("modal-addDiscount");
    },
    addDiscount() {
      this.isBusy = true;
      this.$service.addDiscount(this.new_Discount, (err) => {
        if (err) {
          this.isBusy = false;
          return this.showErrorTemp(err);
        }
        this.$service.getdiscountsAbstract((err, discounts) => {
          this.isBusy = false;
          if (err) this.showErrorTemp(err);
          this.discounts = discounts;
          this.showSuccessTemp("Discount Added");
          this.clear();
          this.$bvModal.hide("modal-addDiscount");
        });
      });
    },
    clear() {
      this.currentdiscount = {
        _id: "",
        discount_code: "",
        valid_from: "",
        valid_to: "",
        value: 0,
        isActive: null,
        isDeleted: null,
      };
      this.new_Discount = {
        discount_code: "",
        valid_from: "",
        valid_to: "",
        value: 0,
        isActive: true,
        isDeleted: false,
      };
    },
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
  