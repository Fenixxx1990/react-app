import SelectUser from "../SelectUser/SelectUser";
import Logo from "../Logo/Logo";

const logos = "/logo.svg";

export default function Header() {
  return (
    <>
      <Logo image={logos} />
      <SelectUser />
    </>
  );
}
