USE westudents;

CREATE TABLE `Students` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`surname` VARCHAR(255) NOT NULL,
	`birth_date` DATE NOT NULL,
	`gender` INT NOT NULL,
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`phone_number` BIGINT NOT NULL,
	`password_hash` VARCHAR(255) NOT NULL,
	`class_name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Subjects` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`student_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `GradeTypes` (
	`id` INT NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Grades` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`grade` FLOAT NOT NULL,
	`subject_id` INT NOT NULL,
	`date` DATE NOT NULL,
	`grade_type` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Notes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`student_id` INT NOT NULL,
	`note` VARCHAR(255) NOT NULL,
	`date` DATE NOT NULL,
	`note_type` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Genders` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`abbreviation` VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `NoteTypes` (
	`id` INT NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Students` ADD CONSTRAINT `Students_fk0` FOREIGN KEY (`gender`) REFERENCES `Genders`(`id`);

ALTER TABLE `Subjects` ADD CONSTRAINT `Subjects_fk0` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`);

ALTER TABLE `Grades` ADD CONSTRAINT `Grades_fk0` FOREIGN KEY (`subject_id`) REFERENCES `Subjects`(`id`);

ALTER TABLE `Grades` ADD CONSTRAINT `Grades_fk1` FOREIGN KEY (`grade_type`) REFERENCES `GradeTypes`(`id`);

ALTER TABLE `Notes` ADD CONSTRAINT `Notes_fk0` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`);

ALTER TABLE `Notes` ADD CONSTRAINT `Notes_fk1` FOREIGN KEY (`note_type`) REFERENCES `NoteTypes`(`id`);
