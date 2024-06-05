interface AvatarProps {
  src: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    //   <Image
    //     src={src || "/images/placeholder.jpg"}
    //     alt="avatar"
    //     height={30}
    //     width={30}
    //     className="rounded-full"
    //   />
    <img
      src={src ?? "/images/placeholder.jpg"}
      alt="avatar"
      className="rounded-full h-6 w-6"
    />
  );
};
export default Avatar;
