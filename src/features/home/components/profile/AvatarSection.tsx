import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/features/commons/components/ui/avatar";

const AvatarSection = () => {
  return (
    <div className="h-full flex items-center relative">
      <Avatar className="w-56 h-56 outline-none ring-offset-primary ring ring-accent/50 ring-offset-4">
        <AvatarImage
          src="https://media.licdn.com/dms/image/v2/D5603AQHNqvNNXhQq7A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1665380544404?e=1736380800&v=beta&t=90AJVfuOo9Zi3tNhgFXg1RVD5IoO4UPxUADm-4MinUs"
          className="filter:bg"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarSection;
