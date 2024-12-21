import { ChevronDown, CircleX, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Option {
  id: number;
  name_ar: string;
}

interface MultiSelectProps {
  options: Option[];
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  multiple?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  title,
  placeholder,
  value,
  onChange,
  multiple = false,
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const selectedIds = value.split(",").map(Number).filter(Boolean);
    const selectedOptions = options.filter((option) =>
      selectedIds.includes(option.id),
    );
    setSelected(selectedOptions);
  }, [value, options]);

  const filteredOptions = options.filter(
    (item) =>
      item.name_ar.includes(query.trim()) &&
      !selected.some((selectedItem) => selectedItem.id === item.id),
  );

  const handleSelectItem = (item: Option) => {
    if (multiple) {
      const updatedSelected = [...selected, item];
      setSelected(updatedSelected);
      setQuery("");
      onChange(updatedSelected.map((opt) => opt.id).join(","));
    } else {
      setSelected([item]);
      onChange(item.id.toString());
    }
  };

  const handleRemoveItem = (id: number) => {
    const updatedSelected = selected.filter((item) => item.id !== id);
    setSelected(updatedSelected);
    onChange(updatedSelected.map((opt) => opt.id).join(","));
  };

  return (
    <div className="relative w-full text-sm">
      <label className="font-bold">{title}</label>
      <div
        className="relative mb-1 mt-2 flex w-full items-center justify-between rounded-md border bg-gray-50 p-2 text-xs"
        tabIndex={-1}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map((item) =>
            multiple ? (
              <div
                key={item.id}
                className="flex w-fit items-center gap-1 rounded-full border border-gray-400 bg-gray-50 p-1 text-gray-500"
              >
                {item.name_ar}
                <X
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleRemoveItem(item.id)}
                  size={12}
                  className="cursor-pointer text-gray-400"
                />
              </div>
            ) : (
              <div> {item.name_ar}</div>
            ),
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder={selected.length ? "" : placeholder}
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>
        <div className="flex">
          {selected?.length ? (
            <CircleX
              onClick={() => {
                setSelected([]);
                onChange(""); // Clear the selection
                inputRef.current?.focus();
              }}
              className="mx-2 cursor-pointer text-gray-500"
              size={18}
            />
          ) : null}
          <ChevronDown
            size={16}
            className={`transform text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute flex max-h-52 w-full overflow-y-auto rounded-md bg-white shadow-md">
          <ul className="w-full">
            {filteredOptions?.length ? (
              filteredOptions.map((item, index) => (
                <li
                  key={index}
                  className="w-full cursor-pointer rounded-md p-2 hover:bg-teal-50 hover:text-teal-500"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelectItem(item)}
                >
                  {item.name_ar}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">لا توجد خيارات</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
