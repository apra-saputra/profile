import myphoto from "@/assets/12c968d1-79a5-4165-a4d4-f079926392f6.webp";

const AvatarSection = () => {
  const width = "w-60 h-60";

  return (
    <div className="h-full flex items-center relative order-1 md:order-2">
      <div
        className={`${width} rounded-full outline-none ring-offset-primary ring ring-accent/50 ring-offset-4 relative`}
      >
        <div className={`bg-accent absolute ${width} rounded-full -z-10`} />
        <img
          // src="https://media.licdn.com/dms/image/v2/D5603AQHNqvNNXhQq7A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1665380544404?e=1736380800&v=beta&t=90AJVfuOo9Zi3tNhgFXg1RVD5IoO4UPxUADm-4MinUs"
          src={myphoto}
          alt="photo avatar"
          className="rounded-b-full aspect-square w-72 absolute"
        />
        {/* <AvatarFallback>Photo</AvatarFallback> */}
      </div>
    </div>
  );
};

export default AvatarSection;
