import { NavLink } from "react-router-dom";
import myImage from "../../logoPantryPal.png";

function Navbar() {
  return (
    <div>
      <nav class="bg-green-900">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex-shrink-0">
              <NavLink to="/">
                <img
                  class="h-8 w-8 rounded m-3"
                  src={myImage}
                  alt="Your Company"
                />
              </NavLink>
            </div>
            <div class="flex items-center">
              <div class="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "hover:text-white"
                  }
                  aria-current={({ isActive }) =>
                    isActive ? "page" : undefined
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/pantry"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "hover:text-white"
                  }
                  aria-current={({ isActive }) =>
                    isActive ? "page" : undefined
                  }
                >
                  Pantry
                </NavLink>
                {/* ... other links ... */}
              </div>
            </div>
            {/* ... mobile menu button and other content ... */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
