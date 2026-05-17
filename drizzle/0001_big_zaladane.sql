CREATE TABLE `eb_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`institution_name` text NOT NULL,
	`institution_logo` text,
	`valid_until` text NOT NULL
);
