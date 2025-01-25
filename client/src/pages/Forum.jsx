import logo from "../assets/BbLogo.png";
import {
  UserIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
function Forum() {
  return (
    <div className="dashboard h-screen w-full flex overflow-hidden select-none bg-gray-200">
      {/*Dashboard's Navigation */}
      <nav className=" dashboard-nav w-24 flex flex-col items-center bg-white py-4">
        <div className="logo mb-6">
          <img src={logo} alt="Logo" className="w-12 h-auto" />
        </div>
        <ul className="space-y-10">
          <li className="flex flex-col items-center">
            <BuildingLibraryIcon className="h-6 w-6 text-gray-600" />
            <a
              href="/dashboard"
              className="text-gray-700 hover:text-oriolesOrange"
            >
              Dashboard
            </a>
          </li>
          <li className="flex flex-col items-center">
            <UserIcon className="h-6 w-6 text-gray-600" />
            <a
              href="/account"
              className="text-gray-700 hover:text-oriolesOrange"
            >
              Account
            </a>
          </li>
          <li className="flex flex-col items-center">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-gray-600" />
            <a
              href="/messages"
              className="text-gray-700 hover:text-oriolesOrange"
            >
              Messages
            </a>
          </li>
          <li className="flex flex-col items-center">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
            <a
              href="/search"
              className="text-gray-700 hover:text-oriolesOrange"
            >
              Search
            </a>
          </li>
          <li className="flex flex-col items-center">
            <ShieldCheckIcon className="h-6 w-6 text-gray-600" />
            <a
              href="/policies"
              className="text-gray-700 hover:text-oriolesOrange"
            >
              Policies
            </a>
          </li>
          <li className="flex flex-col items-center">
            <UserGroupIcon className="h-6 w-6 text-gray-600" />
            <a
              href="/support"
              className="text-gray-700 hover:text-oriolesOrange"
            >
              Support
            </a>
          </li>
        </ul>
      </nav>
      <h1>Welcome User</h1>
    </div>
  );
}

export default Forum;
