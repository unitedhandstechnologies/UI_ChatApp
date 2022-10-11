-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 01, 2022 at 03:47 PM
-- Server version: 5.7.38-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `honset`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `first_name` varchar(128) NOT NULL DEFAULT '',
  `last_name` varchar(128) NOT NULL DEFAULT '',
  `email` varchar(128) NOT NULL,
  `password` varchar(40) NOT NULL,
  `token` varchar(40) NOT NULL DEFAULT '',
  `token_time` int(11) NOT NULL,
  `forgot_password_hash` varchar(40) NOT NULL,
  `profile` varchar(50) NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `admin_type` tinyint(4) NOT NULL DEFAULT '1',
  `created` int(11) NOT NULL,
  `modified` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `first_name`, `last_name`, `email`, `password`, `token`, `token_time`, `forgot_password_hash`, `profile`, `status`, `admin_type`, `created`, `modified`) VALUES
(17, 'Admin', 'Super', 'admin@admin.com', '7c222fb2927d828af22f592134e8932480637c0d', '841b027ea7699d9b73b574e0230ed49e48eedc69', 0, '', '1638986119691.png', 1, 1, 0, 1645264047);

-- --------------------------------------------------------

--
-- Table structure for table `app_informations`
--

CREATE TABLE `app_informations` (
  `id` int(11) NOT NULL,
  `key_pair` varchar(128) NOT NULL DEFAULT '',
  `value` text NOT NULL,
  `created` int(11) NOT NULL,
  `modified` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(10) UNSIGNED NOT NULL,
  `sender_id` int(11) NOT NULL DEFAULT '0',
  `receiver_id` int(11) NOT NULL DEFAULT '0',
  `thread_id` int(11) NOT NULL DEFAULT '0',
  `specialtieId` int(11) NOT NULL DEFAULT '0',
  `message` varchar(255) NOT NULL DEFAULT '',
  `message_type` tinyint(1) NOT NULL DEFAULT '0',
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `videoLength` varchar(20) NOT NULL DEFAULT '',
  `created` int(11) NOT NULL DEFAULT '0',
  `modified` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `delete_chats`
--

CREATE TABLE `delete_chats` (
  `id` int(10) UNSIGNED NOT NULL,
  `chatId` int(11) NOT NULL DEFAULT '0',
  `userId` int(11) NOT NULL DEFAULT '0',
  `created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `threads`
--

CREATE TABLE `threads` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL DEFAULT '0',
  `friendId` int(11) NOT NULL DEFAULT '0',
  `lastMessageId` int(11) NOT NULL DEFAULT '0',
  `secondFriendDeletedId` int(11) NOT NULL DEFAULT '0',
  `firstFriendDeletedId` int(11) NOT NULL DEFAULT '0',
  `created` int(11) NOT NULL DEFAULT '0',
  `modified` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `phone` varchar(20) NOT NULL DEFAULT '',
  `countryCode` varchar(10) NOT NULL DEFAULT '',
  `password` varchar(40) NOT NULL DEFAULT '',
  `profile` varchar(50) NOT NULL DEFAULT '',
  `deviceToken` varchar(255) NOT NULL DEFAULT '',
  `userType` tinyint(4) NOT NULL DEFAULT '0',
  `authorizationKey` varchar(40) NOT NULL DEFAULT '',
  `tokenTime` int(11) NOT NULL DEFAULT '0',
  `lastApiCall` int(11) NOT NULL DEFAULT '0',
  `lastLogin` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `otp` int(4) NOT NULL DEFAULT '0',
  `isOnline` tinyint(4) NOT NULL DEFAULT '0',
  `forgetpasswordToken` varchar(40) NOT NULL DEFAULT '',
  `isOTPVerify` tinyint(4) NOT NULL DEFAULT '0',
  `deviceType` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1-> android 2-> ios 3-> web',
  `isInvite` tinyint(4) NOT NULL DEFAULT '0',
  `created` int(11) NOT NULL,
  `modified` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delete_chats`
--
ALTER TABLE `delete_chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `threads`
--
ALTER TABLE `threads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `delete_chats`
--
ALTER TABLE `delete_chats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `threads`
--
ALTER TABLE `threads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
