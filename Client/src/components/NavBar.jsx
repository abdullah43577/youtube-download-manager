import logo from '../assets/logo.png';

export default function NavBar() {
  return (
    <nav className="w-full flex items-center justify-between container mx-auto py-2">
      <div className="flex items-center gap-2">
        <img className="w-[32px]" src={logo} alt="logo" />
        <span>YTVid</span>
      </div>

      <ul className="flex items-center gap-10">
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          <a href="#">Help</a>
        </li>
      </ul>
    </nav>
  );
}
