import MultiSelect from "./components/MultiSelect";
const options = [
  { id: 1, name_ar: "دليل" }, // Tutorial
  { id: 2, name_ar: "كيفية" }, // HowTo
  { id: 3, name_ar: "افعلها بنفسك" }, // DIY
  { id: 4, name_ar: "مراجعة" }, // Review
  { id: 5, name_ar: "تكنولوجيا" }, // Tech
  { id: 6, name_ar: "ألعاب" }, // Gaming
  { id: 7, name_ar: "سفر" }, // Travel
  { id: 8, name_ar: "لياقة بدنية" }, // Fitness
  { id: 9, name_ar: "طبخ" }, // Cooking
  { id: 10, name_ar: "مدونة فيديو" }, // Vlog
];


const App = () => {
  return (
    <div className="container mx-auto">
      <div className="flex w-full items-center justify-center">
        <form className="flex w-[600px] flex-col items-start justify-center shadow-md p-2">
          <MultiSelect options={options} title=" الفصول" placeholder="اختر الفصول"/>
          <label className="my-2 font-bold" htmlFor="subject">المادة</label>
          <input name="subject" type="text" className="w-full border rounded-md p-1.5 focus:outline-none"/>
          <button className="bg-blue-500 rounded-md py-1 px-4 my-2 text-white">حفظ</button>
        </form>
      </div>
    </div>
  );
};

export default App;
