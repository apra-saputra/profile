import BioSection from "./components/profile/BioSection";
import AvatarSection from "./components/profile/AvatarSection";

const Profile = () => {
  return (
    <div className="w-full flex flex-col h-full">
      <h1 className="text-center text-6xl underline-offset-4 underline py-4">Welcome to my page</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 justify-items-center h-full">
        <BioSection />
        <AvatarSection />
      </div>
    </div>
  );
};

export default Profile;
