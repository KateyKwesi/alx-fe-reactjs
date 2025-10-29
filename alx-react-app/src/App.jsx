import Header from "./components/Header";
import WelcomeMessage from "./components/WelcomeMessage";
import { Main } from "./components/MainContent";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <WelcomeMessage />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
