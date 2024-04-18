function Navbar(props) {
  function Link() {
    return (<a href="http://localhost:3001/auth/google">Log In</a>);
  }

  function ProfilePic() {
    return (<img className="h-10 w-10 rounded-full" src={props.data[0].profile_pic}></img>);
  }

  function Nav() {
    console.log(props.data[0]);
    if (props.data[0]) {
      return <ProfilePic />
    } else {
      return <Link />
    }
  }

  return (
    <div>
      {/* Links to navigate */}
      <nav className="bg-gray-100 border-b-2 border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="font-bold text-xl tracking-tight">
                  Pantry Pal
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {/* Additional text or menu items can go here */}
                <Nav />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
