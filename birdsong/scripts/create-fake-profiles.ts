import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";
import "dotenv/config";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const PASSWORD = process.env.FAKE_USER_PASSWORD || "password";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const fakeProfiles = [
  {
    full_name: "Sarah Johnson",
    username: "sarah_j",
    email: "sarah.johnson@example.com",
    gender: "female" as const,
    birthdate: "1995-03-15",
    bio: "Love hiking, coffee, and good conversations. Looking for someone to explore the world with.",
    avatar_url: "",
    preferences: {
      age_range: { min: 25, max: 35 },
      distance: 50,
      gender_preference: ["male"],
    },
  },
  {
    full_name: "Alex Chen",
    username: "alex_c",
    email: "alex.chen@example.com",
    gender: "female" as const,
    birthdate: "1992-07-22",
    bio: "Passionate about photography and travel. Always up for an adventure.",
    avatar_url:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    preferences: {
      age_range: { min: 28, max: 38 },
      distance: 30,
      gender_preference: ["male"],
    },
  },
  {
    full_name: "Michael Rodriguez",
    username: "mike_r",
    email: "michael.rodriguez@example.com",
    gender: "male" as const,
    birthdate: "1988-05-12",
    bio: "Tech enthusiast and fitness lover. Looking for someone to share adventures and good food with.",
    avatar_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    preferences: {
      age_range: { min: 25, max: 35 },
      distance: 40,
      gender_preference: ["female"],
    },
  },
  {
    full_name: "Jessica Kim",
    username: "jess_k",
    email: "jessica.kim@example.com",
    gender: "female" as const,
    birthdate: "1993-09-18",
    bio: "Artist and coffee addict. Love exploring new places and meeting interesting people.",
    avatar_url:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    preferences: {
      age_range: { min: 26, max: 36 },
      distance: 35,
      gender_preference: ["male"],
    },
  },
  {
    full_name: "David Thompson",
    username: "dave_t",
    email: "david.thompson@example.com",
    gender: "male" as const,
    birthdate: "1989-12-03",
    bio: "Musician and outdoor enthusiast. Guitar, hiking, and good vibes only.",
    avatar_url:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    preferences: {
      age_range: { min: 24, max: 34 },
      distance: 45,
      gender_preference: ["female"],
    },
  },
  {
    full_name: "Sophie Martin",
    username: "sophie_m",
    email: "sophie.martin@example.com",
    gender: "female" as const,
    birthdate: "1994-02-28",
    bio: "Foodie and travel blogger. Always on the hunt for the best restaurants and hidden gems.",
    avatar_url:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    preferences: {
      age_range: { min: 27, max: 37 },
      distance: 30,
      gender_preference: ["male"],
    },
  },
  {
    full_name: "Ryan Park",
    username: "ryan_p",
    email: "ryan.park@example.com",
    gender: "male" as const,
    birthdate: "1991-06-14",
    bio: "Entrepreneur and fitness coach. Passionate about helping others achieve their goals.",
    avatar_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    preferences: {
      age_range: { min: 25, max: 35 },
      distance: 50,
      gender_preference: ["female"],
    },
  },
  {
    full_name: "Isabella Garcia",
    username: "bella_g",
    email: "isabella.garcia@example.com",
    gender: "female" as const,
    birthdate: "1996-08-07",
    bio: "Dance instructor and fitness enthusiast. Love spreading positivity and good energy.",
    avatar_url:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
    preferences: {
      age_range: { min: 23, max: 33 },
      distance: 25,
      gender_preference: ["male"],
    },
  },
  {
    full_name: "James Anderson",
    username: "james_a",
    email: "james.anderson@example.com",
    gender: "male" as const,
    birthdate: "1987-04-25",
    bio: "Software engineer and board game enthusiast. Looking for someone to share nerdy adventures with.",
    avatar_url:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    preferences: {
      age_range: { min: 26, max: 36 },
      distance: 40,
      gender_preference: ["female"],
    },
  },
];

async function createFakeProfiles() {
  console.log("Creating fake profiles...");

  for (let i = 0; i < fakeProfiles.length; i++) {
    const profile = fakeProfiles[i];
    console.log(`Creating profile ${i + 1}/${fakeProfiles.length}: ${profile.full_name}`);

    try {
      const { data: existingAuthUsers } = await supabase.auth.admin.listUsers();
      const existingAuthUser = existingAuthUsers.users.find(
        (u) => u.email === profile.email
      );

      let userId: string;

      if (existingAuthUser) {
        userId = existingAuthUser.id;
        console.log(`User already exists for ${profile.email}`);
      } else {
        const { data: authData, error: authError } =
          await supabase.auth.admin.createUser({
            email: profile.email,
            password: PASSWORD,
            email_confirm: true,
            user_metadata: {
              full_name: profile.full_name,
              username: profile.username,
            },
          });

        if (authError) {
          console.error(`Error creating auth user for ${profile.email}:`, authError);
          continue;
        }

        userId = authData.user.id;
        console.log(`Created new auth user: ${userId}`);
      }

      const { data: existingProfile } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

      if (existingProfile) {
        const { error: updateError } = await supabase
          .from("users")
          .update({
            ...profile,
            location_lat: faker.location.latitude({ min: 37.7, max: 37.8 }),
            location_lng: faker.location.longitude({ min: -122.5, max: -122.4 }),
            is_verified: true,
            is_online: Math.random() > 0.5,
          })
          .eq("id", userId);

        if (updateError) {
          console.error(`Error updating ${profile.full_name}:`, updateError);
          continue;
        }
      } else {
        const { error: insertError } = await supabase.from("users").insert({
          id: userId,
          ...profile,
          location_lat: faker.location.latitude({ min: 37.7, max: 37.8 }),
          location_lng: faker.location.longitude({ min: -122.5, max: -122.4 }),
          is_verified: true,
          is_online: Math.random() > 0.5,
        });

        if (insertError) {
          console.error(`Error inserting ${profile.full_name}:`, insertError);
          await supabase.auth.admin.deleteUser(userId);
          continue;
        }
      }

      console.log(`Profile created for ${profile.full_name}`);
    } catch (error) {
      console.error(`Unexpected error for ${profile.full_name}:`, error);
    }
  }

  console.log("Fake profile creation completed.");
}

createFakeProfiles().catch(console.error);
