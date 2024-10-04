import type { StartAvatarResponse } from "@heygen/streaming-avatar";

import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents, TaskType, VoiceEmotion,
} from "@heygen/streaming-avatar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
  Chip,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useMemoizedFn, usePrevious } from "ahooks";

import InteractiveAvatarTextInput from "./InteractiveAvatarTextInput";
import AvatarButtonTextInput from "./AvatarButtonTextInput";
import NavBarSelectAvatars from "./NavBarSelectAvatars";
import NavBar from "./NavBar";

import {AVATARS, STT_LANGUAGE_LIST} from "@/app/lib/constants";

export default function InteractiveAvatar() {
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [debug, setDebug] = useState<string>();
  const [knowledgeId, setKnowledgeId] = useState<string>("");
  const [avatarId, setAvatarId] = useState<string>("");
  const [language, setLanguage] = useState<string>('en');

  const [data, setData] = useState<StartAvatarResponse>();
  const [text, setText] = useState<string>("");
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);
  const [chatMode, setChatMode] = useState("text_mode");
  const [isUserTalking, setIsUserTalking] = useState(false);

  async function fetchAccessToken() {
    try {
      const response = await fetch("/api/get-access-token", {
        method: "POST",
      });
      const token = await response.text();

      console.log("Access Token:", token); // Log the token to verify

      return token;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }

    return "";
  }

  async function startSession() {
    setIsLoadingSession(true);
    const newToken = await fetchAccessToken();

    avatar.current = new StreamingAvatar({
      token: newToken,
    });
    avatar.current.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
      console.log("Avatar started talking", e);
    });
    avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
      console.log("Avatar stopped talking", e);
    });
    avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
      console.log("Stream disconnected");
      endSession();
    });
    avatar.current?.on(StreamingEvents.STREAM_READY, (event) => {
      console.log(">>>>> Stream ready:", event.detail);
      setStream(event.detail);
    });
    avatar.current?.on(StreamingEvents.USER_START, (event) => {
      console.log(">>>>> User started talking:", event);
      setIsUserTalking(true);
    });
    avatar.current?.on(StreamingEvents.USER_STOP, (event) => {
      console.log(">>>>> User stopped talking:", event);
      setIsUserTalking(false);
    });
    try {
      const res = await avatar.current.createStartAvatar({
        quality: AvatarQuality.Low,
        avatarName: avatarId,
        knowledgeId: knowledgeId, // Or use a custom `knowledgeBase`.
        voice: {
          rate: 1.5, // 0.5 ~ 1.5
          emotion: VoiceEmotion.EXCITED,
        },
        language: "English",
      });

      console.log("======check knowledgeId in startSession:", knowledgeId);
      setData(res);
      // default to voice mode
      await avatar.current?.startVoiceChat();
      setChatMode("voice_mode");
    } catch (error) {
      console.error("Error starting avatar session:", error);
    } finally {
      setIsLoadingSession(false);
    }
  }
  async function handleSpeak(chatMessage: string) {
    setIsLoadingRepeat(true);
    if (!avatar.current) {
      setDebug("Avatar API not initialized");

      return;
    }
    // speak({ text: text, task_type: TaskType.REPEAT })
    await avatar.current.speak({ text: chatMessage }).catch((e) => {
      setDebug(e.message);
    });
    setIsLoadingRepeat(false);
  }
  async function handleInterrupt() {
    if (!avatar.current) {
      setDebug("Avatar API not initialized");

      return;
    }
    await avatar.current
      .interrupt()
      .catch((e) => {
        setDebug(e.message);
      });
  }
  async function endSession() {
    await avatar.current?.stopAvatar();
    setStream(undefined);
  }

  const handleChangeChatMode = useMemoizedFn(async (v) => {
    if (v === chatMode) {
      return;
    }
    if (v === "text_mode") {
      avatar.current?.closeVoiceChat();
    } else {
      await avatar.current?.startVoiceChat();
    }
    setChatMode(v);
  });

