CREATE TABLE `share_presets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text NOT NULL,
	`percent` integer NOT NULL,
	`color` text,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `share_presets_percent_unique` ON `share_presets` (`percent`);--> statement-breakpoint
INSERT INTO `share_presets` (`label`, `percent`, `color`, `sort_order`) VALUES
	('Personal', 100, '#10b981', 1),
	('Shared', 50, '#0ea5e9', 2),
	('Other', 0, '#64748b', 3);