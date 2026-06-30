use serde::{Deserialize, Serialize};

use crate::modules::bounded::period::core::domain::{
	entities::operating_period::{
		Account, BalanceSheet, OperatingPeriod, OperationalClosure,
	},
	values::{ PeriodId, PeriodStatus, PeriodTimestamp },
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OperationalClosureDto {
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
	pub balance_sheet: BalanceSheetDto,
	#[serde(alias = "_id")]
	pub id: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BalanceSheetDto {
	pub balance_sheet: f64,
	pub total_income: f64,
	pub total_expense: f64,
}

impl From<OperationalClosureDto> for OperationalClosure {
	fn from(dto: OperationalClosureDto) -> Self {
		Self {
			state: dto.state,
			total_sales_amount: dto.total_sales_amount,
			total_restaurant_amount: dto.total_restaurant_amount,
			total_to_go_orders_amount: dto.total_to_go_orders_amount,
			total_phone_amount: dto.total_phone_amount,
			total_rappi_amount: dto.total_rappi_amount,
			to_go_orders_total: dto.to_go_orders_total,
			total_cash_in_amount: dto.total_cash_in_amount,
			phone_orders_total: dto.phone_orders_total,
			rappi_orders_total: dto.rappi_orders_total,
			total_debit_amount: dto.total_debit_amount,
			total_credit_amount: dto.total_credit_amount,
			total_transfer_amount: dto.total_transfer_amount,
			restaurant_orders_total: dto.restaurant_orders_total,
			finished_accounts: dto.finished_accounts,
			total_diners: dto.total_diners,
			number_of_discounts: dto.number_of_discounts,
			discount_total_amount: dto.discount_total_amount,
			number_of_courtesy: dto.number_of_courtesy,
			courtesy_total_amount: dto.courtesy_total_amount,
			number_of_cancellations: dto.number_of_cancellations,
			cancellations_total_amount: dto.cancellations_total_amount,
			balance_sheet: dto.balance_sheet.into(),
			id: dto.id,
		}
	}
}

impl From<OperationalClosure> for OperationalClosureDto {
	fn from(entity: OperationalClosure) -> Self {
		Self {
			state: entity.state,
			total_sales_amount: entity.total_sales_amount,
			total_restaurant_amount: entity.total_restaurant_amount,
			total_to_go_orders_amount: entity.total_to_go_orders_amount,
			total_phone_amount: entity.total_phone_amount,
			total_rappi_amount: entity.total_rappi_amount,
			to_go_orders_total: entity.to_go_orders_total,
			total_cash_in_amount: entity.total_cash_in_amount,
			phone_orders_total: entity.phone_orders_total,
			rappi_orders_total: entity.rappi_orders_total,
			total_debit_amount: entity.total_debit_amount,
			total_credit_amount: entity.total_credit_amount,
			total_transfer_amount: entity.total_transfer_amount,
			restaurant_orders_total: entity.restaurant_orders_total,
			finished_accounts: entity.finished_accounts,
			total_diners: entity.total_diners,
			number_of_discounts: entity.number_of_discounts,
			discount_total_amount: entity.discount_total_amount,
			number_of_courtesy: entity.number_of_courtesy,
			courtesy_total_amount: entity.courtesy_total_amount,
			number_of_cancellations: entity.number_of_cancellations,
			cancellations_total_amount: entity.cancellations_total_amount,
			balance_sheet: entity.balance_sheet.into(),
			id: entity.id,
		}
	}
}

impl From<BalanceSheet> for BalanceSheetDto {
	fn from(entity: BalanceSheet) -> Self {
		Self {
			balance_sheet: entity.balance_sheet,
			total_income: entity.total_income,
			total_expense: entity.total_expense,
		}
	}
}

impl From<BalanceSheetDto> for crate::modules::bounded::period::core::domain::entities::operating_period::BalanceSheet {
	fn from(dto: BalanceSheetDto) -> Self {
		Self {
			balance_sheet: dto.balance_sheet,
			total_income: dto.total_income,
			total_expense: dto.total_expense,
		}
	}
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AccountDto {
	pub id: String,
	pub code: String,
	pub sell_type: String,
	pub check_total: String,
	pub status: String,
	pub table_num: String,
	pub user: Option<String>,
	pub created_at: String,
}


fn deserialize_bool_from_string<'de, D>(deserializer: D) -> Result<bool, D::Error>
where
	D: serde::Deserializer<'de>,
{
	match serde_json::Value::deserialize(deserializer)? {
		serde_json::Value::Bool(b) => Ok(b),
		serde_json::Value::String(s) => match s.as_str() {
			"true" | "1" => Ok(true),
			"false" | "0" => Ok(false),
			_ => Err(serde::de::Error::custom(format!("invalid boolean string: {}", s))),
		},
		other => Err(serde::de::Error::custom(format!("expected bool or string, got {other:?}"))),
	}
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OperatingPeriodDto {
	pub id: String,
	#[serde(deserialize_with = "deserialize_bool_from_string")]
	pub status: bool,
	pub created_at: String,
	#[serde(rename = "operationalClosure", alias = "operationalClousure")]
	pub operational_closure: Option<OperationalClosureDto>,
	#[serde(default)]
	pub invoiced_accounts: Vec<AccountDto>,
	pub total_invoiced_accounts: u32,
	pub highest_folio_number: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PeriodsResponseDto {
	pub month: String,
	pub count: usize,
	pub data: Vec<OperatingPeriodDto>,
}

// ── Taunter API DTOs (snake_case) ──────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TaunterAccountDto {
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
pub struct TaunterBalanceSheetDto {
	pub balance_sheet: f64,
	pub total_income: f64,
	pub total_expense: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TaunterClosureDto {
	pub state: String,
	pub total_sales_amount: f64,
	pub total_restaurant_amount: f64,
	pub total_to_go_orders_amount: f64,
	pub total_phone_amount: f64,
	pub total_rappi_amount: f64,
	pub to_go_orders_total: u32,
	pub total_cash_in_amount: f64,
	pub phone_orders_total: u32,
	pub rappi_orders_total: u32,
	pub total_debit_amount: f64,
	pub total_credit_amount: f64,
	pub total_transfer_amount: f64,
	pub restaurant_orders_total: u32,
	pub finished_accounts: u32,
	pub total_diners: u32,
	pub number_of_discounts: u32,
	pub discount_total_amount: f64,
	pub number_of_courtesy: u32,
	pub courtesy_total_amount: f64,
	pub number_of_cancellations: u32,
	pub cancellations_total_amount: f64,
	pub balance_sheet: TaunterBalanceSheetDto,
	#[serde(skip_serializing_if = "Option::is_none")]
	pub id: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TaunterPeriodDto {
	pub id: String,
	pub status: bool,
	pub created_at: String,
	pub operational_closure: Option<TaunterClosureDto>,
	pub invoiced_accounts: Vec<TaunterAccountDto>,
	pub total_invoiced_accounts: u32,
	pub highest_folio_number: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProcessPeriodsRequestDto {
	pub reports: Vec<TaunterPeriodDto>,
}

impl From<Account> for TaunterAccountDto {
	fn from(e: Account) -> Self {
		Self {
			id: e.id,
			code: e.code,
			sell_type: e.sell_type,
			check_total: e.check_total,
			status: e.status,
			table_num: e.table_num,
			user: e.user,
			created_at: e.created_at,
		}
	}
}

impl From<BalanceSheet> for TaunterBalanceSheetDto {
	fn from(e: BalanceSheet) -> Self {
		Self {
			balance_sheet: e.balance_sheet,
			total_income: e.total_income,
			total_expense: e.total_expense,
		}
	}
}

impl From<OperationalClosure> for TaunterClosureDto {
	fn from(e: OperationalClosure) -> Self {
		Self {
			state: e.state,
			total_sales_amount: e.total_sales_amount,
			total_restaurant_amount: e.total_restaurant_amount,
			total_to_go_orders_amount: e.total_to_go_orders_amount,
			total_phone_amount: e.total_phone_amount,
			total_rappi_amount: e.total_rappi_amount,
			to_go_orders_total: e.to_go_orders_total,
			total_cash_in_amount: e.total_cash_in_amount,
			phone_orders_total: e.phone_orders_total,
			rappi_orders_total: e.rappi_orders_total,
			total_debit_amount: e.total_debit_amount,
			total_credit_amount: e.total_credit_amount,
			total_transfer_amount: e.total_transfer_amount,
			restaurant_orders_total: e.restaurant_orders_total,
			finished_accounts: e.finished_accounts,
			total_diners: e.total_diners,
			number_of_discounts: e.number_of_discounts,
			discount_total_amount: e.discount_total_amount,
			number_of_courtesy: e.number_of_courtesy,
			courtesy_total_amount: e.courtesy_total_amount,
			number_of_cancellations: e.number_of_cancellations,
			cancellations_total_amount: e.cancellations_total_amount,
			balance_sheet: e.balance_sheet.into(),
			id: e.id,
		}
	}
}

impl From<OperatingPeriod> for TaunterPeriodDto {
	fn from(p: OperatingPeriod) -> Self {
		let period_id = p.id.value().to_string();
		Self {
			id: period_id.clone(),
			status: p.status.value(),
			created_at: p.created_at.value().to_string(),
			operational_closure: p.operational_closure.map(|c| {
				let mut dto: TaunterClosureDto = c.into();
				if dto.id.is_none() {
					dto.id = Some(period_id.clone());
				}
				dto
			}),
			invoiced_accounts: p.invoiced_accounts.into_iter().map(|a| a.into()).collect(),
			total_invoiced_accounts: p.total_invoiced_accounts,
			highest_folio_number: p.highest_folio_number,
		}
	}
}

impl From<OperatingPeriodDto> for OperatingPeriod {
	fn from(dto: OperatingPeriodDto) -> Self {
		Self {
			id: PeriodId::new(dto.id),
			status: PeriodStatus::new(dto.status),
			operational_closure: dto.operational_closure.map(|closure| closure.into()),
			created_at: PeriodTimestamp::new(dto.created_at),
			invoiced_accounts: dto.invoiced_accounts.into_iter().map(|a| a.into()).collect(), 
			total_invoiced_accounts: dto.total_invoiced_accounts,
			highest_folio_number: dto.highest_folio_number,
			
		}
	}
}

impl From<AccountDto> for crate::modules::bounded::period::core::domain::entities::operating_period::Account {
	fn from(dto: AccountDto) -> Self {
		Self {
			id: dto.id,
			code: dto.code,
			sell_type: dto.sell_type,
			check_total: dto.check_total,
			status: dto.status,
			table_num: dto.table_num,
			user: dto.user.unwrap_or_default(),
			created_at: dto.created_at,
		}
	}
}

impl From<OperatingPeriod> for OperatingPeriodDto {
	fn from(period: OperatingPeriod) -> Self {
		Self {
			id: period.id.value().to_string(),
			status: period.status.value(),
			operational_closure: period.operational_closure.map(|closure| closure.into()),
			created_at: period.created_at.value().to_string(),
			invoiced_accounts: Vec::new(),
			total_invoiced_accounts: period.total_invoiced_accounts,
			highest_folio_number: period.highest_folio_number,
		}
	}
}
