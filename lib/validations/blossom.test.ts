import { describe, it, expect } from "vitest";
import {
  createBlossomSchema,
  updateBlossomSchema,
  blossomStatusEnum,
} from "./blossom";

describe("createBlossomSchema", () => {
  it("accepts valid input with required fields", () => {
    const result = createBlossomSchema.safeParse({
      weekId: "week_123",
      title: "My insight",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.priority).toBe(false);
      expect(result.data.status).toBe("active");
    }
  });

  it("rejects empty title", () => {
    const result = createBlossomSchema.safeParse({
      weekId: "week_123",
      title: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty weekId", () => {
    const result = createBlossomSchema.safeParse({
      weekId: "",
      title: "Title",
    });
    expect(result.success).toBe(false);
  });

  it("accepts priority and description", () => {
    const result = createBlossomSchema.safeParse({
      weekId: "week_123",
      title: "Priority item",
      description: "Some detail",
      priority: true,
    });
    expect(result.success).toBe(true);
  });
});

describe("updateBlossomSchema", () => {
  it("accepts partial updates", () => {
    expect(updateBlossomSchema.safeParse({ title: "New title" }).success).toBe(true);
    expect(updateBlossomSchema.safeParse({ status: "completed" }).success).toBe(true);
  });

  it("accepts empty object", () => {
    expect(updateBlossomSchema.safeParse({}).success).toBe(true);
  });

  it("rejects invalid status", () => {
    expect(
      updateBlossomSchema.safeParse({ status: "invalid" }).success
    ).toBe(false);
  });
});

describe("blossomStatusEnum", () => {
  it("accepts active and completed", () => {
    expect(blossomStatusEnum.safeParse("active").success).toBe(true);
    expect(blossomStatusEnum.safeParse("completed").success).toBe(true);
  });
});
