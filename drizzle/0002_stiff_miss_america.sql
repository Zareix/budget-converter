CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`label` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
INSERT INTO `categories` (`slug`, `label`) VALUES
	('courses', '🛒 Courses'),
	('restaurant', '🍣 Restaurant'),
	('bar/café', '🍹 Bar/Café'),
	('transport', '🚕 Transport'),
	('divertissement', '🎫 Divertissement'),
	('shopping', '🛍️ Shopping'),
	('voyage', '🌍 Voyage'),
	('santé', '⛑️ Santé'),
	('maison', '🏡 Maison'),
	('chien', '🐶 Chien'),
	('cadeaux', '🎁 Cadeaux'),
	('dons', '🙏 Dons'),
	('autres', '💬 Autres');--> statement-breakpoint
UPDATE `mappings` SET `to_category` = 'bar/café' WHERE `to_category` IN ('bar', 'café');--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_mappings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`mode` text NOT NULL,
	`from_name` text NOT NULL,
	`to_name` text NOT NULL,
	`to_category` text NOT NULL,
	`from_price` real,
	`exclude` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`to_category`) REFERENCES `categories`(`slug`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_mappings`("id", "mode", "from_name", "to_name", "to_category", "from_price", "exclude") SELECT "id", "mode", "from_name", "to_name", "to_category", "from_price", "exclude" FROM `mappings`;--> statement-breakpoint
DROP TABLE `mappings`;--> statement-breakpoint
ALTER TABLE `__new_mappings` RENAME TO `mappings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;