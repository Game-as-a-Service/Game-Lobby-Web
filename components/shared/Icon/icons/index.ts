import arrowPrev from "./svgs/arrow-prev.svg";
import arrowNext from "./svgs/arrow-next.svg";
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

const icons = {
  arrowPrev,
  arrowNext,
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
};

export type IconName = keyof typeof icons;

export default icons;