async function changeAvatar(selectedAvatarId: string) {
    setIsLoadingSession(true);
    // setAvatarId("selectedAvatarId");
    const newToken = await fetchAccessToken();

    avatar.current = new StreamingAvatar({
      token: newToken,
    });
    avatar.current.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
      console.log("Avatar started talking", e);
    });
    avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
      console.log("Avatar stopped talking", e);
    });
    avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
      console.log("Stream disconnected");
      endSession();
    });
    avatar.current?.on(StreamingEvents.STREAM_READY, (event) => {
      console.log(">>>>> Stream ready:", event.detail);
      setStream(event.detail);
    });
    avatar.current?.on(StreamingEvents.USER_START, (event) => {
      console.log(">>>>> User started talking:", event);
      setIsUserTalking(true);
    });
    avatar.current?.on(StreamingEvents.USER_STOP, (event) => {
      console.log(">>>>> User stopped talking:", event);
      setIsUserTalking(false);
    });
    try {
      const res = await avatar.current.createStartAvatar({
        quality: AvatarQuality.Low,
        avatarName: selectedAvatarId,
        knowledgeId: knowledgeId,
        knowledgeBase: "Let's play a word chain game",
        voice: {
          rate: 1.5, // 0.5 ~ 1.5
          emotion: VoiceEmotion.EXCITED,
        },
        language: "English",
      });

      console.log("======check knowledgeId in changeAvatar:", knowledgeId);
      setData(res);
      // default to voice mode
      await avatar.current?.startVoiceChat();
      setChatMode("voice_mode");
    } catch (error) {
      console.error("Error starting avatar session:", error);
    } finally {
      setIsLoadingSession(false);
    }
  }

  const previousText = usePrevious(text);
  useEffect(() => {
    if (!previousText && text) {
      avatar.current?.startListening();
    } else if (previousText && !text) {
      avatar?.current?.stopListening();
    }
  }, [text, previousText]);

  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
        handleSpeak("Hi! Can you tell me who you are?");
        setDebug("Playing");
      };
    }
  }, [mediaStream, stream]);

  return (
    <div>
      <NavBarSelectAvatars changeAvatar={changeAvatar}/>
      {/* <NavBar 
        onSubmit={changeAvatar}
        setInput={setText}
      /> */}
      <div className="w-full flex flex-col gap-4">
        <Card>
          <CardBody className="h-[948px] flex flex-col justify-center items-center">
            {stream ? (
              <div className="h-[948px] w-[534px] justify-center items-center flex rounded-lg overflow-hidden">
                <video
                  ref={mediaStream}
                  autoPlay
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                >
                  <track kind="captions" />
                </video>

                <div className="absolute bottom-40 bg-opacity-0">           
                  <CardFooter className="flex flex-row justify-center gap-3 bg-opacity-0">
                    <AvatarButtonTextInput
                      input={"Apple"} 
                      onSubmit={() => handleSpeak("Apple")}
                      setInput={setText}
                      disabled={!stream}
                      loading={isLoadingRepeat}
                    />
                    <AvatarButtonTextInput
                      input={"Music"} 
                      onSubmit={() => handleSpeak("Music")}
                      setInput={setText}
                      disabled={!stream}
                      loading={isLoadingRepeat}
                    />
                    <AvatarButtonTextInput
                      input={"Key"} 
                      onSubmit={() => handleSpeak("Key")}
                      setInput={setText}
                      disabled={!stream}
                      loading={isLoadingRepeat}
                    />
                  </CardFooter>
                  {/* <CardFooter className="flex flex-row justify-center gap-3 bg-opacity-0">
                    <AvatarButtonTextInput
                      input={"How are you?"} 
                      onSubmit={() => handleSpeak("How are you?")}
                      setInput={setText}
                      disabled={!stream}
                      loading={isLoadingRepeat}
                    />
                    <AvatarButtonTextInput
                      input={"What your name?"} 
                      onSubmit={() => handleSpeak("What your name?")}
                      setInput={setText}
                      disabled={!stream}
                      loading={isLoadingRepeat}
                    />
                    <AvatarButtonTextInput
                      input={"What’s your favorite topic?"} 
                      onSubmit={() => handleSpeak("What’s your favorite topic?")}
                      setInput={setText}
                      disabled={!stream}
                      loading={isLoadingRepeat}
                    />
                  </CardFooter> */}
                  <CardFooter className="flex flex-row justify-center gap-3 bg-opacity-0">
                    <AvatarButtonTextInput
                      input={"What is your favorite animal?"} 
                      onSubmit={() => handleSpeak("What is your favorite animal?")}
                      setInput={setText}
                      disabled={!stream}
                      loading={isLoadingRepeat}
                    />
                    <AvatarButtonTextInput
                        input={"What can you help with?"} 
                        onSubmit={() => handleSpeak("What can you help with?")}
                        setInput={setText}
                        disabled={!stream}
                        loading={isLoadingRepeat}
                    />
                    <AvatarButtonTextInput
                      input={"Can you learn new things?"} 
                      onSubmit={() => handleSpeak("Can you learn new things?")}
                      setInput={setText}
                      disabled={!stream}
                      loading={isLoadingRepeat}
                    />
                  </CardFooter>
                  <CardFooter className="flex flex-row justify-center gap-3 bg-opacity-0">
                    <AvatarButtonTextInput
                      input={"Can you solve problems?"} 
                      onSubmit={() => handleSpeak("Can you solve problems?")}
                      setInput={setText}
                      disabled={!stream}
                      loading={isLoadingRepeat}
                    />
                    <AvatarButtonTextInput
                      input={"Do you know fun facts?"} 
                      onSubmit={() => handleSpeak("Do you know fun facts?")}
                      setInput={setText}
                      disabled={!stream}
                      loading={isLoadingRepeat}
                    />
                    <AvatarButtonTextInput
                      input={"Do you ever sleep?"} 
                      onSubmit={() => handleSpeak("Do you ever sleep?")}
                      setInput={setText}
                      disabled={!stream}
                      loading={isLoadingRepeat}
                    />
                  </CardFooter>
                </div>

                {/* <div className="flex flex-col gap-2 absolute bottom-3 right-3">
                  <Button
                    className="bg-gradient-to-tr from-indigo-500 to-indigo-300 text-white rounded-lg"
                    size="md"
                    variant="shadow"
                    onClick={handleInterrupt}
                  >
                    Interrupt task
                  </Button>
                  <Button
                    className="bg-gradient-to-tr from-indigo-500 to-indigo-300  text-white rounded-lg"
                    size="md"
                    variant="shadow"
                    onClick={endSession}
                  >
                    End session
                  </Button>
                </div> */}
              </div>
            ) : !isLoadingSession ? (
              <div className="h-full justify-center items-center flex flex-col gap-8 w-[500px] self-center">
                <div className="flex flex-col gap-2 w-full">
                  {/* <p className="text-sm font-medium leading-none">
                    Custom Knowledge ID (optional)
                  </p>
                  <Input
                    placeholder="Enter a custom knowledge ID"
                    value={knowledgeId}
                    onChange={(e) => setKnowledgeId(e.target.value)}
                  />
                  <p className="text-sm font-medium leading-none">
                    Custom Avatar ID (optional)
                  </p>
                  <Input
                    placeholder="Enter a custom avatar ID"
                    value={avatarId}
                    onChange={(e) => setAvatarId(e.target.value)}
                  /> */}
                  <Select
                    placeholder="Select one from these avatars"
                    size="md"
                    onChange={(e) => {
                      setAvatarId(e.target.value);
                    }}
                  >
                    {AVATARS.map((avatar) => (
                      <SelectItem
                        key={avatar.avatar_id}
                        textValue={avatar.avatar_id}
                      >
                        {avatar.name}
                      </SelectItem>
                    ))}
                  </Select>
                  {/* <Select
                    label="Select language"
                    placeholder="Select language"
                    className="max-w-xs"
                    selectedKeys={[language]}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                    }}
                  >
                    {STT_LANGUAGE_LIST.map((lang) => (
                      <SelectItem key={lang.key}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </Select> */}
                </div>
                <Button
                  className="w-full text-balck"
                  size="md"
                  variant="shadow"
                  onClick={startSession}
                >
                  Start streaming
                </Button>
              </div>
            ) : (
              <Spinner color="default" size="lg" />
            )}
          </CardBody>
          {/* <Divider />
          <CardFooter className="flex flex-col gap-3 relative">
            <Tabs
              aria-label="Options"
              selectedKey={chatMode}
              onSelectionChange={(v) => {
                handleChangeChatMode(v);
              }}
            >
              <Tab key="text_mode" title="Text mode" />
              <Tab key="voice_mode" title="Voice mode" />
            </Tabs>
            {chatMode === "text_mode" ? (
              <div className="w-full flex relative">
                <InteractiveAvatarTextInput
                  disabled={!stream}
                  input={text}
                  label="Chat"
                  loading={isLoadingRepeat}
                  placeholder="Type something for the avatar to respond"
                  setInput={setText}
                  onSubmit={handleSpeak}
                />
                {text && (
                  <Chip className="absolute right-16 top-3">Listening</Chip>
                )}
              </div>
            ) : (
              <div className="w-full text-center">
                <Button
                  isDisabled={!isUserTalking}
                  className="bg-gradient-to-tr from-indigo-500 to-indigo-300 text-white"
                  size="md"
                  variant="shadow"
                >
                  {isUserTalking ? "Listening" : "Voice chat"}
                </Button>
              </div>
            )}
          </CardFooter> */}
        </Card>
        {/* <p className="font-mono text-right">
          <span className="font-bold">Console:</span>
          <br />
          {debug}
        </p> */}
      </div>
    </div>
  );
}
