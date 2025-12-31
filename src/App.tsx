import { Calculator } from "@/components/Calculator";
import { ThemeProvider } from "@/contexts/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="md:min-h-screen w-full h-full flex items-center justify-center">
        <Calculator />
      </div>
    </ThemeProvider>
  );
}

export default App;
