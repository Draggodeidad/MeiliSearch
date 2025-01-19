import Image from "next/image";
import styles from "./page.module.css";
import FreeSoloCreateOptionDialog from "./buscador";
import AlignItemsList from "./lista";

export default function Home() {
  return (
    <div className="row">
      <header>
        <h1 className="text">Bienvenido!!</h1>
      </header>
      <div className="busq">
        <FreeSoloCreateOptionDialog />
      </div>
      <div className="list">
        <AlignItemsList />
      </div>
    </div>
  );
}
