CREATE TABLE IF NOT EXISTS `investment_transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`account_id` integer NOT NULL,
	`security_id` integer NOT NULL,
	`type` text NOT NULL,
	`date` text NOT NULL,
	`quantity` real NOT NULL,
	`unit_price_cents` integer NOT NULL,
	`fees_cents` integer DEFAULT 0 NOT NULL,
	`total_eur_cents` integer NOT NULL,
	`note` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`security_id`) REFERENCES `securities`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `investment_tx_account_date_idx` ON `investment_transactions` (`account_id`,`date`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `investment_tx_security_date_idx` ON `investment_transactions` (`security_id`,`date`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `securities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`symbol` text NOT NULL,
	`isin` text,
	`name` text NOT NULL,
	`asset_class` text DEFAULT 'etf' NOT NULL,
	`currency` text DEFAULT 'EUR' NOT NULL,
	`pricing_mode` text DEFAULT 'yahoo' NOT NULL,
	`manual_price_cents` integer,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `securities_symbol_unique` ON `securities` (`symbol`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `security_monthly_prices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`symbol` text NOT NULL,
	`month_id` text NOT NULL,
	`close_price` real NOT NULL,
	`currency` text NOT NULL,
	`fetched_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `security_monthly_prices_symbol_month_unique` ON `security_monthly_prices` (`symbol`,`month_id`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `security_monthly_prices_month_idx` ON `security_monthly_prices` (`month_id`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `security_quotes` (
	`symbol` text PRIMARY KEY NOT NULL,
	`currency` text NOT NULL,
	`price` real NOT NULL,
	`previous_close` real,
	`change_percent` real,
	`fetched_at` text NOT NULL
);
