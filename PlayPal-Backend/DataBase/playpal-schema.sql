CREATE DATABASE `playpal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `booking_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookingid` varchar(255) NOT NULL,
  `timeslotstart` varchar(45) DEFAULT NULL,
  `timeslotend` varchar(45) DEFAULT NULL,
  `noofcourts` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `bookings` (
  `bookingid` varchar(255) NOT NULL,
  `venueid` int DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `bookingtimestamp` varchar(45) DEFAULT NULL,
  `bookingstatus` varchar(255) DEFAULT NULL,
  `paymenttype` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`bookingid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `post` (
  `postid` int NOT NULL AUTO_INCREMENT,
  `posttype` varchar(45) DEFAULT NULL,
  `postedbyid` int DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `posttext` varchar(255) DEFAULT NULL,
  `mediaurl` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`postid`),
  KEY `id2_idx` (`postedbyid`),
  CONSTRAINT `id2` FOREIGN KEY (`postedbyid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tournaments` (
  `tournamentid` int NOT NULL AUTO_INCREMENT,
  `tournamentname` varchar(45) DEFAULT NULL,
  `venueid` int DEFAULT NULL,
  `sport` varchar(255) DEFAULT NULL,
  `startdate` varchar(45) DEFAULT NULL,
  `enddate` varchar(45) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `sporttype` varchar(45) DEFAULT NULL,
  `noofplayers` int DEFAULT NULL,
  `noofteams` int DEFAULT NULL,
  `noofplayersperteam` int DEFAULT NULL,
  PRIMARY KEY (`tournamentid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_reviews` (
  `reviewId` int NOT NULL AUTO_INCREMENT,
  `toUserId` int NOT NULL,
  `fromUserId` int NOT NULL,
  `rating` varchar(45) NOT NULL,
  `reviewText` varchar(255) NOT NULL,
  `reviewDate` varchar(45) NOT NULL,
  PRIMARY KEY (`reviewId`),
  KEY `id3_idx` (`toUserId`,`fromUserId`),
  KEY `id4_idx` (`fromUserId`),
  CONSTRAINT `id4` FOREIGN KEY (`fromUserId`) REFERENCES `users` (`id`),
  CONSTRAINT `id5` FOREIGN KEY (`fromUserId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `mobile` varchar(12) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `interests1` varchar(255) DEFAULT NULL,
  `interests2` varchar(255) DEFAULT NULL,
  `interests3` varchar(255) DEFAULT NULL,
  `pictures` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `registeddate` datetime DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `verificationStatus` enum('none','pending','approved','rejected') NOT NULL DEFAULT 'none' COMMENT 'ENUM(''none'', ''pending'', ''approved'', ''rejected'')\nNone- when user does not ask for verification\nPending - verification is pending\nApproved- verification approved\nRejected- verification rejected\n',
  `experiences` varchar(45) DEFAULT NULL,
  `verificationReqDT` varchar(45) DEFAULT NULL,
  `verificationRespDT` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `venueimages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `venueId` int NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `venue_reviews` (
  `reviewId` int NOT NULL AUTO_INCREMENT,
  `toVenueId` int NOT NULL,
  `fromUserId` int NOT NULL,
  `rating` varchar(45) NOT NULL,
  `reviewText` longtext NOT NULL,
  `reviewDate` varchar(45) NOT NULL,
  PRIMARY KEY (`reviewId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `venues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `venueownerid` int NOT NULL,
  `venuename` varchar(255) DEFAULT NULL,
  `startTime` varchar(45) DEFAULT NULL,
  `endTime` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `mobile` varchar(12) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `amenity1` varchar(255) DEFAULT NULL,
  `amenity2` varchar(255) DEFAULT NULL,
  `amenity3` varchar(255) DEFAULT NULL,
  `amenity4` varchar(255) DEFAULT NULL,
  `amenity5` varchar(255) DEFAULT NULL,
  `amenity6` varchar(255) DEFAULT NULL,
  `noofcourts` int DEFAULT NULL,
  `verificationStatus` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `verifcationReqDT` varchar(45) DEFAULT NULL,
  `verificationRespDT` varchar(45) DEFAULT NULL,
  `pricePerHour` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id1_idx` (`venueownerid`),
  CONSTRAINT `id1` FOREIGN KEY (`venueownerid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
