//Components
import Footer from "./shared/Components/footer/footer";
import Header from "./shared/Components/header/header"
// Styleds
import GlobalStyled from "./Styles/global";

function App() {

  return (
    <>
      <GlobalStyled />
      
      <header>
        <Header />
      </header>

      <main>
        <h4>teste</h4>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
