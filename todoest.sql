-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2023 at 12:36 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.30

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
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `taskId` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `taskId`, `text`, `createdBy`, `updatedBy`, `deletedBy`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 2, 1, 'Hello Work Fast', NULL, NULL, NULL, '2022-09-18 14:25:54', '2022-09-18 14:25:54', NULL),
(2, 2, 1, 'Hello Another comment done', NULL, NULL, 1, '2022-09-19 07:43:12', '2022-09-19 07:43:12', '2022-09-19 09:04:52'),
(3, 1, 1, 'Deadline Set', NULL, NULL, 1, '2022-09-19 08:33:03', '2022-09-19 08:33:03', '2022-09-19 08:41:48'),
(4, 1, 1, 'Early Finished', NULL, NULL, 1, '2022-09-19 08:36:03', '2022-09-19 08:36:03', '2022-09-05 15:09:46'),
(5, 1, 1, 'Hurry Up', NULL, NULL, 1, '2022-09-19 08:37:23', '2022-09-19 09:08:33', '2022-09-19 09:08:33'),
(6, 1, 1, 'Bp Landing Page Setup', NULL, NULL, NULL, '2022-09-19 09:08:55', '2022-09-19 09:08:55', NULL),
(7, 1, 1, 'Another Task', NULL, NULL, 1, '2022-09-19 09:10:22', '2022-09-19 09:17:30', '2022-09-19 09:17:30'),
(8, 3, 1, 'Superb', NULL, NULL, NULL, '2022-09-19 09:23:54', '2022-09-19 09:23:54', NULL),
(9, 1, 2, 'Popup Form Sundor koro', NULL, NULL, NULL, '2022-09-21 05:21:20', '2022-09-21 05:21:20', NULL),
(10, 2, 5, 'Done Task', NULL, NULL, NULL, '2022-09-22 04:29:57', '2022-09-22 04:29:57', NULL),
(11, 1, 5, 'Good Work', NULL, NULL, NULL, '2022-09-22 07:59:04', '2022-09-22 07:59:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`id`, `name`, `link`, `password`, `startDate`, `endDate`, `desc`, `createdBy`, `updatedBy`, `deletedBy`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Drik Libraby', 'google Meet', 'google Meet', '2022-12-05 18:00:00', '2022-12-08 18:00:00', 'assign3 redux react', 2, NULL, NULL, '2022-09-28 04:39:52', '2022-09-28 04:39:52', NULL),
(2, 'Decode Lab Meeting', 'google meet', NULL, '2022-09-28 05:40:13', '2022-09-28 10:40:13', '<p>Hello Meeting start</p>', 1, NULL, NULL, '2022-09-28 05:41:17', '2022-09-28 05:41:17', NULL),
(3, 'Drik Libraby', 'google Meet', 'todoest&table=meetings', '2022-12-05 18:00:00', '2022-12-08 18:00:00', 'assign3 redux react', 2, NULL, NULL, '2022-09-28 06:08:12', '2022-09-28 06:08:12', NULL),
(4, 'Law Project Meeting', 'google meet link', NULL, '2022-09-29 08:24:53', '2022-09-29 10:29:53', '<p>Saikat Vai join the meeting</p>', 1, NULL, NULL, '2022-09-28 08:26:10', '2022-09-28 08:26:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `meeting_users`
--

CREATE TABLE `meeting_users` (
  `id` int(11) NOT NULL,
  `meetingId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meeting_users`
--

INSERT INTO `meeting_users` (`id`, `meetingId`, `userId`, `createdBy`, `updatedBy`, `deletedBy`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 2, NULL, NULL, NULL, '2022-09-28 04:39:52', '2022-09-28 04:39:52', NULL),
(2, 1, 3, NULL, NULL, NULL, '2022-09-28 04:39:52', '2022-09-28 04:39:52', NULL),
(3, 1, 1, NULL, NULL, NULL, '2022-09-28 04:39:52', '2022-09-28 04:39:52', NULL),
(4, 2, 1, NULL, NULL, NULL, '2022-09-28 05:41:17', '2022-09-28 05:41:17', NULL),
(5, 2, 3, NULL, NULL, NULL, '2022-09-28 05:41:17', '2022-09-28 05:41:17', NULL),
(6, 2, 4, NULL, NULL, NULL, '2022-09-28 05:41:17', '2022-09-28 05:41:17', NULL),
(7, 3, 2, NULL, NULL, NULL, '2022-09-28 06:08:12', '2022-09-28 06:08:12', NULL),
(8, 3, 3, NULL, NULL, NULL, '2022-09-28 06:08:12', '2022-09-28 06:08:12', NULL),
(9, 3, 1, NULL, NULL, NULL, '2022-09-28 06:08:12', '2022-09-28 06:08:12', NULL),
(10, 4, 1, NULL, NULL, NULL, '2022-09-28 08:26:10', '2022-09-28 08:26:10', NULL),
(11, 4, 2, NULL, NULL, NULL, '2022-09-28 08:26:10', '2022-09-28 08:26:10', NULL);

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
(1, 'Education', 'education-1663245680540', 'nejc-soklic-wo42rmamef8-unsplash-1663245680539.jpg', NULL, NULL, NULL, 0, '2022-09-15 12:41:20', '2022-09-15 12:41:20', NULL),
(2, 'Bp Landing Page', 'bp-landing-page-1663735274608', 'university-dashboard-1663735274606.png', NULL, NULL, NULL, 0, '2022-09-21 04:41:14', '2022-09-21 04:41:14', NULL),
(3, 'Data Analysics', 'data-analysics-1663833599612', 'may-gauthier-0j9l9xrymso-unsplash-1663833599611.jpg', NULL, NULL, NULL, 0, '2022-09-22 07:59:59', '2022-09-22 07:59:59', NULL);

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
(3, ' End', 1, NULL, NULL, NULL, 0, '2022-09-15 12:41:20', '2022-09-15 12:41:20', NULL),
(4, 'start', 2, NULL, NULL, NULL, 0, '2022-09-21 04:41:14', '2022-09-21 04:41:14', NULL),
(5, 'Progress', 2, NULL, NULL, NULL, 0, '2022-09-21 04:41:14', '2022-09-21 04:41:14', NULL),
(6, ' End', 2, NULL, NULL, NULL, 0, '2022-09-21 04:41:14', '2022-09-21 04:41:14', NULL),
(7, 'start', 3, NULL, NULL, NULL, 0, '2022-09-22 07:59:59', '2022-09-22 07:59:59', NULL),
(8, 'End', 3, NULL, NULL, NULL, 0, '2022-09-22 07:59:59', '2022-09-22 07:59:59', NULL);

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
(2, 1, 3, 1, NULL, NULL, '2022-09-15 12:41:20', '2022-09-15 12:41:20', NULL),
(3, 2, 3, 1, NULL, NULL, '2022-09-21 04:41:14', '2022-09-21 04:41:14', NULL),
(4, 3, 2, 1, NULL, NULL, '2022-09-22 07:59:59', '2022-09-22 07:59:59', NULL);

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
(1, 1, 'nasa-1lfi7wkgwz4-unsplash-1663245796172.jpg', 1, NULL, NULL, '2022-09-15 12:43:16', '2022-09-15 12:43:16', NULL),
(5, 1, 'kimberly-farmer-luaakcuanvi-unsplash-1663500128576.jpg', 1, NULL, NULL, '2022-09-18 11:22:08', '2022-09-18 11:22:08', NULL),
(8, 15, 'whatsapp-image-2022-09-20-at-1.03.51-pm-1663833683782.jpeg', 1, NULL, NULL, '2022-09-22 08:01:23', '2022-09-22 08:01:23', NULL),
(9, 15, 'world-population-report-1663833683782.jpg', 1, NULL, NULL, '2022-09-22 08:01:23', '2022-09-22 08:01:23', NULL),
(10, 2, 'alexander-hipp-ieebwgy_6la-unsplash-(1)-1663834159482.jpg', 1, NULL, NULL, '2022-09-22 08:09:19', '2022-09-22 08:09:19', NULL),
(11, 18, '_z7a0922-1672832652204.jpg', 1, NULL, NULL, '2023-01-04 11:44:12', '2023-01-04 11:44:12', NULL),
(12, 18, '_z7a0927-1672832652210.jpg', 1, NULL, NULL, '2023-01-04 11:44:12', '2023-01-04 11:44:12', NULL),
(16, 18, '_dsc7291-1672904391270.JPG', 1, NULL, NULL, '2023-01-05 07:39:51', '2023-01-05 07:39:51', NULL),
(18, 18, '_dsc3970-1672904498993.JPG', 1, NULL, NULL, '2023-01-05 07:41:38', '2023-01-05 07:41:38', NULL),
(20, 18, '_z7a0636-1672904737479.jpg', 1, NULL, NULL, '2023-01-05 07:45:37', '2023-01-05 07:45:37', NULL);

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
  `priority` enum('first','second','thired','four') DEFAULT 'thired',
  `remain` datetime NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `taskUserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `slug`, `desc`, `projectId`, `statusId`, `priority`, `remain`, `createdBy`, `updatedBy`, `deletedBy`, `status`, `createdAt`, `updatedAt`, `deletedAt`, `taskUserId`) VALUES
(1, 'Education', 'education-1663754815398', '<p>EEE CKT By Sadman Fuad Vai</p>', 1, 3, 'first', '2022-10-05 18:00:00', 1, 2, NULL, 0, '2022-09-15 12:43:16', '2022-09-22 04:10:30', '2023-01-04 07:49:10', NULL),
(2, 'Design Bp landing Page', 'design-bp-landing-page-1672815562256', '<p>Design Bp landing</p>', 2, 5, 'second', '2022-09-22 05:41:22', 1, 1, NULL, 0, '2022-09-21 04:43:02', '2023-01-05 11:34:40', NULL, NULL),
(3, 'Education', 'education-1663754758650', 'Economics ', 1, 3, 'second', '2022-09-22 11:25:56', 1, 2, NULL, 0, '2022-09-21 05:26:43', '2022-09-22 07:56:34', '2023-01-04 08:11:30', NULL),
(4, 'Digital Investigation', 'digital-investigation-1663757782674', 'Digital Investigation', 2, 4, 'second', '2022-09-23 11:55:39', 1, 1, NULL, 0, '2022-09-21 10:56:22', '2023-01-04 07:26:45', NULL, NULL),
(5, 'Education Last Work', 'education-last-work-1663757879959', 'Education Last Work', 1, 1, 'first', '2022-09-23 10:57:24', 1, 2, NULL, 0, '2022-09-21 10:57:59', '2022-09-22 04:06:00', NULL, NULL),
(6, 'Done Hurray', 'done-hurray-1663819552730', 'Done Hurray', 1, 3, 'second', '2022-09-23 08:05:27', 2, 1, NULL, 0, '2022-09-22 04:05:52', '2022-12-22 06:52:45', NULL, NULL),
(7, 'Drik News Paper Workflow', 'drik-news-paper-workflow-1663834095952', '<p>Change Drik Logo</p>', 1, 2, 'second', '2022-09-23 02:07:09', 2, 1, NULL, 0, '2022-09-22 04:07:43', '2023-01-04 07:54:44', NULL, NULL),
(8, 'Mufid', 'mufid-1663819688334', 'Mufid', 1, 3, 'second', '2022-09-28 04:07:46', 2, 1, NULL, 0, '2022-09-22 04:08:08', '2022-09-26 10:50:46', NULL, NULL),
(9, 'Nurul', 'nurul-1663819715928', 'Nurul', 1, 1, 'second', '2022-09-23 09:08:10', 2, NULL, NULL, 0, '2022-09-22 04:08:35', '2022-09-22 04:08:35', '2023-01-04 08:11:16', NULL),
(10, 'Ibhrahim Khalil', 'ibhrahim-khalil-1663819753998', 'Ibhrahim Khalil', 1, 1, 'second', '2022-09-28 21:08:39', 2, NULL, NULL, 0, '2022-09-22 04:09:14', '2022-09-22 04:09:14', NULL, NULL),
(11, 'Javascript', 'javascript-1663819783877', 'Javascript', 1, 1, 'second', '2022-09-27 20:09:17', 2, NULL, NULL, 0, '2022-09-22 04:09:43', '2022-09-22 04:09:43', NULL, NULL),
(12, 'Last One', 'last-one-1663819813647', 'Last One', 1, 1, 'second', '2022-09-30 04:09:46', 2, NULL, NULL, 0, '2022-09-22 04:10:13', '2022-09-22 04:10:13', '2023-01-04 09:06:26', NULL),
(13, 'In Progress New Task', 'in-progress-new-task-1663833429794', 'In Progress New Task', 1, 2, 'second', '2022-09-23 08:56:40', 2, 1, NULL, 0, '2022-09-22 07:57:09', '2023-01-04 07:54:37', NULL, NULL),
(14, 'Asif In Progress', 'asif-in-progress-1663833460865', 'Asif In Progress', 1, 3, 'second', '2022-09-30 07:57:15', 2, 1, NULL, 0, '2022-09-22 07:57:40', '2022-09-22 08:11:02', NULL, NULL),
(15, '1st Task', '1st-task-1663833659987', '1st Task', 3, 7, 'second', '2022-09-30 08:00:07', 1, 1, NULL, 0, '2022-09-22 08:00:59', '2022-09-22 08:03:28', NULL, NULL),
(16, 'Drik Photo Gallary', 'drik-photo-gallary-1663834310821', 'Drik Photo Gallary', 1, 1, 'first', '2022-09-23 02:14:07', 1, 1, NULL, 0, '2022-09-22 08:11:50', '2023-01-04 07:54:36', NULL, NULL),
(17, 'Btcl Call', 'btcl-call-1672823333304', 'Btcl Call', 2, 4, 'second', '2023-01-04 09:10:12', 1, NULL, NULL, 0, '2023-01-04 09:08:53', '2023-01-04 09:08:53', NULL, NULL),
(18, 'Image Preview', 'image-preview-1672832652030', 'Image Preview', 2, 4, 'thired', '2023-01-05 09:41:58', 1, NULL, NULL, 0, '2023-01-04 11:44:12', '2023-01-04 11:44:12', NULL, NULL);

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
(1, 1, 3, 1, NULL, NULL, '2022-09-15 12:43:16', '2022-09-15 12:43:16', NULL),
(2, 2, 3, 1, NULL, NULL, '2022-09-21 04:43:02', '2022-09-21 04:43:02', NULL),
(3, 3, 2, 1, NULL, NULL, '2022-09-21 05:26:43', '2022-09-21 05:26:43', NULL),
(4, 4, 3, 1, NULL, NULL, '2022-09-21 10:56:22', '2022-09-21 10:56:22', NULL),
(5, 5, 2, 1, NULL, NULL, '2022-09-21 10:57:59', '2022-09-21 10:57:59', NULL),
(6, 5, 3, 1, NULL, NULL, '2022-09-21 10:57:59', '2022-09-21 10:57:59', NULL),
(7, 6, 3, 2, NULL, NULL, '2022-09-22 04:05:52', '2022-09-22 04:05:52', NULL),
(8, 7, 3, 2, NULL, NULL, '2022-09-22 04:07:43', '2022-09-22 04:07:43', NULL),
(9, 8, 3, 2, NULL, NULL, '2022-09-22 04:08:08', '2022-09-22 04:08:08', NULL),
(10, 8, 2, 2, NULL, NULL, '2022-09-22 04:08:08', '2022-09-22 04:08:08', NULL),
(11, 9, 2, 2, NULL, NULL, '2022-09-22 04:08:35', '2022-09-22 04:08:35', NULL),
(12, 10, 3, 2, NULL, NULL, '2022-09-22 04:09:14', '2022-09-22 04:09:14', NULL),
(13, 11, 3, 2, NULL, NULL, '2022-09-22 04:09:43', '2022-09-22 04:09:43', NULL),
(14, 12, 3, 2, NULL, NULL, '2022-09-22 04:10:13', '2022-09-22 04:10:13', NULL),
(15, 13, 2, 2, NULL, NULL, '2022-09-22 07:57:09', '2022-09-22 07:57:09', NULL),
(16, 14, 3, 2, NULL, NULL, '2022-09-22 07:57:40', '2022-09-22 07:57:40', NULL),
(17, 15, 2, 1, NULL, NULL, '2022-09-22 08:01:00', '2022-09-22 08:01:00', NULL),
(18, 16, 3, 1, NULL, NULL, '2022-09-22 08:11:50', '2022-09-22 08:11:50', NULL),
(19, 17, 3, 1, NULL, NULL, '2023-01-04 09:08:53', '2023-01-04 09:08:53', NULL),
(20, 18, 3, 1, NULL, NULL, '2023-01-04 11:44:12', '2023-01-04 11:44:12', NULL);

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
  `phone` text DEFAULT NULL,
  `address` text DEFAULT NULL,
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

INSERT INTO `users` (`id`, `name`, `email`, `password`, `userRole`, `phone`, `address`, `image`, `active`, `createdBy`, `updatedBy`, `deletedBy`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$AZQak67uS4QyOlmxMIqqaeg2bj/TAavwbpjl0l3x0ywDAAXR9iE7y', 'admin', NULL, NULL, 'avatar1-1663245399722.avif', 1, NULL, NULL, NULL, '2022-09-15 12:36:39', '2022-09-15 12:36:39', NULL),
(2, 'Ashadul', 'ashadul@gmail.com', '$2b$10$1esFKKVsGwA9MZ36GhXCBebF/aDdlPLkuCGhRDjFOSbCKedAdSs4q', 'user', NULL, NULL, 'avatar2-1663245544637.avif', 1, NULL, NULL, NULL, '2022-09-15 12:39:04', '2022-09-15 12:39:04', NULL),
(3, 'Asif', 'asif@gmail.com', '$2b$10$T0Yyr9Zx0QTA.QjF222wMuvgxI4FgtvMz8pSez92PLmSyvjuT/c5m', 'user', NULL, NULL, 'avatar3-1663245606982.avif', 1, NULL, NULL, NULL, '2022-09-15 12:40:06', '2022-09-15 12:40:06', NULL),
(4, 'Saikot', 'saikat@gmail.com', '$2b$10$N43jAe3cbkPw7fUd2789MerKldnxGeeev/3R5a.Rs3DkvfVS/4HjC', 'user', NULL, NULL, 'may-gauthier-0j9l9xrymso-unsplash-1663833732920.jpg', 1, NULL, NULL, NULL, '2022-09-22 08:02:12', '2022-09-22 08:02:12', NULL),
(5, 'Porag', 'porag@gmail.com', '$2b$10$zf6TIyEWY0TSfVD3fWlrRu7AOIQHuzGtq5HiwEC/hiIK8Rn1789O6', 'user', NULL, NULL, 'porag-1672913972348.avif', 1, NULL, NULL, NULL, '2023-01-05 10:19:32', '2023-01-05 10:19:32', NULL),
(6, 'Aysha Khan', 'aysha@gmail.com', '$2b$10$Ec35/vrgI43on7knfwnMjuXrZg2F/AsgiTQxmUNbUUKwXrTViijfG', 'user', '01613503047', 'Dhaka', 'aysha-1672916223589.avif', 1, NULL, NULL, NULL, '2023-01-05 10:57:03', '2023-01-05 10:57:03', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `taskId` (`taskId`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meeting_users`
--
ALTER TABLE `meeting_users`
  ADD PRIMARY KEY (`id`);

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
  ADD UNIQUE KEY `image` (`image`),
  ADD UNIQUE KEY `image_2` (`image`);

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
  ADD KEY `tasks_taskUserId_foreign_idx` (`taskUserId`),
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
  ADD UNIQUE KEY `image` (`image`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `image_2` (`image`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `meeting_users`
--
ALTER TABLE `meeting_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `projectstatuses`
--
ALTER TABLE `projectstatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `project_users`
--
ALTER TABLE `project_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taskimages`
--
ALTER TABLE `taskimages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `task_users`
--
ALTER TABLE `task_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projectstatuses`
--
ALTER TABLE `projectstatuses`
  ADD CONSTRAINT `projectstatuses_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_users`
--
ALTER TABLE `project_users`
  ADD CONSTRAINT `project_users_ibfk_3` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_users_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `taskimages`
--
ALTER TABLE `taskimages`
  ADD CONSTRAINT `taskimages_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`statusId`) REFERENCES `projectstatuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_4` FOREIGN KEY (`statusId`) REFERENCES `projectstatuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_taskUserId_foreign_idx` FOREIGN KEY (`taskUserId`) REFERENCES `task_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_users`
--
ALTER TABLE `task_users`
  ADD CONSTRAINT `task_users_ibfk_3` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_users_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
