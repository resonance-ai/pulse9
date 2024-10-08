"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { GithubIcon, HeyGenLogo } from "./Icons";
import { ThemeSwitch } from "./ThemeSwitch";
import React from "react";
import NavBarSelectAvatars from "./NavBarSelectAvatars";

interface NavBarProps {
  onSubmit: () => void;
  setAvatarId: (value: string) => void;
}

export default function NavBar({onSubmit, setAvatarId}: NavBarProps) {
  function handleSubmit() {
    onSubmit();
  }

  return (
    <Navbar className="w-full">
      <NavbarBrand>
        <Link isExternal aria-label="pulse9" href="https://pulse9-eng.imweb.me/">
          <HeyGenLogo />
        </Link>
        {/* <div className="bg-gradient-to-br from-sky-300 to-indigo-500 bg-clip-text ml-4">
          <p className="text-xl font-semibold">
            Pulse9
          </p>
        </div> */}
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem className="flex flex-row items-center gap-4">
          <Link
            isExternal
            color="foreground"
            href="https://www.youtube.com/c/PULSE9_Inc"
          >
            Youtube
          </Link>
          {/* <Link
            isExternal
            color="foreground"
            href="https://docs.heygen.com/reference/list-voices-v2"
          >
            Voices
          </Link>
          <Link
            isExternal
            color="foreground"
            href="https://docs.heygen.com/reference/new-session-copy"
          >
            API Docs
          </Link>
          <Link
            isExternal
            color="foreground"
            href="https://help.heygen.com/en/articles/9182113-interactive-avatar-101-your-ultimate-guide"
          >
            Guide
          </Link>
          <Link
            isExternal
            aria-label="Github"
            href="https://github.com/HeyGen-Official/StreamingAvatarSDK"
            className="flex flex-row justify-center gap-1 text-foreground"
          >
            <GithubIcon className="text-default-500" />
            SDK
          </Link> */}
          {/* <ThemeSwitch /> */}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
