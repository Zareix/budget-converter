CREATE TABLE `subtracker_bill_rules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`from_account_id` integer,
	`share_percent` integer DEFAULT 100 NOT NULL,
	`due_day` integer,
	`payment_method_ids` text,
	`category_ids` text,
	`enabled` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`from_account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
ALTER TABLE `bills` ADD `subtracker_rule_id` integer REFERENCES `subtracker_bill_rules`(`id`) ON DELETE SET NULL;--> statement-breakpoint
CREATE INDEX `bills_month_subtracker_rule_idx` ON `bills` (`month_id`,`subtracker_rule_id`);