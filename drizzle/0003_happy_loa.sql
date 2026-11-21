CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`color` text,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_slug_unique` ON `accounts` (`slug`);--> statement-breakpoint
CREATE TABLE `bills` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`month_id` text NOT NULL,
	`name` text NOT NULL,
	`due_day` integer,
	`from_account_id` integer,
	`share_percent` integer DEFAULT 100 NOT NULL,
	`budget_cents` integer DEFAULT 0 NOT NULL,
	`actual_cents` integer,
	`paid` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`month_id`) REFERENCES `months`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`from_account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `bills_month_idx` ON `bills` (`month_id`);--> statement-breakpoint
CREATE TABLE `category_budgets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`month_id` text NOT NULL,
	`category_slug` text NOT NULL,
	`budget_cents` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`month_id`) REFERENCES `months`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_slug`) REFERENCES `categories`(`slug`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_budgets_month_category_unique` ON `category_budgets` (`month_id`,`category_slug`);--> statement-breakpoint
CREATE TABLE `incomes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`month_id` text NOT NULL,
	`name` text NOT NULL,
	`due_date` text,
	`expected_cents` integer DEFAULT 0 NOT NULL,
	`actual_cents` integer,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`month_id`) REFERENCES `months`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `incomes_month_idx` ON `incomes` (`month_id`);--> statement-breakpoint
CREATE TABLE `months` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `payment_methods` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`label` text NOT NULL,
	`color` text,
	`default_share_percent` integer DEFAULT 100 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payment_methods_slug_unique` ON `payment_methods` (`slug`);--> statement-breakpoint
CREATE TABLE `savings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`month_id` text NOT NULL,
	`name` text NOT NULL,
	`budget_cents` integer DEFAULT 0 NOT NULL,
	`actual_cents` integer,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`month_id`) REFERENCES `months`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `savings_month_idx` ON `savings` (`month_id`);--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`month_id` text NOT NULL,
	`date` text NOT NULL,
	`name` text NOT NULL,
	`source_name` text,
	`amount_cents` integer NOT NULL,
	`share_percent` integer DEFAULT 100 NOT NULL,
	`category_slug` text NOT NULL,
	`payment_method_id` integer,
	`excluded` integer DEFAULT false NOT NULL,
	`external_id` text,
	`raw` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`month_id`) REFERENCES `months`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_slug`) REFERENCES `categories`(`slug`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `transactions_external_id_unique` ON `transactions` (`external_id`);--> statement-breakpoint
CREATE INDEX `transactions_month_date_idx` ON `transactions` (`month_id`,`date`);--> statement-breakpoint
CREATE INDEX `transactions_month_category_idx` ON `transactions` (`month_id`,`category_slug`);--> statement-breakpoint
ALTER TABLE `categories` ADD `color` text;--> statement-breakpoint
ALTER TABLE `categories` ADD `sort_order` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `mappings` ADD `default_share_percent` integer;--> statement-breakpoint
INSERT INTO `accounts` (`slug`, `name`, `type`, `color`, `sort_order`) VALUES
	('sg-checking', 'SG - Compte courant', 'checking', '#ef4444', 1),
	('sg-livret-a', 'SG - Livret A', 'savings', '#f97316', 2),
	('revolut-checking', 'Revolut - Compte courant', 'checking', '#3b82f6', 3),
	('revolut-joint', 'Revolut - Compte joint', 'joint', '#8b5cf6', 4),
	('fortuneo-pea', 'Fortuneo - PEA', 'investment', '#10b981', 5),
	('linxea-av', 'Linxea - Assurance Vie', 'investment', '#14b8a6', 6);--> statement-breakpoint
INSERT INTO `payment_methods` (`slug`, `label`, `color`, `default_share_percent`, `sort_order`) VALUES
	('carte-sg', 'Carte SG', '#ef4444', 100, 1),
	('carte-amex', 'Carte AMEX', '#2563eb', 100, 2),
	('carte-revolut', 'Carte Revolut', '#0ea5e9', 100, 3),
	('carte-compte-joint', 'Carte compte joint', '#8b5cf6', 50, 4),
	('tricount-lola', 'Tricount Lola', '#10b981', 50, 5),
	('especes', 'Espèces', '#f59e0b', 100, 6);--> statement-breakpoint
UPDATE `categories` SET `color` = '#22c55e', `sort_order` = 1 WHERE `slug` = 'courses';--> statement-breakpoint
UPDATE `categories` SET `color` = '#f97316', `sort_order` = 2 WHERE `slug` = 'restaurant';--> statement-breakpoint
UPDATE `categories` SET `color` = '#f59e0b', `sort_order` = 3 WHERE `slug` = 'bar/café';--> statement-breakpoint
UPDATE `categories` SET `color` = '#3b82f6', `sort_order` = 4 WHERE `slug` = 'transport';--> statement-breakpoint
UPDATE `categories` SET `color` = '#a855f7', `sort_order` = 5 WHERE `slug` = 'divertissement';--> statement-breakpoint
UPDATE `categories` SET `color` = '#ec4899', `sort_order` = 6 WHERE `slug` = 'shopping';--> statement-breakpoint
UPDATE `categories` SET `color` = '#06b6d4', `sort_order` = 7 WHERE `slug` = 'voyage';--> statement-breakpoint
UPDATE `categories` SET `color` = '#ef4444', `sort_order` = 8 WHERE `slug` = 'santé';--> statement-breakpoint
UPDATE `categories` SET `color` = '#84cc16', `sort_order` = 9 WHERE `slug` = 'maison';--> statement-breakpoint
UPDATE `categories` SET `color` = '#d97706', `sort_order` = 10 WHERE `slug` = 'chien';--> statement-breakpoint
UPDATE `categories` SET `color` = '#e11d48', `sort_order` = 11 WHERE `slug` = 'cadeaux';--> statement-breakpoint
UPDATE `categories` SET `color` = '#6366f1', `sort_order` = 12 WHERE `slug` = 'dons';--> statement-breakpoint
UPDATE `categories` SET `color` = '#64748b', `sort_order` = 13 WHERE `slug` = 'autres';