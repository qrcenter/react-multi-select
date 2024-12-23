import { useForm, Controller } from "react-hook-form";
import MultiSelect from "./components/MultiSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Selectors from "./components/Selectors";
import { useState } from "react";

// interface Option {
//   id: number;
//   [key: string]: string | number;
// }



const options = [
  { id: 1, name: 'Tom Cook' },
  { id: 2, name: 'Wade Cooper' },
  { id: 3, name: 'Tanya Fox' },
  { id: 4, name: 'Arlene Mccoy' },
  { id: 5, name: 'Devon Webb' },
]
const schema = z.object({
  items: z
    .string()
    .nonempty("الرجاء اختيار خيار واحد على الاقل") 
    .refine(
      (value) => value.split(",").filter((id) => id).length > 0,
      "الرجاء اختيار خيار واحد على الاقل"
    ),
});

type FormValues = z.infer<typeof schema>;

const App = () => {
 // const [selected, setSelected] = useState<any>([options[0]])
  const {
    control,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { items: "1" },
  });
  handleOnChange(value:Option|Option[]){
  console.log(value)
}
  const onSubmit = (data: FormValues) => {
    console.log("Submitted Data:", data);
  };

  return (
    <>
    {JSON.stringify(value)}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* <Controller
        name="items"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <MultiSelect
              options={options}
              title="الفصول"
              placeholder="ادخل كلمة للبحث..."
              value={value} 
              onChange={onChange}
              displayValue="name_ar"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
          </div>
        )}
      /> */}
      <Selectors options={options} value={value} onChange={handleOnChange} multiple/>
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
     </>
  );
};

export default App;
