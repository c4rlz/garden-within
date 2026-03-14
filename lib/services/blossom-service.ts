import { prisma } from "@/lib/db";
import type { CreateBlossomInput, UpdateBlossomInput } from "@/lib/validations";

export const blossomService = {
  async create(data: CreateBlossomInput) {
    return prisma.blossom.create({
      data: {
        weekId: data.weekId,
        title: data.title,
        description: data.description ?? null,
        priority: data.priority ?? false,
        status: data.status ?? "active",
      },
    });
  },

  async update(id: string, data: UpdateBlossomInput) {
    const payload: Parameters<typeof prisma.blossom.update>[0]["data"] = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.description !== undefined) payload.description = data.description;
    if (data.priority !== undefined) payload.priority = data.priority;
    if (data.status !== undefined) {
      payload.status = data.status;
      if (data.status === "completed") {
        payload.completedAt = new Date();
      } else {
        payload.completedAt = null;
      }
    }
    if (data.completedAt !== undefined) payload.completedAt = data.completedAt;
    return prisma.blossom.update({ where: { id }, data: payload });
  },

  async findById(id: string) {
    return prisma.blossom.findUnique({
      where: { id },
      include: { week: true },
    });
  },

  async listByWeek(weekId: string) {
    return prisma.blossom.findMany({
      where: { weekId },
      orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
    });
  },

  async listAll(limit = 100) {
    return prisma.blossom.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { week: true },
    });
  },

  async delete(id: string) {
    return prisma.blossom.delete({ where: { id } });
  },
};
