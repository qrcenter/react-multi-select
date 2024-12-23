import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import clsx from "clsx";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

type Option = { id: number; name: string };

interface SelectorsProps {
  options: Option[];
  name: string;
  title: string;
  multiple?: boolean;
  defaultValue?: Option | Option[];
  selected?: Option | Option[];
  setSelected?: (value: Option | Option[]) => void;
}

const Selectors: React.FC<SelectorsProps> = ({
  options,
  name,
  title,
  multiple = false,
  defaultValue,
  selected,
  setSelected,
}) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.name.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <Field>
      <Label className="text-white">{title}</Label>
      <Combobox
        multiple={multiple}
        name={name}
        defaultValue={defaultValue}
        value={selected}
        onChange={setSelected}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border-none bg-white/5 py-1.5 pl-8 pr-3 text-right text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            )}
            displayValue={(selectedOptions: Option | Option[]) =>
              multiple
                ? (selectedOptions as Option[])
                    .map((p) => p?.name || "")
                    .join(", ")
                : (selectedOptions as Option)?.name || ""
            }
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 left-0 flex items-center px-2.5">
            <ChevronsUpDown className="size-4 text-white/60 group-data-[hover]:text-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {filteredOptions.length === 0 && query !== "" ? (
            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
              لا توجد خيارات
            </div>
          ) : (
            filteredOptions.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
              >
                <Check className="invisible size-4 text-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-white">{option.name}</div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>{" "}
    </Field>
  );
};

export default Selectors;
