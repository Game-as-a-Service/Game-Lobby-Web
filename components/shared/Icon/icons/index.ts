import check from "./svgs/check.svg";
import discord from "./svgs/discord.svg";
import error from "./svgs/error.svg";
import github from "./svgs/github.svg";
import google from "./svgs/google.svg";
import help from "./svgs/help.svg";
import home from "./svgs/home.svg";
import linkedin from "./svgs/linkedin.svg";
import logo from "./svgs/logo.svg";
import message from "./svgs/message.svg";
import news from "./svgs/news.svg";
import padlock from "./svgs/padlock.svg";
import pending from "./svgs/pending.svg";
import profile from "./svgs/profile.svg";
import remind from "./svgs/remind.svg";
import rooms from "./svgs/rooms.svg";
import target from "./svgs/target.svg";
import kickUser from "./svgs/kick_user.svg";
const icons = {
  check,
  discord,
  error,
  github,
  google,
  help,
  home,
  linkedin,
  logo,
  message,
  news,
  padlock,
  pending,
  profile,
  remind,
  rooms,
  target,
  kickUser,
};

export type IconName = keyof typeof icons;

export default icons;
