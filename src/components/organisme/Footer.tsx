import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
export default function Footer() {

 const profiles = [
    {
      name: "Yuda_Pratama",
      nim: "09021182429025",
    },
    {
      name: "Ahmad Kurnia Prisma",
      nim: "09021182429009",
    },
    {
      name: "Rio Agustiawan",
      nim: "09021182429001",
    },
    {
      name: "Ismi Brilianita",
      nim: "09021182429016",
    },
  ];

  return (
    <footer className="bg-zinc-900 py-12 px-5">
      <div className="max-w-6xl mx-auto text-center text-white">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {profiles.map((profile, index) => (
            <div key={index} className="flex flex-col items-center">
              
              <img
                src="https://via.placeholder.com/150"
                alt=""
                className="w-24 h-24 rounded-full object-cover border-4 border-green-500 hover:scale-110 transition"
              />

              <h3 className="mt-3 font-semibold text-lg">
                {profile.name}
              </h3>

              <p className="text-gray-400 text-sm">
                {profile.nim}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-10 text-2xl">
          <a href="#" className="hover:text-green-500 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-green-500 transition">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-green-500 transition">
            <FaLinkedin />
          </a>
        </div>

      </div>
    </footer>
  );
}