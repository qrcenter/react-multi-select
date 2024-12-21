import { useForm, Controller } from "react-hook-form";
import MultiSelect from "./components/MultiSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Option {
  id: number;
  name_ar: string;
}

const options: Option[] = [
  { id: 1, name_ar: "خيار 1" },
  { id: 2, name_ar: "خيار 2" },
  { id: 3, name_ar: "خيار 3" },
];

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
  const {
    control,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { items: "1" },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
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
              
             
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
          </div>
        )}
      />
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default App;
