const AvatarDemo = ({ user, className = "" }) => {
    // Get the first letter of the username
    const initial = user.email.charAt(0).toUpperCase();

    return (
        <div
            className={`relative inline-block ${className} w-12 h-12 rounded-full overflow-hidden`}
        >
            {/* Avatar Image */}
            {user.avatar ? (
                <img
                    src={`/storage/${user.avatar}`}
                    alt={`${user.email}'s avatar`}
                    className="w-full h-full object-cover"
                />
            ) : (
                // Avatar Fallback: If no avatar image is available
                <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-700 text-lg">
                    {initial}
                </div>
            )}
        </div>
    );
};

export default AvatarDemo;
