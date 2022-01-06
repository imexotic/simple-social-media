import { Link } from 'react-router-dom';

const Navbar = () => {
   return (
      <header>
         <div className="container">
            <h1>SOCIAL-MEDIA</h1>
            <nav>
               <Link to="/">Home</Link>
               <Link to="/create">Create Post</Link>
            </nav>
         </div>
      </header>
   );
}

export default Navbar;