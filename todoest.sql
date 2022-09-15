-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2022 at 02:45 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todoest`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `slug`, `image`, `createdBy`, `updatedBy`, `deletedBy`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Education', 'education-1663245680540', 'nejc-soklic-wo42rmamef8-unsplash-1663245680539.jpg', NULL, NULL, NULL, 0, '2022-09-15 12:41:20', '2022-09-15 12:41:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projectstatuses`
--

CREATE TABLE `projectstatuses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `projectId` int(11) NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `projectstatuses`
--

INSERT INTO `projectstatuses` (`id`, `name`, `projectId`, `createdBy`, `updatedBy`, `deletedBy`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'start', 1, NULL, NULL, NULL, 0, '2022-09-15 12:41:20', '2022-09-15 12:41:20', NULL),
(2, 'Progress', 1, NULL, NULL, NULL, 0, '2022-09-15 12:41:20', '2022-09-15 12:41:20', NULL),
(3, ' End', 1, NULL, NULL, NULL, 0, '2022-09-15 12:41:20', '2022-09-15 12:41:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_users`
--

CREATE TABLE `project_users` (
  `id` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_users`
--

INSERT INTO `project_users` (`id`, `projectId`, `userId`, `createdBy`, `updatedBy`, `deletedBy`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 2, 1, NULL, NULL, '2022-09-15 12:41:20', '2022-09-15 12:41:20', NULL),
(2, 1, 3, 1, NULL, NULL, '2022-09-15 12:41:20', '2022-09-15 12:41:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subTitle` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `fb` varchar(255) DEFAULT NULL,
  `insta` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `taskimages`
--

CREATE TABLE `taskimages` (
  `id` int(11) NOT NULL,
  `taskId` int(11) NOT NULL,
  `image` text NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `taskimages`
--

INSERT INTO `taskimages` (`id`, `taskId`, `image`, `createdBy`, `updatedBy`, `deletedBy`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'nasa-1lfi7wkgwz4-unsplash-1663245796172.jpg', 1, NULL, NULL, '2022-09-15 12:43:16', '2022-09-15 12:43:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` text NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `projectId` int(11) NOT NULL,
  `statusId` int(11) NOT NULL,
  `priority` enum('first','second','thired','four') DEFAULT 'four',
  `remain` datetime NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `slug`, `desc`, `projectId`, `statusId`, `priority`, `remain`, `createdBy`, `updatedBy`, `deletedBy`, `status`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'EEE CKT', 'eee-ckt-1663245796118', 'EEE CKT', 1, 1, 'second', '2022-09-16 12:41:38', 1, NULL, NULL, 0, '2022-09-15 12:43:16', '2022-09-15 12:43:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `task_users`
--

CREATE TABLE `task_users` (
  `id` int(11) NOT NULL,
  `taskId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task_users`
--

INSERT INTO `task_users` (`id`, `taskId`, `userId`, `createdBy`, `updatedBy`, `deletedBy`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 3, 1, NULL, NULL, '2022-09-15 12:43:16', '2022-09-15 12:43:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `userRole` enum('user','admin') DEFAULT 'user',
  `image` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `userRole`, `image`, `active`, `createdBy`, `updatedBy`, `deletedBy`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$AZQak67uS4QyOlmxMIqqaeg2bj/TAavwbpjl0l3x0ywDAAXR9iE7y', 'admin', 'avatar1-1663245399722.avif', 1, NULL, NULL, NULL, '2022-09-15 12:36:39', '2022-09-15 12:36:39', NULL),
(2, 'Ashadul', 'ashadul@gmail.com', '$2b$10$1esFKKVsGwA9MZ36GhXCBebF/aDdlPLkuCGhRDjFOSbCKedAdSs4q', 'user', 'avatar2-1663245544637.avif', 1, NULL, NULL, NULL, '2022-09-15 12:39:04', '2022-09-15 12:39:04', NULL),
(3, 'Asif', 'asif@gmail.com', '$2b$10$T0Yyr9Zx0QTA.QjF222wMuvgxI4FgtvMz8pSez92PLmSyvjuT/c5m', 'user', 'avatar3-1663245606982.avif', 1, NULL, NULL, NULL, '2022-09-15 12:40:06', '2022-09-15 12:40:06', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projectstatuses`
--
ALTER TABLE `projectstatuses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projectId` (`projectId`);

--
-- Indexes for table `project_users`
--
ALTER TABLE `project_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `project_users_userId_projectId_unique` (`projectId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `image` (`image`);

--
-- Indexes for table `taskimages`
--
ALTER TABLE `taskimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `taskId` (`taskId`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projectId` (`projectId`),
  ADD KEY `statusId` (`statusId`);

--
-- Indexes for table `task_users`
--
ALTER TABLE `task_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `task_users_userId_taskId_unique` (`taskId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `image` (`image`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projectstatuses`
--
ALTER TABLE `projectstatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `project_users`
--
ALTER TABLE `project_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taskimages`
--
ALTER TABLE `taskimages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `task_users`
--
ALTER TABLE `task_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `projectstatuses`
--
ALTER TABLE `projectstatuses`
  ADD CONSTRAINT `projectstatuses_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_users`
--
ALTER TABLE `project_users`
  ADD CONSTRAINT `project_users_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_users_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `taskimages`
--
ALTER TABLE `taskimages`
  ADD CONSTRAINT `taskimages_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`statusId`) REFERENCES `projectstatuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_users`
--
ALTER TABLE `task_users`
  ADD CONSTRAINT `task_users_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_users_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
