import Selectors from "./components/Selectors";
import type { Option } from "./lib/types";

const options: Option[] = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];
const selectedSingleIds = [2];
const selectedMultiIds = [2,3];
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const ids: number[] = [];
  formData.forEach((value, key) => {
    if (key.match(/^chapters\[\d+\]\[id\]$/)) {
      ids.push(Number(value));
    }
  });
const selectedId=formData.get("subject[id]")
  console.log("Submitted subject:", selectedId);
  console.log("Submitted IDs:", ids);
  console.log("Submitted Data:", Object.fromEntries(formData.entries()));
};

const App = () => {
  return (
    <div className="mx-auto h-screen w-96 pt-2 bg-black">
      <form onSubmit={handleSubmit}>
        {/* multiple */}
        <Selectors
          options={options}
          title="Chapters"
          name="chapters"
          multiple
          defaultValue={selectedMultiIds
            .map((id) => options.find((option) => option.id === id))
            .filter((option): option is Option => option !== undefined)}
        />
        {/* single */}
        <Selectors
          options={options}
          title="Subject"
          name="subject"
          defaultValue={options.find((option) => option.id === selectedSingleIds[0])}
        />
        <button type="submit" className="bg-blue-500 text-white py-1 px-2 mt-2">
          Save
        </button>
      </form>
      </div>
  );
};

export default App;
