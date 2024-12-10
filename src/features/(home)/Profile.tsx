import BioSection from "./components/profile/BioSection";
import AvatarSection from "./components/profile/AvatarSection";
import { Link } from "react-router-dom";
import { Separator } from "../commons/components/ui/separator";

const Profile = () => {
  return (
    <div className="w-full flex flex-col h-full gap-y-12 md:px-24 px-6" id="profile">
      <h1 className="text-center text-accent md:text-6xl underline-offset-4 underline py-4 drop-shadow-md">
        Welcome to my page
      </h1>

      <p className="indent-10">
        A professional programmer, specializing in Front End and Back End
        development, ready to apply knowledge from Hacktiv8 and a degree in
        informatics engineering. My experience in audio engineering and graphic
        design makes me a creative problem solver. I am creative, eager to
        learn, and able to implement new technologies in technology development.
        Fell free to{" "}
        <Link to="/#contact" className="hover:text-accent transition-all underline italic">
          <span>contact me</span>
        </Link>
        !
      </p>
      <Separator />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-14 justify-items-center h-fit ">
        <BioSection />
        <AvatarSection />
      </div>
    </div>
  );
};

export default Profile;
