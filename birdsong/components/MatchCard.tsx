import { UserProfile } from "@/app/profile/page";
import { calculateAge } from "@/lib/helpers/calculate-age";
import Image from "next/image";

interface MatchCardProps {
  user: UserProfile;
}

export default function MatchCard({ user }: MatchCardProps) {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="card-swipe aspect-[3/4] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
        <div className="relative w-full h-full">
          <Image
            src={user.avatar_url}
            alt={user.full_name}
            fill
            className="object-cover w-full h-full"
            priority
          />

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-1 drop-shadow-md">
                {user.full_name}, {calculateAge(user.birthdate)}
              </h2>
              <p className="text-sm opacity-90 mb-2 drop-shadow-sm">
                @{user.username}
              </p>
              <p className="text-sm leading-relaxed drop-shadow-sm line-clamp-3">
                {user.bio || "No bio available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
