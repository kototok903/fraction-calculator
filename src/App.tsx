import { Calculator } from "@/components/Calculator";
import { SettingsProvider } from "@/contexts/settings/SettingsProvider";

function App() {
  return (
    <SettingsProvider>
      <div className="md:min-h-screen w-full h-full flex items-center justify-center">
        <Calculator />
      </div>
    </SettingsProvider>
  );
}

export default App;
