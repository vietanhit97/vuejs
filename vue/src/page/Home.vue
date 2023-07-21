<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">精算分類</th>
            <td>
              <multiselect
                v-model="selectedPaymentMethod.paymanetId"
                :options="m_risk_payment_method"
                label="paymanet"
                track-by="id"
                mode="single"
                :searchable="true"
                noResultsText="結果が見つかりません"
                placeholder="--検索--"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">金額区分</th>
            <td>
              <multiselect
                v-model="selectedPaymentMethod.amountMoneyId"
                :options="m_risk_amount_money"
                label="amountMoney"
                track-by="id"
                mode="single"
                :searchable="true"
                noResultsText="結果が見つかりません"
                placeholder="--検索--"
                :disabled="isAmountMoneyDisabled"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">金額</th>
            <td>
              <multiselect
                v-model="selectedPaymentMethod.amountCategoryId"
                :options="m_risk_amount_category"
                label="amountCategory"
                track-by="id"
                mode="single"
                :searchable="true"
                noResultsText="結果が見つかりません"
                placeholder="--検索--"
                :disabled="isAmountCategoryDisabled"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">データ作成方法</th>
            <td>
              <multiselect
                v-model="selectedPaymentMethod.dataCreationId"
                :options="m_risk_data_creation"
                label="dataCreation"
                track-by="id"
                mode="single"
                :searchable="true"
                noResultsText="結果が見つかりません"
                placeholder="--検索--"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">リスクレベル</th>
            <td>
              <input
                type="text"
                class="form-control"
                :value="calculateRiskLevel"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" class="btn btn-sm btn-success">submit</button>
    </form>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "HomePage",
  components: {
    Multiselect,
  },
  data() {
    return {
      errors: {},
      selectedPaymentMethod: {
        rickLeve: "",
        paymanetId: "",
        amountMoneyId: null,
        amountCategoryId: "",
        dataCreationId: "",
      },
      m_risk_payment_method: [
        { id: 1, paymanet: "支払" },
        { id: 2, paymanet: "請求" },
      ],
      m_risk_amount_money: [
        { id: 1, amountMoney: "月額" },
        { id: 2, amountMoney: "年額" },
      ],
      m_risk_amount_category: [
        { id: 1, amountCategory: "500万以上" },
        { id: 2, amountCategory: "100万以上" },
        { id: 3, amountCategory: "50万以上" },
        { id: 4, amountCategory: "10万以上" },
        { id: 5, amountCategory: "10万未満" },
      ],
      m_risk_data_creation: [
        { id: 1, dataCreation: "人" },
        { id: 2, dataCreation: "システム" },
        { id: 3, dataCreation: "人およびシステム" },
        { id: 4, dataCreation: "社外（従量" },
        { id: 5, dataCreation: "社外（固定" },
      ],
    };
  },
  methods: {
    onPaymentMethodChange() {
      this.selectedPaymentMethod.amountMoneyId = null;
      this.selectedPaymentMethod.amountCategoryId = null;
      this.selectedPaymentMethod.dataCreationId = null;
    },
    onAmountMoneyChange() {
      this.selectedPaymentMethod.amountCategoryId = null;
      this.selectedPaymentMethod.dataCreationId = null;
    },
    onAmountCategoryChange() {
      this.selectedPaymentMethod.dataCreationId = null;
    },
    onSubmit() {
      console.log(this.selectedPaymentMethod);
    },
    getRiskLevel(amountMoney, amountCategory, dataCreation) {
      const riskLevels = {
        月額: {
          "500万以上": {
            人: "SS",
            人およびシステム: "S",
            システム: "A",
            "社外（従量）": "F",
            "社外（固定）": "B",
          },
          "100万以上": {
            人: "S",
            人およびシステム: "A",
            システム: "A",
            "社外（従量）": "F",
            "社外（固定）": "B",
          },
          "50万以上": {
            人: "",
            人およびシステム: "A",
            システム: "B",
            "社外（従量）": "F",
            "社外（固定）": "B",
          },
          "10万以上": {
            人: "",
            人およびシステム: "B",
            システム: "B",
            "社外（従量）": "F",
            "社外（固定）": "B",
          },
          "10万未満": {
            人: "A",
            人およびシステム: "B",
            システム: "C",
            "社外（従量）": "F",
            "社外（固定）": "B",
          },
        },
        年額: {
          "500万以上": {
            人: "ABC",
            人およびシステム: "S",
            システム: "A",
            "社外（従量）": "F",
            "社外（固定）": "B",
          },
        },
      };

      return riskLevels[amountMoney]?.[amountCategory]?.[dataCreation] || "";
    },
  },
  computed: {
    // isAmountMoneyDisabled() {
    //   return !this.selectedPaymentMethod.paymanetId;
    // },
    // isAmountCategoryDisabled() {
    //   return !this.selectedPaymentMethod.amountMoneyId;
    // },
    // isDataCreationDisabled() {
    //   return !this.selectedPaymentMethod.amountMoneyId;
    // },
    calculateRiskLevel() {
      console.log(this.selectedPaymentMethod.amountMoneyId);
      const amountMoney = this.m_risk_amount_money.find(
        (item) => item.id === this.selectedPaymentMethod.amountMoneyId
      );
      const amountCategory = this.m_risk_amount_category.find(
        (item) => item.id === this.selectedPaymentMethod.amountCategoryId
      );
      console.log(amountCategory);
      const dataCreation = this.m_risk_data_creation.find(
        (item) => item.id === this.selectedPaymentMethod.dataCreationId
      );

      if (amountMoney && amountCategory && dataCreation) {
        const riskLevel = this.getRiskLevel(
          amountMoney.amountMoney,
          amountCategory.amountCategory,
          dataCreation.dataCreation
        );
        return riskLevel;
      } else {
        return "";
      }
    },
  },
};
</script>
