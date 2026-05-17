CREATE TABLE `mappings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`mode` text NOT NULL,
	`from_name` text NOT NULL,
	`to_name` text NOT NULL,
	`to_category` text NOT NULL,
	`from_price` real,
	`exclude` integer DEFAULT false NOT NULL
);
