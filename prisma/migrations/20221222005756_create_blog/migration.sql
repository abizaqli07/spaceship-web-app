-- CreateTable
CREATE TABLE "blog" (
    "id_blog" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id_blog")
);
