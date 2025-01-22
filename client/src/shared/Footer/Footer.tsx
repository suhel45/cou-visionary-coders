/** @format */

const Footer = () => {
  return (
    <>
      <footer className="bg-teal-900 text-teal-100 py-6">
        <div className="container mx-auto text-center space-y-4">
          {/* Links */}
          <div className="flex sm:flex-col">
            <div className="flex justify-center space-x-6 sm:flex-none ">
              <a href="#" className="hover:text-teal-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-teal-300">
                Terms and Condition
              </a>
              <a href="#" className="hover:text-teal-300">
                FAQ
              </a>
              <a href="#" className="hover:text-teal-300">
                About Us
              </a>
            </div>
          </div>
          {/* Icons */}
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="bg-teal-800 p-3 rounded-full hover:bg-teal-700"
              aria-label="Facebook">
              <i className="fab fa-facebook text-teal-100"></i>
            </a>
            <a
              href="#"
              className="bg-teal-800 p-3 rounded-full hover:bg-teal-700"
              aria-label="Website">
              <i className="fas fa-globe text-teal-100"></i>
            </a>
            <a
              href="#"
              className="bg-teal-800 p-3 rounded-full hover:bg-teal-700"
              aria-label="Email">
              <i className="fas fa-envelope text-teal-100"></i>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm">
            © 2025 -{" "}
            <a href="#" className="hover:text-teal-300">
              mettromoni.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
