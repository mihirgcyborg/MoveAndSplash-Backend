const { prisma } = require("../src/db/prismaClient");

async function main() {
  const categories = [
    { name: "Turf", icon: "football" },
    { name: "Swimming Pool", icon: "water" },
    { name: "Gaming Hub", icon: "game-controller" },
    { name: "Ground", icon: "earth" },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log("Categories seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
