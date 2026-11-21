CREATE TABLE IF NOT EXISTS `account_snapshots` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`account_id` integer NOT NULL,
	`month_id` text NOT NULL,
	`balance_cents` integer NOT NULL,
	`note` text,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `account_snapshots_account_month_unique` ON `account_snapshots` (`account_id`,`month_id`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `account_snapshots_month_idx` ON `account_snapshots` (`month_id`);