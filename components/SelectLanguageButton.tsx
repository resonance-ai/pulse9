import { Input, Spinner, Tooltip, Button, Select, SelectItem, Switch } from "@nextui-org/react";
import { Airplane, ArrowRight, PaperPlaneRight } from "@phosphor-icons/react";
import clsx from "clsx";
import {useState} from "react";
import {STT_LANGUAGE_LIST_SHORT} from "@/app/lib/constants";


interface SelectLanguageButtonProps {
  input: string;
  onSubmit: () => void;
  setInput: (value: string) => void;
  endContent?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export default function SelectLanguageButton() {
// export default function SelectLanguageButton({
//   input,
//   onSubmit,
//   setInput,
//   disabled = false,
// }: SelectLanguageButtonProps) {

  const [language, setLanguage] = useState<string>('en');

  return (
    <div>
      <Switch
        defaultSelected
        size="lg"
        color="secondary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <div>E</div>
          ) : (
            <div>Z</div>
          )
        }
      >
      </Switch>


      {/* <Select
        label="Select language"
        placeholder="Select language"
        className="max-w-xs"
        selectedKeys={[language]}
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
      >
        {STT_LANGUAGE_LIST_SHORT.map((lang) => (
          <SelectItem key={lang.key}>
            {lang.label}
          </SelectItem>
        ))}
      </Select> */}
    </div>



    // <div>
    //   <Button
    //     type="submit"
    //     className="focus:outline-none"
    //     onClick={handleSubmit}
    //     // onClick={printConsole}
    //     isDisabled={disabled}
    //   >
    //     {input}
    //   </Button>
    // </div>
  );
}
