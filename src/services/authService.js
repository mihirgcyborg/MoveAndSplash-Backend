// services/AuthService.js
const { prisma } = require("../db/prismaClient");

const handleThirdPartyLogin = async (profile, provider) => {
  try {
    // Check if user exists by providerId and provide
    let user = await prisma.user.findFirst({
      where: {
        providerId: profile.id,
        provider: provider,
      },
    });

    // If no user found, check by email for existing users with the same email
    if (!user) {
      user = await prisma.user.findUnique({
        where: { email: profile?.emails[0]?.value },
      });

      // If found, update user with third-party provider details
      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { provider, providerId: profile.id },
        });
      } else {
        // Otherwise, create a new user
        user = await prisma.user.create({
          data: {
            name: profile.displayName || profile.username,
            email: profile.emails[0].value,
            provider,
            providerId: profile.id,
          },
        });
      }
    }
    return user;
  } catch (error) {
    console.error("Error handling third-party login:", error);
    throw new Error("Authentication error");
  }
};

module.exports = { handleThirdPartyLogin };
