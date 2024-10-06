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
import React, {useState} from "react";


interface AvatarIdByNavProps {
  changeAvatar: (selectedAvatartId: string) => void;
}


// export default function NavBarSelectAvatars(changeAvatar: AvatarIdByNavProps) {
export default function NavBarSelectAvatars({changeAvatar}: AvatarIdByNavProps ) {
// export default function NavBarSelectAvatars() {

  // function handle() {
  //   changeAvatar();
  // }

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
          <Button
            isDisabled={false}
            onClick={() => changeAvatar("Eric_public_pro2_20230608")}
          >
            Eric
          </Button>
          <Button
            isDisabled={false}
            onClick={() => changeAvatar("Susan_public_2_20240328")}
          >
            Susan
          </Button>
          <Button
            isDisabled={false}
            onClick={() => changeAvatar("Tyler-incasualsuit-20220721")}
          >
            Tyler
          </Button>
          {/* <Button
            onClick={() => setAvatarId("avatar ID2")}
            // onClick={() => changeAvatar("Data for Button 1")}
          >
            Eric
          </Button> */}

          {/* <Link
            isExternal
            color="foreground"
            href="https://www.youtube.com/c/PULSE9_Inc"
          >
            Youtube
          </Link> */}

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
