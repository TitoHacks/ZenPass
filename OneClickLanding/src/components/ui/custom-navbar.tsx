import { redirectDashboard } from '@/utils/utils';

const CustomNavbar = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">ZenPass</span>
            <img
              className="h-8 w-auto"
              src="zenpass-favicon-color.png"
              alt=""
            />
          </a>
        </div>
        <div className="lg:flex lg:gap-x-12">
          <a href="/" className="text-sm font-semibold leading-6 text-white">
            Home
          </a>
          <a href="/#features" className="text-sm font-semibold leading-6 text-white">
            Features
          </a>
          <a href="/#howitworks" className="text-sm font-semibold leading-6 text-white">
            How it works
          </a>
          <a href="/#faq" className="text-sm font-semibold leading-6 text-white">
            FAQ
          </a>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <a onClick={redirectDashboard} className="text-sm font-semibold leading-6 text-white hover:cursor-pointer">
            Dashboard <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      
    </header>
  );
};

export default CustomNavbar;
