import style from "./App.module.css";
import { Footer } from "./components/Footer/Footer";
import { Main } from "./pages/main/Main";

function App() {
  return (
    <div className={style.page}>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
