Modify schema.prisma: Update your Prisma schema (e.g., add a new model or field).

Create a Migration:
npx prisma migrate dev --name <migration-name>

Apply the Migration: For local:
npx prisma migrate dev

For production:
npx prisma migrate deploy

Generate the Prisma Client:
npx prisma generate
