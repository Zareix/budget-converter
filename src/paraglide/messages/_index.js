/* eslint-disable */
import { getLocale, experimentalStaticLocale } from "../runtime.js"

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Type_CheckingInputs */
/** @typedef {{}} Account_Type_InvestmentInputs */
/** @typedef {{}} Account_Type_JointInputs */
/** @typedef {{}} Account_Type_OtherInputs */
/** @typedef {{}} Account_Type_SavingsInputs */
/** @typedef {{}} Accounts_CaptionInputs */
/** @typedef {{}} Accounts_Create_ButtonInputs */
/** @typedef {{}} Accounts_Create_TitleInputs */
/** @typedef {{}} Accounts_Created_ToastInputs */
/** @typedef {{ name: NonNullable<unknown> }} Accounts_Delete_DescInputs */
/** @typedef {{}} Accounts_Delete_TitleInputs */
/** @typedef {{}} Accounts_Dialog_DescInputs */
/** @typedef {{}} Accounts_Edit_TitleInputs */
/** @typedef {{}} Accounts_Load_ErrorInputs */
/** @typedef {{}} Accounts_LoadingInputs */
/** @typedef {{}} Accounts_Save_ErrorInputs */
/** @typedef {{}} Accounts_Slug_DescInputs */
/** @typedef {{}} Accounts_TitleInputs */
/** @typedef {{}} Accounts_Updated_ToastInputs */
/** @typedef {{}} App_Not_FoundInputs */
/** @typedef {{}} App_TitleInputs */
/** @typedef {{}} Asset_Class_BondInputs */
/** @typedef {{}} Asset_Class_CryptoInputs */
/** @typedef {{}} Asset_Class_EtfInputs */
/** @typedef {{}} Asset_Class_Euro_FundInputs */
/** @typedef {{}} Asset_Class_OtherInputs */
/** @typedef {{}} Asset_Class_ScpiInputs */
/** @typedef {{}} Asset_Class_StockInputs */
/** @typedef {{}} Assets_Account_Add_TitleInputs */
/** @typedef {{}} Assets_Account_Added_ToastInputs */
/** @typedef {{ color: NonNullable<unknown> }} Assets_Account_Choose_ColorInputs */
/** @typedef {{}} Assets_Account_Delete_ErrorInputs */
/** @typedef {{}} Assets_Account_Deleted_ToastInputs */
/** @typedef {{}} Assets_Account_Dialog_DescInputs */
/** @typedef {{}} Assets_Account_Edit_TitleInputs */
/** @typedef {{ slug: NonNullable<unknown> }} Assets_Account_IdentifierInputs */
/** @typedef {{}} Assets_Account_Name_PlaceholderInputs */
/** @typedef {{}} Assets_Account_Updated_ToastInputs */
/** @typedef {{}} Assets_Add_AccountInputs */
/** @typedef {{}} Assets_Add_Savings_AccountInputs */
/** @typedef {{}} Assets_Badge_MissingInputs */
/** @typedef {{ name: NonNullable<unknown> }} Assets_Bulk_Balance_AriaInputs */
/** @typedef {{}} Assets_Bulk_Copy_Prev_TitleInputs */
/** @typedef {{}} Assets_Bulk_DescInputs */
/** @typedef {{ name: NonNullable<unknown> }} Assets_Bulk_Note_AriaInputs */
/** @typedef {{}} Assets_Bulk_Note_PlaceholderInputs */
/** @typedef {{}} Assets_Bulk_PrefillInputs */
/** @typedef {{ month: NonNullable<unknown>, amount: NonNullable<unknown> }} Assets_Bulk_Prev_LabelInputs */
/** @typedef {{}} Assets_Bulk_Save_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assets_Bulk_Save_ManyInputs */
/** @typedef {{}} Assets_Bulk_Save_OneInputs */
/** @typedef {{ count: NonNullable<unknown>, month: NonNullable<unknown> }} Assets_Bulk_Saved_ToastInputs */
/** @typedef {{ month: NonNullable<unknown> }} Assets_Bulk_Saved_Toast_OneInputs */
/** @typedef {{ month: NonNullable<unknown> }} Assets_Bulk_TitleInputs */
/** @typedef {{ name: NonNullable<unknown> }} Assets_Carry_Over_AriaInputs */
/** @typedef {{}} Assets_Carry_Over_ErrorInputs */
/** @typedef {{}} Assets_Carry_Over_PreviousInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Assets_Carry_Over_TitleInputs */
/** @typedef {{ count: NonNullable<unknown>, month: NonNullable<unknown> }} Assets_Carry_Over_ToastInputs */
/** @typedef {{ month: NonNullable<unknown> }} Assets_Carry_Over_Toast_OneInputs */
/** @typedef {{}} Assets_Chart_AllocationInputs */
/** @typedef {{}} Assets_Chart_Empty_AllocationInputs */
/** @typedef {{}} Assets_Chart_Empty_EvolutionInputs */
/** @typedef {{}} Assets_Chart_EvolutionInputs */
/** @typedef {{}} Assets_Chart_Mode_AccountsInputs */
/** @typedef {{}} Assets_Chart_Mode_TotalInputs */
/** @typedef {{}} Assets_Chart_Total_SavingsInputs */
/** @typedef {{}} Assets_Clear_Balance_ErrorInputs */
/** @typedef {{}} Assets_Col_AccountInputs */
/** @typedef {{ month: NonNullable<unknown> }} Assets_Col_BalanceInputs */
/** @typedef {{}} Assets_Col_ChangeInputs */
/** @typedef {{}} Assets_Col_NoteInputs */
/** @typedef {{}} Assets_Col_PreviousInputs */
/** @typedef {{}} Assets_CopyingInputs */
/** @typedef {{}} Assets_Current_MonthInputs */
/** @typedef {{}} Assets_Delete_Account_AriaInputs */
/** @typedef {{}} Assets_Delete_Confirm_DescInputs */
/** @typedef {{ name: NonNullable<unknown> }} Assets_Delete_Confirm_TitleInputs */
/** @typedef {{}} Assets_Edit_Account_AriaInputs */
/** @typedef {{}} Assets_Empty_DescInputs */
/** @typedef {{}} Assets_Empty_TitleInputs */
/** @typedef {{}} Assets_Enter_PlaceholderInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Assets_Estimated_PrefixInputs */
/** @typedef {{}} Assets_Fill_BalancesInputs */
/** @typedef {{}} Assets_Fill_Balances_CtaInputs */
/** @typedef {{}} Assets_History_Carried_OverInputs */
/** @typedef {{}} Assets_History_HintInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assets_History_Missing_TitleInputs */
/** @typedef {{}} Assets_History_TitleInputs */
/** @typedef {{ month: NonNullable<unknown> }} Assets_Kpi_All_UpdatedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assets_Kpi_Carried_OverInputs */
/** @typedef {{}} Assets_Kpi_Carried_Over_OneInputs */
/** @typedef {{}} Assets_Kpi_From_SnapshotsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assets_Kpi_Missing_ManyInputs */
/** @typedef {{}} Assets_Kpi_Missing_OneInputs */
/** @typedef {{}} Assets_Kpi_No_BalancesInputs */
/** @typedef {{}} Assets_Kpi_No_PrevInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Assets_Kpi_Prev_ValueInputs */
/** @typedef {{}} Assets_Kpi_StatusInputs */
/** @typedef {{ month: NonNullable<unknown> }} Assets_Kpi_TotalInputs */
/** @typedef {{}} Assets_Kpi_Vs_PreviousInputs */
/** @typedef {{ message: NonNullable<unknown> }} Assets_Load_ErrorInputs */
/** @typedef {{}} Assets_LoadingInputs */
/** @typedef {{ month: NonNullable<unknown> }} Assets_Missing_AllInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assets_Missing_MoreInputs */
/** @typedef {{ month: NonNullable<unknown>, missing: NonNullable<unknown>, total: NonNullable<unknown> }} Assets_Missing_PartialInputs */
/** @typedef {{ month: NonNullable<unknown>, missing: NonNullable<unknown>, total: NonNullable<unknown> }} Assets_Missing_Partial_OneInputs */
/** @typedef {{}} Assets_Missing_Please_FillInputs */
/** @typedef {{}} Assets_Note_Disabled_TitleInputs */
/** @typedef {{}} Assets_Note_Edit_TitleInputs */
/** @typedef {{}} Assets_Note_PlaceholderInputs */
/** @typedef {{}} Assets_Save_Balance_ErrorInputs */
/** @typedef {{}} Assets_Tab_InvestmentsInputs */
/** @typedef {{}} Assets_Tab_OverviewInputs */
/** @typedef {{}} Assets_Tab_SavingsInputs */
/** @typedef {{ updated: NonNullable<unknown>, total: NonNullable<unknown>, month: NonNullable<unknown> }} Assets_Table_Recorded_CountInputs */
/** @typedef {{}} Assets_Table_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assets_Total_Carried_OverInputs */
/** @typedef {{}} Assets_Total_Carried_Over_OneInputs */
/** @typedef {{}} Bills_AddInputs */
/** @typedef {{}} Bills_Added_ToastInputs */
/** @typedef {{}} Bills_Delete_AriaInputs */
/** @typedef {{}} Bills_Deleted_ToastInputs */
/** @typedef {{}} Bills_DueInputs */
/** @typedef {{}} Bills_EditInputs */
/** @typedef {{}} Bills_Edit_AriaInputs */
/** @typedef {{}} Bills_EmptyInputs */
/** @typedef {{}} Bills_FromInputs */
/** @typedef {{}} Bills_Name_PlaceholderInputs */
/** @typedef {{}} Bills_Save_ErrorInputs */
/** @typedef {{}} Bills_TitleInputs */
/** @typedef {{}} Bills_Update_ErrorInputs */
/** @typedef {{}} Bills_Updated_ToastInputs */
/** @typedef {{}} Categories_CaptionInputs */
/** @typedef {{}} Categories_Chart_ColorInputs */
/** @typedef {{}} Categories_Create_ButtonInputs */
/** @typedef {{}} Categories_Create_DescInputs */
/** @typedef {{}} Categories_Create_TitleInputs */
/** @typedef {{ label: NonNullable<unknown> }} Categories_Delete_DescInputs */
/** @typedef {{}} Categories_Delete_ErrorInputs */
/** @typedef {{}} Categories_Delete_TitleInputs */
/** @typedef {{}} Categories_Edit_DescInputs */
/** @typedef {{}} Categories_Edit_TitleInputs */
/** @typedef {{}} Categories_Label_DescInputs */
/** @typedef {{ message: NonNullable<unknown> }} Categories_Load_ErrorInputs */
/** @typedef {{}} Categories_LoadingInputs */
/** @typedef {{}} Categories_Save_ErrorInputs */
/** @typedef {{}} Categories_Slug_DescInputs */
/** @typedef {{}} Categories_TitleInputs */
/** @typedef {{}} Charts_Empty_BudgetInputs */
/** @typedef {{}} Charts_Empty_ExpensesInputs */
/** @typedef {{}} Charts_Monthly_BudgetInputs */
/** @typedef {{}} Charts_Monthly_ExpensesInputs */
/** @typedef {{}} Charts_RemainingInputs */
/** @typedef {{}} Charts_Slice_BillsInputs */
/** @typedef {{}} Charts_Slice_ExpensesInputs */
/** @typedef {{}} Charts_Slice_SavingsInputs */
/** @typedef {{}} Charts_Total_SpentInputs */
/** @typedef {{}} Common_ActionsInputs */
/** @typedef {{}} Common_ActiveInputs */
/** @typedef {{}} Common_ActualInputs */
/** @typedef {{}} Common_Actual_EurInputs */
/** @typedef {{}} Common_AllInputs */
/** @typedef {{}} Common_AmountInputs */
/** @typedef {{}} Common_AutoInputs */
/** @typedef {{}} Common_BudgetInputs */
/** @typedef {{}} Common_Budget_EurInputs */
/** @typedef {{}} Common_CancelInputs */
/** @typedef {{}} Common_CategoryInputs */
/** @typedef {{ hint: NonNullable<unknown> }} Common_Click_To_CycleInputs */
/** @typedef {{}} Common_Click_To_Edit_AmountInputs */
/** @typedef {{ value: NonNullable<unknown> }} Common_Click_To_Edit_ValueInputs */
/** @typedef {{}} Common_ColorInputs */
/** @typedef {{}} Common_DateInputs */
/** @typedef {{}} Common_Default_ShareInputs */
/** @typedef {{}} Common_DeleteInputs */
/** @typedef {{}} Common_DeletingInputs */
/** @typedef {{}} Common_Due_Day_LabelInputs */
/** @typedef {{}} Common_Exclude_From_BudgetInputs */
/** @typedef {{}} Common_Failed_To_SaveInputs */
/** @typedef {{}} Common_From_AccountInputs */
/** @typedef {{}} Common_ImportInputs */
/** @typedef {{}} Common_Import_FailedInputs */
/** @typedef {{}} Common_ImportingInputs */
/** @typedef {{}} Common_LabelInputs */
/** @typedef {{}} Common_Leave_Empty_If_PendingInputs */
/** @typedef {{}} Common_MonthInputs */
/** @typedef {{}} Common_NameInputs */
/** @typedef {{}} Common_NoInputs */
/** @typedef {{}} Common_NoneInputs */
/** @typedef {{}} Common_OrderInputs */
/** @typedef {{}} Common_PausedInputs */
/** @typedef {{}} Common_Payment_MethodInputs */
/** @typedef {{}} Common_ProcessingInputs */
/** @typedef {{}} Common_ResetInputs */
/** @typedef {{}} Common_SaveInputs */
/** @typedef {{}} Common_Save_ChangesInputs */
/** @typedef {{}} Common_SavingInputs */
/** @typedef {{}} Common_ShareInputs */
/** @typedef {{}} Common_SlugInputs */
/** @typedef {{}} Common_Sort_OrderInputs */
/** @typedef {{}} Common_StatusInputs */
/** @typedef {{}} Common_TotalInputs */
/** @typedef {{}} Common_TypeInputs */
/** @typedef {{}} Common_Unknown_ErrorInputs */
/** @typedef {{}} Common_YesInputs */
/** @typedef {{}} Common_Your_ShareInputs */
/** @typedef {{}} Dashboard_Clone_ErrorInputs */
/** @typedef {{ source: NonNullable<unknown> }} Dashboard_Clone_FromInputs */
/** @typedef {{ source: NonNullable<unknown>, target: NonNullable<unknown> }} Dashboard_Cloned_ToastInputs */
/** @typedef {{}} Dashboard_CloningInputs */
/** @typedef {{}} Dashboard_Empty_Banner_Part1Inputs */
/** @typedef {{}} Dashboard_Empty_Banner_Part2Inputs */
/** @typedef {{ message: NonNullable<unknown> }} Dashboard_Load_ErrorInputs */
/** @typedef {{}} Dashboard_LoadingInputs */
/** @typedef {{}} Dashboard_Transactions_ButtonInputs */
/** @typedef {{ count: NonNullable<unknown> }} Dashboard_Transactions_Button_CountInputs */
/** @typedef {{}} Eb_Banks_LabelInputs */
/** @typedef {{}} Eb_CaptionInputs */
/** @typedef {{}} Eb_Col_Account_NameInputs */
/** @typedef {{}} Eb_Col_InstitutionInputs */
/** @typedef {{}} Eb_Col_LogoInputs */
/** @typedef {{}} Eb_Connect_ButtonInputs */
/** @typedef {{ name: NonNullable<unknown> }} Eb_Delete_DescInputs */
/** @typedef {{}} Eb_Delete_TitleInputs */
/** @typedef {{}} Eb_Import_ButtonInputs */
/** @typedef {{}} Eb_Import_DescInputs */
/** @typedef {{}} Eb_Import_TitleInputs */
/** @typedef {{ institution: NonNullable<unknown> }} Eb_Logo_AltInputs */
/** @typedef {{}} Eb_No_Bank_SelectedInputs */
/** @typedef {{}} Eb_Select_Bank_PlaceholderInputs */
/** @typedef {{}} Eb_TitleInputs */
/** @typedef {{}} Envelopes_LeftInputs */
/** @typedef {{}} Envelopes_TitleInputs */
/** @typedef {{}} Envelopes_Update_ErrorInputs */
/** @typedef {{}} Fetcher_DescriptionInputs */
/** @typedef {{}} Fetcher_Empty_ToastInputs */
/** @typedef {{}} Fetcher_Error_ToastInputs */
/** @typedef {{}} Fetcher_Loading_AccountsInputs */
/** @typedef {{}} Fetcher_No_AccountsInputs */
/** @typedef {{}} Fetcher_SubmitInputs */
/** @typedef {{}} Fetcher_Success_ToastInputs */
/** @typedef {{}} Fetcher_TitleInputs */
/** @typedef {{}} Incomes_AddInputs */
/** @typedef {{}} Incomes_Added_ToastInputs */
/** @typedef {{}} Incomes_Delete_AriaInputs */
/** @typedef {{}} Incomes_Deleted_ToastInputs */
/** @typedef {{}} Incomes_DueInputs */
/** @typedef {{}} Incomes_Due_Date_OptionalInputs */
/** @typedef {{}} Incomes_Due_PlaceholderInputs */
/** @typedef {{}} Incomes_EditInputs */
/** @typedef {{}} Incomes_Edit_AriaInputs */
/** @typedef {{}} Incomes_EmptyInputs */
/** @typedef {{}} Incomes_ExpectedInputs */
/** @typedef {{}} Incomes_Expected_EurInputs */
/** @typedef {{}} Incomes_Name_PlaceholderInputs */
/** @typedef {{}} Incomes_Save_ErrorInputs */
/** @typedef {{}} Incomes_TitleInputs */
/** @typedef {{}} Incomes_Updated_ToastInputs */
/** @typedef {{}} Inv_Account_Added_ToastInputs */
/** @typedef {{}} Inv_Account_Delete_Confirm_DescInputs */
/** @typedef {{ name: NonNullable<unknown> }} Inv_Account_Delete_Confirm_TitleInputs */
/** @typedef {{}} Inv_Account_Deleted_ToastInputs */
/** @typedef {{}} Inv_Account_Dialog_DescInputs */
/** @typedef {{}} Inv_Account_Name_PlaceholderInputs */
/** @typedef {{}} Inv_Account_Updated_ToastInputs */
/** @typedef {{}} Inv_Add_AccountInputs */
/** @typedef {{}} Inv_Add_OperationInputs */
/** @typedef {{}} Inv_All_AccountsInputs */
/** @typedef {{}} Inv_Chart_AllocationInputs */
/** @typedef {{}} Inv_Chart_By_AccountInputs */
/** @typedef {{}} Inv_Chart_By_ClassInputs */
/** @typedef {{}} Inv_Chart_By_SecurityInputs */
/** @typedef {{}} Inv_Chart_EmptyInputs */
/** @typedef {{}} Inv_Chart_Empty_AllocationInputs */
/** @typedef {{}} Inv_Chart_EvolutionInputs */
/** @typedef {{}} Inv_Chart_InvestedInputs */
/** @typedef {{}} Inv_Chart_ValueInputs */
/** @typedef {{}} Inv_Col_AccountInputs */
/** @typedef {{}} Inv_Col_Avg_CostInputs */
/** @typedef {{}} Inv_Col_PnlInputs */
/** @typedef {{}} Inv_Col_PriceInputs */
/** @typedef {{}} Inv_Col_QuantityInputs */
/** @typedef {{}} Inv_Col_SecurityInputs */
/** @typedef {{}} Inv_Col_ValueInputs */
/** @typedef {{}} Inv_Col_WeightInputs */
/** @typedef {{}} Inv_Edit_AccountInputs */
/** @typedef {{}} Inv_Edit_OperationInputs */
/** @typedef {{}} Inv_Empty_Accounts_DescInputs */
/** @typedef {{}} Inv_Empty_Accounts_TitleInputs */
/** @typedef {{}} Inv_Empty_Positions_DescInputs */
/** @typedef {{}} Inv_Empty_Positions_TitleInputs */
/** @typedef {{}} Inv_Fortuneo_Change_TickerInputs */
/** @typedef {{}} Inv_Fortuneo_Choose_FileInputs */
/** @typedef {{}} Inv_Fortuneo_Dialog_DescInputs */
/** @typedef {{}} Inv_Fortuneo_Dialog_TitleInputs */
/** @typedef {{}} Inv_Fortuneo_Dropdown_ItemInputs */
/** @typedef {{}} Inv_Fortuneo_File_LabelInputs */
/** @typedef {{}} Inv_Fortuneo_Import_ButtonInputs */
/** @typedef {{}} Inv_Fortuneo_Import_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Inv_Fortuneo_Import_SubmitInputs */
/** @typedef {{ imported: NonNullable<unknown> }} Inv_Fortuneo_Imported_ToastInputs */
/** @typedef {{ imported: NonNullable<unknown>, skipped: NonNullable<unknown> }} Inv_Fortuneo_Imported_With_Skipped_ToastInputs */
/** @typedef {{}} Inv_Fortuneo_Mapping_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Inv_Fortuneo_Ops_CountInputs */
/** @typedef {{}} Inv_Fortuneo_Parse_ErrorInputs */
/** @typedef {{}} Inv_Fortuneo_ParsingInputs */
/** @typedef {{}} Inv_Fortuneo_Preview_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Inv_Fortuneo_Skipped_Non_TradesInputs */
/** @typedef {{ rows: NonNullable<unknown>, securities: NonNullable<unknown> }} Inv_Fortuneo_SummaryInputs */
/** @typedef {{}} Inv_Fortuneo_UnmatchedInputs */
/** @typedef {{}} Inv_Kpi_Day_ChangeInputs */
/** @typedef {{}} Inv_Kpi_Day_Change_NaInputs */
/** @typedef {{}} Inv_Kpi_InvestedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Inv_Kpi_Positions_CountInputs */
/** @typedef {{ realized: NonNullable<unknown>, dividends: NonNullable<unknown> }} Inv_Kpi_Realized_DividendsInputs */
/** @typedef {{}} Inv_Kpi_Total_ValueInputs */
/** @typedef {{}} Inv_Kpi_UnrealizedInputs */
/** @typedef {{ message: NonNullable<unknown> }} Inv_Load_ErrorInputs */
/** @typedef {{}} Inv_LoadingInputs */
/** @typedef {{}} Inv_Manual_BadgeInputs */
/** @typedef {{}} Inv_Manual_Price_ErrorInputs */
/** @typedef {{}} Inv_Manual_Price_UpdatedInputs */
/** @typedef {{}} Inv_No_Quote_BadgeInputs */
/** @typedef {{}} Inv_Op_Account_LabelInputs */
/** @typedef {{}} Inv_Op_Amount_Eur_LabelInputs */
/** @typedef {{}} Inv_Op_Asset_Class_LabelInputs */
/** @typedef {{}} Inv_Op_Date_LabelInputs */
/** @typedef {{}} Inv_Op_Dialog_DescInputs */
/** @typedef {{}} Inv_Op_Euro_Fund_HintInputs */
/** @typedef {{}} Inv_Op_Fees_LabelInputs */
/** @typedef {{}} Inv_Op_Isin_OptionalInputs */
/** @typedef {{}} Inv_Op_Manual_Name_LabelInputs */
/** @typedef {{}} Inv_Op_Manual_Name_PlaceholderInputs */
/** @typedef {{}} Inv_Op_Mode_ExistingInputs */
/** @typedef {{}} Inv_Op_Mode_ManualInputs */
/** @typedef {{}} Inv_Op_Mode_SearchInputs */
/** @typedef {{}} Inv_Op_No_ResultsInputs */
/** @typedef {{}} Inv_Op_Note_LabelInputs */
/** @typedef {{}} Inv_Op_Note_PlaceholderInputs */
/** @typedef {{}} Inv_Op_Quantity_LabelInputs */
/** @typedef {{}} Inv_Op_Search_PlaceholderInputs */
/** @typedef {{}} Inv_Op_SearchingInputs */
/** @typedef {{}} Inv_Op_Security_LabelInputs */
/** @typedef {{}} Inv_Op_Select_Security_PlaceholderInputs */
/** @typedef {{}} Inv_Op_Selected_SecurityInputs */
/** @typedef {{}} Inv_Op_Total_Eur_HintInputs */
/** @typedef {{}} Inv_Op_Total_Eur_LabelInputs */
/** @typedef {{}} Inv_Op_Type_LabelInputs */
/** @typedef {{ currency: NonNullable<unknown> }} Inv_Op_Unit_Price_LabelInputs */
/** @typedef {{}} Inv_Positions_TitleInputs */
/** @typedef {{ name: NonNullable<unknown> }} Inv_Quick_Buy_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Inv_Quotes_Missing_BannerInputs */
/** @typedef {{ time: NonNullable<unknown> }} Inv_Quotes_Updated_AtInputs */
/** @typedef {{}} Inv_Refresh_ErrorInputs */
/** @typedef {{ updated: NonNullable<unknown>, failed: NonNullable<unknown> }} Inv_Refresh_Partial_ToastInputs */
/** @typedef {{}} Inv_Refresh_QuotesInputs */
/** @typedef {{ count: NonNullable<unknown> }} Inv_Refresh_ToastInputs */
/** @typedef {{}} Inv_RefreshingInputs */
/** @typedef {{}} Inv_Tx_Added_ToastInputs */
/** @typedef {{}} Inv_Tx_Col_DateInputs */
/** @typedef {{}} Inv_Tx_Col_FeesInputs */
/** @typedef {{}} Inv_Tx_Col_NoteInputs */
/** @typedef {{}} Inv_Tx_Col_Total_EurInputs */
/** @typedef {{}} Inv_Tx_Col_TypeInputs */
/** @typedef {{}} Inv_Tx_Col_Unit_PriceInputs */
/** @typedef {{}} Inv_Tx_Delete_ErrorInputs */
/** @typedef {{}} Inv_Tx_Deleted_ToastInputs */
/** @typedef {{}} Inv_Tx_EmptyInputs */
/** @typedef {{}} Inv_Tx_TitleInputs */
/** @typedef {{}} Inv_Tx_Type_BuyInputs */
/** @typedef {{}} Inv_Tx_Type_DividendInputs */
/** @typedef {{}} Inv_Tx_Type_InterestInputs */
/** @typedef {{}} Inv_Tx_Type_SellInputs */
/** @typedef {{}} Inv_Tx_Updated_ToastInputs */
/** @typedef {{}} Mapping_Col_ExcludeInputs */
/** @typedef {{}} Mapping_Col_From_NameInputs */
/** @typedef {{}} Mapping_Col_From_PriceInputs */
/** @typedef {{}} Mapping_Col_ModeInputs */
/** @typedef {{}} Mapping_Col_To_CategoryInputs */
/** @typedef {{}} Mapping_Col_To_NameInputs */
/** @typedef {{}} Mapping_Create_ButtonInputs */
/** @typedef {{}} Mapping_Create_DescInputs */
/** @typedef {{}} Mapping_Create_TitleInputs */
/** @typedef {{}} Mapping_Delete_DescInputs */
/** @typedef {{}} Mapping_Delete_TitleInputs */
/** @typedef {{}} Mapping_Edit_TitleInputs */
/** @typedef {{}} Mapping_Export_ButtonInputs */
/** @typedef {{ count: NonNullable<unknown> }} Mapping_Export_Copied_Desc_PluralInputs */
/** @typedef {{ count: NonNullable<unknown> }} Mapping_Export_Copied_Desc_SingularInputs */
/** @typedef {{}} Mapping_Export_Copied_ToastInputs */
/** @typedef {{}} Mapping_Export_CopyInputs */
/** @typedef {{}} Mapping_Export_Copy_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Mapping_Export_Desc_PluralInputs */
/** @typedef {{ count: NonNullable<unknown> }} Mapping_Export_Desc_SingularInputs */
/** @typedef {{}} Mapping_Export_DownloadInputs */
/** @typedef {{}} Mapping_Export_Downloaded_ToastInputs */
/** @typedef {{}} Mapping_Export_TitleInputs */
/** @typedef {{}} Mapping_Form_Category_DescInputs */
/** @typedef {{}} Mapping_Form_Category_PlaceholderInputs */
/** @typedef {{}} Mapping_Form_Create_ErrorInputs */
/** @typedef {{}} Mapping_Form_Created_ToastInputs */
/** @typedef {{}} Mapping_Form_Edit_ErrorInputs */
/** @typedef {{}} Mapping_Form_Edited_ToastInputs */
/** @typedef {{}} Mapping_Form_From_NameInputs */
/** @typedef {{}} Mapping_Form_From_Name_DescInputs */
/** @typedef {{}} Mapping_Form_From_Name_PlaceholderInputs */
/** @typedef {{}} Mapping_Form_From_Price_DescInputs */
/** @typedef {{}} Mapping_Form_From_Price_PlaceholderInputs */
/** @typedef {{}} Mapping_Form_Mode_PlaceholderInputs */
/** @typedef {{}} Mapping_Form_Share_AutoInputs */
/** @typedef {{}} Mapping_Form_Share_DescInputs */
/** @typedef {{}} Mapping_Form_To_NameInputs */
/** @typedef {{}} Mapping_Form_To_Name_DescInputs */
/** @typedef {{}} Mapping_Form_To_Name_PlaceholderInputs */
/** @typedef {{}} Mapping_Import_ButtonInputs */
/** @typedef {{}} Mapping_Import_DescInputs */
/** @typedef {{}} Mapping_Import_TitleInputs */
/** @typedef {{ message: NonNullable<unknown> }} Mapping_Load_ErrorInputs */
/** @typedef {{}} Mapping_LoadingInputs */
/** @typedef {{}} Mapping_Mode_DefaultInputs */
/** @typedef {{}} Mapping_Mode_Default_DescInputs */
/** @typedef {{}} Mapping_Mode_Exact_NameInputs */
/** @typedef {{}} Mapping_Mode_Exact_Name_DescInputs */
/** @typedef {{}} Mapping_Mode_Exact_Name_PriceInputs */
/** @typedef {{}} Mapping_Mode_Exact_Name_Price_DescInputs */
/** @typedef {{}} Mapping_Mode_UnknownInputs */
/** @typedef {{}} Mapping_Search_PlaceholderInputs */
/** @typedef {{}} Mapping_Table_CaptionInputs */
/** @typedef {{}} Mapping_TitleInputs */
/** @typedef {{}} Mapping_Validation_From_Name_EmptyInputs */
/** @typedef {{}} Mapping_Validation_From_Name_RequiredInputs */
/** @typedef {{}} Mapping_Validation_To_Category_EmptyInputs */
/** @typedef {{}} Mapping_Validation_To_Category_RequiredInputs */
/** @typedef {{}} Mapping_Validation_To_Name_EmptyInputs */
/** @typedef {{}} Mapping_Validation_To_Name_RequiredInputs */
/** @typedef {{}} Month_Clone_DescriptionInputs */
/** @typedef {{}} Month_Clone_From_LabelInputs */
/** @typedef {{}} Month_Clone_SubmitInputs */
/** @typedef {{ source: NonNullable<unknown>, target: NonNullable<unknown> }} Month_Cloned_ToastInputs */
/** @typedef {{}} Month_Create_ErrorInputs */
/** @typedef {{}} Month_Create_SubmitInputs */
/** @typedef {{ target: NonNullable<unknown> }} Month_Created_ToastInputs */
/** @typedef {{}} Month_CreatingInputs */
/** @typedef {{}} Month_Dialog_DescriptionInputs */
/** @typedef {{}} Month_Dialog_TitleInputs */
/** @typedef {{}} Month_Invalid_ErrorInputs */
/** @typedef {{}} Month_New_Or_Clone_ButtonInputs */
/** @typedef {{}} Month_NextInputs */
/** @typedef {{}} Month_PreviousInputs */
/** @typedef {{}} Month_Start_BlankInputs */
/** @typedef {{}} Month_Target_LabelInputs */
/** @typedef {{}} Nav_AssetsInputs */
/** @typedef {{}} Nav_BudgetInputs */
/** @typedef {{}} Nav_ImportInputs */
/** @typedef {{}} Nav_LanguageInputs */
/** @typedef {{}} Nav_SettingsInputs */
/** @typedef {{}} Nav_Switch_LanguageInputs */
/** @typedef {{}} Nav_TransactionsInputs */
/** @typedef {{}} Overview_Allocation_EmptyInputs */
/** @typedef {{}} Overview_Allocation_TitleInputs */
/** @typedef {{}} Overview_Class_CashInputs */
/** @typedef {{}} Overview_Evolution_EmptyInputs */
/** @typedef {{}} Overview_Evolution_TitleInputs */
/** @typedef {{}} Overview_Go_To_SavingsInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Overview_Invested_SubInputs */
/** @typedef {{}} Overview_InvestmentsInputs */
/** @typedef {{ percent: NonNullable<unknown> }} Overview_Investments_SubInputs */
/** @typedef {{}} Overview_Liquid_SavingsInputs */
/** @typedef {{ percent: NonNullable<unknown> }} Overview_Liquid_Savings_SubInputs */
/** @typedef {{ count: NonNullable<unknown>, month: NonNullable<unknown> }} Overview_Missing_Snapshots_NoticeInputs */
/** @typedef {{}} Overview_Mode_ClassesInputs */
/** @typedef {{}} Overview_Mode_EnvelopesInputs */
/** @typedef {{}} Overview_Net_WorthInputs */
/** @typedef {{}} Overview_Net_Worth_SubInputs */
/** @typedef {{}} Overview_Unrealized_GainInputs */
/** @typedef {{}} Parser_DescriptionInputs */
/** @typedef {{}} Parser_Error_ToastInputs */
/** @typedef {{}} Parser_File_DescInputs */
/** @typedef {{}} Parser_File_InvalidInputs */
/** @typedef {{}} Parser_File_LabelInputs */
/** @typedef {{}} Parser_File_Mime_InvalidInputs */
/** @typedef {{ name: NonNullable<unknown>, sizeKb: NonNullable<unknown> }} Parser_File_SelectedInputs */
/** @typedef {{}} Parser_No_File_ToastInputs */
/** @typedef {{}} Parser_Process_Error_ToastInputs */
/** @typedef {{}} Parser_Provider_DescInputs */
/** @typedef {{}} Parser_Provider_InvalidInputs */
/** @typedef {{}} Parser_Provider_LabelInputs */
/** @typedef {{}} Parser_Provider_PlaceholderInputs */
/** @typedef {{}} Parser_Read_Error_ToastInputs */
/** @typedef {{}} Parser_SubmitInputs */
/** @typedef {{ count: NonNullable<unknown> }} Parser_Success_DescInputs */
/** @typedef {{}} Parser_Success_ToastInputs */
/** @typedef {{}} Parser_TitleInputs */
/** @typedef {{}} Pm_CaptionInputs */
/** @typedef {{}} Pm_Create_ButtonInputs */
/** @typedef {{}} Pm_Create_TitleInputs */
/** @typedef {{}} Pm_Created_ToastInputs */
/** @typedef {{ label: NonNullable<unknown> }} Pm_Delete_DescInputs */
/** @typedef {{}} Pm_Delete_TitleInputs */
/** @typedef {{}} Pm_Dialog_DescInputs */
/** @typedef {{}} Pm_Edit_TitleInputs */
/** @typedef {{}} Pm_Load_ErrorInputs */
/** @typedef {{}} Pm_LoadingInputs */
/** @typedef {{}} Pm_Save_ErrorInputs */
/** @typedef {{}} Pm_Slug_DescInputs */
/** @typedef {{}} Pm_TitleInputs */
/** @typedef {{}} Pm_Updated_ToastInputs */
/** @typedef {{}} Results_All_MonthsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Results_Already_Imported_SuffixInputs */
/** @typedef {{}} Results_Badge_DisabledInputs */
/** @typedef {{}} Results_Badge_ImportedInputs */
/** @typedef {{}} Results_Col_MethodInputs */
/** @typedef {{}} Results_Col_Select_AllInputs */
/** @typedef {{}} Results_Col_Select_RowInputs */
/** @typedef {{ count: NonNullable<unknown> }} Results_Copied_PluralInputs */
/** @typedef {{ count: NonNullable<unknown> }} Results_Copied_SingularInputs */
/** @typedef {{}} Results_Copied_TitleInputs */
/** @typedef {{}} Results_Copy_CsvInputs */
/** @typedef {{}} Results_Copy_Error_DescInputs */
/** @typedef {{}} Results_Copy_Error_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Results_Disabled_SuffixInputs */
/** @typedef {{}} Results_Empty_DescInputs */
/** @typedef {{}} Results_Empty_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Results_Import_ButtonInputs */
/** @typedef {{}} Results_Import_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Results_Imported_PluralInputs */
/** @typedef {{ count: NonNullable<unknown> }} Results_Imported_SingularInputs */
/** @typedef {{}} Results_No_ResultsInputs */
/** @typedef {{}} Results_No_Selection_DescInputs */
/** @typedef {{}} Results_No_Selection_TitleInputs */
/** @typedef {{}} Results_Raw_Data_AriaInputs */
/** @typedef {{ externalId: NonNullable<unknown> }} Results_Raw_Data_DescInputs */
/** @typedef {{ count: NonNullable<unknown> }} Results_Selected_For_ImportInputs */
/** @typedef {{ count: NonNullable<unknown> }} Results_Skipped_SuffixInputs */
/** @typedef {{}} Results_TitleInputs */
/** @typedef {{}} Savings_AddInputs */
/** @typedef {{}} Savings_Added_ToastInputs */
/** @typedef {{}} Savings_Delete_AriaInputs */
/** @typedef {{}} Savings_Deleted_ToastInputs */
/** @typedef {{}} Savings_EditInputs */
/** @typedef {{}} Savings_Edit_AriaInputs */
/** @typedef {{}} Savings_EmptyInputs */
/** @typedef {{}} Savings_Name_PlaceholderInputs */
/** @typedef {{}} Savings_Save_ErrorInputs */
/** @typedef {{}} Savings_TitleInputs */
/** @typedef {{}} Savings_Updated_ToastInputs */
/** @typedef {{}} Settings_TitleInputs */
/** @typedef {{}} Share_Presets_CaptionInputs */
/** @typedef {{}} Share_Presets_Col_PercentageInputs */
/** @typedef {{}} Share_Presets_Col_PreviewInputs */
/** @typedef {{}} Share_Presets_Create_ButtonInputs */
/** @typedef {{}} Share_Presets_Create_TitleInputs */
/** @typedef {{}} Share_Presets_Created_ToastInputs */
/** @typedef {{ label: NonNullable<unknown>, percent: NonNullable<unknown> }} Share_Presets_Delete_DescInputs */
/** @typedef {{}} Share_Presets_Delete_TitleInputs */
/** @typedef {{}} Share_Presets_Deleted_ToastInputs */
/** @typedef {{}} Share_Presets_Dialog_DescInputs */
/** @typedef {{}} Share_Presets_Edit_TitleInputs */
/** @typedef {{}} Share_Presets_Label_DescInputs */
/** @typedef {{}} Share_Presets_Label_PlaceholderInputs */
/** @typedef {{}} Share_Presets_Load_ErrorInputs */
/** @typedef {{}} Share_Presets_LoadingInputs */
/** @typedef {{}} Share_Presets_Order_DescInputs */
/** @typedef {{}} Share_Presets_Percent_DescInputs */
/** @typedef {{}} Share_Presets_Percent_LabelInputs */
/** @typedef {{}} Share_Presets_Save_ErrorInputs */
/** @typedef {{}} Share_Presets_TitleInputs */
/** @typedef {{}} Share_Presets_Updated_ToastInputs */
/** @typedef {{}} St_Avg_MoInputs */
/** @typedef {{}} St_Bill_Name_PlaceholderInputs */
/** @typedef {{}} St_CaptionInputs */
/** @typedef {{}} St_Cat_Ids_LabelInputs */
/** @typedef {{}} St_Cat_Ids_PlaceholderInputs */
/** @typedef {{}} St_Col_Bill_NameInputs */
/** @typedef {{}} St_Col_Pm_IdsInputs */
/** @typedef {{}} St_Create_ButtonInputs */
/** @typedef {{}} St_Create_TitleInputs */
/** @typedef {{ name: NonNullable<unknown> }} St_Delete_DescInputs */
/** @typedef {{}} St_Delete_TitleInputs */
/** @typedef {{}} St_DescriptionInputs */
/** @typedef {{}} St_Dialog_DescInputs */
/** @typedef {{}} St_Edit_TitleInputs */
/** @typedef {{}} St_EmptyInputs */
/** @typedef {{}} St_Enabled_LabelInputs */
/** @typedef {{}} St_Env_Hint_AndInputs */
/** @typedef {{}} St_Env_Hint_PrefixInputs */
/** @typedef {{}} St_Env_Hint_SuffixInputs */
/** @typedef {{}} St_Next_MonthInputs */
/** @typedef {{}} St_Pm_Ids_LabelInputs */
/** @typedef {{}} St_Pm_Ids_PlaceholderInputs */
/** @typedef {{ currency: NonNullable<unknown> }} St_Response_TitleInputs */
/** @typedef {{}} St_Rule_Created_ToastInputs */
/** @typedef {{}} St_Rule_Deleted_ToastInputs */
/** @typedef {{}} St_Rule_Updated_ToastInputs */
/** @typedef {{}} St_Share_DescInputs */
/** @typedef {{}} St_Status_ConnectedInputs */
/** @typedef {{}} St_Status_Not_ConfiguredInputs */
/** @typedef {{}} St_Test_ButtonInputs */
/** @typedef {{}} St_Test_FailedInputs */
/** @typedef {{}} St_TestingInputs */
/** @typedef {{}} St_This_MonthInputs */
/** @typedef {{}} St_TitleInputs */
/** @typedef {{}} Subtracker_Apply_SyncInputs */
/** @typedef {{}} Subtracker_Col_BillInputs */
/** @typedef {{}} Subtracker_Fetch_ErrorInputs */
/** @typedef {{}} Subtracker_FetchingInputs */
/** @typedef {{}} Subtracker_Metric_LabelInputs */
/** @typedef {{}} Subtracker_Metric_Monthly_AvgInputs */
/** @typedef {{}} Subtracker_Metric_Next_MonthInputs */
/** @typedef {{}} Subtracker_Metric_This_MonthInputs */
/** @typedef {{ month: NonNullable<unknown> }} Subtracker_Metric_WarningInputs */
/** @typedef {{}} Subtracker_No_RulesInputs */
/** @typedef {{}} Subtracker_Status_NewInputs */
/** @typedef {{}} Subtracker_Status_SameInputs */
/** @typedef {{}} Subtracker_Status_UpdateInputs */
/** @typedef {{}} Subtracker_Sync_ButtonInputs */
/** @typedef {{ summary: NonNullable<unknown> }} Subtracker_Sync_Complete_ToastInputs */
/** @typedef {{ count: NonNullable<unknown> }} Subtracker_Sync_CreatedInputs */
/** @typedef {{ month: NonNullable<unknown> }} Subtracker_Sync_DescriptionInputs */
/** @typedef {{}} Subtracker_Sync_ErrorInputs */
/** @typedef {{}} Subtracker_Sync_No_ChangesInputs */
/** @typedef {{}} Subtracker_Sync_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Subtracker_Sync_UnchangedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Subtracker_Sync_UpdatedInputs */
/** @typedef {{}} Subtracker_SyncingInputs */
/** @typedef {{}} Summary_Bills_ShareInputs */
/** @typedef {{}} Summary_Expenses_ShareInputs */
/** @typedef {{}} Summary_IncomeInputs */
/** @typedef {{}} Summary_RemainingInputs */
/** @typedef {{}} Summary_SavingsInputs */
/** @typedef {{}} Summary_SectionInputs */
/** @typedef {{}} Summary_TitleInputs */
/** @typedef {{}} Tx_AddInputs */
/** @typedef {{}} Tx_Added_ToastInputs */
/** @typedef {{}} Tx_Amount_EurInputs */
/** @typedef {{}} Tx_Amount_HintInputs */
/** @typedef {{}} Tx_Budget_MonthInputs */
/** @typedef {{}} Tx_Clear_FiltersInputs */
/** @typedef {{ count: NonNullable<unknown> }} Tx_Count_PluralInputs */
/** @typedef {{ count: NonNullable<unknown> }} Tx_Count_SingularInputs */
/** @typedef {{}} Tx_Create_Mapping_TitleInputs */
/** @typedef {{ name: NonNullable<unknown>, amount: NonNullable<unknown> }} Tx_Delete_Confirm_DescInputs */
/** @typedef {{}} Tx_Delete_Confirm_TitleInputs */
/** @typedef {{}} Tx_Delete_ErrorInputs */
/** @typedef {{}} Tx_Delete_TitleInputs */
/** @typedef {{}} Tx_Deleted_ToastInputs */
/** @typedef {{}} Tx_Dialog_DescriptionInputs */
/** @typedef {{}} Tx_EditInputs */
/** @typedef {{}} Tx_Edit_TitleInputs */
/** @typedef {{}} Tx_Empty_BeforeInputs */
/** @typedef {{}} Tx_Exclude_ActionInputs */
/** @typedef {{}} Tx_Excluded_BadgeInputs */
/** @typedef {{}} Tx_Filter_All_CategoriesInputs */
/** @typedef {{}} Tx_Filter_All_MethodsInputs */
/** @typedef {{}} Tx_Filter_All_SharesInputs */
/** @typedef {{}} Tx_Filter_Custom_ShareInputs */
/** @typedef {{}} Tx_Filter_No_MethodInputs */
/** @typedef {{}} Tx_Gross_LabelInputs */
/** @typedef {{}} Tx_Include_ActionInputs */
/** @typedef {{}} Tx_Load_ErrorInputs */
/** @typedef {{}} Tx_LoadingInputs */
/** @typedef {{}} Tx_Name_PlaceholderInputs */
/** @typedef {{}} Tx_Save_ErrorInputs */
/** @typedef {{}} Tx_Search_PlaceholderInputs */
/** @typedef {{}} Tx_Share_PercentInputs */
/** @typedef {{}} Tx_Show_ExcludedInputs */
/** @typedef {{}} Tx_Update_ErrorInputs */
/** @typedef {{}} Tx_Updated_ToastInputs */
/** @typedef {{}} Tx_Your_Share_LabelInputs */
import * as __en from "./en.js"
import * as __fr from "./fr.js"
/**
* | output |
* | --- |
* | "Checking" |
*
* @param {Account_Type_CheckingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const account_type_checking = /** @type {((inputs?: Account_Type_CheckingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Account_Type_CheckingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.account_type_checking(inputs)
	return __en.account_type_checking(inputs)
});
/**
* | output |
* | --- |
* | "Investment" |
*
* @param {Account_Type_InvestmentInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const account_type_investment = /** @type {((inputs?: Account_Type_InvestmentInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Account_Type_InvestmentInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.account_type_investment(inputs)
	return __en.account_type_investment(inputs)
});
/**
* | output |
* | --- |
* | "Joint" |
*
* @param {Account_Type_JointInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const account_type_joint = /** @type {((inputs?: Account_Type_JointInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Account_Type_JointInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.account_type_joint(inputs)
	return __en.account_type_joint(inputs)
});
/**
* | output |
* | --- |
* | "Other" |
*
* @param {Account_Type_OtherInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const account_type_other = /** @type {((inputs?: Account_Type_OtherInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Account_Type_OtherInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.account_type_other(inputs)
	return __en.account_type_other(inputs)
});
/**
* | output |
* | --- |
* | "Savings" |
*
* @param {Account_Type_SavingsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const account_type_savings = /** @type {((inputs?: Account_Type_SavingsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Account_Type_SavingsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.account_type_savings(inputs)
	return __en.account_type_savings(inputs)
});
/**
* | output |
* | --- |
* | "Bank & investment accounts used as source accounts for bills" |
*
* @param {Accounts_CaptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_caption = /** @type {((inputs?: Accounts_CaptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_CaptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_caption(inputs)
	return __en.accounts_caption(inputs)
});
/**
* | output |
* | --- |
* | "Create Account" |
*
* @param {Accounts_Create_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_create_button = /** @type {((inputs?: Accounts_Create_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Create_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_create_button(inputs)
	return __en.accounts_create_button(inputs)
});
/**
* | output |
* | --- |
* | "Create account" |
*
* @param {Accounts_Create_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_create_title = /** @type {((inputs?: Accounts_Create_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Create_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_create_title(inputs)
	return __en.accounts_create_title(inputs)
});
/**
* | output |
* | --- |
* | "Account created" |
*
* @param {Accounts_Created_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_created_toast = /** @type {((inputs?: Accounts_Created_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Created_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_created_toast(inputs)
	return __en.accounts_created_toast(inputs)
});
/**
* | output |
* | --- |
* | "Delete \"{name}\"? Bills referencing it will keep their amounts with an empty source account." |
*
* @param {Accounts_Delete_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_delete_desc = /** @type {((inputs: Accounts_Delete_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Delete_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_delete_desc(inputs)
	return __en.accounts_delete_desc(inputs)
});
/**
* | output |
* | --- |
* | "Delete Account" |
*
* @param {Accounts_Delete_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_delete_title = /** @type {((inputs?: Accounts_Delete_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Delete_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_delete_title(inputs)
	return __en.accounts_delete_title(inputs)
});
/**
* | output |
* | --- |
* | "Bank and investment accounts used as bill sources and future balance snapshots." |
*
* @param {Accounts_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_dialog_desc = /** @type {((inputs?: Accounts_Dialog_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Dialog_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_dialog_desc(inputs)
	return __en.accounts_dialog_desc(inputs)
});
/**
* | output |
* | --- |
* | "Edit account" |
*
* @param {Accounts_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_edit_title = /** @type {((inputs?: Accounts_Edit_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Edit_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_edit_title(inputs)
	return __en.accounts_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "Error loading accounts." |
*
* @param {Accounts_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_load_error = /** @type {((inputs?: Accounts_Load_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Load_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_load_error(inputs)
	return __en.accounts_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Loading accounts..." |
*
* @param {Accounts_LoadingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_loading = /** @type {((inputs?: Accounts_LoadingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_LoadingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_loading(inputs)
	return __en.accounts_loading(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save account" |
*
* @param {Accounts_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_save_error = /** @type {((inputs?: Accounts_Save_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Save_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_save_error(inputs)
	return __en.accounts_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Unique identifier for this account." |
*
* @param {Accounts_Slug_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_slug_desc = /** @type {((inputs?: Accounts_Slug_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Slug_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_slug_desc(inputs)
	return __en.accounts_slug_desc(inputs)
});
/**
* | output |
* | --- |
* | "Accounts" |
*
* @param {Accounts_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_title = /** @type {((inputs?: Accounts_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_title(inputs)
	return __en.accounts_title(inputs)
});
/**
* | output |
* | --- |
* | "Account updated" |
*
* @param {Accounts_Updated_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const accounts_updated_toast = /** @type {((inputs?: Accounts_Updated_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Accounts_Updated_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.accounts_updated_toast(inputs)
	return __en.accounts_updated_toast(inputs)
});
/**
* | output |
* | --- |
* | "Page not found" |
*
* @param {App_Not_FoundInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const app_not_found = /** @type {((inputs?: App_Not_FoundInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<App_Not_FoundInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.app_not_found(inputs)
	return __en.app_not_found(inputs)
});
/**
* | output |
* | --- |
* | "Budget" |
*
* @param {App_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const app_title = /** @type {((inputs?: App_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<App_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.app_title(inputs)
	return __en.app_title(inputs)
});
/**
* | output |
* | --- |
* | "Bond" |
*
* @param {Asset_Class_BondInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const asset_class_bond = /** @type {((inputs?: Asset_Class_BondInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Asset_Class_BondInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.asset_class_bond(inputs)
	return __en.asset_class_bond(inputs)
});
/**
* | output |
* | --- |
* | "Crypto" |
*
* @param {Asset_Class_CryptoInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const asset_class_crypto = /** @type {((inputs?: Asset_Class_CryptoInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Asset_Class_CryptoInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.asset_class_crypto(inputs)
	return __en.asset_class_crypto(inputs)
});
/**
* | output |
* | --- |
* | "ETF" |
*
* @param {Asset_Class_EtfInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const asset_class_etf = /** @type {((inputs?: Asset_Class_EtfInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Asset_Class_EtfInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.asset_class_etf(inputs)
	return __en.asset_class_etf(inputs)
});
/**
* | output |
* | --- |
* | "Euro Fund" |
*
* @param {Asset_Class_Euro_FundInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const asset_class_euro_fund = /** @type {((inputs?: Asset_Class_Euro_FundInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Asset_Class_Euro_FundInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.asset_class_euro_fund(inputs)
	return __en.asset_class_euro_fund(inputs)
});
/**
* | output |
* | --- |
* | "Other" |
*
* @param {Asset_Class_OtherInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const asset_class_other = /** @type {((inputs?: Asset_Class_OtherInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Asset_Class_OtherInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.asset_class_other(inputs)
	return __en.asset_class_other(inputs)
});
/**
* | output |
* | --- |
* | "SCPI" |
*
* @param {Asset_Class_ScpiInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const asset_class_scpi = /** @type {((inputs?: Asset_Class_ScpiInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Asset_Class_ScpiInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.asset_class_scpi(inputs)
	return __en.asset_class_scpi(inputs)
});
/**
* | output |
* | --- |
* | "Stock" |
*
* @param {Asset_Class_StockInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const asset_class_stock = /** @type {((inputs?: Asset_Class_StockInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Asset_Class_StockInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.asset_class_stock(inputs)
	return __en.asset_class_stock(inputs)
});
/**
* | output |
* | --- |
* | "Add Savings Account" |
*
* @param {Assets_Account_Add_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_account_add_title = /** @type {((inputs?: Assets_Account_Add_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Account_Add_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_account_add_title(inputs)
	return __en.assets_account_add_title(inputs)
});
/**
* | output |
* | --- |
* | "Savings account added" |
*
* @param {Assets_Account_Added_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_account_added_toast = /** @type {((inputs?: Assets_Account_Added_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Account_Added_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_account_added_toast(inputs)
	return __en.assets_account_added_toast(inputs)
});
/**
* | output |
* | --- |
* | "Choose color {color}" |
*
* @param {Assets_Account_Choose_ColorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_account_choose_color = /** @type {((inputs: Assets_Account_Choose_ColorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Account_Choose_ColorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_account_choose_color(inputs)
	return __en.assets_account_choose_color(inputs)
});
/**
* | output |
* | --- |
* | "Failed to delete account" |
*
* @param {Assets_Account_Delete_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_account_delete_error = /** @type {((inputs?: Assets_Account_Delete_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Account_Delete_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_account_delete_error(inputs)
	return __en.assets_account_delete_error(inputs)
});
/**
* | output |
* | --- |
* | "Savings account deleted" |
*
* @param {Assets_Account_Deleted_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_account_deleted_toast = /** @type {((inputs?: Assets_Account_Deleted_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Account_Deleted_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_account_deleted_toast(inputs)
	return __en.assets_account_deleted_toast(inputs)
});
/**
* | output |
* | --- |
* | "Track livrets, Revolut pockets, or cash-equivalent savings accounts via monthly snapshots." |
*
* @param {Assets_Account_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_account_dialog_desc = /** @type {((inputs?: Assets_Account_Dialog_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Account_Dialog_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_account_dialog_desc(inputs)
	return __en.assets_account_dialog_desc(inputs)
});
/**
* | output |
* | --- |
* | "Edit Savings Account" |
*
* @param {Assets_Account_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_account_edit_title = /** @type {((inputs?: Assets_Account_Edit_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Account_Edit_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_account_edit_title(inputs)
	return __en.assets_account_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "Identifier: {slug}" |
*
* @param {Assets_Account_IdentifierInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_account_identifier = /** @type {((inputs: Assets_Account_IdentifierInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Account_IdentifierInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_account_identifier(inputs)
	return __en.assets_account_identifier(inputs)
});
/**
* | output |
* | --- |
* | "Revolut - Pocket Travel, SG - Livret A, Linxea - Fonds Euros..." |
*
* @param {Assets_Account_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_account_name_placeholder = /** @type {((inputs?: Assets_Account_Name_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Account_Name_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_account_name_placeholder(inputs)
	return __en.assets_account_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Savings account updated" |
*
* @param {Assets_Account_Updated_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_account_updated_toast = /** @type {((inputs?: Assets_Account_Updated_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Account_Updated_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_account_updated_toast(inputs)
	return __en.assets_account_updated_toast(inputs)
});
/**
* | output |
* | --- |
* | "Add Account" |
*
* @param {Assets_Add_AccountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_add_account = /** @type {((inputs?: Assets_Add_AccountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Add_AccountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_add_account(inputs)
	return __en.assets_add_account(inputs)
});
/**
* | output |
* | --- |
* | "Add Savings Account" |
*
* @param {Assets_Add_Savings_AccountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_add_savings_account = /** @type {((inputs?: Assets_Add_Savings_AccountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Add_Savings_AccountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_add_savings_account(inputs)
	return __en.assets_add_savings_account(inputs)
});
/**
* | output |
* | --- |
* | "Missing" |
*
* @param {Assets_Badge_MissingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_badge_missing = /** @type {((inputs?: Assets_Badge_MissingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Badge_MissingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_badge_missing(inputs)
	return __en.assets_badge_missing(inputs)
});
/**
* | output |
* | --- |
* | "Balance for {name}" |
*
* @param {Assets_Bulk_Balance_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_balance_aria = /** @type {((inputs: Assets_Bulk_Balance_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_Balance_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_balance_aria(inputs)
	return __en.assets_bulk_balance_aria(inputs)
});
/**
* | output |
* | --- |
* | "Click to copy previous balance" |
*
* @param {Assets_Bulk_Copy_Prev_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_copy_prev_title = /** @type {((inputs?: Assets_Bulk_Copy_Prev_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_Copy_Prev_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_copy_prev_title(inputs)
	return __en.assets_bulk_copy_prev_title(inputs)
});
/**
* | output |
* | --- |
* | "Enter the current balance for each savings account. Leave a field blank to skip it for now." |
*
* @param {Assets_Bulk_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_desc = /** @type {((inputs?: Assets_Bulk_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_desc(inputs)
	return __en.assets_bulk_desc(inputs)
});
/**
* | output |
* | --- |
* | "Note for {name}" |
*
* @param {Assets_Bulk_Note_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_note_aria = /** @type {((inputs: Assets_Bulk_Note_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_Note_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_note_aria(inputs)
	return __en.assets_bulk_note_aria(inputs)
});
/**
* | output |
* | --- |
* | "Optional note (e.g. interest, transfer)" |
*
* @param {Assets_Bulk_Note_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_note_placeholder = /** @type {((inputs?: Assets_Bulk_Note_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_Note_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_note_placeholder(inputs)
	return __en.assets_bulk_note_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Pre-fill empty from previous" |
*
* @param {Assets_Bulk_PrefillInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_prefill = /** @type {((inputs?: Assets_Bulk_PrefillInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_PrefillInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_prefill(inputs)
	return __en.assets_bulk_prefill(inputs)
});
/**
* | output |
* | --- |
* | "Prev ({month}): {amount}" |
*
* @param {Assets_Bulk_Prev_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_prev_label = /** @type {((inputs: Assets_Bulk_Prev_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_Prev_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_prev_label(inputs)
	return __en.assets_bulk_prev_label(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save snapshots" |
*
* @param {Assets_Bulk_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_save_error = /** @type {((inputs?: Assets_Bulk_Save_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_Save_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_save_error(inputs)
	return __en.assets_bulk_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Save {count} balances" |
*
* @param {Assets_Bulk_Save_ManyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_save_many = /** @type {((inputs: Assets_Bulk_Save_ManyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_Save_ManyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_save_many(inputs)
	return __en.assets_bulk_save_many(inputs)
});
/**
* | output |
* | --- |
* | "Save 1 balance" |
*
* @param {Assets_Bulk_Save_OneInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_save_one = /** @type {((inputs?: Assets_Bulk_Save_OneInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_Save_OneInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_save_one(inputs)
	return __en.assets_bulk_save_one(inputs)
});
/**
* | output |
* | --- |
* | "Saved {count} snapshots for {month}" |
*
* @param {Assets_Bulk_Saved_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_saved_toast = /** @type {((inputs: Assets_Bulk_Saved_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_Saved_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_saved_toast(inputs)
	return __en.assets_bulk_saved_toast(inputs)
});
/**
* | output |
* | --- |
* | "Saved 1 snapshot for {month}" |
*
* @param {Assets_Bulk_Saved_Toast_OneInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_saved_toast_one = /** @type {((inputs: Assets_Bulk_Saved_Toast_OneInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_Saved_Toast_OneInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_saved_toast_one(inputs)
	return __en.assets_bulk_saved_toast_one(inputs)
});
/**
* | output |
* | --- |
* | "Fill Balances — {month}" |
*
* @param {Assets_Bulk_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_bulk_title = /** @type {((inputs: Assets_Bulk_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Bulk_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_bulk_title(inputs)
	return __en.assets_bulk_title(inputs)
});
/**
* | output |
* | --- |
* | "Carry over previous balance for {name}" |
*
* @param {Assets_Carry_Over_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_carry_over_aria = /** @type {((inputs: Assets_Carry_Over_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Carry_Over_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_carry_over_aria(inputs)
	return __en.assets_carry_over_aria(inputs)
});
/**
* | output |
* | --- |
* | "Failed to carry over balances" |
*
* @param {Assets_Carry_Over_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_carry_over_error = /** @type {((inputs?: Assets_Carry_Over_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Carry_Over_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_carry_over_error(inputs)
	return __en.assets_carry_over_error(inputs)
});
/**
* | output |
* | --- |
* | "Carry over previous" |
*
* @param {Assets_Carry_Over_PreviousInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_carry_over_previous = /** @type {((inputs?: Assets_Carry_Over_PreviousInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Carry_Over_PreviousInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_carry_over_previous(inputs)
	return __en.assets_carry_over_previous(inputs)
});
/**
* | output |
* | --- |
* | "Carry over {amount}" |
*
* @param {Assets_Carry_Over_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_carry_over_title = /** @type {((inputs: Assets_Carry_Over_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Carry_Over_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_carry_over_title(inputs)
	return __en.assets_carry_over_title(inputs)
});
/**
* | output |
* | --- |
* | "Carried over {count} balances to {month}" |
*
* @param {Assets_Carry_Over_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_carry_over_toast = /** @type {((inputs: Assets_Carry_Over_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Carry_Over_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_carry_over_toast(inputs)
	return __en.assets_carry_over_toast(inputs)
});
/**
* | output |
* | --- |
* | "Carried over 1 balance to {month}" |
*
* @param {Assets_Carry_Over_Toast_OneInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_carry_over_toast_one = /** @type {((inputs: Assets_Carry_Over_Toast_OneInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Carry_Over_Toast_OneInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_carry_over_toast_one(inputs)
	return __en.assets_carry_over_toast_one(inputs)
});
/**
* | output |
* | --- |
* | "Allocation" |
*
* @param {Assets_Chart_AllocationInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_chart_allocation = /** @type {((inputs?: Assets_Chart_AllocationInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Chart_AllocationInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_chart_allocation(inputs)
	return __en.assets_chart_allocation(inputs)
});
/**
* | output |
* | --- |
* | "Add balances to see your allocation across savings accounts." |
*
* @param {Assets_Chart_Empty_AllocationInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_chart_empty_allocation = /** @type {((inputs?: Assets_Chart_Empty_AllocationInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Chart_Empty_AllocationInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_chart_empty_allocation(inputs)
	return __en.assets_chart_empty_allocation(inputs)
});
/**
* | output |
* | --- |
* | "Record your first balance snapshot to see your savings evolution over time." |
*
* @param {Assets_Chart_Empty_EvolutionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_chart_empty_evolution = /** @type {((inputs?: Assets_Chart_Empty_EvolutionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Chart_Empty_EvolutionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_chart_empty_evolution(inputs)
	return __en.assets_chart_empty_evolution(inputs)
});
/**
* | output |
* | --- |
* | "Savings Evolution" |
*
* @param {Assets_Chart_EvolutionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_chart_evolution = /** @type {((inputs?: Assets_Chart_EvolutionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Chart_EvolutionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_chart_evolution(inputs)
	return __en.assets_chart_evolution(inputs)
});
/**
* | output |
* | --- |
* | "By Account" |
*
* @param {Assets_Chart_Mode_AccountsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_chart_mode_accounts = /** @type {((inputs?: Assets_Chart_Mode_AccountsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Chart_Mode_AccountsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_chart_mode_accounts(inputs)
	return __en.assets_chart_mode_accounts(inputs)
});
/**
* | output |
* | --- |
* | "Total" |
*
* @param {Assets_Chart_Mode_TotalInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_chart_mode_total = /** @type {((inputs?: Assets_Chart_Mode_TotalInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Chart_Mode_TotalInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_chart_mode_total(inputs)
	return __en.assets_chart_mode_total(inputs)
});
/**
* | output |
* | --- |
* | "Total Savings" |
*
* @param {Assets_Chart_Total_SavingsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_chart_total_savings = /** @type {((inputs?: Assets_Chart_Total_SavingsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Chart_Total_SavingsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_chart_total_savings(inputs)
	return __en.assets_chart_total_savings(inputs)
});
/**
* | output |
* | --- |
* | "Failed to clear balance" |
*
* @param {Assets_Clear_Balance_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_clear_balance_error = /** @type {((inputs?: Assets_Clear_Balance_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Clear_Balance_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_clear_balance_error(inputs)
	return __en.assets_clear_balance_error(inputs)
});
/**
* | output |
* | --- |
* | "Account" |
*
* @param {Assets_Col_AccountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_col_account = /** @type {((inputs?: Assets_Col_AccountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Col_AccountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_col_account(inputs)
	return __en.assets_col_account(inputs)
});
/**
* | output |
* | --- |
* | "Balance ({month})" |
*
* @param {Assets_Col_BalanceInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_col_balance = /** @type {((inputs: Assets_Col_BalanceInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Col_BalanceInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_col_balance(inputs)
	return __en.assets_col_balance(inputs)
});
/**
* | output |
* | --- |
* | "Change" |
*
* @param {Assets_Col_ChangeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_col_change = /** @type {((inputs?: Assets_Col_ChangeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Col_ChangeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_col_change(inputs)
	return __en.assets_col_change(inputs)
});
/**
* | output |
* | --- |
* | "Note" |
*
* @param {Assets_Col_NoteInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_col_note = /** @type {((inputs?: Assets_Col_NoteInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Col_NoteInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_col_note(inputs)
	return __en.assets_col_note(inputs)
});
/**
* | output |
* | --- |
* | "Previous" |
*
* @param {Assets_Col_PreviousInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_col_previous = /** @type {((inputs?: Assets_Col_PreviousInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Col_PreviousInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_col_previous(inputs)
	return __en.assets_col_previous(inputs)
});
/**
* | output |
* | --- |
* | "Copying..." |
*
* @param {Assets_CopyingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_copying = /** @type {((inputs?: Assets_CopyingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_CopyingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_copying(inputs)
	return __en.assets_copying(inputs)
});
/**
* | output |
* | --- |
* | "Current Month" |
*
* @param {Assets_Current_MonthInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_current_month = /** @type {((inputs?: Assets_Current_MonthInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Current_MonthInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_current_month(inputs)
	return __en.assets_current_month(inputs)
});
/**
* | output |
* | --- |
* | "Delete account" |
*
* @param {Assets_Delete_Account_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_delete_account_aria = /** @type {((inputs?: Assets_Delete_Account_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Delete_Account_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_delete_account_aria(inputs)
	return __en.assets_delete_account_aria(inputs)
});
/**
* | output |
* | --- |
* | "This will permanently delete this savings account and all of its recorded balance snapshots." |
*
* @param {Assets_Delete_Confirm_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_delete_confirm_desc = /** @type {((inputs?: Assets_Delete_Confirm_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Delete_Confirm_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_delete_confirm_desc(inputs)
	return __en.assets_delete_confirm_desc(inputs)
});
/**
* | output |
* | --- |
* | "Delete \"{name}\"?" |
*
* @param {Assets_Delete_Confirm_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_delete_confirm_title = /** @type {((inputs: Assets_Delete_Confirm_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Delete_Confirm_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_delete_confirm_title(inputs)
	return __en.assets_delete_confirm_title(inputs)
});
/**
* | output |
* | --- |
* | "Edit account" |
*
* @param {Assets_Edit_Account_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_edit_account_aria = /** @type {((inputs?: Assets_Edit_Account_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Edit_Account_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_edit_account_aria(inputs)
	return __en.assets_edit_account_aria(inputs)
});
/**
* | output |
* | --- |
* | "Add your Livret A, Revolut Pockets, or cash-equivalent savings accounts to record periodic balance snapshots and track your evolution over time." |
*
* @param {Assets_Empty_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_empty_desc = /** @type {((inputs?: Assets_Empty_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Empty_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_empty_desc(inputs)
	return __en.assets_empty_desc(inputs)
});
/**
* | output |
* | --- |
* | "No savings accounts tracked yet" |
*
* @param {Assets_Empty_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_empty_title = /** @type {((inputs?: Assets_Empty_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Empty_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_empty_title(inputs)
	return __en.assets_empty_title(inputs)
});
/**
* | output |
* | --- |
* | "Enter..." |
*
* @param {Assets_Enter_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_enter_placeholder = /** @type {((inputs?: Assets_Enter_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Enter_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_enter_placeholder(inputs)
	return __en.assets_enter_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "est. {amount}" |
*
* @param {Assets_Estimated_PrefixInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_estimated_prefix = /** @type {((inputs: Assets_Estimated_PrefixInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Estimated_PrefixInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_estimated_prefix(inputs)
	return __en.assets_estimated_prefix(inputs)
});
/**
* | output |
* | --- |
* | "Fill Balances" |
*
* @param {Assets_Fill_BalancesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_fill_balances = /** @type {((inputs?: Assets_Fill_BalancesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Fill_BalancesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_fill_balances(inputs)
	return __en.assets_fill_balances(inputs)
});
/**
* | output |
* | --- |
* | "Fill balances" |
*
* @param {Assets_Fill_Balances_CtaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_fill_balances_cta = /** @type {((inputs?: Assets_Fill_Balances_CtaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Fill_Balances_CtaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_fill_balances_cta(inputs)
	return __en.assets_fill_balances_cta(inputs)
});
/**
* | output |
* | --- |
* | "Carried over" |
*
* @param {Assets_History_Carried_OverInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_history_carried_over = /** @type {((inputs?: Assets_History_Carried_OverInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_History_Carried_OverInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_history_carried_over(inputs)
	return __en.assets_history_carried_over(inputs)
});
/**
* | output |
* | --- |
* | "Italic values are carried over from an earlier snapshot. Click a month to edit." |
*
* @param {Assets_History_HintInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_history_hint = /** @type {((inputs?: Assets_History_HintInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_History_HintInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_history_hint(inputs)
	return __en.assets_history_hint(inputs)
});
/**
* | output |
* | --- |
* | "{count} account(s) not updated this month" |
*
* @param {Assets_History_Missing_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_history_missing_title = /** @type {((inputs: Assets_History_Missing_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_History_Missing_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_history_missing_title(inputs)
	return __en.assets_history_missing_title(inputs)
});
/**
* | output |
* | --- |
* | "Snapshot History" |
*
* @param {Assets_History_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_history_title = /** @type {((inputs?: Assets_History_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_History_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_history_title(inputs)
	return __en.assets_history_title(inputs)
});
/**
* | output |
* | --- |
* | "All accounts updated for {month}" |
*
* @param {Assets_Kpi_All_UpdatedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_all_updated = /** @type {((inputs: Assets_Kpi_All_UpdatedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_All_UpdatedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_all_updated(inputs)
	return __en.assets_kpi_all_updated(inputs)
});
/**
* | output |
* | --- |
* | "Includes {count} carried-over balances" |
*
* @param {Assets_Kpi_Carried_OverInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_carried_over = /** @type {((inputs: Assets_Kpi_Carried_OverInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_Carried_OverInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_carried_over(inputs)
	return __en.assets_kpi_carried_over(inputs)
});
/**
* | output |
* | --- |
* | "Includes 1 carried-over balance" |
*
* @param {Assets_Kpi_Carried_Over_OneInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_carried_over_one = /** @type {((inputs?: Assets_Kpi_Carried_Over_OneInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_Carried_Over_OneInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_carried_over_one(inputs)
	return __en.assets_kpi_carried_over_one(inputs)
});
/**
* | output |
* | --- |
* | "Based on recorded snapshots" |
*
* @param {Assets_Kpi_From_SnapshotsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_from_snapshots = /** @type {((inputs?: Assets_Kpi_From_SnapshotsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_From_SnapshotsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_from_snapshots(inputs)
	return __en.assets_kpi_from_snapshots(inputs)
});
/**
* | output |
* | --- |
* | "{count} accounts missing a snapshot" |
*
* @param {Assets_Kpi_Missing_ManyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_missing_many = /** @type {((inputs: Assets_Kpi_Missing_ManyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_Missing_ManyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_missing_many(inputs)
	return __en.assets_kpi_missing_many(inputs)
});
/**
* | output |
* | --- |
* | "1 account missing a snapshot" |
*
* @param {Assets_Kpi_Missing_OneInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_missing_one = /** @type {((inputs?: Assets_Kpi_Missing_OneInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_Missing_OneInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_missing_one(inputs)
	return __en.assets_kpi_missing_one(inputs)
});
/**
* | output |
* | --- |
* | "No balances recorded yet" |
*
* @param {Assets_Kpi_No_BalancesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_no_balances = /** @type {((inputs?: Assets_Kpi_No_BalancesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_No_BalancesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_no_balances(inputs)
	return __en.assets_kpi_no_balances(inputs)
});
/**
* | output |
* | --- |
* | "No earlier month to compare" |
*
* @param {Assets_Kpi_No_PrevInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_no_prev = /** @type {((inputs?: Assets_Kpi_No_PrevInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_No_PrevInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_no_prev(inputs)
	return __en.assets_kpi_no_prev(inputs)
});
/**
* | output |
* | --- |
* | "Previous month: {amount}" |
*
* @param {Assets_Kpi_Prev_ValueInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_prev_value = /** @type {((inputs: Assets_Kpi_Prev_ValueInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_Prev_ValueInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_prev_value(inputs)
	return __en.assets_kpi_prev_value(inputs)
});
/**
* | output |
* | --- |
* | "Snapshot Status" |
*
* @param {Assets_Kpi_StatusInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_status = /** @type {((inputs?: Assets_Kpi_StatusInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_StatusInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_status(inputs)
	return __en.assets_kpi_status(inputs)
});
/**
* | output |
* | --- |
* | "Total Savings ({month})" |
*
* @param {Assets_Kpi_TotalInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_total = /** @type {((inputs: Assets_Kpi_TotalInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_TotalInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_total(inputs)
	return __en.assets_kpi_total(inputs)
});
/**
* | output |
* | --- |
* | "vs Previous Month" |
*
* @param {Assets_Kpi_Vs_PreviousInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_kpi_vs_previous = /** @type {((inputs?: Assets_Kpi_Vs_PreviousInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Kpi_Vs_PreviousInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_kpi_vs_previous(inputs)
	return __en.assets_kpi_vs_previous(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load assets: {message}" |
*
* @param {Assets_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_load_error = /** @type {((inputs: Assets_Load_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Load_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_load_error(inputs)
	return __en.assets_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Loading assets..." |
*
* @param {Assets_LoadingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_loading = /** @type {((inputs?: Assets_LoadingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_LoadingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_loading(inputs)
	return __en.assets_loading(inputs)
});
/**
* | output |
* | --- |
* | "No balance snapshots recorded for {month} yet." |
*
* @param {Assets_Missing_AllInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_missing_all = /** @type {((inputs: Assets_Missing_AllInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Missing_AllInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_missing_all(inputs)
	return __en.assets_missing_all(inputs)
});
/**
* | output |
* | --- |
* | "+{count} more" |
*
* @param {Assets_Missing_MoreInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_missing_more = /** @type {((inputs: Assets_Missing_MoreInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Missing_MoreInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_missing_more(inputs)
	return __en.assets_missing_more(inputs)
});
/**
* | output |
* | --- |
* | "Missing {month} balance snapshots ({missing}/{total})." |
*
* @param {Assets_Missing_PartialInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_missing_partial = /** @type {((inputs: Assets_Missing_PartialInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Missing_PartialInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_missing_partial(inputs)
	return __en.assets_missing_partial(inputs)
});
/**
* | output |
* | --- |
* | "Missing {month} balance snapshot ({missing}/{total})." |
*
* @param {Assets_Missing_Partial_OneInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_missing_partial_one = /** @type {((inputs: Assets_Missing_Partial_OneInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Missing_Partial_OneInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_missing_partial_one(inputs)
	return __en.assets_missing_partial_one(inputs)
});
/**
* | output |
* | --- |
* | "Please fill in:" |
*
* @param {Assets_Missing_Please_FillInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_missing_please_fill = /** @type {((inputs?: Assets_Missing_Please_FillInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Missing_Please_FillInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_missing_please_fill(inputs)
	return __en.assets_missing_please_fill(inputs)
});
/**
* | output |
* | --- |
* | "Record a balance first to add a note" |
*
* @param {Assets_Note_Disabled_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_note_disabled_title = /** @type {((inputs?: Assets_Note_Disabled_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Note_Disabled_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_note_disabled_title(inputs)
	return __en.assets_note_disabled_title(inputs)
});
/**
* | output |
* | --- |
* | "Click to edit note" |
*
* @param {Assets_Note_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_note_edit_title = /** @type {((inputs?: Assets_Note_Edit_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Note_Edit_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_note_edit_title(inputs)
	return __en.assets_note_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "Add note..." |
*
* @param {Assets_Note_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_note_placeholder = /** @type {((inputs?: Assets_Note_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Note_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_note_placeholder(inputs)
	return __en.assets_note_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save balance" |
*
* @param {Assets_Save_Balance_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_save_balance_error = /** @type {((inputs?: Assets_Save_Balance_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Save_Balance_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_save_balance_error(inputs)
	return __en.assets_save_balance_error(inputs)
});
/**
* | output |
* | --- |
* | "Investments" |
*
* @param {Assets_Tab_InvestmentsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_tab_investments = /** @type {((inputs?: Assets_Tab_InvestmentsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Tab_InvestmentsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_tab_investments(inputs)
	return __en.assets_tab_investments(inputs)
});
/**
* | output |
* | --- |
* | "Overview" |
*
* @param {Assets_Tab_OverviewInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_tab_overview = /** @type {((inputs?: Assets_Tab_OverviewInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Tab_OverviewInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_tab_overview(inputs)
	return __en.assets_tab_overview(inputs)
});
/**
* | output |
* | --- |
* | "Savings" |
*
* @param {Assets_Tab_SavingsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_tab_savings = /** @type {((inputs?: Assets_Tab_SavingsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Tab_SavingsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_tab_savings(inputs)
	return __en.assets_tab_savings(inputs)
});
/**
* | output |
* | --- |
* | "({updated}/{total} recorded for {month})" |
*
* @param {Assets_Table_Recorded_CountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_table_recorded_count = /** @type {((inputs: Assets_Table_Recorded_CountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Table_Recorded_CountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_table_recorded_count(inputs)
	return __en.assets_table_recorded_count(inputs)
});
/**
* | output |
* | --- |
* | "Savings Accounts" |
*
* @param {Assets_Table_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_table_title = /** @type {((inputs?: Assets_Table_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Table_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_table_title(inputs)
	return __en.assets_table_title(inputs)
});
/**
* | output |
* | --- |
* | "(incl. {count} carried over)" |
*
* @param {Assets_Total_Carried_OverInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_total_carried_over = /** @type {((inputs: Assets_Total_Carried_OverInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Total_Carried_OverInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_total_carried_over(inputs)
	return __en.assets_total_carried_over(inputs)
});
/**
* | output |
* | --- |
* | "(incl. 1 carried over)" |
*
* @param {Assets_Total_Carried_Over_OneInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const assets_total_carried_over_one = /** @type {((inputs?: Assets_Total_Carried_Over_OneInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assets_Total_Carried_Over_OneInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.assets_total_carried_over_one(inputs)
	return __en.assets_total_carried_over_one(inputs)
});
/**
* | output |
* | --- |
* | "Add Bill" |
*
* @param {Bills_AddInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_add = /** @type {((inputs?: Bills_AddInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_AddInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_add(inputs)
	return __en.bills_add(inputs)
});
/**
* | output |
* | --- |
* | "Bill added" |
*
* @param {Bills_Added_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_added_toast = /** @type {((inputs?: Bills_Added_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_Added_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_added_toast(inputs)
	return __en.bills_added_toast(inputs)
});
/**
* | output |
* | --- |
* | "Delete bill" |
*
* @param {Bills_Delete_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_delete_aria = /** @type {((inputs?: Bills_Delete_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_Delete_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_delete_aria(inputs)
	return __en.bills_delete_aria(inputs)
});
/**
* | output |
* | --- |
* | "Bill deleted" |
*
* @param {Bills_Deleted_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_deleted_toast = /** @type {((inputs?: Bills_Deleted_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_Deleted_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_deleted_toast(inputs)
	return __en.bills_deleted_toast(inputs)
});
/**
* | output |
* | --- |
* | "Due" |
*
* @param {Bills_DueInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_due = /** @type {((inputs?: Bills_DueInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_DueInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_due(inputs)
	return __en.bills_due(inputs)
});
/**
* | output |
* | --- |
* | "Edit Bill" |
*
* @param {Bills_EditInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_edit = /** @type {((inputs?: Bills_EditInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_EditInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_edit(inputs)
	return __en.bills_edit(inputs)
});
/**
* | output |
* | --- |
* | "Edit bill" |
*
* @param {Bills_Edit_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_edit_aria = /** @type {((inputs?: Bills_Edit_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_Edit_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_edit_aria(inputs)
	return __en.bills_edit_aria(inputs)
});
/**
* | output |
* | --- |
* | "No bills for this month yet." |
*
* @param {Bills_EmptyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_empty = /** @type {((inputs?: Bills_EmptyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_EmptyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_empty(inputs)
	return __en.bills_empty(inputs)
});
/**
* | output |
* | --- |
* | "From" |
*
* @param {Bills_FromInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_from = /** @type {((inputs?: Bills_FromInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_FromInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_from(inputs)
	return __en.bills_from(inputs)
});
/**
* | output |
* | --- |
* | "Rent, Internet, Insurance..." |
*
* @param {Bills_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_name_placeholder = /** @type {((inputs?: Bills_Name_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_Name_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_name_placeholder(inputs)
	return __en.bills_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save bill" |
*
* @param {Bills_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_save_error = /** @type {((inputs?: Bills_Save_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_Save_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_save_error(inputs)
	return __en.bills_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Bills" |
*
* @param {Bills_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_title = /** @type {((inputs?: Bills_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_title(inputs)
	return __en.bills_title(inputs)
});
/**
* | output |
* | --- |
* | "Failed to update bill" |
*
* @param {Bills_Update_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_update_error = /** @type {((inputs?: Bills_Update_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_Update_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_update_error(inputs)
	return __en.bills_update_error(inputs)
});
/**
* | output |
* | --- |
* | "Bill updated" |
*
* @param {Bills_Updated_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const bills_updated_toast = /** @type {((inputs?: Bills_Updated_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bills_Updated_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.bills_updated_toast(inputs)
	return __en.bills_updated_toast(inputs)
});
/**
* | output |
* | --- |
* | "Categories available for envelopes, transactions, and mappings" |
*
* @param {Categories_CaptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_caption = /** @type {((inputs?: Categories_CaptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_CaptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_caption(inputs)
	return __en.categories_caption(inputs)
});
/**
* | output |
* | --- |
* | "Chart Color" |
*
* @param {Categories_Chart_ColorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_chart_color = /** @type {((inputs?: Categories_Chart_ColorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Chart_ColorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_chart_color(inputs)
	return __en.categories_chart_color(inputs)
});
/**
* | output |
* | --- |
* | "Create Category" |
*
* @param {Categories_Create_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_create_button = /** @type {((inputs?: Categories_Create_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Create_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_create_button(inputs)
	return __en.categories_create_button(inputs)
});
/**
* | output |
* | --- |
* | "Add a category to assign to your transactions." |
*
* @param {Categories_Create_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_create_desc = /** @type {((inputs?: Categories_Create_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Create_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_create_desc(inputs)
	return __en.categories_create_desc(inputs)
});
/**
* | output |
* | --- |
* | "Create category" |
*
* @param {Categories_Create_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_create_title = /** @type {((inputs?: Categories_Create_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Create_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_create_title(inputs)
	return __en.categories_create_title(inputs)
});
/**
* | output |
* | --- |
* | "Delete \"{label}\"? Mappings and transactions using it must be changed first." |
*
* @param {Categories_Delete_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_delete_desc = /** @type {((inputs: Categories_Delete_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Delete_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_delete_desc(inputs)
	return __en.categories_delete_desc(inputs)
});
/**
* | output |
* | --- |
* | "Failed to delete category" |
*
* @param {Categories_Delete_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_delete_error = /** @type {((inputs?: Categories_Delete_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Delete_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_delete_error(inputs)
	return __en.categories_delete_error(inputs)
});
/**
* | output |
* | --- |
* | "Delete Category" |
*
* @param {Categories_Delete_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_delete_title = /** @type {((inputs?: Categories_Delete_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Delete_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_delete_title(inputs)
	return __en.categories_delete_title(inputs)
});
/**
* | output |
* | --- |
* | "The slug stays unchanged so existing mappings keep working." |
*
* @param {Categories_Edit_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_edit_desc = /** @type {((inputs?: Categories_Edit_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Edit_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_edit_desc(inputs)
	return __en.categories_edit_desc(inputs)
});
/**
* | output |
* | --- |
* | "Edit category" |
*
* @param {Categories_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_edit_title = /** @type {((inputs?: Categories_Edit_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Edit_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_edit_title(inputs)
	return __en.categories_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "Shown in budget envelopes, transactions, and mappings" |
*
* @param {Categories_Label_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_label_desc = /** @type {((inputs?: Categories_Label_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Label_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_label_desc(inputs)
	return __en.categories_label_desc(inputs)
});
/**
* | output |
* | --- |
* | "Error loading categories: {message}" |
*
* @param {Categories_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_load_error = /** @type {((inputs: Categories_Load_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Load_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_load_error(inputs)
	return __en.categories_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Loading categories..." |
*
* @param {Categories_LoadingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_loading = /** @type {((inputs?: Categories_LoadingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_LoadingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_loading(inputs)
	return __en.categories_loading(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save category" |
*
* @param {Categories_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_save_error = /** @type {((inputs?: Categories_Save_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Save_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_save_error(inputs)
	return __en.categories_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Stable key used by mappings and YAML imports. Defaults to the label." |
*
* @param {Categories_Slug_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_slug_desc = /** @type {((inputs?: Categories_Slug_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_Slug_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_slug_desc(inputs)
	return __en.categories_slug_desc(inputs)
});
/**
* | output |
* | --- |
* | "Categories" |
*
* @param {Categories_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const categories_title = /** @type {((inputs?: Categories_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Categories_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.categories_title(inputs)
	return __en.categories_title(inputs)
});
/**
* | output |
* | --- |
* | "Add bills, envelopes, or savings to see your budget breakdown." |
*
* @param {Charts_Empty_BudgetInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const charts_empty_budget = /** @type {((inputs?: Charts_Empty_BudgetInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Charts_Empty_BudgetInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.charts_empty_budget(inputs)
	return __en.charts_empty_budget(inputs)
});
/**
* | output |
* | --- |
* | "No expenses recorded for this month yet." |
*
* @param {Charts_Empty_ExpensesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const charts_empty_expenses = /** @type {((inputs?: Charts_Empty_ExpensesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Charts_Empty_ExpensesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.charts_empty_expenses(inputs)
	return __en.charts_empty_expenses(inputs)
});
/**
* | output |
* | --- |
* | "Monthly Budget" |
*
* @param {Charts_Monthly_BudgetInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const charts_monthly_budget = /** @type {((inputs?: Charts_Monthly_BudgetInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Charts_Monthly_BudgetInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.charts_monthly_budget(inputs)
	return __en.charts_monthly_budget(inputs)
});
/**
* | output |
* | --- |
* | "Monthly Expenses" |
*
* @param {Charts_Monthly_ExpensesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const charts_monthly_expenses = /** @type {((inputs?: Charts_Monthly_ExpensesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Charts_Monthly_ExpensesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.charts_monthly_expenses(inputs)
	return __en.charts_monthly_expenses(inputs)
});
/**
* | output |
* | --- |
* | "Remaining" |
*
* @param {Charts_RemainingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const charts_remaining = /** @type {((inputs?: Charts_RemainingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Charts_RemainingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.charts_remaining(inputs)
	return __en.charts_remaining(inputs)
});
/**
* | output |
* | --- |
* | "Bills" |
*
* @param {Charts_Slice_BillsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const charts_slice_bills = /** @type {((inputs?: Charts_Slice_BillsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Charts_Slice_BillsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.charts_slice_bills(inputs)
	return __en.charts_slice_bills(inputs)
});
/**
* | output |
* | --- |
* | "Expenses" |
*
* @param {Charts_Slice_ExpensesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const charts_slice_expenses = /** @type {((inputs?: Charts_Slice_ExpensesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Charts_Slice_ExpensesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.charts_slice_expenses(inputs)
	return __en.charts_slice_expenses(inputs)
});
/**
* | output |
* | --- |
* | "Savings" |
*
* @param {Charts_Slice_SavingsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const charts_slice_savings = /** @type {((inputs?: Charts_Slice_SavingsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Charts_Slice_SavingsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.charts_slice_savings(inputs)
	return __en.charts_slice_savings(inputs)
});
/**
* | output |
* | --- |
* | "Total Spent" |
*
* @param {Charts_Total_SpentInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const charts_total_spent = /** @type {((inputs?: Charts_Total_SpentInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Charts_Total_SpentInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.charts_total_spent(inputs)
	return __en.charts_total_spent(inputs)
});
/**
* | output |
* | --- |
* | "Actions" |
*
* @param {Common_ActionsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_actions = /** @type {((inputs?: Common_ActionsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ActionsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_actions(inputs)
	return __en.common_actions(inputs)
});
/**
* | output |
* | --- |
* | "Active" |
*
* @param {Common_ActiveInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_active = /** @type {((inputs?: Common_ActiveInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ActiveInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_active(inputs)
	return __en.common_active(inputs)
});
/**
* | output |
* | --- |
* | "Actual" |
*
* @param {Common_ActualInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_actual = /** @type {((inputs?: Common_ActualInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ActualInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_actual(inputs)
	return __en.common_actual(inputs)
});
/**
* | output |
* | --- |
* | "Actual (€)" |
*
* @param {Common_Actual_EurInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_actual_eur = /** @type {((inputs?: Common_Actual_EurInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Actual_EurInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_actual_eur(inputs)
	return __en.common_actual_eur(inputs)
});
/**
* | output |
* | --- |
* | "All" |
*
* @param {Common_AllInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_all = /** @type {((inputs?: Common_AllInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_AllInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_all(inputs)
	return __en.common_all(inputs)
});
/**
* | output |
* | --- |
* | "Amount" |
*
* @param {Common_AmountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_amount = /** @type {((inputs?: Common_AmountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_AmountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_amount(inputs)
	return __en.common_amount(inputs)
});
/**
* | output |
* | --- |
* | "Auto" |
*
* @param {Common_AutoInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_auto = /** @type {((inputs?: Common_AutoInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_AutoInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_auto(inputs)
	return __en.common_auto(inputs)
});
/**
* | output |
* | --- |
* | "Budget" |
*
* @param {Common_BudgetInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_budget = /** @type {((inputs?: Common_BudgetInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_BudgetInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_budget(inputs)
	return __en.common_budget(inputs)
});
/**
* | output |
* | --- |
* | "Budget (€)" |
*
* @param {Common_Budget_EurInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_budget_eur = /** @type {((inputs?: Common_Budget_EurInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Budget_EurInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_budget_eur(inputs)
	return __en.common_budget_eur(inputs)
});
/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Common_CancelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_cancel = /** @type {((inputs?: Common_CancelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_CancelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_cancel(inputs)
	return __en.common_cancel(inputs)
});
/**
* | output |
* | --- |
* | "Category" |
*
* @param {Common_CategoryInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_category = /** @type {((inputs?: Common_CategoryInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_CategoryInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_category(inputs)
	return __en.common_category(inputs)
});
/**
* | output |
* | --- |
* | "Click to cycle: {hint}" |
*
* @param {Common_Click_To_CycleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_click_to_cycle = /** @type {((inputs: Common_Click_To_CycleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Click_To_CycleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_click_to_cycle(inputs)
	return __en.common_click_to_cycle(inputs)
});
/**
* | output |
* | --- |
* | "Click to edit amount" |
*
* @param {Common_Click_To_Edit_AmountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_click_to_edit_amount = /** @type {((inputs?: Common_Click_To_Edit_AmountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Click_To_Edit_AmountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_click_to_edit_amount(inputs)
	return __en.common_click_to_edit_amount(inputs)
});
/**
* | output |
* | --- |
* | "{value} (click to edit)" |
*
* @param {Common_Click_To_Edit_ValueInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_click_to_edit_value = /** @type {((inputs: Common_Click_To_Edit_ValueInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Click_To_Edit_ValueInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_click_to_edit_value(inputs)
	return __en.common_click_to_edit_value(inputs)
});
/**
* | output |
* | --- |
* | "Color" |
*
* @param {Common_ColorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_color = /** @type {((inputs?: Common_ColorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ColorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_color(inputs)
	return __en.common_color(inputs)
});
/**
* | output |
* | --- |
* | "Date" |
*
* @param {Common_DateInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_date = /** @type {((inputs?: Common_DateInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_DateInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_date(inputs)
	return __en.common_date(inputs)
});
/**
* | output |
* | --- |
* | "Default Share" |
*
* @param {Common_Default_ShareInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_default_share = /** @type {((inputs?: Common_Default_ShareInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Default_ShareInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_default_share(inputs)
	return __en.common_default_share(inputs)
});
/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Common_DeleteInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_delete = /** @type {((inputs?: Common_DeleteInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_DeleteInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_delete(inputs)
	return __en.common_delete(inputs)
});
/**
* | output |
* | --- |
* | "Deleting..." |
*
* @param {Common_DeletingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_deleting = /** @type {((inputs?: Common_DeletingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_DeletingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_deleting(inputs)
	return __en.common_deleting(inputs)
});
/**
* | output |
* | --- |
* | "Due Day (1–31)" |
*
* @param {Common_Due_Day_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_due_day_label = /** @type {((inputs?: Common_Due_Day_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Due_Day_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_due_day_label(inputs)
	return __en.common_due_day_label(inputs)
});
/**
* | output |
* | --- |
* | "Exclude from budget calculations" |
*
* @param {Common_Exclude_From_BudgetInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_exclude_from_budget = /** @type {((inputs?: Common_Exclude_From_BudgetInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Exclude_From_BudgetInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_exclude_from_budget(inputs)
	return __en.common_exclude_from_budget(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save" |
*
* @param {Common_Failed_To_SaveInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_failed_to_save = /** @type {((inputs?: Common_Failed_To_SaveInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Failed_To_SaveInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_failed_to_save(inputs)
	return __en.common_failed_to_save(inputs)
});
/**
* | output |
* | --- |
* | "From Account" |
*
* @param {Common_From_AccountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_from_account = /** @type {((inputs?: Common_From_AccountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_From_AccountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_from_account(inputs)
	return __en.common_from_account(inputs)
});
/**
* | output |
* | --- |
* | "Import" |
*
* @param {Common_ImportInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_import = /** @type {((inputs?: Common_ImportInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ImportInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_import(inputs)
	return __en.common_import(inputs)
});
/**
* | output |
* | --- |
* | "Import failed" |
*
* @param {Common_Import_FailedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_import_failed = /** @type {((inputs?: Common_Import_FailedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Import_FailedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_import_failed(inputs)
	return __en.common_import_failed(inputs)
});
/**
* | output |
* | --- |
* | "Importing..." |
*
* @param {Common_ImportingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_importing = /** @type {((inputs?: Common_ImportingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ImportingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_importing(inputs)
	return __en.common_importing(inputs)
});
/**
* | output |
* | --- |
* | "Label" |
*
* @param {Common_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_label = /** @type {((inputs?: Common_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_label(inputs)
	return __en.common_label(inputs)
});
/**
* | output |
* | --- |
* | "Leave empty if pending" |
*
* @param {Common_Leave_Empty_If_PendingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_leave_empty_if_pending = /** @type {((inputs?: Common_Leave_Empty_If_PendingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Leave_Empty_If_PendingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_leave_empty_if_pending(inputs)
	return __en.common_leave_empty_if_pending(inputs)
});
/**
* | output |
* | --- |
* | "Month" |
*
* @param {Common_MonthInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_month = /** @type {((inputs?: Common_MonthInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_MonthInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_month(inputs)
	return __en.common_month(inputs)
});
/**
* | output |
* | --- |
* | "Name" |
*
* @param {Common_NameInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_name = /** @type {((inputs?: Common_NameInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_NameInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_name(inputs)
	return __en.common_name(inputs)
});
/**
* | output |
* | --- |
* | "No" |
*
* @param {Common_NoInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_no = /** @type {((inputs?: Common_NoInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_NoInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_no(inputs)
	return __en.common_no(inputs)
});
/**
* | output |
* | --- |
* | "None" |
*
* @param {Common_NoneInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_none = /** @type {((inputs?: Common_NoneInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_NoneInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_none(inputs)
	return __en.common_none(inputs)
});
/**
* | output |
* | --- |
* | "Order" |
*
* @param {Common_OrderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_order = /** @type {((inputs?: Common_OrderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_OrderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_order(inputs)
	return __en.common_order(inputs)
});
/**
* | output |
* | --- |
* | "Paused" |
*
* @param {Common_PausedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_paused = /** @type {((inputs?: Common_PausedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_PausedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_paused(inputs)
	return __en.common_paused(inputs)
});
/**
* | output |
* | --- |
* | "Payment Method" |
*
* @param {Common_Payment_MethodInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_payment_method = /** @type {((inputs?: Common_Payment_MethodInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Payment_MethodInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_payment_method(inputs)
	return __en.common_payment_method(inputs)
});
/**
* | output |
* | --- |
* | "Processing..." |
*
* @param {Common_ProcessingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_processing = /** @type {((inputs?: Common_ProcessingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ProcessingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_processing(inputs)
	return __en.common_processing(inputs)
});
/**
* | output |
* | --- |
* | "Reset" |
*
* @param {Common_ResetInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_reset = /** @type {((inputs?: Common_ResetInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ResetInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_reset(inputs)
	return __en.common_reset(inputs)
});
/**
* | output |
* | --- |
* | "Save" |
*
* @param {Common_SaveInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_save = /** @type {((inputs?: Common_SaveInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SaveInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_save(inputs)
	return __en.common_save(inputs)
});
/**
* | output |
* | --- |
* | "Save Changes" |
*
* @param {Common_Save_ChangesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_save_changes = /** @type {((inputs?: Common_Save_ChangesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Save_ChangesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_save_changes(inputs)
	return __en.common_save_changes(inputs)
});
/**
* | output |
* | --- |
* | "Saving..." |
*
* @param {Common_SavingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_saving = /** @type {((inputs?: Common_SavingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SavingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_saving(inputs)
	return __en.common_saving(inputs)
});
/**
* | output |
* | --- |
* | "Share" |
*
* @param {Common_ShareInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_share = /** @type {((inputs?: Common_ShareInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ShareInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_share(inputs)
	return __en.common_share(inputs)
});
/**
* | output |
* | --- |
* | "Slug" |
*
* @param {Common_SlugInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_slug = /** @type {((inputs?: Common_SlugInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SlugInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_slug(inputs)
	return __en.common_slug(inputs)
});
/**
* | output |
* | --- |
* | "Sort Order" |
*
* @param {Common_Sort_OrderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_sort_order = /** @type {((inputs?: Common_Sort_OrderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Sort_OrderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_sort_order(inputs)
	return __en.common_sort_order(inputs)
});
/**
* | output |
* | --- |
* | "Status" |
*
* @param {Common_StatusInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_status = /** @type {((inputs?: Common_StatusInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_StatusInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_status(inputs)
	return __en.common_status(inputs)
});
/**
* | output |
* | --- |
* | "Total" |
*
* @param {Common_TotalInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_total = /** @type {((inputs?: Common_TotalInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_TotalInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_total(inputs)
	return __en.common_total(inputs)
});
/**
* | output |
* | --- |
* | "Type" |
*
* @param {Common_TypeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_type = /** @type {((inputs?: Common_TypeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_TypeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_type(inputs)
	return __en.common_type(inputs)
});
/**
* | output |
* | --- |
* | "Unknown error" |
*
* @param {Common_Unknown_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_unknown_error = /** @type {((inputs?: Common_Unknown_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Unknown_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_unknown_error(inputs)
	return __en.common_unknown_error(inputs)
});
/**
* | output |
* | --- |
* | "Yes" |
*
* @param {Common_YesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_yes = /** @type {((inputs?: Common_YesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_YesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_yes(inputs)
	return __en.common_yes(inputs)
});
/**
* | output |
* | --- |
* | "Your Share" |
*
* @param {Common_Your_ShareInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const common_your_share = /** @type {((inputs?: Common_Your_ShareInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Your_ShareInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.common_your_share(inputs)
	return __en.common_your_share(inputs)
});
/**
* | output |
* | --- |
* | "Failed to clone month" |
*
* @param {Dashboard_Clone_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const dashboard_clone_error = /** @type {((inputs?: Dashboard_Clone_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Clone_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.dashboard_clone_error(inputs)
	return __en.dashboard_clone_error(inputs)
});
/**
* | output |
* | --- |
* | "Clone from {source}" |
*
* @param {Dashboard_Clone_FromInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const dashboard_clone_from = /** @type {((inputs: Dashboard_Clone_FromInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Clone_FromInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.dashboard_clone_from(inputs)
	return __en.dashboard_clone_from(inputs)
});
/**
* | output |
* | --- |
* | "Cloned {source} into {target}" |
*
* @param {Dashboard_Cloned_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const dashboard_cloned_toast = /** @type {((inputs: Dashboard_Cloned_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Cloned_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.dashboard_cloned_toast(inputs)
	return __en.dashboard_cloned_toast(inputs)
});
/**
* | output |
* | --- |
* | "Cloning..." |
*
* @param {Dashboard_CloningInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const dashboard_cloning = /** @type {((inputs?: Dashboard_CloningInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_CloningInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.dashboard_cloning(inputs)
	return __en.dashboard_cloning(inputs)
});
/**
* | output |
* | --- |
* | "is empty. Clone your bills, incomes, savings, and envelopes from" |
*
* @param {Dashboard_Empty_Banner_Part1Inputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const dashboard_empty_banner_part1 = /** @type {((inputs?: Dashboard_Empty_Banner_Part1Inputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Empty_Banner_Part1Inputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.dashboard_empty_banner_part1(inputs)
	return __en.dashboard_empty_banner_part1(inputs)
});
/**
* | output |
* | --- |
* | "or start editing directly below." |
*
* @param {Dashboard_Empty_Banner_Part2Inputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const dashboard_empty_banner_part2 = /** @type {((inputs?: Dashboard_Empty_Banner_Part2Inputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Empty_Banner_Part2Inputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.dashboard_empty_banner_part2(inputs)
	return __en.dashboard_empty_banner_part2(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load budget: {message}" |
*
* @param {Dashboard_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const dashboard_load_error = /** @type {((inputs: Dashboard_Load_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Load_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.dashboard_load_error(inputs)
	return __en.dashboard_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Loading budget..." |
*
* @param {Dashboard_LoadingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const dashboard_loading = /** @type {((inputs?: Dashboard_LoadingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_LoadingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.dashboard_loading(inputs)
	return __en.dashboard_loading(inputs)
});
/**
* | output |
* | --- |
* | "Transactions" |
*
* @param {Dashboard_Transactions_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const dashboard_transactions_button = /** @type {((inputs?: Dashboard_Transactions_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Transactions_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.dashboard_transactions_button(inputs)
	return __en.dashboard_transactions_button(inputs)
});
/**
* | output |
* | --- |
* | "Transactions ({count})" |
*
* @param {Dashboard_Transactions_Button_CountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const dashboard_transactions_button_count = /** @type {((inputs: Dashboard_Transactions_Button_CountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dashboard_Transactions_Button_CountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.dashboard_transactions_button_count(inputs)
	return __en.dashboard_transactions_button_count(inputs)
});
/**
* | output |
* | --- |
* | "Banks" |
*
* @param {Eb_Banks_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_banks_label = /** @type {((inputs?: Eb_Banks_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Banks_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_banks_label(inputs)
	return __en.eb_banks_label(inputs)
});
/**
* | output |
* | --- |
* | "A list of all EnableBanking accounts configured" |
*
* @param {Eb_CaptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_caption = /** @type {((inputs?: Eb_CaptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_CaptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_caption(inputs)
	return __en.eb_caption(inputs)
});
/**
* | output |
* | --- |
* | "Account Name" |
*
* @param {Eb_Col_Account_NameInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_col_account_name = /** @type {((inputs?: Eb_Col_Account_NameInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Col_Account_NameInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_col_account_name(inputs)
	return __en.eb_col_account_name(inputs)
});
/**
* | output |
* | --- |
* | "Institution" |
*
* @param {Eb_Col_InstitutionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_col_institution = /** @type {((inputs?: Eb_Col_InstitutionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Col_InstitutionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_col_institution(inputs)
	return __en.eb_col_institution(inputs)
});
/**
* | output |
* | --- |
* | "Logo" |
*
* @param {Eb_Col_LogoInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_col_logo = /** @type {((inputs?: Eb_Col_LogoInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Col_LogoInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_col_logo(inputs)
	return __en.eb_col_logo(inputs)
});
/**
* | output |
* | --- |
* | "Connect your bank account" |
*
* @param {Eb_Connect_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_connect_button = /** @type {((inputs?: Eb_Connect_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Connect_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_connect_button(inputs)
	return __en.eb_connect_button(inputs)
});
/**
* | output |
* | --- |
* | "Are you sure you want to delete the account \"{name}\"?" |
*
* @param {Eb_Delete_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_delete_desc = /** @type {((inputs: Eb_Delete_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Delete_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_delete_desc(inputs)
	return __en.eb_delete_desc(inputs)
});
/**
* | output |
* | --- |
* | "Delete Account" |
*
* @param {Eb_Delete_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_delete_title = /** @type {((inputs?: Eb_Delete_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Delete_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_delete_title(inputs)
	return __en.eb_delete_title(inputs)
});
/**
* | output |
* | --- |
* | "Import JSON" |
*
* @param {Eb_Import_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_import_button = /** @type {((inputs?: Eb_Import_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Import_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_import_button(inputs)
	return __en.eb_import_button(inputs)
});
/**
* | output |
* | --- |
* | "Paste the contents of your eb.json file." |
*
* @param {Eb_Import_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_import_desc = /** @type {((inputs?: Eb_Import_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Import_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_import_desc(inputs)
	return __en.eb_import_desc(inputs)
});
/**
* | output |
* | --- |
* | "Import from eb.json" |
*
* @param {Eb_Import_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_import_title = /** @type {((inputs?: Eb_Import_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Import_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_import_title(inputs)
	return __en.eb_import_title(inputs)
});
/**
* | output |
* | --- |
* | "{institution} logo" |
*
* @param {Eb_Logo_AltInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_logo_alt = /** @type {((inputs: Eb_Logo_AltInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Logo_AltInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_logo_alt(inputs)
	return __en.eb_logo_alt(inputs)
});
/**
* | output |
* | --- |
* | "No bank selected" |
*
* @param {Eb_No_Bank_SelectedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_no_bank_selected = /** @type {((inputs?: Eb_No_Bank_SelectedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_No_Bank_SelectedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_no_bank_selected(inputs)
	return __en.eb_no_bank_selected(inputs)
});
/**
* | output |
* | --- |
* | "Select a bank" |
*
* @param {Eb_Select_Bank_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_select_bank_placeholder = /** @type {((inputs?: Eb_Select_Bank_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_Select_Bank_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_select_bank_placeholder(inputs)
	return __en.eb_select_bank_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Enable Banking" |
*
* @param {Eb_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const eb_title = /** @type {((inputs?: Eb_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Eb_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.eb_title(inputs)
	return __en.eb_title(inputs)
});
/**
* | output |
* | --- |
* | "Left" |
*
* @param {Envelopes_LeftInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const envelopes_left = /** @type {((inputs?: Envelopes_LeftInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Envelopes_LeftInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.envelopes_left(inputs)
	return __en.envelopes_left(inputs)
});
/**
* | output |
* | --- |
* | "Budgeted Expenses" |
*
* @param {Envelopes_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const envelopes_title = /** @type {((inputs?: Envelopes_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Envelopes_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.envelopes_title(inputs)
	return __en.envelopes_title(inputs)
});
/**
* | output |
* | --- |
* | "Failed to update budget" |
*
* @param {Envelopes_Update_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const envelopes_update_error = /** @type {((inputs?: Envelopes_Update_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Envelopes_Update_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.envelopes_update_error(inputs)
	return __en.envelopes_update_error(inputs)
});
/**
* | output |
* | --- |
* | "Select accounts, then submit to fetch transactions." |
*
* @param {Fetcher_DescriptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const fetcher_description = /** @type {((inputs?: Fetcher_DescriptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fetcher_DescriptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.fetcher_description(inputs)
	return __en.fetcher_description(inputs)
});
/**
* | output |
* | --- |
* | "No transactions found for the selected accounts." |
*
* @param {Fetcher_Empty_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const fetcher_empty_toast = /** @type {((inputs?: Fetcher_Empty_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fetcher_Empty_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.fetcher_empty_toast(inputs)
	return __en.fetcher_empty_toast(inputs)
});
/**
* | output |
* | --- |
* | "Unable to fetch transactions" |
*
* @param {Fetcher_Error_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const fetcher_error_toast = /** @type {((inputs?: Fetcher_Error_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fetcher_Error_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.fetcher_error_toast(inputs)
	return __en.fetcher_error_toast(inputs)
});
/**
* | output |
* | --- |
* | "Loading accounts..." |
*
* @param {Fetcher_Loading_AccountsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const fetcher_loading_accounts = /** @type {((inputs?: Fetcher_Loading_AccountsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fetcher_Loading_AccountsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.fetcher_loading_accounts(inputs)
	return __en.fetcher_loading_accounts(inputs)
});
/**
* | output |
* | --- |
* | "No accounts available." |
*
* @param {Fetcher_No_AccountsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const fetcher_no_accounts = /** @type {((inputs?: Fetcher_No_AccountsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fetcher_No_AccountsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.fetcher_no_accounts(inputs)
	return __en.fetcher_no_accounts(inputs)
});
/**
* | output |
* | --- |
* | "Fetch" |
*
* @param {Fetcher_SubmitInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const fetcher_submit = /** @type {((inputs?: Fetcher_SubmitInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fetcher_SubmitInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.fetcher_submit(inputs)
	return __en.fetcher_submit(inputs)
});
/**
* | output |
* | --- |
* | "Transactions fetched successfully!" |
*
* @param {Fetcher_Success_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const fetcher_success_toast = /** @type {((inputs?: Fetcher_Success_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fetcher_Success_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.fetcher_success_toast(inputs)
	return __en.fetcher_success_toast(inputs)
});
/**
* | output |
* | --- |
* | "Fetcher" |
*
* @param {Fetcher_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const fetcher_title = /** @type {((inputs?: Fetcher_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fetcher_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.fetcher_title(inputs)
	return __en.fetcher_title(inputs)
});
/**
* | output |
* | --- |
* | "Add Income" |
*
* @param {Incomes_AddInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_add = /** @type {((inputs?: Incomes_AddInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_AddInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_add(inputs)
	return __en.incomes_add(inputs)
});
/**
* | output |
* | --- |
* | "Income added" |
*
* @param {Incomes_Added_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_added_toast = /** @type {((inputs?: Incomes_Added_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_Added_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_added_toast(inputs)
	return __en.incomes_added_toast(inputs)
});
/**
* | output |
* | --- |
* | "Delete income" |
*
* @param {Incomes_Delete_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_delete_aria = /** @type {((inputs?: Incomes_Delete_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_Delete_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_delete_aria(inputs)
	return __en.incomes_delete_aria(inputs)
});
/**
* | output |
* | --- |
* | "Income deleted" |
*
* @param {Incomes_Deleted_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_deleted_toast = /** @type {((inputs?: Incomes_Deleted_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_Deleted_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_deleted_toast(inputs)
	return __en.incomes_deleted_toast(inputs)
});
/**
* | output |
* | --- |
* | "Due" |
*
* @param {Incomes_DueInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_due = /** @type {((inputs?: Incomes_DueInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_DueInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_due(inputs)
	return __en.incomes_due(inputs)
});
/**
* | output |
* | --- |
* | "Due Date (optional)" |
*
* @param {Incomes_Due_Date_OptionalInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_due_date_optional = /** @type {((inputs?: Incomes_Due_Date_OptionalInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_Due_Date_OptionalInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_due_date_optional(inputs)
	return __en.incomes_due_date_optional(inputs)
});
/**
* | output |
* | --- |
* | "e.g. 2026-10-29 or 29/10" |
*
* @param {Incomes_Due_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_due_placeholder = /** @type {((inputs?: Incomes_Due_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_Due_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_due_placeholder(inputs)
	return __en.incomes_due_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Edit Income" |
*
* @param {Incomes_EditInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_edit = /** @type {((inputs?: Incomes_EditInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_EditInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_edit(inputs)
	return __en.incomes_edit(inputs)
});
/**
* | output |
* | --- |
* | "Edit income" |
*
* @param {Incomes_Edit_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_edit_aria = /** @type {((inputs?: Incomes_Edit_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_Edit_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_edit_aria(inputs)
	return __en.incomes_edit_aria(inputs)
});
/**
* | output |
* | --- |
* | "No incomes recorded for this month yet." |
*
* @param {Incomes_EmptyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_empty = /** @type {((inputs?: Incomes_EmptyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_EmptyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_empty(inputs)
	return __en.incomes_empty(inputs)
});
/**
* | output |
* | --- |
* | "Expected" |
*
* @param {Incomes_ExpectedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_expected = /** @type {((inputs?: Incomes_ExpectedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_ExpectedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_expected(inputs)
	return __en.incomes_expected(inputs)
});
/**
* | output |
* | --- |
* | "Expected (€)" |
*
* @param {Incomes_Expected_EurInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_expected_eur = /** @type {((inputs?: Incomes_Expected_EurInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_Expected_EurInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_expected_eur(inputs)
	return __en.incomes_expected_eur(inputs)
});
/**
* | output |
* | --- |
* | "Salary, Bonus..." |
*
* @param {Incomes_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_name_placeholder = /** @type {((inputs?: Incomes_Name_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_Name_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_name_placeholder(inputs)
	return __en.incomes_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save income" |
*
* @param {Incomes_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_save_error = /** @type {((inputs?: Incomes_Save_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_Save_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_save_error(inputs)
	return __en.incomes_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Incomes" |
*
* @param {Incomes_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_title = /** @type {((inputs?: Incomes_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_title(inputs)
	return __en.incomes_title(inputs)
});
/**
* | output |
* | --- |
* | "Income updated" |
*
* @param {Incomes_Updated_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const incomes_updated_toast = /** @type {((inputs?: Incomes_Updated_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Incomes_Updated_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.incomes_updated_toast(inputs)
	return __en.incomes_updated_toast(inputs)
});
/**
* | output |
* | --- |
* | "Investment account added" |
*
* @param {Inv_Account_Added_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_account_added_toast = /** @type {((inputs?: Inv_Account_Added_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Account_Added_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_account_added_toast(inputs)
	return __en.inv_account_added_toast(inputs)
});
/**
* | output |
* | --- |
* | "This will permanently delete this investment account and all of its recorded operations." |
*
* @param {Inv_Account_Delete_Confirm_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_account_delete_confirm_desc = /** @type {((inputs?: Inv_Account_Delete_Confirm_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Account_Delete_Confirm_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_account_delete_confirm_desc(inputs)
	return __en.inv_account_delete_confirm_desc(inputs)
});
/**
* | output |
* | --- |
* | "Delete \"{name}\"?" |
*
* @param {Inv_Account_Delete_Confirm_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_account_delete_confirm_title = /** @type {((inputs: Inv_Account_Delete_Confirm_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Account_Delete_Confirm_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_account_delete_confirm_title(inputs)
	return __en.inv_account_delete_confirm_title(inputs)
});
/**
* | output |
* | --- |
* | "Investment account deleted" |
*
* @param {Inv_Account_Deleted_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_account_deleted_toast = /** @type {((inputs?: Inv_Account_Deleted_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Account_Deleted_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_account_deleted_toast(inputs)
	return __en.inv_account_deleted_toast(inputs)
});
/**
* | output |
* | --- |
* | "Track PEA, CTO, Assurance-Vie, or brokerage accounts." |
*
* @param {Inv_Account_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_account_dialog_desc = /** @type {((inputs?: Inv_Account_Dialog_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Account_Dialog_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_account_dialog_desc(inputs)
	return __en.inv_account_dialog_desc(inputs)
});
/**
* | output |
* | --- |
* | "Fortuneo - CTO, Fortuneo - PEA, Linxea - Assurance Vie..." |
*
* @param {Inv_Account_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_account_name_placeholder = /** @type {((inputs?: Inv_Account_Name_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Account_Name_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_account_name_placeholder(inputs)
	return __en.inv_account_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Investment account updated" |
*
* @param {Inv_Account_Updated_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_account_updated_toast = /** @type {((inputs?: Inv_Account_Updated_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Account_Updated_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_account_updated_toast(inputs)
	return __en.inv_account_updated_toast(inputs)
});
/**
* | output |
* | --- |
* | "Add Investment Account" |
*
* @param {Inv_Add_AccountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_add_account = /** @type {((inputs?: Inv_Add_AccountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Add_AccountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_add_account(inputs)
	return __en.inv_add_account(inputs)
});
/**
* | output |
* | --- |
* | "Add Operation" |
*
* @param {Inv_Add_OperationInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_add_operation = /** @type {((inputs?: Inv_Add_OperationInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Add_OperationInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_add_operation(inputs)
	return __en.inv_add_operation(inputs)
});
/**
* | output |
* | --- |
* | "All Accounts" |
*
* @param {Inv_All_AccountsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_all_accounts = /** @type {((inputs?: Inv_All_AccountsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_All_AccountsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_all_accounts(inputs)
	return __en.inv_all_accounts(inputs)
});
/**
* | output |
* | --- |
* | "Allocation" |
*
* @param {Inv_Chart_AllocationInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_chart_allocation = /** @type {((inputs?: Inv_Chart_AllocationInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Chart_AllocationInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_chart_allocation(inputs)
	return __en.inv_chart_allocation(inputs)
});
/**
* | output |
* | --- |
* | "By Account" |
*
* @param {Inv_Chart_By_AccountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_chart_by_account = /** @type {((inputs?: Inv_Chart_By_AccountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Chart_By_AccountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_chart_by_account(inputs)
	return __en.inv_chart_by_account(inputs)
});
/**
* | output |
* | --- |
* | "By Class" |
*
* @param {Inv_Chart_By_ClassInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_chart_by_class = /** @type {((inputs?: Inv_Chart_By_ClassInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Chart_By_ClassInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_chart_by_class(inputs)
	return __en.inv_chart_by_class(inputs)
});
/**
* | output |
* | --- |
* | "By Holding" |
*
* @param {Inv_Chart_By_SecurityInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_chart_by_security = /** @type {((inputs?: Inv_Chart_By_SecurityInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Chart_By_SecurityInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_chart_by_security(inputs)
	return __en.inv_chart_by_security(inputs)
});
/**
* | output |
* | --- |
* | "Record your first investment operation to see portfolio evolution over time." |
*
* @param {Inv_Chart_EmptyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_chart_empty = /** @type {((inputs?: Inv_Chart_EmptyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Chart_EmptyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_chart_empty(inputs)
	return __en.inv_chart_empty(inputs)
});
/**
* | output |
* | --- |
* | "Add positions to see your portfolio allocation." |
*
* @param {Inv_Chart_Empty_AllocationInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_chart_empty_allocation = /** @type {((inputs?: Inv_Chart_Empty_AllocationInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Chart_Empty_AllocationInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_chart_empty_allocation(inputs)
	return __en.inv_chart_empty_allocation(inputs)
});
/**
* | output |
* | --- |
* | "Value vs Invested" |
*
* @param {Inv_Chart_EvolutionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_chart_evolution = /** @type {((inputs?: Inv_Chart_EvolutionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Chart_EvolutionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_chart_evolution(inputs)
	return __en.inv_chart_evolution(inputs)
});
/**
* | output |
* | --- |
* | "Net Invested" |
*
* @param {Inv_Chart_InvestedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_chart_invested = /** @type {((inputs?: Inv_Chart_InvestedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Chart_InvestedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_chart_invested(inputs)
	return __en.inv_chart_invested(inputs)
});
/**
* | output |
* | --- |
* | "Portfolio Value" |
*
* @param {Inv_Chart_ValueInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_chart_value = /** @type {((inputs?: Inv_Chart_ValueInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Chart_ValueInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_chart_value(inputs)
	return __en.inv_chart_value(inputs)
});
/**
* | output |
* | --- |
* | "Account" |
*
* @param {Inv_Col_AccountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_col_account = /** @type {((inputs?: Inv_Col_AccountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Col_AccountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_col_account(inputs)
	return __en.inv_col_account(inputs)
});
/**
* | output |
* | --- |
* | "Avg Cost" |
*
* @param {Inv_Col_Avg_CostInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_col_avg_cost = /** @type {((inputs?: Inv_Col_Avg_CostInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Col_Avg_CostInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_col_avg_cost(inputs)
	return __en.inv_col_avg_cost(inputs)
});
/**
* | output |
* | --- |
* | "P&L" |
*
* @param {Inv_Col_PnlInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_col_pnl = /** @type {((inputs?: Inv_Col_PnlInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Col_PnlInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_col_pnl(inputs)
	return __en.inv_col_pnl(inputs)
});
/**
* | output |
* | --- |
* | "Price" |
*
* @param {Inv_Col_PriceInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_col_price = /** @type {((inputs?: Inv_Col_PriceInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Col_PriceInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_col_price(inputs)
	return __en.inv_col_price(inputs)
});
/**
* | output |
* | --- |
* | "Qty" |
*
* @param {Inv_Col_QuantityInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_col_quantity = /** @type {((inputs?: Inv_Col_QuantityInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Col_QuantityInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_col_quantity(inputs)
	return __en.inv_col_quantity(inputs)
});
/**
* | output |
* | --- |
* | "Security" |
*
* @param {Inv_Col_SecurityInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_col_security = /** @type {((inputs?: Inv_Col_SecurityInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Col_SecurityInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_col_security(inputs)
	return __en.inv_col_security(inputs)
});
/**
* | output |
* | --- |
* | "Value" |
*
* @param {Inv_Col_ValueInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_col_value = /** @type {((inputs?: Inv_Col_ValueInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Col_ValueInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_col_value(inputs)
	return __en.inv_col_value(inputs)
});
/**
* | output |
* | --- |
* | "Weight" |
*
* @param {Inv_Col_WeightInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_col_weight = /** @type {((inputs?: Inv_Col_WeightInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Col_WeightInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_col_weight(inputs)
	return __en.inv_col_weight(inputs)
});
/**
* | output |
* | --- |
* | "Edit Investment Account" |
*
* @param {Inv_Edit_AccountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_edit_account = /** @type {((inputs?: Inv_Edit_AccountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Edit_AccountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_edit_account(inputs)
	return __en.inv_edit_account(inputs)
});
/**
* | output |
* | --- |
* | "Edit Operation" |
*
* @param {Inv_Edit_OperationInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_edit_operation = /** @type {((inputs?: Inv_Edit_OperationInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Edit_OperationInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_edit_operation(inputs)
	return __en.inv_edit_operation(inputs)
});
/**
* | output |
* | --- |
* | "Add your PEA, CTO, or Assurance-Vie account to track ETFs, stocks, and Euro Funds with live Yahoo Finance quotes." |
*
* @param {Inv_Empty_Accounts_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_empty_accounts_desc = /** @type {((inputs?: Inv_Empty_Accounts_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Empty_Accounts_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_empty_accounts_desc(inputs)
	return __en.inv_empty_accounts_desc(inputs)
});
/**
* | output |
* | --- |
* | "No investment accounts configured yet" |
*
* @param {Inv_Empty_Accounts_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_empty_accounts_title = /** @type {((inputs?: Inv_Empty_Accounts_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Empty_Accounts_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_empty_accounts_title(inputs)
	return __en.inv_empty_accounts_title(inputs)
});
/**
* | output |
* | --- |
* | "Record a first purchase or initialize an existing position to start tracking your portfolio value and performance." |
*
* @param {Inv_Empty_Positions_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_empty_positions_desc = /** @type {((inputs?: Inv_Empty_Positions_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Empty_Positions_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_empty_positions_desc(inputs)
	return __en.inv_empty_positions_desc(inputs)
});
/**
* | output |
* | --- |
* | "No positions recorded yet" |
*
* @param {Inv_Empty_Positions_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_empty_positions_title = /** @type {((inputs?: Inv_Empty_Positions_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Empty_Positions_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_empty_positions_title(inputs)
	return __en.inv_empty_positions_title(inputs)
});
/**
* | output |
* | --- |
* | "Search other" |
*
* @param {Inv_Fortuneo_Change_TickerInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_change_ticker = /** @type {((inputs?: Inv_Fortuneo_Change_TickerInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Change_TickerInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_change_ticker(inputs)
	return __en.inv_fortuneo_change_ticker(inputs)
});
/**
* | output |
* | --- |
* | "Choose .zip or .csv file" |
*
* @param {Inv_Fortuneo_Choose_FileInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_choose_file = /** @type {((inputs?: Inv_Fortuneo_Choose_FileInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Choose_FileInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_choose_file(inputs)
	return __en.inv_fortuneo_choose_file(inputs)
});
/**
* | output |
* | --- |
* | "Upload the ZIP or CSV file downloaded from Fortuneo (HistoriqueOperationsBourse). Duplicates are skipped automatically." |
*
* @param {Inv_Fortuneo_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_dialog_desc = /** @type {((inputs?: Inv_Fortuneo_Dialog_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Dialog_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_dialog_desc(inputs)
	return __en.inv_fortuneo_dialog_desc(inputs)
});
/**
* | output |
* | --- |
* | "Import Fortuneo Export" |
*
* @param {Inv_Fortuneo_Dialog_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_dialog_title = /** @type {((inputs?: Inv_Fortuneo_Dialog_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Dialog_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_dialog_title(inputs)
	return __en.inv_fortuneo_dialog_title(inputs)
});
/**
* | output |
* | --- |
* | "Fortuneo (ZIP / CSV)" |
*
* @param {Inv_Fortuneo_Dropdown_ItemInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_dropdown_item = /** @type {((inputs?: Inv_Fortuneo_Dropdown_ItemInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Dropdown_ItemInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_dropdown_item(inputs)
	return __en.inv_fortuneo_dropdown_item(inputs)
});
/**
* | output |
* | --- |
* | "Fortuneo ZIP / CSV file" |
*
* @param {Inv_Fortuneo_File_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_file_label = /** @type {((inputs?: Inv_Fortuneo_File_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_File_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_file_label(inputs)
	return __en.inv_fortuneo_file_label(inputs)
});
/**
* | output |
* | --- |
* | "Import Fortuneo" |
*
* @param {Inv_Fortuneo_Import_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_import_button = /** @type {((inputs?: Inv_Fortuneo_Import_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Import_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_import_button(inputs)
	return __en.inv_fortuneo_import_button(inputs)
});
/**
* | output |
* | --- |
* | "Failed to import operations" |
*
* @param {Inv_Fortuneo_Import_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_import_error = /** @type {((inputs?: Inv_Fortuneo_Import_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Import_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_import_error(inputs)
	return __en.inv_fortuneo_import_error(inputs)
});
/**
* | output |
* | --- |
* | "Import {count} operation(s)" |
*
* @param {Inv_Fortuneo_Import_SubmitInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_import_submit = /** @type {((inputs: Inv_Fortuneo_Import_SubmitInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Import_SubmitInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_import_submit(inputs)
	return __en.inv_fortuneo_import_submit(inputs)
});
/**
* | output |
* | --- |
* | "Imported {imported} operation(s)" |
*
* @param {Inv_Fortuneo_Imported_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_imported_toast = /** @type {((inputs: Inv_Fortuneo_Imported_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Imported_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_imported_toast(inputs)
	return __en.inv_fortuneo_imported_toast(inputs)
});
/**
* | output |
* | --- |
* | "Imported {imported} operation(s), skipped {skipped} duplicate(s)" |
*
* @param {Inv_Fortuneo_Imported_With_Skipped_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_imported_with_skipped_toast = /** @type {((inputs: Inv_Fortuneo_Imported_With_Skipped_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Imported_With_Skipped_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_imported_with_skipped_toast(inputs)
	return __en.inv_fortuneo_imported_with_skipped_toast(inputs)
});
/**
* | output |
* | --- |
* | "Match Fortuneo labels to Yahoo Finance tickers" |
*
* @param {Inv_Fortuneo_Mapping_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_mapping_title = /** @type {((inputs?: Inv_Fortuneo_Mapping_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Mapping_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_mapping_title(inputs)
	return __en.inv_fortuneo_mapping_title(inputs)
});
/**
* | output |
* | --- |
* | "{count} op." |
*
* @param {Inv_Fortuneo_Ops_CountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_ops_count = /** @type {((inputs: Inv_Fortuneo_Ops_CountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Ops_CountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_ops_count(inputs)
	return __en.inv_fortuneo_ops_count(inputs)
});
/**
* | output |
* | --- |
* | "Failed to parse Fortuneo file" |
*
* @param {Inv_Fortuneo_Parse_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_parse_error = /** @type {((inputs?: Inv_Fortuneo_Parse_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Parse_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_parse_error(inputs)
	return __en.inv_fortuneo_parse_error(inputs)
});
/**
* | output |
* | --- |
* | "Reading file & matching tickers..." |
*
* @param {Inv_Fortuneo_ParsingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_parsing = /** @type {((inputs?: Inv_Fortuneo_ParsingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_ParsingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_parsing(inputs)
	return __en.inv_fortuneo_parsing(inputs)
});
/**
* | output |
* | --- |
* | "Operations preview" |
*
* @param {Inv_Fortuneo_Preview_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_preview_title = /** @type {((inputs?: Inv_Fortuneo_Preview_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Preview_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_preview_title(inputs)
	return __en.inv_fortuneo_preview_title(inputs)
});
/**
* | output |
* | --- |
* | "({count} non-trade row(s) ignored)" |
*
* @param {Inv_Fortuneo_Skipped_Non_TradesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_skipped_non_trades = /** @type {((inputs: Inv_Fortuneo_Skipped_Non_TradesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_Skipped_Non_TradesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_skipped_non_trades(inputs)
	return __en.inv_fortuneo_skipped_non_trades(inputs)
});
/**
* | output |
* | --- |
* | "{rows} operation(s) detected across {securities} security(ies)" |
*
* @param {Inv_Fortuneo_SummaryInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_summary = /** @type {((inputs: Inv_Fortuneo_SummaryInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_SummaryInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_summary(inputs)
	return __en.inv_fortuneo_summary(inputs)
});
/**
* | output |
* | --- |
* | "No match found — search ticker" |
*
* @param {Inv_Fortuneo_UnmatchedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_fortuneo_unmatched = /** @type {((inputs?: Inv_Fortuneo_UnmatchedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Fortuneo_UnmatchedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_fortuneo_unmatched(inputs)
	return __en.inv_fortuneo_unmatched(inputs)
});
/**
* | output |
* | --- |
* | "Daily Change" |
*
* @param {Inv_Kpi_Day_ChangeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_kpi_day_change = /** @type {((inputs?: Inv_Kpi_Day_ChangeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Kpi_Day_ChangeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_kpi_day_change(inputs)
	return __en.inv_kpi_day_change(inputs)
});
/**
* | output |
* | --- |
* | "No live quote delta yet" |
*
* @param {Inv_Kpi_Day_Change_NaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_kpi_day_change_na = /** @type {((inputs?: Inv_Kpi_Day_Change_NaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Kpi_Day_Change_NaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_kpi_day_change_na(inputs)
	return __en.inv_kpi_day_change_na(inputs)
});
/**
* | output |
* | --- |
* | "Net Invested" |
*
* @param {Inv_Kpi_InvestedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_kpi_invested = /** @type {((inputs?: Inv_Kpi_InvestedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Kpi_InvestedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_kpi_invested(inputs)
	return __en.inv_kpi_invested(inputs)
});
/**
* | output |
* | --- |
* | "{count} open position(s)" |
*
* @param {Inv_Kpi_Positions_CountInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_kpi_positions_count = /** @type {((inputs: Inv_Kpi_Positions_CountInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Kpi_Positions_CountInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_kpi_positions_count(inputs)
	return __en.inv_kpi_positions_count(inputs)
});
/**
* | output |
* | --- |
* | "Realized: {realized} · Div.: {dividends}" |
*
* @param {Inv_Kpi_Realized_DividendsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_kpi_realized_dividends = /** @type {((inputs: Inv_Kpi_Realized_DividendsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Kpi_Realized_DividendsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_kpi_realized_dividends(inputs)
	return __en.inv_kpi_realized_dividends(inputs)
});
/**
* | output |
* | --- |
* | "Portfolio Value" |
*
* @param {Inv_Kpi_Total_ValueInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_kpi_total_value = /** @type {((inputs?: Inv_Kpi_Total_ValueInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Kpi_Total_ValueInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_kpi_total_value(inputs)
	return __en.inv_kpi_total_value(inputs)
});
/**
* | output |
* | --- |
* | "Unrealized P&L" |
*
* @param {Inv_Kpi_UnrealizedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_kpi_unrealized = /** @type {((inputs?: Inv_Kpi_UnrealizedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Kpi_UnrealizedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_kpi_unrealized(inputs)
	return __en.inv_kpi_unrealized(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load investments: {message}" |
*
* @param {Inv_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_load_error = /** @type {((inputs: Inv_Load_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Load_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_load_error(inputs)
	return __en.inv_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Loading investments..." |
*
* @param {Inv_LoadingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_loading = /** @type {((inputs?: Inv_LoadingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_LoadingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_loading(inputs)
	return __en.inv_loading(inputs)
});
/**
* | output |
* | --- |
* | "Manual" |
*
* @param {Inv_Manual_BadgeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_manual_badge = /** @type {((inputs?: Inv_Manual_BadgeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Manual_BadgeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_manual_badge(inputs)
	return __en.inv_manual_badge(inputs)
});
/**
* | output |
* | --- |
* | "Failed to update price" |
*
* @param {Inv_Manual_Price_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_manual_price_error = /** @type {((inputs?: Inv_Manual_Price_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Manual_Price_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_manual_price_error(inputs)
	return __en.inv_manual_price_error(inputs)
});
/**
* | output |
* | --- |
* | "Manual price updated" |
*
* @param {Inv_Manual_Price_UpdatedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_manual_price_updated = /** @type {((inputs?: Inv_Manual_Price_UpdatedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Manual_Price_UpdatedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_manual_price_updated(inputs)
	return __en.inv_manual_price_updated(inputs)
});
/**
* | output |
* | --- |
* | "No quote" |
*
* @param {Inv_No_Quote_BadgeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_no_quote_badge = /** @type {((inputs?: Inv_No_Quote_BadgeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_No_Quote_BadgeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_no_quote_badge(inputs)
	return __en.inv_no_quote_badge(inputs)
});
/**
* | output |
* | --- |
* | "Account" |
*
* @param {Inv_Op_Account_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_account_label = /** @type {((inputs?: Inv_Op_Account_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Account_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_account_label(inputs)
	return __en.inv_op_account_label(inputs)
});
/**
* | output |
* | --- |
* | "Amount (€)" |
*
* @param {Inv_Op_Amount_Eur_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_amount_eur_label = /** @type {((inputs?: Inv_Op_Amount_Eur_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Amount_Eur_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_amount_eur_label(inputs)
	return __en.inv_op_amount_eur_label(inputs)
});
/**
* | output |
* | --- |
* | "Asset Class" |
*
* @param {Inv_Op_Asset_Class_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_asset_class_label = /** @type {((inputs?: Inv_Op_Asset_Class_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Asset_Class_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_asset_class_label(inputs)
	return __en.inv_op_asset_class_label(inputs)
});
/**
* | output |
* | --- |
* | "Date" |
*
* @param {Inv_Op_Date_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_date_label = /** @type {((inputs?: Inv_Op_Date_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Date_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_date_label(inputs)
	return __en.inv_op_date_label(inputs)
});
/**
* | output |
* | --- |
* | "Record a buy, sell, dividend, or initialize an existing position." |
*
* @param {Inv_Op_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_dialog_desc = /** @type {((inputs?: Inv_Op_Dialog_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Dialog_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_dialog_desc(inputs)
	return __en.inv_op_dialog_desc(inputs)
});
/**
* | output |
* | --- |
* | "For a Euro Fund, simply enter each monthly deposit as Buy and annual returns as Interest." |
*
* @param {Inv_Op_Euro_Fund_HintInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_euro_fund_hint = /** @type {((inputs?: Inv_Op_Euro_Fund_HintInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Euro_Fund_HintInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_euro_fund_hint(inputs)
	return __en.inv_op_euro_fund_hint(inputs)
});
/**
* | output |
* | --- |
* | "Fees (€)" |
*
* @param {Inv_Op_Fees_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_fees_label = /** @type {((inputs?: Inv_Op_Fees_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Fees_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_fees_label(inputs)
	return __en.inv_op_fees_label(inputs)
});
/**
* | output |
* | --- |
* | "ISIN (optional)" |
*
* @param {Inv_Op_Isin_OptionalInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_isin_optional = /** @type {((inputs?: Inv_Op_Isin_OptionalInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Isin_OptionalInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_isin_optional(inputs)
	return __en.inv_op_isin_optional(inputs)
});
/**
* | output |
* | --- |
* | "Asset Name" |
*
* @param {Inv_Op_Manual_Name_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_manual_name_label = /** @type {((inputs?: Inv_Op_Manual_Name_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Manual_Name_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_manual_name_label(inputs)
	return __en.inv_op_manual_name_label(inputs)
});
/**
* | output |
* | --- |
* | "e.g. Linxea Fonds Euros, SCPI Remake Live..." |
*
* @param {Inv_Op_Manual_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_manual_name_placeholder = /** @type {((inputs?: Inv_Op_Manual_Name_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Manual_Name_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_manual_name_placeholder(inputs)
	return __en.inv_op_manual_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Existing security" |
*
* @param {Inv_Op_Mode_ExistingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_mode_existing = /** @type {((inputs?: Inv_Op_Mode_ExistingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Mode_ExistingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_mode_existing(inputs)
	return __en.inv_op_mode_existing(inputs)
});
/**
* | output |
* | --- |
* | "Manual asset (Euro Fund / SCPI)" |
*
* @param {Inv_Op_Mode_ManualInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_mode_manual = /** @type {((inputs?: Inv_Op_Mode_ManualInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Mode_ManualInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_mode_manual(inputs)
	return __en.inv_op_mode_manual(inputs)
});
/**
* | output |
* | --- |
* | "Search Yahoo Finance" |
*
* @param {Inv_Op_Mode_SearchInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_mode_search = /** @type {((inputs?: Inv_Op_Mode_SearchInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Mode_SearchInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_mode_search(inputs)
	return __en.inv_op_mode_search(inputs)
});
/**
* | output |
* | --- |
* | "No matching securities found." |
*
* @param {Inv_Op_No_ResultsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_no_results = /** @type {((inputs?: Inv_Op_No_ResultsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_No_ResultsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_no_results(inputs)
	return __en.inv_op_no_results(inputs)
});
/**
* | output |
* | --- |
* | "Note (optional)" |
*
* @param {Inv_Op_Note_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_note_label = /** @type {((inputs?: Inv_Op_Note_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Note_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_note_label(inputs)
	return __en.inv_op_note_label(inputs)
});
/**
* | output |
* | --- |
* | "e.g. Monthly DCA, Initial position..." |
*
* @param {Inv_Op_Note_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_note_placeholder = /** @type {((inputs?: Inv_Op_Note_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Note_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_note_placeholder(inputs)
	return __en.inv_op_note_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Quantity" |
*
* @param {Inv_Op_Quantity_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_quantity_label = /** @type {((inputs?: Inv_Op_Quantity_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Quantity_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_quantity_label(inputs)
	return __en.inv_op_quantity_label(inputs)
});
/**
* | output |
* | --- |
* | "Search ticker, name or ISIN (e.g. CW8.PA, WPEA.PA, AAPL)..." |
*
* @param {Inv_Op_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_search_placeholder = /** @type {((inputs?: Inv_Op_Search_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Search_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_search_placeholder(inputs)
	return __en.inv_op_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Searching..." |
*
* @param {Inv_Op_SearchingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_searching = /** @type {((inputs?: Inv_Op_SearchingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_SearchingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_searching(inputs)
	return __en.inv_op_searching(inputs)
});
/**
* | output |
* | --- |
* | "Security" |
*
* @param {Inv_Op_Security_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_security_label = /** @type {((inputs?: Inv_Op_Security_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Security_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_security_label(inputs)
	return __en.inv_op_security_label(inputs)
});
/**
* | output |
* | --- |
* | "Select a security" |
*
* @param {Inv_Op_Select_Security_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_select_security_placeholder = /** @type {((inputs?: Inv_Op_Select_Security_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Select_Security_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_select_security_placeholder(inputs)
	return __en.inv_op_select_security_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Selected" |
*
* @param {Inv_Op_Selected_SecurityInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_selected_security = /** @type {((inputs?: Inv_Op_Selected_SecurityInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Selected_SecurityInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_selected_security(inputs)
	return __en.inv_op_selected_security(inputs)
});
/**
* | output |
* | --- |
* | "Auto-computed from quantity × price + fees (editable for FX / exact broker total)." |
*
* @param {Inv_Op_Total_Eur_HintInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_total_eur_hint = /** @type {((inputs?: Inv_Op_Total_Eur_HintInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Total_Eur_HintInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_total_eur_hint(inputs)
	return __en.inv_op_total_eur_hint(inputs)
});
/**
* | output |
* | --- |
* | "Total Net Paid / Received (€)" |
*
* @param {Inv_Op_Total_Eur_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_total_eur_label = /** @type {((inputs?: Inv_Op_Total_Eur_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Total_Eur_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_total_eur_label(inputs)
	return __en.inv_op_total_eur_label(inputs)
});
/**
* | output |
* | --- |
* | "Operation Type" |
*
* @param {Inv_Op_Type_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_type_label = /** @type {((inputs?: Inv_Op_Type_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Type_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_type_label(inputs)
	return __en.inv_op_type_label(inputs)
});
/**
* | output |
* | --- |
* | "Unit Price ({currency})" |
*
* @param {Inv_Op_Unit_Price_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_op_unit_price_label = /** @type {((inputs: Inv_Op_Unit_Price_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Op_Unit_Price_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_op_unit_price_label(inputs)
	return __en.inv_op_unit_price_label(inputs)
});
/**
* | output |
* | --- |
* | "Holdings" |
*
* @param {Inv_Positions_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_positions_title = /** @type {((inputs?: Inv_Positions_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Positions_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_positions_title(inputs)
	return __en.inv_positions_title(inputs)
});
/**
* | output |
* | --- |
* | "Add buy/sell operation for {name}" |
*
* @param {Inv_Quick_Buy_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_quick_buy_title = /** @type {((inputs: Inv_Quick_Buy_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Quick_Buy_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_quick_buy_title(inputs)
	return __en.inv_quick_buy_title(inputs)
});
/**
* | output |
* | --- |
* | "{count} position(s) have no cached market price yet (valued at cost basis). Click Refresh Quotes to fetch live prices." |
*
* @param {Inv_Quotes_Missing_BannerInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_quotes_missing_banner = /** @type {((inputs: Inv_Quotes_Missing_BannerInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Quotes_Missing_BannerInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_quotes_missing_banner(inputs)
	return __en.inv_quotes_missing_banner(inputs)
});
/**
* | output |
* | --- |
* | "Quotes: {time}" |
*
* @param {Inv_Quotes_Updated_AtInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_quotes_updated_at = /** @type {((inputs: Inv_Quotes_Updated_AtInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Quotes_Updated_AtInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_quotes_updated_at(inputs)
	return __en.inv_quotes_updated_at(inputs)
});
/**
* | output |
* | --- |
* | "Failed to refresh quotes" |
*
* @param {Inv_Refresh_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_refresh_error = /** @type {((inputs?: Inv_Refresh_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Refresh_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_refresh_error(inputs)
	return __en.inv_refresh_error(inputs)
});
/**
* | output |
* | --- |
* | "Updated {updated} quote(s), {failed} failed" |
*
* @param {Inv_Refresh_Partial_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_refresh_partial_toast = /** @type {((inputs: Inv_Refresh_Partial_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Refresh_Partial_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_refresh_partial_toast(inputs)
	return __en.inv_refresh_partial_toast(inputs)
});
/**
* | output |
* | --- |
* | "Refresh Quotes" |
*
* @param {Inv_Refresh_QuotesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_refresh_quotes = /** @type {((inputs?: Inv_Refresh_QuotesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Refresh_QuotesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_refresh_quotes(inputs)
	return __en.inv_refresh_quotes(inputs)
});
/**
* | output |
* | --- |
* | "Updated {count} market quote(s)" |
*
* @param {Inv_Refresh_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_refresh_toast = /** @type {((inputs: Inv_Refresh_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Refresh_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_refresh_toast(inputs)
	return __en.inv_refresh_toast(inputs)
});
/**
* | output |
* | --- |
* | "Refreshing..." |
*
* @param {Inv_RefreshingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_refreshing = /** @type {((inputs?: Inv_RefreshingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_RefreshingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_refreshing(inputs)
	return __en.inv_refreshing(inputs)
});
/**
* | output |
* | --- |
* | "Operation recorded" |
*
* @param {Inv_Tx_Added_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_added_toast = /** @type {((inputs?: Inv_Tx_Added_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Added_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_added_toast(inputs)
	return __en.inv_tx_added_toast(inputs)
});
/**
* | output |
* | --- |
* | "Date" |
*
* @param {Inv_Tx_Col_DateInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_col_date = /** @type {((inputs?: Inv_Tx_Col_DateInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Col_DateInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_col_date(inputs)
	return __en.inv_tx_col_date(inputs)
});
/**
* | output |
* | --- |
* | "Fees" |
*
* @param {Inv_Tx_Col_FeesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_col_fees = /** @type {((inputs?: Inv_Tx_Col_FeesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Col_FeesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_col_fees(inputs)
	return __en.inv_tx_col_fees(inputs)
});
/**
* | output |
* | --- |
* | "Note" |
*
* @param {Inv_Tx_Col_NoteInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_col_note = /** @type {((inputs?: Inv_Tx_Col_NoteInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Col_NoteInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_col_note(inputs)
	return __en.inv_tx_col_note(inputs)
});
/**
* | output |
* | --- |
* | "Total (€)" |
*
* @param {Inv_Tx_Col_Total_EurInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_col_total_eur = /** @type {((inputs?: Inv_Tx_Col_Total_EurInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Col_Total_EurInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_col_total_eur(inputs)
	return __en.inv_tx_col_total_eur(inputs)
});
/**
* | output |
* | --- |
* | "Type" |
*
* @param {Inv_Tx_Col_TypeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_col_type = /** @type {((inputs?: Inv_Tx_Col_TypeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Col_TypeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_col_type(inputs)
	return __en.inv_tx_col_type(inputs)
});
/**
* | output |
* | --- |
* | "Unit Price" |
*
* @param {Inv_Tx_Col_Unit_PriceInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_col_unit_price = /** @type {((inputs?: Inv_Tx_Col_Unit_PriceInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Col_Unit_PriceInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_col_unit_price(inputs)
	return __en.inv_tx_col_unit_price(inputs)
});
/**
* | output |
* | --- |
* | "Failed to delete operation" |
*
* @param {Inv_Tx_Delete_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_delete_error = /** @type {((inputs?: Inv_Tx_Delete_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Delete_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_delete_error(inputs)
	return __en.inv_tx_delete_error(inputs)
});
/**
* | output |
* | --- |
* | "Operation deleted" |
*
* @param {Inv_Tx_Deleted_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_deleted_toast = /** @type {((inputs?: Inv_Tx_Deleted_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Deleted_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_deleted_toast(inputs)
	return __en.inv_tx_deleted_toast(inputs)
});
/**
* | output |
* | --- |
* | "No operations recorded yet." |
*
* @param {Inv_Tx_EmptyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_empty = /** @type {((inputs?: Inv_Tx_EmptyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_EmptyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_empty(inputs)
	return __en.inv_tx_empty(inputs)
});
/**
* | output |
* | --- |
* | "Operations Log" |
*
* @param {Inv_Tx_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_title = /** @type {((inputs?: Inv_Tx_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_title(inputs)
	return __en.inv_tx_title(inputs)
});
/**
* | output |
* | --- |
* | "Buy" |
*
* @param {Inv_Tx_Type_BuyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_type_buy = /** @type {((inputs?: Inv_Tx_Type_BuyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Type_BuyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_type_buy(inputs)
	return __en.inv_tx_type_buy(inputs)
});
/**
* | output |
* | --- |
* | "Dividend" |
*
* @param {Inv_Tx_Type_DividendInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_type_dividend = /** @type {((inputs?: Inv_Tx_Type_DividendInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Type_DividendInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_type_dividend(inputs)
	return __en.inv_tx_type_dividend(inputs)
});
/**
* | output |
* | --- |
* | "Interest" |
*
* @param {Inv_Tx_Type_InterestInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_type_interest = /** @type {((inputs?: Inv_Tx_Type_InterestInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Type_InterestInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_type_interest(inputs)
	return __en.inv_tx_type_interest(inputs)
});
/**
* | output |
* | --- |
* | "Sell" |
*
* @param {Inv_Tx_Type_SellInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_type_sell = /** @type {((inputs?: Inv_Tx_Type_SellInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Type_SellInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_type_sell(inputs)
	return __en.inv_tx_type_sell(inputs)
});
/**
* | output |
* | --- |
* | "Operation updated" |
*
* @param {Inv_Tx_Updated_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const inv_tx_updated_toast = /** @type {((inputs?: Inv_Tx_Updated_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inv_Tx_Updated_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.inv_tx_updated_toast(inputs)
	return __en.inv_tx_updated_toast(inputs)
});
/**
* | output |
* | --- |
* | "Exclude" |
*
* @param {Mapping_Col_ExcludeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_col_exclude = /** @type {((inputs?: Mapping_Col_ExcludeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Col_ExcludeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_col_exclude(inputs)
	return __en.mapping_col_exclude(inputs)
});
/**
* | output |
* | --- |
* | "From Name" |
*
* @param {Mapping_Col_From_NameInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_col_from_name = /** @type {((inputs?: Mapping_Col_From_NameInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Col_From_NameInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_col_from_name(inputs)
	return __en.mapping_col_from_name(inputs)
});
/**
* | output |
* | --- |
* | "From Price" |
*
* @param {Mapping_Col_From_PriceInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_col_from_price = /** @type {((inputs?: Mapping_Col_From_PriceInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Col_From_PriceInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_col_from_price(inputs)
	return __en.mapping_col_from_price(inputs)
});
/**
* | output |
* | --- |
* | "Mode" |
*
* @param {Mapping_Col_ModeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_col_mode = /** @type {((inputs?: Mapping_Col_ModeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Col_ModeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_col_mode(inputs)
	return __en.mapping_col_mode(inputs)
});
/**
* | output |
* | --- |
* | "To Category" |
*
* @param {Mapping_Col_To_CategoryInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_col_to_category = /** @type {((inputs?: Mapping_Col_To_CategoryInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Col_To_CategoryInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_col_to_category(inputs)
	return __en.mapping_col_to_category(inputs)
});
/**
* | output |
* | --- |
* | "To Name" |
*
* @param {Mapping_Col_To_NameInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_col_to_name = /** @type {((inputs?: Mapping_Col_To_NameInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Col_To_NameInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_col_to_name(inputs)
	return __en.mapping_col_to_name(inputs)
});
/**
* | output |
* | --- |
* | "Create Mapping" |
*
* @param {Mapping_Create_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_create_button = /** @type {((inputs?: Mapping_Create_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Create_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_create_button(inputs)
	return __en.mapping_create_button(inputs)
});
/**
* | output |
* | --- |
* | "Fill in the details to create a new mapping." |
*
* @param {Mapping_Create_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_create_desc = /** @type {((inputs?: Mapping_Create_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Create_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_create_desc(inputs)
	return __en.mapping_create_desc(inputs)
});
/**
* | output |
* | --- |
* | "Create a new mapping" |
*
* @param {Mapping_Create_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_create_title = /** @type {((inputs?: Mapping_Create_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Create_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_create_title(inputs)
	return __en.mapping_create_title(inputs)
});
/**
* | output |
* | --- |
* | "Are you sure you want to delete this mapping?" |
*
* @param {Mapping_Delete_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_delete_desc = /** @type {((inputs?: Mapping_Delete_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Delete_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_delete_desc(inputs)
	return __en.mapping_delete_desc(inputs)
});
/**
* | output |
* | --- |
* | "Delete Mapping" |
*
* @param {Mapping_Delete_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_delete_title = /** @type {((inputs?: Mapping_Delete_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Delete_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_delete_title(inputs)
	return __en.mapping_delete_title(inputs)
});
/**
* | output |
* | --- |
* | "Edit mapping" |
*
* @param {Mapping_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_edit_title = /** @type {((inputs?: Mapping_Edit_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Edit_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_edit_title(inputs)
	return __en.mapping_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "Export YAML" |
*
* @param {Mapping_Export_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_export_button = /** @type {((inputs?: Mapping_Export_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Export_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_export_button(inputs)
	return __en.mapping_export_button(inputs)
});
/**
* | output |
* | --- |
* | "{count} mappings exported." |
*
* @param {Mapping_Export_Copied_Desc_PluralInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_export_copied_desc_plural = /** @type {((inputs: Mapping_Export_Copied_Desc_PluralInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Export_Copied_Desc_PluralInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_export_copied_desc_plural(inputs)
	return __en.mapping_export_copied_desc_plural(inputs)
});
/**
* | output |
* | --- |
* | "{count} mapping exported." |
*
* @param {Mapping_Export_Copied_Desc_SingularInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_export_copied_desc_singular = /** @type {((inputs: Mapping_Export_Copied_Desc_SingularInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Export_Copied_Desc_SingularInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_export_copied_desc_singular(inputs)
	return __en.mapping_export_copied_desc_singular(inputs)
});
/**
* | output |
* | --- |
* | "Copied mappings YAML to clipboard" |
*
* @param {Mapping_Export_Copied_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_export_copied_toast = /** @type {((inputs?: Mapping_Export_Copied_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Export_Copied_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_export_copied_toast(inputs)
	return __en.mapping_export_copied_toast(inputs)
});
/**
* | output |
* | --- |
* | "Copy YAML" |
*
* @param {Mapping_Export_CopyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_export_copy = /** @type {((inputs?: Mapping_Export_CopyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Export_CopyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_export_copy(inputs)
	return __en.mapping_export_copy(inputs)
});
/**
* | output |
* | --- |
* | "Failed to copy to clipboard" |
*
* @param {Mapping_Export_Copy_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_export_copy_error = /** @type {((inputs?: Mapping_Export_Copy_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Export_Copy_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_export_copy_error(inputs)
	return __en.mapping_export_copy_error(inputs)
});
/**
* | output |
* | --- |
* | "{count} mappings ready to copy or download for backup or import into another instance." |
*
* @param {Mapping_Export_Desc_PluralInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_export_desc_plural = /** @type {((inputs: Mapping_Export_Desc_PluralInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Export_Desc_PluralInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_export_desc_plural(inputs)
	return __en.mapping_export_desc_plural(inputs)
});
/**
* | output |
* | --- |
* | "{count} mapping ready to copy or download for backup or import into another instance." |
*
* @param {Mapping_Export_Desc_SingularInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_export_desc_singular = /** @type {((inputs: Mapping_Export_Desc_SingularInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Export_Desc_SingularInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_export_desc_singular(inputs)
	return __en.mapping_export_desc_singular(inputs)
});
/**
* | output |
* | --- |
* | "Download mappings.yaml" |
*
* @param {Mapping_Export_DownloadInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_export_download = /** @type {((inputs?: Mapping_Export_DownloadInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Export_DownloadInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_export_download(inputs)
	return __en.mapping_export_download(inputs)
});
/**
* | output |
* | --- |
* | "Downloaded mappings.yaml" |
*
* @param {Mapping_Export_Downloaded_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_export_downloaded_toast = /** @type {((inputs?: Mapping_Export_Downloaded_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Export_Downloaded_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_export_downloaded_toast(inputs)
	return __en.mapping_export_downloaded_toast(inputs)
});
/**
* | output |
* | --- |
* | "Export Mappings (YAML)" |
*
* @param {Mapping_Export_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_export_title = /** @type {((inputs?: Mapping_Export_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Export_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_export_title(inputs)
	return __en.mapping_export_title(inputs)
});
/**
* | output |
* | --- |
* | "The category to assign to this transaction" |
*
* @param {Mapping_Form_Category_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_category_desc = /** @type {((inputs?: Mapping_Form_Category_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_Category_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_category_desc(inputs)
	return __en.mapping_form_category_desc(inputs)
});
/**
* | output |
* | --- |
* | "Select a category" |
*
* @param {Mapping_Form_Category_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_category_placeholder = /** @type {((inputs?: Mapping_Form_Category_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_Category_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_category_placeholder(inputs)
	return __en.mapping_form_category_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Failed to create mapping" |
*
* @param {Mapping_Form_Create_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_create_error = /** @type {((inputs?: Mapping_Form_Create_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_Create_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_create_error(inputs)
	return __en.mapping_form_create_error(inputs)
});
/**
* | output |
* | --- |
* | "Mapping created successfully" |
*
* @param {Mapping_Form_Created_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_created_toast = /** @type {((inputs?: Mapping_Form_Created_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_Created_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_created_toast(inputs)
	return __en.mapping_form_created_toast(inputs)
});
/**
* | output |
* | --- |
* | "Failed to edit mapping" |
*
* @param {Mapping_Form_Edit_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_edit_error = /** @type {((inputs?: Mapping_Form_Edit_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_Edit_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_edit_error(inputs)
	return __en.mapping_form_edit_error(inputs)
});
/**
* | output |
* | --- |
* | "Mapping edited successfully" |
*
* @param {Mapping_Form_Edited_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_edited_toast = /** @type {((inputs?: Mapping_Form_Edited_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_Edited_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_edited_toast(inputs)
	return __en.mapping_form_edited_toast(inputs)
});
/**
* | output |
* | --- |
* | "From Name (Source)" |
*
* @param {Mapping_Form_From_NameInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_from_name = /** @type {((inputs?: Mapping_Form_From_NameInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_From_NameInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_from_name(inputs)
	return __en.mapping_form_from_name(inputs)
});
/**
* | output |
* | --- |
* | "The transaction name to match from your bank statement" |
*
* @param {Mapping_Form_From_Name_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_from_name_desc = /** @type {((inputs?: Mapping_Form_From_Name_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_From_Name_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_from_name_desc(inputs)
	return __en.mapping_form_from_name_desc(inputs)
});
/**
* | output |
* | --- |
* | "e.g., AMZN Mktp" |
*
* @param {Mapping_Form_From_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_from_name_placeholder = /** @type {((inputs?: Mapping_Form_From_Name_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_From_Name_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_from_name_placeholder(inputs)
	return __en.mapping_form_from_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Required when using exact name + price mode" |
*
* @param {Mapping_Form_From_Price_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_from_price_desc = /** @type {((inputs?: Mapping_Form_From_Price_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_From_Price_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_from_price_desc(inputs)
	return __en.mapping_form_from_price_desc(inputs)
});
/**
* | output |
* | --- |
* | "e.g., 19.99" |
*
* @param {Mapping_Form_From_Price_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_from_price_placeholder = /** @type {((inputs?: Mapping_Form_From_Price_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_From_Price_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_from_price_placeholder(inputs)
	return __en.mapping_form_from_price_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Select matching mode" |
*
* @param {Mapping_Form_Mode_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_mode_placeholder = /** @type {((inputs?: Mapping_Form_Mode_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_Mode_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_mode_placeholder(inputs)
	return __en.mapping_form_mode_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Auto (use payment method)" |
*
* @param {Mapping_Form_Share_AutoInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_share_auto = /** @type {((inputs?: Mapping_Form_Share_AutoInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_Share_AutoInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_share_auto(inputs)
	return __en.mapping_form_share_auto(inputs)
});
/**
* | output |
* | --- |
* | "Optional share override applied when importing matching transactions" |
*
* @param {Mapping_Form_Share_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_share_desc = /** @type {((inputs?: Mapping_Form_Share_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_Share_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_share_desc(inputs)
	return __en.mapping_form_share_desc(inputs)
});
/**
* | output |
* | --- |
* | "To Name (Target)" |
*
* @param {Mapping_Form_To_NameInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_to_name = /** @type {((inputs?: Mapping_Form_To_NameInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_To_NameInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_to_name(inputs)
	return __en.mapping_form_to_name(inputs)
});
/**
* | output |
* | --- |
* | "The display name you want for this transaction" |
*
* @param {Mapping_Form_To_Name_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_to_name_desc = /** @type {((inputs?: Mapping_Form_To_Name_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_To_Name_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_to_name_desc(inputs)
	return __en.mapping_form_to_name_desc(inputs)
});
/**
* | output |
* | --- |
* | "e.g., Amazon" |
*
* @param {Mapping_Form_To_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_form_to_name_placeholder = /** @type {((inputs?: Mapping_Form_To_Name_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Form_To_Name_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_form_to_name_placeholder(inputs)
	return __en.mapping_form_to_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Import YAML" |
*
* @param {Mapping_Import_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_import_button = /** @type {((inputs?: Mapping_Import_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Import_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_import_button(inputs)
	return __en.mapping_import_button(inputs)
});
/**
* | output |
* | --- |
* | "Paste the contents of your mapping.yaml file." |
*
* @param {Mapping_Import_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_import_desc = /** @type {((inputs?: Mapping_Import_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Import_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_import_desc(inputs)
	return __en.mapping_import_desc(inputs)
});
/**
* | output |
* | --- |
* | "Import from YAML" |
*
* @param {Mapping_Import_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_import_title = /** @type {((inputs?: Mapping_Import_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Import_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_import_title(inputs)
	return __en.mapping_import_title(inputs)
});
/**
* | output |
* | --- |
* | "Error loading mapping: {message}" |
*
* @param {Mapping_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_load_error = /** @type {((inputs: Mapping_Load_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Load_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_load_error(inputs)
	return __en.mapping_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Loading mapping..." |
*
* @param {Mapping_LoadingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_loading = /** @type {((inputs?: Mapping_LoadingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_LoadingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_loading(inputs)
	return __en.mapping_loading(inputs)
});
/**
* | output |
* | --- |
* | "Default (Contains)" |
*
* @param {Mapping_Mode_DefaultInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_mode_default = /** @type {((inputs?: Mapping_Mode_DefaultInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Mode_DefaultInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_mode_default(inputs)
	return __en.mapping_mode_default(inputs)
});
/**
* | output |
* | --- |
* | "Matches if the transaction name contains this value" |
*
* @param {Mapping_Mode_Default_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_mode_default_desc = /** @type {((inputs?: Mapping_Mode_Default_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Mode_Default_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_mode_default_desc(inputs)
	return __en.mapping_mode_default_desc(inputs)
});
/**
* | output |
* | --- |
* | "Exact Name" |
*
* @param {Mapping_Mode_Exact_NameInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_mode_exact_name = /** @type {((inputs?: Mapping_Mode_Exact_NameInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Mode_Exact_NameInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_mode_exact_name(inputs)
	return __en.mapping_mode_exact_name(inputs)
});
/**
* | output |
* | --- |
* | "Matches only if the transaction name is exactly this value" |
*
* @param {Mapping_Mode_Exact_Name_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_mode_exact_name_desc = /** @type {((inputs?: Mapping_Mode_Exact_Name_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Mode_Exact_Name_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_mode_exact_name_desc(inputs)
	return __en.mapping_mode_exact_name_desc(inputs)
});
/**
* | output |
* | --- |
* | "Exact Name + Price" |
*
* @param {Mapping_Mode_Exact_Name_PriceInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_mode_exact_name_price = /** @type {((inputs?: Mapping_Mode_Exact_Name_PriceInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Mode_Exact_Name_PriceInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_mode_exact_name_price(inputs)
	return __en.mapping_mode_exact_name_price(inputs)
});
/**
* | output |
* | --- |
* | "Matches only if both name and price match exactly" |
*
* @param {Mapping_Mode_Exact_Name_Price_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_mode_exact_name_price_desc = /** @type {((inputs?: Mapping_Mode_Exact_Name_Price_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Mode_Exact_Name_Price_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_mode_exact_name_price_desc(inputs)
	return __en.mapping_mode_exact_name_price_desc(inputs)
});
/**
* | output |
* | --- |
* | "Unknown mode" |
*
* @param {Mapping_Mode_UnknownInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_mode_unknown = /** @type {((inputs?: Mapping_Mode_UnknownInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Mode_UnknownInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_mode_unknown(inputs)
	return __en.mapping_mode_unknown(inputs)
});
/**
* | output |
* | --- |
* | "Search mappings..." |
*
* @param {Mapping_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_search_placeholder = /** @type {((inputs?: Mapping_Search_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Search_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_search_placeholder(inputs)
	return __en.mapping_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "A list of all mappings configured" |
*
* @param {Mapping_Table_CaptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_table_caption = /** @type {((inputs?: Mapping_Table_CaptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Table_CaptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_table_caption(inputs)
	return __en.mapping_table_caption(inputs)
});
/**
* | output |
* | --- |
* | "Mappings" |
*
* @param {Mapping_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_title = /** @type {((inputs?: Mapping_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_title(inputs)
	return __en.mapping_title(inputs)
});
/**
* | output |
* | --- |
* | "From name cannot be empty" |
*
* @param {Mapping_Validation_From_Name_EmptyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_validation_from_name_empty = /** @type {((inputs?: Mapping_Validation_From_Name_EmptyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Validation_From_Name_EmptyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_validation_from_name_empty(inputs)
	return __en.mapping_validation_from_name_empty(inputs)
});
/**
* | output |
* | --- |
* | "From name is required" |
*
* @param {Mapping_Validation_From_Name_RequiredInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_validation_from_name_required = /** @type {((inputs?: Mapping_Validation_From_Name_RequiredInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Validation_From_Name_RequiredInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_validation_from_name_required(inputs)
	return __en.mapping_validation_from_name_required(inputs)
});
/**
* | output |
* | --- |
* | "To category cannot be empty" |
*
* @param {Mapping_Validation_To_Category_EmptyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_validation_to_category_empty = /** @type {((inputs?: Mapping_Validation_To_Category_EmptyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Validation_To_Category_EmptyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_validation_to_category_empty(inputs)
	return __en.mapping_validation_to_category_empty(inputs)
});
/**
* | output |
* | --- |
* | "To category is required" |
*
* @param {Mapping_Validation_To_Category_RequiredInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_validation_to_category_required = /** @type {((inputs?: Mapping_Validation_To_Category_RequiredInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Validation_To_Category_RequiredInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_validation_to_category_required(inputs)
	return __en.mapping_validation_to_category_required(inputs)
});
/**
* | output |
* | --- |
* | "To name cannot be empty" |
*
* @param {Mapping_Validation_To_Name_EmptyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_validation_to_name_empty = /** @type {((inputs?: Mapping_Validation_To_Name_EmptyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Validation_To_Name_EmptyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_validation_to_name_empty(inputs)
	return __en.mapping_validation_to_name_empty(inputs)
});
/**
* | output |
* | --- |
* | "To name is required" |
*
* @param {Mapping_Validation_To_Name_RequiredInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const mapping_validation_to_name_required = /** @type {((inputs?: Mapping_Validation_To_Name_RequiredInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mapping_Validation_To_Name_RequiredInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.mapping_validation_to_name_required(inputs)
	return __en.mapping_validation_to_name_required(inputs)
});
/**
* | output |
* | --- |
* | "Cloned bills copy their budgets; incomes and savings copy their targets with empty actuals." |
*
* @param {Month_Clone_DescriptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_clone_description = /** @type {((inputs?: Month_Clone_DescriptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Clone_DescriptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_clone_description(inputs)
	return __en.month_clone_description(inputs)
});
/**
* | output |
* | --- |
* | "Clone From" |
*
* @param {Month_Clone_From_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_clone_from_label = /** @type {((inputs?: Month_Clone_From_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Clone_From_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_clone_from_label(inputs)
	return __en.month_clone_from_label(inputs)
});
/**
* | output |
* | --- |
* | "Clone Month" |
*
* @param {Month_Clone_SubmitInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_clone_submit = /** @type {((inputs?: Month_Clone_SubmitInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Clone_SubmitInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_clone_submit(inputs)
	return __en.month_clone_submit(inputs)
});
/**
* | output |
* | --- |
* | "Cloned {source} → {target}" |
*
* @param {Month_Cloned_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_cloned_toast = /** @type {((inputs: Month_Cloned_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Cloned_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_cloned_toast(inputs)
	return __en.month_cloned_toast(inputs)
});
/**
* | output |
* | --- |
* | "Failed to create month" |
*
* @param {Month_Create_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_create_error = /** @type {((inputs?: Month_Create_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Create_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_create_error(inputs)
	return __en.month_create_error(inputs)
});
/**
* | output |
* | --- |
* | "Create Month" |
*
* @param {Month_Create_SubmitInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_create_submit = /** @type {((inputs?: Month_Create_SubmitInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Create_SubmitInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_create_submit(inputs)
	return __en.month_create_submit(inputs)
});
/**
* | output |
* | --- |
* | "Created {target}" |
*
* @param {Month_Created_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_created_toast = /** @type {((inputs: Month_Created_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Created_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_created_toast(inputs)
	return __en.month_created_toast(inputs)
});
/**
* | output |
* | --- |
* | "Creating..." |
*
* @param {Month_CreatingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_creating = /** @type {((inputs?: Month_CreatingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_CreatingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_creating(inputs)
	return __en.month_creating(inputs)
});
/**
* | output |
* | --- |
* | "Create a blank budget month or clone bills, incomes, savings, and category targets from an existing month." |
*
* @param {Month_Dialog_DescriptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_dialog_description = /** @type {((inputs?: Month_Dialog_DescriptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Dialog_DescriptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_dialog_description(inputs)
	return __en.month_dialog_description(inputs)
});
/**
* | output |
* | --- |
* | "New or Clone Month" |
*
* @param {Month_Dialog_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_dialog_title = /** @type {((inputs?: Month_Dialog_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Dialog_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_dialog_title(inputs)
	return __en.month_dialog_title(inputs)
});
/**
* | output |
* | --- |
* | "Please choose a valid month (YYYY-MM)" |
*
* @param {Month_Invalid_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_invalid_error = /** @type {((inputs?: Month_Invalid_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Invalid_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_invalid_error(inputs)
	return __en.month_invalid_error(inputs)
});
/**
* | output |
* | --- |
* | "New / Clone Month" |
*
* @param {Month_New_Or_Clone_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_new_or_clone_button = /** @type {((inputs?: Month_New_Or_Clone_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_New_Or_Clone_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_new_or_clone_button(inputs)
	return __en.month_new_or_clone_button(inputs)
});
/**
* | output |
* | --- |
* | "Next month" |
*
* @param {Month_NextInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_next = /** @type {((inputs?: Month_NextInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_NextInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_next(inputs)
	return __en.month_next(inputs)
});
/**
* | output |
* | --- |
* | "Previous month" |
*
* @param {Month_PreviousInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_previous = /** @type {((inputs?: Month_PreviousInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_PreviousInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_previous(inputs)
	return __en.month_previous(inputs)
});
/**
* | output |
* | --- |
* | "Start blank" |
*
* @param {Month_Start_BlankInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_start_blank = /** @type {((inputs?: Month_Start_BlankInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Start_BlankInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_start_blank(inputs)
	return __en.month_start_blank(inputs)
});
/**
* | output |
* | --- |
* | "Target Month" |
*
* @param {Month_Target_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const month_target_label = /** @type {((inputs?: Month_Target_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Month_Target_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.month_target_label(inputs)
	return __en.month_target_label(inputs)
});
/**
* | output |
* | --- |
* | "Assets" |
*
* @param {Nav_AssetsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const nav_assets = /** @type {((inputs?: Nav_AssetsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_AssetsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.nav_assets(inputs)
	return __en.nav_assets(inputs)
});
/**
* | output |
* | --- |
* | "Budget" |
*
* @param {Nav_BudgetInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const nav_budget = /** @type {((inputs?: Nav_BudgetInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_BudgetInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.nav_budget(inputs)
	return __en.nav_budget(inputs)
});
/**
* | output |
* | --- |
* | "Import" |
*
* @param {Nav_ImportInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const nav_import = /** @type {((inputs?: Nav_ImportInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_ImportInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.nav_import(inputs)
	return __en.nav_import(inputs)
});
/**
* | output |
* | --- |
* | "Language" |
*
* @param {Nav_LanguageInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const nav_language = /** @type {((inputs?: Nav_LanguageInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_LanguageInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.nav_language(inputs)
	return __en.nav_language(inputs)
});
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Nav_SettingsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const nav_settings = /** @type {((inputs?: Nav_SettingsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_SettingsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.nav_settings(inputs)
	return __en.nav_settings(inputs)
});
/**
* | output |
* | --- |
* | "Switch language" |
*
* @param {Nav_Switch_LanguageInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const nav_switch_language = /** @type {((inputs?: Nav_Switch_LanguageInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_Switch_LanguageInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.nav_switch_language(inputs)
	return __en.nav_switch_language(inputs)
});
/**
* | output |
* | --- |
* | "Transactions" |
*
* @param {Nav_TransactionsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const nav_transactions = /** @type {((inputs?: Nav_TransactionsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_TransactionsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.nav_transactions(inputs)
	return __en.nav_transactions(inputs)
});
/**
* | output |
* | --- |
* | "Add savings balances or investment positions to see your allocation." |
*
* @param {Overview_Allocation_EmptyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_allocation_empty = /** @type {((inputs?: Overview_Allocation_EmptyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Allocation_EmptyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_allocation_empty(inputs)
	return __en.overview_allocation_empty(inputs)
});
/**
* | output |
* | --- |
* | "Global Allocation" |
*
* @param {Overview_Allocation_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_allocation_title = /** @type {((inputs?: Overview_Allocation_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Allocation_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_allocation_title(inputs)
	return __en.overview_allocation_title(inputs)
});
/**
* | output |
* | --- |
* | "Cash & Savings" |
*
* @param {Overview_Class_CashInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_class_cash = /** @type {((inputs?: Overview_Class_CashInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Class_CashInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_class_cash(inputs)
	return __en.overview_class_cash(inputs)
});
/**
* | output |
* | --- |
* | "Record savings snapshots or investment orders to see your net worth over time." |
*
* @param {Overview_Evolution_EmptyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_evolution_empty = /** @type {((inputs?: Overview_Evolution_EmptyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Evolution_EmptyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_evolution_empty(inputs)
	return __en.overview_evolution_empty(inputs)
});
/**
* | output |
* | --- |
* | "Net Worth Evolution" |
*
* @param {Overview_Evolution_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_evolution_title = /** @type {((inputs?: Overview_Evolution_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Evolution_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_evolution_title(inputs)
	return __en.overview_evolution_title(inputs)
});
/**
* | output |
* | --- |
* | "Update savings" |
*
* @param {Overview_Go_To_SavingsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_go_to_savings = /** @type {((inputs?: Overview_Go_To_SavingsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Go_To_SavingsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_go_to_savings(inputs)
	return __en.overview_go_to_savings(inputs)
});
/**
* | output |
* | --- |
* | "Invested: {amount}" |
*
* @param {Overview_Invested_SubInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_invested_sub = /** @type {((inputs: Overview_Invested_SubInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Invested_SubInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_invested_sub(inputs)
	return __en.overview_invested_sub(inputs)
});
/**
* | output |
* | --- |
* | "Investments" |
*
* @param {Overview_InvestmentsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_investments = /** @type {((inputs?: Overview_InvestmentsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_InvestmentsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_investments(inputs)
	return __en.overview_investments(inputs)
});
/**
* | output |
* | --- |
* | "{percent}% of total assets" |
*
* @param {Overview_Investments_SubInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_investments_sub = /** @type {((inputs: Overview_Investments_SubInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Investments_SubInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_investments_sub(inputs)
	return __en.overview_investments_sub(inputs)
});
/**
* | output |
* | --- |
* | "Liquid Savings" |
*
* @param {Overview_Liquid_SavingsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_liquid_savings = /** @type {((inputs?: Overview_Liquid_SavingsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Liquid_SavingsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_liquid_savings(inputs)
	return __en.overview_liquid_savings(inputs)
});
/**
* | output |
* | --- |
* | "{percent}% of total assets" |
*
* @param {Overview_Liquid_Savings_SubInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_liquid_savings_sub = /** @type {((inputs: Overview_Liquid_Savings_SubInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Liquid_Savings_SubInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_liquid_savings_sub(inputs)
	return __en.overview_liquid_savings_sub(inputs)
});
/**
* | output |
* | --- |
* | "{count} savings account(s) missing a snapshot for {month}." |
*
* @param {Overview_Missing_Snapshots_NoticeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_missing_snapshots_notice = /** @type {((inputs: Overview_Missing_Snapshots_NoticeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Missing_Snapshots_NoticeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_missing_snapshots_notice(inputs)
	return __en.overview_missing_snapshots_notice(inputs)
});
/**
* | output |
* | --- |
* | "By Class" |
*
* @param {Overview_Mode_ClassesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_mode_classes = /** @type {((inputs?: Overview_Mode_ClassesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Mode_ClassesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_mode_classes(inputs)
	return __en.overview_mode_classes(inputs)
});
/**
* | output |
* | --- |
* | "By Account" |
*
* @param {Overview_Mode_EnvelopesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_mode_envelopes = /** @type {((inputs?: Overview_Mode_EnvelopesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Mode_EnvelopesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_mode_envelopes(inputs)
	return __en.overview_mode_envelopes(inputs)
});
/**
* | output |
* | --- |
* | "Total Net Worth" |
*
* @param {Overview_Net_WorthInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_net_worth = /** @type {((inputs?: Overview_Net_WorthInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Net_WorthInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_net_worth(inputs)
	return __en.overview_net_worth(inputs)
});
/**
* | output |
* | --- |
* | "Savings + Investments (excl. checking)" |
*
* @param {Overview_Net_Worth_SubInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_net_worth_sub = /** @type {((inputs?: Overview_Net_Worth_SubInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Net_Worth_SubInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_net_worth_sub(inputs)
	return __en.overview_net_worth_sub(inputs)
});
/**
* | output |
* | --- |
* | "Unrealized Gain" |
*
* @param {Overview_Unrealized_GainInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const overview_unrealized_gain = /** @type {((inputs?: Overview_Unrealized_GainInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Overview_Unrealized_GainInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.overview_unrealized_gain(inputs)
	return __en.overview_unrealized_gain(inputs)
});
/**
* | output |
* | --- |
* | "Upload your CSV file and select your provider to convert your transactions." |
*
* @param {Parser_DescriptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_description = /** @type {((inputs?: Parser_DescriptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_DescriptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_description(inputs)
	return __en.parser_description(inputs)
});
/**
* | output |
* | --- |
* | "Failed to parse file" |
*
* @param {Parser_Error_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_error_toast = /** @type {((inputs?: Parser_Error_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_Error_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_error_toast(inputs)
	return __en.parser_error_toast(inputs)
});
/**
* | output |
* | --- |
* | "Upload your transaction CSV file from your provider." |
*
* @param {Parser_File_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_file_desc = /** @type {((inputs?: Parser_File_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_File_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_file_desc(inputs)
	return __en.parser_file_desc(inputs)
});
/**
* | output |
* | --- |
* | "Please upload a valid CSV file" |
*
* @param {Parser_File_InvalidInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_file_invalid = /** @type {((inputs?: Parser_File_InvalidInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_File_InvalidInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_file_invalid(inputs)
	return __en.parser_file_invalid(inputs)
});
/**
* | output |
* | --- |
* | "CSV File" |
*
* @param {Parser_File_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_file_label = /** @type {((inputs?: Parser_File_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_File_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_file_label(inputs)
	return __en.parser_file_label(inputs)
});
/**
* | output |
* | --- |
* | "Only CSV files are allowed" |
*
* @param {Parser_File_Mime_InvalidInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_file_mime_invalid = /** @type {((inputs?: Parser_File_Mime_InvalidInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_File_Mime_InvalidInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_file_mime_invalid(inputs)
	return __en.parser_file_mime_invalid(inputs)
});
/**
* | output |
* | --- |
* | "Selected: {name} ({sizeKb} KB)" |
*
* @param {Parser_File_SelectedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_file_selected = /** @type {((inputs: Parser_File_SelectedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_File_SelectedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_file_selected(inputs)
	return __en.parser_file_selected(inputs)
});
/**
* | output |
* | --- |
* | "No file selected" |
*
* @param {Parser_No_File_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_no_file_toast = /** @type {((inputs?: Parser_No_File_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_No_File_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_no_file_toast(inputs)
	return __en.parser_no_file_toast(inputs)
});
/**
* | output |
* | --- |
* | "An error occurred while processing the file" |
*
* @param {Parser_Process_Error_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_process_error_toast = /** @type {((inputs?: Parser_Process_Error_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_Process_Error_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_process_error_toast(inputs)
	return __en.parser_process_error_toast(inputs)
});
/**
* | output |
* | --- |
* | "Choose the bank or service that generated your CSV file." |
*
* @param {Parser_Provider_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_provider_desc = /** @type {((inputs?: Parser_Provider_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_Provider_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_provider_desc(inputs)
	return __en.parser_provider_desc(inputs)
});
/**
* | output |
* | --- |
* | "Please select a valid provider" |
*
* @param {Parser_Provider_InvalidInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_provider_invalid = /** @type {((inputs?: Parser_Provider_InvalidInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_Provider_InvalidInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_provider_invalid(inputs)
	return __en.parser_provider_invalid(inputs)
});
/**
* | output |
* | --- |
* | "Provider" |
*
* @param {Parser_Provider_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_provider_label = /** @type {((inputs?: Parser_Provider_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_Provider_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_provider_label(inputs)
	return __en.parser_provider_label(inputs)
});
/**
* | output |
* | --- |
* | "Select a provider" |
*
* @param {Parser_Provider_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_provider_placeholder = /** @type {((inputs?: Parser_Provider_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_Provider_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_provider_placeholder(inputs)
	return __en.parser_provider_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Failed to read file" |
*
* @param {Parser_Read_Error_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_read_error_toast = /** @type {((inputs?: Parser_Read_Error_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_Read_Error_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_read_error_toast(inputs)
	return __en.parser_read_error_toast(inputs)
});
/**
* | output |
* | --- |
* | "Parse" |
*
* @param {Parser_SubmitInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_submit = /** @type {((inputs?: Parser_SubmitInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_SubmitInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_submit(inputs)
	return __en.parser_submit(inputs)
});
/**
* | output |
* | --- |
* | "Processed {count} transactions." |
*
* @param {Parser_Success_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_success_desc = /** @type {((inputs: Parser_Success_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_Success_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_success_desc(inputs)
	return __en.parser_success_desc(inputs)
});
/**
* | output |
* | --- |
* | "File parsed successfully!" |
*
* @param {Parser_Success_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_success_toast = /** @type {((inputs?: Parser_Success_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_Success_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_success_toast(inputs)
	return __en.parser_success_toast(inputs)
});
/**
* | output |
* | --- |
* | "Parser" |
*
* @param {Parser_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const parser_title = /** @type {((inputs?: Parser_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Parser_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.parser_title(inputs)
	return __en.parser_title(inputs)
});
/**
* | output |
* | --- |
* | "Cards & payment methods used when importing or adding expenses" |
*
* @param {Pm_CaptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_caption = /** @type {((inputs?: Pm_CaptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_CaptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_caption(inputs)
	return __en.pm_caption(inputs)
});
/**
* | output |
* | --- |
* | "Create Payment Method" |
*
* @param {Pm_Create_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_create_button = /** @type {((inputs?: Pm_Create_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_Create_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_create_button(inputs)
	return __en.pm_create_button(inputs)
});
/**
* | output |
* | --- |
* | "Create payment method" |
*
* @param {Pm_Create_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_create_title = /** @type {((inputs?: Pm_Create_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_Create_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_create_title(inputs)
	return __en.pm_create_title(inputs)
});
/**
* | output |
* | --- |
* | "Payment method created" |
*
* @param {Pm_Created_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_created_toast = /** @type {((inputs?: Pm_Created_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_Created_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_created_toast(inputs)
	return __en.pm_created_toast(inputs)
});
/**
* | output |
* | --- |
* | "Delete \"{label}\"? Existing transactions will keep their data with an empty payment method." |
*
* @param {Pm_Delete_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_delete_desc = /** @type {((inputs: Pm_Delete_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_Delete_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_delete_desc(inputs)
	return __en.pm_delete_desc(inputs)
});
/**
* | output |
* | --- |
* | "Delete Payment Method" |
*
* @param {Pm_Delete_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_delete_title = /** @type {((inputs?: Pm_Delete_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_Delete_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_delete_title(inputs)
	return __en.pm_delete_title(inputs)
});
/**
* | output |
* | --- |
* | "Payment methods used for transactions and default share attribution." |
*
* @param {Pm_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_dialog_desc = /** @type {((inputs?: Pm_Dialog_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_Dialog_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_dialog_desc(inputs)
	return __en.pm_dialog_desc(inputs)
});
/**
* | output |
* | --- |
* | "Edit payment method" |
*
* @param {Pm_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_edit_title = /** @type {((inputs?: Pm_Edit_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_Edit_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_edit_title(inputs)
	return __en.pm_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "Error loading payment methods." |
*
* @param {Pm_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_load_error = /** @type {((inputs?: Pm_Load_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_Load_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_load_error(inputs)
	return __en.pm_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Loading payment methods..." |
*
* @param {Pm_LoadingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_loading = /** @type {((inputs?: Pm_LoadingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_LoadingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_loading(inputs)
	return __en.pm_loading(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save payment method" |
*
* @param {Pm_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_save_error = /** @type {((inputs?: Pm_Save_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_Save_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_save_error(inputs)
	return __en.pm_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Stable key used to match imported accounts." |
*
* @param {Pm_Slug_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_slug_desc = /** @type {((inputs?: Pm_Slug_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_Slug_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_slug_desc(inputs)
	return __en.pm_slug_desc(inputs)
});
/**
* | output |
* | --- |
* | "Payment Methods" |
*
* @param {Pm_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_title = /** @type {((inputs?: Pm_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_title(inputs)
	return __en.pm_title(inputs)
});
/**
* | output |
* | --- |
* | "Payment method updated" |
*
* @param {Pm_Updated_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const pm_updated_toast = /** @type {((inputs?: Pm_Updated_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pm_Updated_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.pm_updated_toast(inputs)
	return __en.pm_updated_toast(inputs)
});
/**
* | output |
* | --- |
* | "All months" |
*
* @param {Results_All_MonthsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_all_months = /** @type {((inputs?: Results_All_MonthsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_All_MonthsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_all_months(inputs)
	return __en.results_all_months(inputs)
});
/**
* | output |
* | --- |
* | "• {count} already imported" |
*
* @param {Results_Already_Imported_SuffixInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_already_imported_suffix = /** @type {((inputs: Results_Already_Imported_SuffixInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Already_Imported_SuffixInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_already_imported_suffix(inputs)
	return __en.results_already_imported_suffix(inputs)
});
/**
* | output |
* | --- |
* | "Disabled" |
*
* @param {Results_Badge_DisabledInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_badge_disabled = /** @type {((inputs?: Results_Badge_DisabledInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Badge_DisabledInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_badge_disabled(inputs)
	return __en.results_badge_disabled(inputs)
});
/**
* | output |
* | --- |
* | "Imported" |
*
* @param {Results_Badge_ImportedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_badge_imported = /** @type {((inputs?: Results_Badge_ImportedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Badge_ImportedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_badge_imported(inputs)
	return __en.results_badge_imported(inputs)
});
/**
* | output |
* | --- |
* | "Method" |
*
* @param {Results_Col_MethodInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_col_method = /** @type {((inputs?: Results_Col_MethodInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Col_MethodInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_col_method(inputs)
	return __en.results_col_method(inputs)
});
/**
* | output |
* | --- |
* | "Select all" |
*
* @param {Results_Col_Select_AllInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_col_select_all = /** @type {((inputs?: Results_Col_Select_AllInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Col_Select_AllInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_col_select_all(inputs)
	return __en.results_col_select_all(inputs)
});
/**
* | output |
* | --- |
* | "Select row" |
*
* @param {Results_Col_Select_RowInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_col_select_row = /** @type {((inputs?: Results_Col_Select_RowInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Col_Select_RowInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_col_select_row(inputs)
	return __en.results_col_select_row(inputs)
});
/**
* | output |
* | --- |
* | "{count} transactions copied to your clipboard." |
*
* @param {Results_Copied_PluralInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_copied_plural = /** @type {((inputs: Results_Copied_PluralInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Copied_PluralInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_copied_plural(inputs)
	return __en.results_copied_plural(inputs)
});
/**
* | output |
* | --- |
* | "{count} transaction copied to your clipboard." |
*
* @param {Results_Copied_SingularInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_copied_singular = /** @type {((inputs: Results_Copied_SingularInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Copied_SingularInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_copied_singular(inputs)
	return __en.results_copied_singular(inputs)
});
/**
* | output |
* | --- |
* | "Copied to clipboard!" |
*
* @param {Results_Copied_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_copied_title = /** @type {((inputs?: Results_Copied_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Copied_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_copied_title(inputs)
	return __en.results_copied_title(inputs)
});
/**
* | output |
* | --- |
* | "Copy CSV" |
*
* @param {Results_Copy_CsvInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_copy_csv = /** @type {((inputs?: Results_Copy_CsvInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Copy_CsvInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_copy_csv(inputs)
	return __en.results_copy_csv(inputs)
});
/**
* | output |
* | --- |
* | "Could not copy CSV to clipboard." |
*
* @param {Results_Copy_Error_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_copy_error_desc = /** @type {((inputs?: Results_Copy_Error_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Copy_Error_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_copy_error_desc(inputs)
	return __en.results_copy_error_desc(inputs)
});
/**
* | output |
* | --- |
* | "Failed to copy" |
*
* @param {Results_Copy_Error_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_copy_error_title = /** @type {((inputs?: Results_Copy_Error_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Copy_Error_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_copy_error_title(inputs)
	return __en.results_copy_error_title(inputs)
});
/**
* | output |
* | --- |
* | "• {count} disabled" |
*
* @param {Results_Disabled_SuffixInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_disabled_suffix = /** @type {((inputs: Results_Disabled_SuffixInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Disabled_SuffixInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_disabled_suffix(inputs)
	return __en.results_disabled_suffix(inputs)
});
/**
* | output |
* | --- |
* | "Upload a CSV or fetch from connected accounts to review, adjust shares & categories, and import directly into your monthly budget." |
*
* @param {Results_Empty_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_empty_desc = /** @type {((inputs?: Results_Empty_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Empty_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_empty_desc(inputs)
	return __en.results_empty_desc(inputs)
});
/**
* | output |
* | --- |
* | "Preview & Import" |
*
* @param {Results_Empty_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_empty_title = /** @type {((inputs?: Results_Empty_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Empty_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_empty_title(inputs)
	return __en.results_empty_title(inputs)
});
/**
* | output |
* | --- |
* | "Import to Budget ({count})" |
*
* @param {Results_Import_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_import_button = /** @type {((inputs: Results_Import_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Import_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_import_button(inputs)
	return __en.results_import_button(inputs)
});
/**
* | output |
* | --- |
* | "Failed to import transactions" |
*
* @param {Results_Import_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_import_error = /** @type {((inputs?: Results_Import_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Import_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_import_error(inputs)
	return __en.results_import_error(inputs)
});
/**
* | output |
* | --- |
* | "Imported {count} transactions" |
*
* @param {Results_Imported_PluralInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_imported_plural = /** @type {((inputs: Results_Imported_PluralInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Imported_PluralInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_imported_plural(inputs)
	return __en.results_imported_plural(inputs)
});
/**
* | output |
* | --- |
* | "Imported {count} transaction" |
*
* @param {Results_Imported_SingularInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_imported_singular = /** @type {((inputs: Results_Imported_SingularInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Imported_SingularInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_imported_singular(inputs)
	return __en.results_imported_singular(inputs)
});
/**
* | output |
* | --- |
* | "No results." |
*
* @param {Results_No_ResultsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_no_results = /** @type {((inputs?: Results_No_ResultsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_No_ResultsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_no_results(inputs)
	return __en.results_no_results(inputs)
});
/**
* | output |
* | --- |
* | "Please select at least one transaction to copy." |
*
* @param {Results_No_Selection_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_no_selection_desc = /** @type {((inputs?: Results_No_Selection_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_No_Selection_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_no_selection_desc(inputs)
	return __en.results_no_selection_desc(inputs)
});
/**
* | output |
* | --- |
* | "No transactions selected" |
*
* @param {Results_No_Selection_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_no_selection_title = /** @type {((inputs?: Results_No_Selection_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_No_Selection_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_no_selection_title(inputs)
	return __en.results_no_selection_title(inputs)
});
/**
* | output |
* | --- |
* | "Raw data" |
*
* @param {Results_Raw_Data_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_raw_data_aria = /** @type {((inputs?: Results_Raw_Data_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Raw_Data_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_raw_data_aria(inputs)
	return __en.results_raw_data_aria(inputs)
});
/**
* | output |
* | --- |
* | "Raw transaction data ({externalId})" |
*
* @param {Results_Raw_Data_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_raw_data_desc = /** @type {((inputs: Results_Raw_Data_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Raw_Data_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_raw_data_desc(inputs)
	return __en.results_raw_data_desc(inputs)
});
/**
* | output |
* | --- |
* | "{count} selected for import" |
*
* @param {Results_Selected_For_ImportInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_selected_for_import = /** @type {((inputs: Results_Selected_For_ImportInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Selected_For_ImportInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_selected_for_import(inputs)
	return __en.results_selected_for_import(inputs)
});
/**
* | output |
* | --- |
* | "({count} skipped)" |
*
* @param {Results_Skipped_SuffixInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_skipped_suffix = /** @type {((inputs: Results_Skipped_SuffixInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_Skipped_SuffixInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_skipped_suffix(inputs)
	return __en.results_skipped_suffix(inputs)
});
/**
* | output |
* | --- |
* | "Results" |
*
* @param {Results_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const results_title = /** @type {((inputs?: Results_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Results_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.results_title(inputs)
	return __en.results_title(inputs)
});
/**
* | output |
* | --- |
* | "Add Saving" |
*
* @param {Savings_AddInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const savings_add = /** @type {((inputs?: Savings_AddInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savings_AddInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.savings_add(inputs)
	return __en.savings_add(inputs)
});
/**
* | output |
* | --- |
* | "Saving added" |
*
* @param {Savings_Added_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const savings_added_toast = /** @type {((inputs?: Savings_Added_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savings_Added_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.savings_added_toast(inputs)
	return __en.savings_added_toast(inputs)
});
/**
* | output |
* | --- |
* | "Delete saving" |
*
* @param {Savings_Delete_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const savings_delete_aria = /** @type {((inputs?: Savings_Delete_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savings_Delete_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.savings_delete_aria(inputs)
	return __en.savings_delete_aria(inputs)
});
/**
* | output |
* | --- |
* | "Saving deleted" |
*
* @param {Savings_Deleted_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const savings_deleted_toast = /** @type {((inputs?: Savings_Deleted_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savings_Deleted_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.savings_deleted_toast(inputs)
	return __en.savings_deleted_toast(inputs)
});
/**
* | output |
* | --- |
* | "Edit Saving" |
*
* @param {Savings_EditInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const savings_edit = /** @type {((inputs?: Savings_EditInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savings_EditInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.savings_edit(inputs)
	return __en.savings_edit(inputs)
});
/**
* | output |
* | --- |
* | "Edit saving" |
*
* @param {Savings_Edit_AriaInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const savings_edit_aria = /** @type {((inputs?: Savings_Edit_AriaInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savings_Edit_AriaInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.savings_edit_aria(inputs)
	return __en.savings_edit_aria(inputs)
});
/**
* | output |
* | --- |
* | "No savings targets for this month yet." |
*
* @param {Savings_EmptyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const savings_empty = /** @type {((inputs?: Savings_EmptyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savings_EmptyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.savings_empty(inputs)
	return __en.savings_empty(inputs)
});
/**
* | output |
* | --- |
* | "Livret A, PEA, Assurance-Vie..." |
*
* @param {Savings_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const savings_name_placeholder = /** @type {((inputs?: Savings_Name_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savings_Name_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.savings_name_placeholder(inputs)
	return __en.savings_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save saving" |
*
* @param {Savings_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const savings_save_error = /** @type {((inputs?: Savings_Save_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savings_Save_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.savings_save_error(inputs)
	return __en.savings_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Savings" |
*
* @param {Savings_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const savings_title = /** @type {((inputs?: Savings_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savings_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.savings_title(inputs)
	return __en.savings_title(inputs)
});
/**
* | output |
* | --- |
* | "Saving updated" |
*
* @param {Savings_Updated_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const savings_updated_toast = /** @type {((inputs?: Savings_Updated_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savings_Updated_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.savings_updated_toast(inputs)
	return __en.savings_updated_toast(inputs)
});
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Settings_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const settings_title = /** @type {((inputs?: Settings_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.settings_title(inputs)
	return __en.settings_title(inputs)
});
/**
* | output |
* | --- |
* | "Available shares shown in Import, Transactions, Bills, Mappings, and Payment Methods" |
*
* @param {Share_Presets_CaptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_caption = /** @type {((inputs?: Share_Presets_CaptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_CaptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_caption(inputs)
	return __en.share_presets_caption(inputs)
});
/**
* | output |
* | --- |
* | "Percentage" |
*
* @param {Share_Presets_Col_PercentageInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_col_percentage = /** @type {((inputs?: Share_Presets_Col_PercentageInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Col_PercentageInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_col_percentage(inputs)
	return __en.share_presets_col_percentage(inputs)
});
/**
* | output |
* | --- |
* | "Preview" |
*
* @param {Share_Presets_Col_PreviewInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_col_preview = /** @type {((inputs?: Share_Presets_Col_PreviewInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Col_PreviewInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_col_preview(inputs)
	return __en.share_presets_col_preview(inputs)
});
/**
* | output |
* | --- |
* | "Create Share Preset" |
*
* @param {Share_Presets_Create_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_create_button = /** @type {((inputs?: Share_Presets_Create_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Create_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_create_button(inputs)
	return __en.share_presets_create_button(inputs)
});
/**
* | output |
* | --- |
* | "Create share preset" |
*
* @param {Share_Presets_Create_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_create_title = /** @type {((inputs?: Share_Presets_Create_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Create_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_create_title(inputs)
	return __en.share_presets_create_title(inputs)
});
/**
* | output |
* | --- |
* | "Share preset created" |
*
* @param {Share_Presets_Created_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_created_toast = /** @type {((inputs?: Share_Presets_Created_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Created_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_created_toast(inputs)
	return __en.share_presets_created_toast(inputs)
});
/**
* | output |
* | --- |
* | "Delete \"{label} ({percent}%)\"? Existing transactions and bills keep their stored percentage." |
*
* @param {Share_Presets_Delete_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_delete_desc = /** @type {((inputs: Share_Presets_Delete_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Delete_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_delete_desc(inputs)
	return __en.share_presets_delete_desc(inputs)
});
/**
* | output |
* | --- |
* | "Delete Share Preset" |
*
* @param {Share_Presets_Delete_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_delete_title = /** @type {((inputs?: Share_Presets_Delete_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Delete_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_delete_title(inputs)
	return __en.share_presets_delete_title(inputs)
});
/**
* | output |
* | --- |
* | "Share preset deleted" |
*
* @param {Share_Presets_Deleted_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_deleted_toast = /** @type {((inputs?: Share_Presets_Deleted_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Deleted_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_deleted_toast(inputs)
	return __en.share_presets_deleted_toast(inputs)
});
/**
* | output |
* | --- |
* | "Customize available share percentages, labels, colors, and click-cycle order." |
*
* @param {Share_Presets_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_dialog_desc = /** @type {((inputs?: Share_Presets_Dialog_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Dialog_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_dialog_desc(inputs)
	return __en.share_presets_dialog_desc(inputs)
});
/**
* | output |
* | --- |
* | "Edit share preset" |
*
* @param {Share_Presets_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_edit_title = /** @type {((inputs?: Share_Presets_Edit_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Edit_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_edit_title(inputs)
	return __en.share_presets_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "Displayed in Import, Transactions, Bills, and Mapping rules." |
*
* @param {Share_Presets_Label_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_label_desc = /** @type {((inputs?: Share_Presets_Label_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Label_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_label_desc(inputs)
	return __en.share_presets_label_desc(inputs)
});
/**
* | output |
* | --- |
* | "Personal, Shared, Partner, 60/40..." |
*
* @param {Share_Presets_Label_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_label_placeholder = /** @type {((inputs?: Share_Presets_Label_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Label_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_label_placeholder(inputs)
	return __en.share_presets_label_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Error loading share presets." |
*
* @param {Share_Presets_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_load_error = /** @type {((inputs?: Share_Presets_Load_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Load_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_load_error(inputs)
	return __en.share_presets_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Loading share presets..." |
*
* @param {Share_Presets_LoadingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_loading = /** @type {((inputs?: Share_Presets_LoadingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_LoadingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_loading(inputs)
	return __en.share_presets_loading(inputs)
});
/**
* | output |
* | --- |
* | "Order used when clicking to cycle shares." |
*
* @param {Share_Presets_Order_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_order_desc = /** @type {((inputs?: Share_Presets_Order_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Order_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_order_desc(inputs)
	return __en.share_presets_order_desc(inputs)
});
/**
* | output |
* | --- |
* | "Your share of the expense (must be unique)." |
*
* @param {Share_Presets_Percent_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_percent_desc = /** @type {((inputs?: Share_Presets_Percent_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Percent_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_percent_desc(inputs)
	return __en.share_presets_percent_desc(inputs)
});
/**
* | output |
* | --- |
* | "Percentage (0–100%)" |
*
* @param {Share_Presets_Percent_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_percent_label = /** @type {((inputs?: Share_Presets_Percent_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Percent_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_percent_label(inputs)
	return __en.share_presets_percent_label(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save share preset" |
*
* @param {Share_Presets_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_save_error = /** @type {((inputs?: Share_Presets_Save_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Save_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_save_error(inputs)
	return __en.share_presets_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Share Presets" |
*
* @param {Share_Presets_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_title = /** @type {((inputs?: Share_Presets_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_title(inputs)
	return __en.share_presets_title(inputs)
});
/**
* | output |
* | --- |
* | "Share preset updated" |
*
* @param {Share_Presets_Updated_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const share_presets_updated_toast = /** @type {((inputs?: Share_Presets_Updated_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Share_Presets_Updated_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.share_presets_updated_toast(inputs)
	return __en.share_presets_updated_toast(inputs)
});
/**
* | output |
* | --- |
* | "Avg/mo:" |
*
* @param {St_Avg_MoInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_avg_mo = /** @type {((inputs?: St_Avg_MoInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Avg_MoInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_avg_mo(inputs)
	return __en.st_avg_mo(inputs)
});
/**
* | output |
* | --- |
* | "Bills, Shared Bills..." |
*
* @param {St_Bill_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_bill_name_placeholder = /** @type {((inputs?: St_Bill_Name_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Bill_Name_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_bill_name_placeholder(inputs)
	return __en.st_bill_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Each enabled rule creates or updates one Bill row when syncing a month" |
*
* @param {St_CaptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_caption = /** @type {((inputs?: St_CaptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_CaptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_caption(inputs)
	return __en.st_caption(inputs)
});
/**
* | output |
* | --- |
* | "Subtracker Category IDs" |
*
* @param {St_Cat_Ids_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_cat_ids_label = /** @type {((inputs?: St_Cat_Ids_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Cat_Ids_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_cat_ids_label(inputs)
	return __en.st_cat_ids_label(inputs)
});
/**
* | output |
* | --- |
* | "Optional, e.g. 1,3" |
*
* @param {St_Cat_Ids_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_cat_ids_placeholder = /** @type {((inputs?: St_Cat_Ids_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Cat_Ids_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_cat_ids_placeholder(inputs)
	return __en.st_cat_ids_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Bill Name" |
*
* @param {St_Col_Bill_NameInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_col_bill_name = /** @type {((inputs?: St_Col_Bill_NameInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Col_Bill_NameInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_col_bill_name(inputs)
	return __en.st_col_bill_name(inputs)
});
/**
* | output |
* | --- |
* | "PM IDs" |
*
* @param {St_Col_Pm_IdsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_col_pm_ids = /** @type {((inputs?: St_Col_Pm_IdsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Col_Pm_IdsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_col_pm_ids(inputs)
	return __en.st_col_pm_ids(inputs)
});
/**
* | output |
* | --- |
* | "Create Sync Rule" |
*
* @param {St_Create_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_create_button = /** @type {((inputs?: St_Create_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Create_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_create_button(inputs)
	return __en.st_create_button(inputs)
});
/**
* | output |
* | --- |
* | "Create Subtracker rule" |
*
* @param {St_Create_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_create_title = /** @type {((inputs?: St_Create_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Create_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_create_title(inputs)
	return __en.st_create_title(inputs)
});
/**
* | output |
* | --- |
* | "Delete \"{name}\"? Existing bills in past months are kept as normal bills." |
*
* @param {St_Delete_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_delete_desc = /** @type {((inputs: St_Delete_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Delete_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_delete_desc(inputs)
	return __en.st_delete_desc(inputs)
});
/**
* | output |
* | --- |
* | "Delete Subtracker Rule" |
*
* @param {St_Delete_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_delete_title = /** @type {((inputs?: St_Delete_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Delete_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_delete_title(inputs)
	return __en.st_delete_title(inputs)
});
/**
* | output |
* | --- |
* | "Sync recurring subscription totals from your Subtracker instance into monthly Bills." |
*
* @param {St_DescriptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_description = /** @type {((inputs?: St_DescriptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_DescriptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_description(inputs)
	return __en.st_description(inputs)
});
/**
* | output |
* | --- |
* | "Map a filtered Subtracker stats query to a monthly Bill line." |
*
* @param {St_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_dialog_desc = /** @type {((inputs?: St_Dialog_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Dialog_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_dialog_desc(inputs)
	return __en.st_dialog_desc(inputs)
});
/**
* | output |
* | --- |
* | "Edit Subtracker rule" |
*
* @param {St_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_edit_title = /** @type {((inputs?: St_Edit_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Edit_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_edit_title(inputs)
	return __en.st_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "No Subtracker rules configured yet." |
*
* @param {St_EmptyInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_empty = /** @type {((inputs?: St_EmptyInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_EmptyInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_empty(inputs)
	return __en.st_empty(inputs)
});
/**
* | output |
* | --- |
* | "Enabled for sync" |
*
* @param {St_Enabled_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_enabled_label = /** @type {((inputs?: St_Enabled_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Enabled_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_enabled_label(inputs)
	return __en.st_enabled_label(inputs)
});
/**
* | output |
* | --- |
* | "and" |
*
* @param {St_Env_Hint_AndInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_env_hint_and = /** @type {((inputs?: St_Env_Hint_AndInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Env_Hint_AndInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_env_hint_and(inputs)
	return __en.st_env_hint_and(inputs)
});
/**
* | output |
* | --- |
* | "Set" |
*
* @param {St_Env_Hint_PrefixInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_env_hint_prefix = /** @type {((inputs?: St_Env_Hint_PrefixInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Env_Hint_PrefixInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_env_hint_prefix(inputs)
	return __en.st_env_hint_prefix(inputs)
});
/**
* | output |
* | --- |
* | "in your environment to enable syncing from" |
*
* @param {St_Env_Hint_SuffixInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_env_hint_suffix = /** @type {((inputs?: St_Env_Hint_SuffixInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Env_Hint_SuffixInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_env_hint_suffix(inputs)
	return __en.st_env_hint_suffix(inputs)
});
/**
* | output |
* | --- |
* | "Next month:" |
*
* @param {St_Next_MonthInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_next_month = /** @type {((inputs?: St_Next_MonthInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Next_MonthInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_next_month(inputs)
	return __en.st_next_month(inputs)
});
/**
* | output |
* | --- |
* | "Subtracker Payment Method IDs" |
*
* @param {St_Pm_Ids_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_pm_ids_label = /** @type {((inputs?: St_Pm_Ids_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Pm_Ids_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_pm_ids_label(inputs)
	return __en.st_pm_ids_label(inputs)
});
/**
* | output |
* | --- |
* | "e.g. 1,2 (empty = all)" |
*
* @param {St_Pm_Ids_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_pm_ids_placeholder = /** @type {((inputs?: St_Pm_Ids_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Pm_Ids_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_pm_ids_placeholder(inputs)
	return __en.st_pm_ids_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Subtracker response ({currency})" |
*
* @param {St_Response_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_response_title = /** @type {((inputs: St_Response_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Response_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_response_title(inputs)
	return __en.st_response_title(inputs)
});
/**
* | output |
* | --- |
* | "Rule created" |
*
* @param {St_Rule_Created_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_rule_created_toast = /** @type {((inputs?: St_Rule_Created_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Rule_Created_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_rule_created_toast(inputs)
	return __en.st_rule_created_toast(inputs)
});
/**
* | output |
* | --- |
* | "Rule deleted" |
*
* @param {St_Rule_Deleted_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_rule_deleted_toast = /** @type {((inputs?: St_Rule_Deleted_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Rule_Deleted_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_rule_deleted_toast(inputs)
	return __en.st_rule_deleted_toast(inputs)
});
/**
* | output |
* | --- |
* | "Rule updated" |
*
* @param {St_Rule_Updated_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_rule_updated_toast = /** @type {((inputs?: St_Rule_Updated_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Rule_Updated_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_rule_updated_toast(inputs)
	return __en.st_rule_updated_toast(inputs)
});
/**
* | output |
* | --- |
* | "Keep 100% if Subtracker already splits shared subscriptions per user." |
*
* @param {St_Share_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_share_desc = /** @type {((inputs?: St_Share_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Share_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_share_desc(inputs)
	return __en.st_share_desc(inputs)
});
/**
* | output |
* | --- |
* | "Connected" |
*
* @param {St_Status_ConnectedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_status_connected = /** @type {((inputs?: St_Status_ConnectedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Status_ConnectedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_status_connected(inputs)
	return __en.st_status_connected(inputs)
});
/**
* | output |
* | --- |
* | "Not configured" |
*
* @param {St_Status_Not_ConfiguredInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_status_not_configured = /** @type {((inputs?: St_Status_Not_ConfiguredInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Status_Not_ConfiguredInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_status_not_configured(inputs)
	return __en.st_status_not_configured(inputs)
});
/**
* | output |
* | --- |
* | "Test Query" |
*
* @param {St_Test_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_test_button = /** @type {((inputs?: St_Test_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Test_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_test_button(inputs)
	return __en.st_test_button(inputs)
});
/**
* | output |
* | --- |
* | "Test failed" |
*
* @param {St_Test_FailedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_test_failed = /** @type {((inputs?: St_Test_FailedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_Test_FailedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_test_failed(inputs)
	return __en.st_test_failed(inputs)
});
/**
* | output |
* | --- |
* | "Testing..." |
*
* @param {St_TestingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_testing = /** @type {((inputs?: St_TestingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_TestingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_testing(inputs)
	return __en.st_testing(inputs)
});
/**
* | output |
* | --- |
* | "This month:" |
*
* @param {St_This_MonthInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_this_month = /** @type {((inputs?: St_This_MonthInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_This_MonthInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_this_month(inputs)
	return __en.st_this_month(inputs)
});
/**
* | output |
* | --- |
* | "Subtracker Bill Sync" |
*
* @param {St_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const st_title = /** @type {((inputs?: St_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<St_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.st_title(inputs)
	return __en.st_title(inputs)
});
/**
* | output |
* | --- |
* | "Apply Sync" |
*
* @param {Subtracker_Apply_SyncInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_apply_sync = /** @type {((inputs?: Subtracker_Apply_SyncInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Apply_SyncInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_apply_sync(inputs)
	return __en.subtracker_apply_sync(inputs)
});
/**
* | output |
* | --- |
* | "Bill" |
*
* @param {Subtracker_Col_BillInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_col_bill = /** @type {((inputs?: Subtracker_Col_BillInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Col_BillInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_col_bill(inputs)
	return __en.subtracker_col_bill(inputs)
});
/**
* | output |
* | --- |
* | "Failed to fetch Subtracker stats" |
*
* @param {Subtracker_Fetch_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_fetch_error = /** @type {((inputs?: Subtracker_Fetch_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Fetch_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_fetch_error(inputs)
	return __en.subtracker_fetch_error(inputs)
});
/**
* | output |
* | --- |
* | "Fetching stats from Subtracker..." |
*
* @param {Subtracker_FetchingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_fetching = /** @type {((inputs?: Subtracker_FetchingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_FetchingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_fetching(inputs)
	return __en.subtracker_fetching(inputs)
});
/**
* | output |
* | --- |
* | "Subtracker Metric" |
*
* @param {Subtracker_Metric_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_metric_label = /** @type {((inputs?: Subtracker_Metric_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Metric_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_metric_label(inputs)
	return __en.subtracker_metric_label(inputs)
});
/**
* | output |
* | --- |
* | "Monthly average (smoothed)" |
*
* @param {Subtracker_Metric_Monthly_AvgInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_metric_monthly_avg = /** @type {((inputs?: Subtracker_Metric_Monthly_AvgInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Metric_Monthly_AvgInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_metric_monthly_avg(inputs)
	return __en.subtracker_metric_monthly_avg(inputs)
});
/**
* | output |
* | --- |
* | "Next month (expected due)" |
*
* @param {Subtracker_Metric_Next_MonthInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_metric_next_month = /** @type {((inputs?: Subtracker_Metric_Next_MonthInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Metric_Next_MonthInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_metric_next_month(inputs)
	return __en.subtracker_metric_next_month(inputs)
});
/**
* | output |
* | --- |
* | "This month (actual due)" |
*
* @param {Subtracker_Metric_This_MonthInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_metric_this_month = /** @type {((inputs?: Subtracker_Metric_This_MonthInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Metric_This_MonthInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_metric_this_month(inputs)
	return __en.subtracker_metric_this_month(inputs)
});
/**
* | output |
* | --- |
* | "Subtracker's API only exposes the current and next calendar months — choose the metric you want to apply to {month}." |
*
* @param {Subtracker_Metric_WarningInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_metric_warning = /** @type {((inputs: Subtracker_Metric_WarningInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Metric_WarningInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_metric_warning(inputs)
	return __en.subtracker_metric_warning(inputs)
});
/**
* | output |
* | --- |
* | "No active Subtracker sync rules found. Configure rules in Settings." |
*
* @param {Subtracker_No_RulesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_no_rules = /** @type {((inputs?: Subtracker_No_RulesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_No_RulesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_no_rules(inputs)
	return __en.subtracker_no_rules(inputs)
});
/**
* | output |
* | --- |
* | "New" |
*
* @param {Subtracker_Status_NewInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_status_new = /** @type {((inputs?: Subtracker_Status_NewInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Status_NewInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_status_new(inputs)
	return __en.subtracker_status_new(inputs)
});
/**
* | output |
* | --- |
* | "Same" |
*
* @param {Subtracker_Status_SameInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_status_same = /** @type {((inputs?: Subtracker_Status_SameInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Status_SameInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_status_same(inputs)
	return __en.subtracker_status_same(inputs)
});
/**
* | output |
* | --- |
* | "Update" |
*
* @param {Subtracker_Status_UpdateInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_status_update = /** @type {((inputs?: Subtracker_Status_UpdateInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Status_UpdateInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_status_update(inputs)
	return __en.subtracker_status_update(inputs)
});
/**
* | output |
* | --- |
* | "Sync Subtracker" |
*
* @param {Subtracker_Sync_ButtonInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_sync_button = /** @type {((inputs?: Subtracker_Sync_ButtonInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Sync_ButtonInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_sync_button(inputs)
	return __en.subtracker_sync_button(inputs)
});
/**
* | output |
* | --- |
* | "Subtracker sync complete ({summary})" |
*
* @param {Subtracker_Sync_Complete_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_sync_complete_toast = /** @type {((inputs: Subtracker_Sync_Complete_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Sync_Complete_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_sync_complete_toast(inputs)
	return __en.subtracker_sync_complete_toast(inputs)
});
/**
* | output |
* | --- |
* | "{count} created" |
*
* @param {Subtracker_Sync_CreatedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_sync_created = /** @type {((inputs: Subtracker_Sync_CreatedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Sync_CreatedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_sync_created(inputs)
	return __en.subtracker_sync_created(inputs)
});
/**
* | output |
* | --- |
* | "Preview subscription totals for {month} before updating Bills." |
*
* @param {Subtracker_Sync_DescriptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_sync_description = /** @type {((inputs: Subtracker_Sync_DescriptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Sync_DescriptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_sync_description(inputs)
	return __en.subtracker_sync_description(inputs)
});
/**
* | output |
* | --- |
* | "Failed to sync from Subtracker" |
*
* @param {Subtracker_Sync_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_sync_error = /** @type {((inputs?: Subtracker_Sync_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Sync_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_sync_error(inputs)
	return __en.subtracker_sync_error(inputs)
});
/**
* | output |
* | --- |
* | "no changes" |
*
* @param {Subtracker_Sync_No_ChangesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_sync_no_changes = /** @type {((inputs?: Subtracker_Sync_No_ChangesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Sync_No_ChangesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_sync_no_changes(inputs)
	return __en.subtracker_sync_no_changes(inputs)
});
/**
* | output |
* | --- |
* | "Sync Bills from Subtracker" |
*
* @param {Subtracker_Sync_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_sync_title = /** @type {((inputs?: Subtracker_Sync_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Sync_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_sync_title(inputs)
	return __en.subtracker_sync_title(inputs)
});
/**
* | output |
* | --- |
* | "{count} unchanged" |
*
* @param {Subtracker_Sync_UnchangedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_sync_unchanged = /** @type {((inputs: Subtracker_Sync_UnchangedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Sync_UnchangedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_sync_unchanged(inputs)
	return __en.subtracker_sync_unchanged(inputs)
});
/**
* | output |
* | --- |
* | "{count} updated" |
*
* @param {Subtracker_Sync_UpdatedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_sync_updated = /** @type {((inputs: Subtracker_Sync_UpdatedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_Sync_UpdatedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_sync_updated(inputs)
	return __en.subtracker_sync_updated(inputs)
});
/**
* | output |
* | --- |
* | "Syncing..." |
*
* @param {Subtracker_SyncingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const subtracker_syncing = /** @type {((inputs?: Subtracker_SyncingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Subtracker_SyncingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.subtracker_syncing(inputs)
	return __en.subtracker_syncing(inputs)
});
/**
* | output |
* | --- |
* | "Bills (Your share)" |
*
* @param {Summary_Bills_ShareInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const summary_bills_share = /** @type {((inputs?: Summary_Bills_ShareInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Summary_Bills_ShareInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.summary_bills_share(inputs)
	return __en.summary_bills_share(inputs)
});
/**
* | output |
* | --- |
* | "Expenses (Your share)" |
*
* @param {Summary_Expenses_ShareInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const summary_expenses_share = /** @type {((inputs?: Summary_Expenses_ShareInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Summary_Expenses_ShareInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.summary_expenses_share(inputs)
	return __en.summary_expenses_share(inputs)
});
/**
* | output |
* | --- |
* | "Income" |
*
* @param {Summary_IncomeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const summary_income = /** @type {((inputs?: Summary_IncomeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Summary_IncomeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.summary_income(inputs)
	return __en.summary_income(inputs)
});
/**
* | output |
* | --- |
* | "Remaining" |
*
* @param {Summary_RemainingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const summary_remaining = /** @type {((inputs?: Summary_RemainingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Summary_RemainingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.summary_remaining(inputs)
	return __en.summary_remaining(inputs)
});
/**
* | output |
* | --- |
* | "Savings" |
*
* @param {Summary_SavingsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const summary_savings = /** @type {((inputs?: Summary_SavingsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Summary_SavingsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.summary_savings(inputs)
	return __en.summary_savings(inputs)
});
/**
* | output |
* | --- |
* | "Section" |
*
* @param {Summary_SectionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const summary_section = /** @type {((inputs?: Summary_SectionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Summary_SectionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.summary_section(inputs)
	return __en.summary_section(inputs)
});
/**
* | output |
* | --- |
* | "Summary" |
*
* @param {Summary_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const summary_title = /** @type {((inputs?: Summary_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Summary_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.summary_title(inputs)
	return __en.summary_title(inputs)
});
/**
* | output |
* | --- |
* | "Add Transaction" |
*
* @param {Tx_AddInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_add = /** @type {((inputs?: Tx_AddInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_AddInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_add(inputs)
	return __en.tx_add(inputs)
});
/**
* | output |
* | --- |
* | "Transaction added" |
*
* @param {Tx_Added_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_added_toast = /** @type {((inputs?: Tx_Added_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Added_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_added_toast(inputs)
	return __en.tx_added_toast(inputs)
});
/**
* | output |
* | --- |
* | "Amount (€)" |
*
* @param {Tx_Amount_EurInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_amount_eur = /** @type {((inputs?: Tx_Amount_EurInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Amount_EurInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_amount_eur(inputs)
	return __en.tx_amount_eur(inputs)
});
/**
* | output |
* | --- |
* | "Use a minus sign for refunds (e.g. -15.00)" |
*
* @param {Tx_Amount_HintInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_amount_hint = /** @type {((inputs?: Tx_Amount_HintInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Amount_HintInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_amount_hint(inputs)
	return __en.tx_amount_hint(inputs)
});
/**
* | output |
* | --- |
* | "Budget Month" |
*
* @param {Tx_Budget_MonthInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_budget_month = /** @type {((inputs?: Tx_Budget_MonthInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Budget_MonthInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_budget_month(inputs)
	return __en.tx_budget_month(inputs)
});
/**
* | output |
* | --- |
* | "Clear filters" |
*
* @param {Tx_Clear_FiltersInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_clear_filters = /** @type {((inputs?: Tx_Clear_FiltersInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Clear_FiltersInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_clear_filters(inputs)
	return __en.tx_clear_filters(inputs)
});
/**
* | output |
* | --- |
* | "{count} transactions" |
*
* @param {Tx_Count_PluralInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_count_plural = /** @type {((inputs: Tx_Count_PluralInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Count_PluralInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_count_plural(inputs)
	return __en.tx_count_plural(inputs)
});
/**
* | output |
* | --- |
* | "{count} transaction" |
*
* @param {Tx_Count_SingularInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_count_singular = /** @type {((inputs: Tx_Count_SingularInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Count_SingularInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_count_singular(inputs)
	return __en.tx_count_singular(inputs)
});
/**
* | output |
* | --- |
* | "Create mapping rule" |
*
* @param {Tx_Create_Mapping_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_create_mapping_title = /** @type {((inputs?: Tx_Create_Mapping_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Create_Mapping_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_create_mapping_title(inputs)
	return __en.tx_create_mapping_title(inputs)
});
/**
* | output |
* | --- |
* | "Remove \"{name}\" ({amount}) from this month?" |
*
* @param {Tx_Delete_Confirm_DescInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_delete_confirm_desc = /** @type {((inputs: Tx_Delete_Confirm_DescInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Delete_Confirm_DescInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_delete_confirm_desc(inputs)
	return __en.tx_delete_confirm_desc(inputs)
});
/**
* | output |
* | --- |
* | "Delete transaction?" |
*
* @param {Tx_Delete_Confirm_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_delete_confirm_title = /** @type {((inputs?: Tx_Delete_Confirm_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Delete_Confirm_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_delete_confirm_title(inputs)
	return __en.tx_delete_confirm_title(inputs)
});
/**
* | output |
* | --- |
* | "Failed to delete transaction" |
*
* @param {Tx_Delete_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_delete_error = /** @type {((inputs?: Tx_Delete_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Delete_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_delete_error(inputs)
	return __en.tx_delete_error(inputs)
});
/**
* | output |
* | --- |
* | "Delete transaction" |
*
* @param {Tx_Delete_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_delete_title = /** @type {((inputs?: Tx_Delete_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Delete_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_delete_title(inputs)
	return __en.tx_delete_title(inputs)
});
/**
* | output |
* | --- |
* | "Transaction deleted" |
*
* @param {Tx_Deleted_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_deleted_toast = /** @type {((inputs?: Tx_Deleted_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Deleted_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_deleted_toast(inputs)
	return __en.tx_deleted_toast(inputs)
});
/**
* | output |
* | --- |
* | "Positive amounts are expenses; negative amounts are refunds." |
*
* @param {Tx_Dialog_DescriptionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_dialog_description = /** @type {((inputs?: Tx_Dialog_DescriptionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Dialog_DescriptionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_dialog_description(inputs)
	return __en.tx_dialog_description(inputs)
});
/**
* | output |
* | --- |
* | "Edit Transaction" |
*
* @param {Tx_EditInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_edit = /** @type {((inputs?: Tx_EditInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_EditInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_edit(inputs)
	return __en.tx_edit(inputs)
});
/**
* | output |
* | --- |
* | "Edit transaction" |
*
* @param {Tx_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_edit_title = /** @type {((inputs?: Tx_Edit_TitleInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Edit_TitleInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_edit_title(inputs)
	return __en.tx_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "No transactions found for this month. Add one manually or import from" |
*
* @param {Tx_Empty_BeforeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_empty_before = /** @type {((inputs?: Tx_Empty_BeforeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Empty_BeforeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_empty_before(inputs)
	return __en.tx_empty_before(inputs)
});
/**
* | output |
* | --- |
* | "Exclude from budget" |
*
* @param {Tx_Exclude_ActionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_exclude_action = /** @type {((inputs?: Tx_Exclude_ActionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Exclude_ActionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_exclude_action(inputs)
	return __en.tx_exclude_action(inputs)
});
/**
* | output |
* | --- |
* | "Excluded" |
*
* @param {Tx_Excluded_BadgeInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_excluded_badge = /** @type {((inputs?: Tx_Excluded_BadgeInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Excluded_BadgeInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_excluded_badge(inputs)
	return __en.tx_excluded_badge(inputs)
});
/**
* | output |
* | --- |
* | "All categories" |
*
* @param {Tx_Filter_All_CategoriesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_filter_all_categories = /** @type {((inputs?: Tx_Filter_All_CategoriesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Filter_All_CategoriesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_filter_all_categories(inputs)
	return __en.tx_filter_all_categories(inputs)
});
/**
* | output |
* | --- |
* | "All methods" |
*
* @param {Tx_Filter_All_MethodsInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_filter_all_methods = /** @type {((inputs?: Tx_Filter_All_MethodsInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Filter_All_MethodsInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_filter_all_methods(inputs)
	return __en.tx_filter_all_methods(inputs)
});
/**
* | output |
* | --- |
* | "All shares" |
*
* @param {Tx_Filter_All_SharesInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_filter_all_shares = /** @type {((inputs?: Tx_Filter_All_SharesInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Filter_All_SharesInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_filter_all_shares(inputs)
	return __en.tx_filter_all_shares(inputs)
});
/**
* | output |
* | --- |
* | "Custom %" |
*
* @param {Tx_Filter_Custom_ShareInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_filter_custom_share = /** @type {((inputs?: Tx_Filter_Custom_ShareInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Filter_Custom_ShareInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_filter_custom_share(inputs)
	return __en.tx_filter_custom_share(inputs)
});
/**
* | output |
* | --- |
* | "No method" |
*
* @param {Tx_Filter_No_MethodInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_filter_no_method = /** @type {((inputs?: Tx_Filter_No_MethodInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Filter_No_MethodInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_filter_no_method(inputs)
	return __en.tx_filter_no_method(inputs)
});
/**
* | output |
* | --- |
* | "Gross:" |
*
* @param {Tx_Gross_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_gross_label = /** @type {((inputs?: Tx_Gross_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Gross_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_gross_label(inputs)
	return __en.tx_gross_label(inputs)
});
/**
* | output |
* | --- |
* | "Include in budget" |
*
* @param {Tx_Include_ActionInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_include_action = /** @type {((inputs?: Tx_Include_ActionInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Include_ActionInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_include_action(inputs)
	return __en.tx_include_action(inputs)
});
/**
* | output |
* | --- |
* | "Failed to load transactions." |
*
* @param {Tx_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_load_error = /** @type {((inputs?: Tx_Load_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Load_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_load_error(inputs)
	return __en.tx_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Loading transactions..." |
*
* @param {Tx_LoadingInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_loading = /** @type {((inputs?: Tx_LoadingInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_LoadingInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_loading(inputs)
	return __en.tx_loading(inputs)
});
/**
* | output |
* | --- |
* | "Carrefour, Bakery, Cash..." |
*
* @param {Tx_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_name_placeholder = /** @type {((inputs?: Tx_Name_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Name_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_name_placeholder(inputs)
	return __en.tx_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Failed to save transaction" |
*
* @param {Tx_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_save_error = /** @type {((inputs?: Tx_Save_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Save_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_save_error(inputs)
	return __en.tx_save_error(inputs)
});
/**
* | output |
* | --- |
* | "Search name..." |
*
* @param {Tx_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_search_placeholder = /** @type {((inputs?: Tx_Search_PlaceholderInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Search_PlaceholderInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_search_placeholder(inputs)
	return __en.tx_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Share (%)" |
*
* @param {Tx_Share_PercentInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_share_percent = /** @type {((inputs?: Tx_Share_PercentInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Share_PercentInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_share_percent(inputs)
	return __en.tx_share_percent(inputs)
});
/**
* | output |
* | --- |
* | "Show excluded" |
*
* @param {Tx_Show_ExcludedInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_show_excluded = /** @type {((inputs?: Tx_Show_ExcludedInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Show_ExcludedInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_show_excluded(inputs)
	return __en.tx_show_excluded(inputs)
});
/**
* | output |
* | --- |
* | "Failed to update transaction" |
*
* @param {Tx_Update_ErrorInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_update_error = /** @type {((inputs?: Tx_Update_ErrorInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Update_ErrorInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_update_error(inputs)
	return __en.tx_update_error(inputs)
});
/**
* | output |
* | --- |
* | "Transaction updated" |
*
* @param {Tx_Updated_ToastInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_updated_toast = /** @type {((inputs?: Tx_Updated_ToastInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Updated_ToastInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_updated_toast(inputs)
	return __en.tx_updated_toast(inputs)
});
/**
* | output |
* | --- |
* | "Your Share:" |
*
* @param {Tx_Your_Share_LabelInputs} inputs
* @param {{ locale?: "en" | "fr" }} options
* @returns {LocalizedString}
*/
export const tx_your_share_label = /** @type {((inputs?: Tx_Your_Share_LabelInputs, options?: { locale?: "en" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tx_Your_Share_LabelInputs, { locale?: "en" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "fr") return __fr.tx_your_share_label(inputs)
	return __en.tx_your_share_label(inputs)
});