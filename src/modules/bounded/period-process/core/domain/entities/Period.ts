export interface OperationalClosure {
  state: string;
  totalSellsAmount: number;
  totalRestaurantAmount: number;
  totalToGoOrdersAmount: number;
  totalPhoneAmount: number;
  totalRappiAmount: number;
  togoOrdersTotal: number;
  totalCashInAmount: number;
  phoneOrdersTotal: number;
  rappiOrdersTotal: number;
  totalDebitAmount: number;
  totalCreditAmount: number;
  totalTransferAmount: number;
  restaurantOrdersTotal: number;
  finishedAccounts: number;
  totalDiners: number;
  numberOfDiscounts: number;
  discountTotalAmount: number;
  numberOfCourtesy: number;
  courtesyTotalAmount: number;
  numberOfCancellations: number;
  cancellationsTotalAmount: number;
  balanceSheet: BalanceSheet;
  _id?: string;
}

export interface BalanceSheet {
  balance_sheet: number;
  total_income: number;
  total_expense: number;
}

export interface InvoicedAccount {
  id: string;
  code: string;
  sell_type: string;
  check_total: string;
  status: string;
  table_num: string;
  user: string;
  created_at: string;
}

export interface Period {
  id?: string;
  _id?: string;
  status: boolean;
  created_at: string;
  operational_closure?: OperationalClosure;
  invoiced_accounts: InvoicedAccount[];
  total_invoiced_accounts: number;
  highest_folio_number: number;
}

export interface PeriodsResponse {
  month: string;
  count: number;
  data: Period[];
}