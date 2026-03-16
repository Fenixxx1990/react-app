import SelectUser from "../SelectUser/SelectUser";
import Button from "../Button/Button";
import { useState } from "react";
import Logo from "../Logo/Logo";

const logos = ["/logo.svg", "/vite.svg"];

export default function Header() {
  const [logoIndex, setLogoIndex] = useState(0);

  const toggleLogo = () => {
    setLogoIndex((state) => Number(!state));
  };

  return (
    <>
      <Logo image={logos[logoIndex]} />
      <SelectUser />
      <Button onClick={toggleLogo}>Сменить лого</Button>
    </>
  );
}
