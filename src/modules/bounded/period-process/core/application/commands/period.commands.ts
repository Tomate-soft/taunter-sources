export enum PeriodCommand {
    GET_MONTHLY = "get_monthly_periods_command",
    POST_PROCESS = "post_process_period_command",
}

export type PeriodCommands = keyof typeof PeriodCommand;
