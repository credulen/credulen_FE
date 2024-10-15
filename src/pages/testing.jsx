{
  user.image ? (
    <img
      src={`${backendURL}/uploads/${user.image}`}
      alt={user.username}
      className="w-10 h-10 rounded-full"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/fallback-image.png";
      }}
    />
  ) : (
    <HiOutlineUserCircle className="w-10 h-10 text-gray-400" />
  );
}
