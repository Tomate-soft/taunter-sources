
use serde::{Deserialize, Serialize};
use crate::modules::bounded::period::core::domain::values::{ PeriodId, PeriodStatus, PeriodTimestamp };

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Account {
	pub id: String,
	pub code: String,
	pub sell_type: String,
	pub check_total: String,
	pub status: String,
	pub table_num: String,
	pub user: String,
	pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OperationalClosure {
	pub state: String,
	#[serde(rename = "totalSellsAmount")]
	pub total_sales_amount: f64,
	#[serde(rename = "totalRestaurantAmount")]
	pub total_restaurant_amount: f64,
	#[serde(rename = "totalToGoOrdersAmount")]
	pub total_to_go_orders_amount: f64,
	#[serde(rename = "totalPhoneAmount")]
	pub total_phone_amount: f64,
	#[serde(rename = "totalRappiAmount")]
	pub total_rappi_amount: f64,
	#[serde(rename = "togoOrdersTotal")]
	pub to_go_orders_total: u32,
	#[serde(rename = "totalCashInAmount")]
	pub total_cash_in_amount: f64,
	#[serde(rename = "phoneOrdersTotal")]
	pub phone_orders_total: u32,
	#[serde(rename = "rappiOrdersTotal")]
	pub rappi_orders_total: u32,
	#[serde(rename = "totalDebitAmount")]
	pub total_debit_amount: f64,
	#[serde(rename = "totalCreditAmount")]
	pub total_credit_amount: f64,
	#[serde(rename = "totalTransferAmount")]
	pub total_transfer_amount: f64,
	#[serde(rename = "restaurantOrdersTotal")]
	pub restaurant_orders_total: u32,
	#[serde(rename = "finishedAccounts")]
	pub finished_accounts: u32,
	#[serde(rename = "totalDiners")]
	pub total_diners: u32,
	#[serde(rename = "numberOfDiscounts")]
	pub number_of_discounts: u32,
	#[serde(rename = "discountTotalAmount")]
	pub discount_total_amount: f64,
	#[serde(rename = "numberOfCourtesy")]
	pub number_of_courtesy: u32,
	#[serde(rename = "courtesyTotalAmount")]
	pub courtesy_total_amount: f64,
	#[serde(rename = "numberOfCancellations")]
	pub number_of_cancellations: u32,
	#[serde(rename = "cancellationsTotalAmount")]
	pub cancellations_total_amount: f64,
	#[serde(rename = "balanceSheet")]
	pub balance_sheet: BalanceSheet,
	#[serde(rename = "_id")]
	pub id: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BalanceSheet {
	pub balance_sheet: f64,
	pub total_income: f64,
	pub total_expense: f64,
}

// aca vamos a modelar lo que vamos a recibir;
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OperatingPeriod {
    pub id: PeriodId,
    pub status: PeriodStatus,
    pub operational_closure: Option<OperationalClosure>,
    pub created_at: PeriodTimestamp,
	pub invoiced_accounts: Vec<Account>,
	pub total_invoiced_accounts: u32,
	pub highest_folio_number: u64,
}
