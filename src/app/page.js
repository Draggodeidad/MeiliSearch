import Image from "next/image";
import styles from "./page.module.css";
import SearchContainer from "./SearchContainer";

export default function Home() {
  return (
    <div>
      <div className="row">
        <header>
          <h1 className="text">Bienvenido Busca tu Peli Fav!!</h1>
        </header>
        <SearchContainer />
      </div>
      {/* <footer className="footer"></footer> */}
    </div>
  );
}
