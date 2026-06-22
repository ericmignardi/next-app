import { cn } from "@/lib/utils";
import { signInSchema, signUpSchema } from "@/types/auth";
import { videoFormSchema } from "@/types/video";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
    expect(cn("foo", { bar: true, baz: false })).toBe("foo bar");
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("handles tailwind class conflicts correctly", () => {
    expect(cn("px-2 py-1", "p-4")).toBe("p-4");
  });
});

describe("Auth Schemas", () => {
  describe("signInSchema", () => {
    it("validates correct email and password", () => {
      const valid = { email: "user@example.com", password: "password123" };
      const parsed = signInSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
    });

    it("rejects invalid email formats", () => {
      const invalid = { email: "invalid-email", password: "password123" };
      const parsed = signInSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
      if (!parsed.success) {
        expect(parsed.error.issues[0]?.message).toMatch(/invalid email/i);
      }
    });

    it("rejects empty password", () => {
      const invalid = { email: "user@example.com", password: "" };
      const parsed = signInSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
    });
  });

  describe("signUpSchema", () => {
    it("trims whitespace from first and last names", () => {
      const input = {
        firstName: "  John  ",
        lastName: "  Doe  ",
        email: "john@example.com",
        password: "securepassword123",
      };
      const parsed = signUpSchema.safeParse(input);
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.firstName).toBe("John");
        expect(parsed.data.lastName).toBe("Doe");
      }
    });

    it("requires password to be at least 8 characters long", () => {
      const input = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "short",
      };
      const parsed = signUpSchema.safeParse(input);
      expect(parsed.success).toBe(false);
      if (!parsed.success) {
        expect(parsed.error.issues[0]?.message).toMatch(/at least 8 characters/i);
      }
    });
  });
});

describe("Video Form Schema", () => {
  it("validates valid video data", () => {
    const valid = {
      title: "Gold Medal Match",
      sport: "Hockey",
      year: "2026",
      team: "Team Canada",
      gameType: "Finals",
      highlights: [
        { timestamp: "12:34", label: "Goal" },
        { timestamp: "01:23:45", label: "Intermission" },
      ],
    };
    const parsed = videoFormSchema.safeParse(valid);
    expect(parsed.success).toBe(true);
  });

  it("rejects invalid highlights timestamp format", () => {
    const invalid = {
      title: "Gold Medal Match",
      sport: "Hockey",
      year: "2026",
      team: "Team Canada",
      gameType: "Finals",
      highlights: [{ timestamp: "12-34", label: "Goal" }],
    };
    const parsed = videoFormSchema.safeParse(invalid);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues[0]?.message).toMatch(/format must be MM:SS or HH:MM:SS/i);
    }
  });

  it("requires a non-empty title, sport, year, team, and gameType", () => {
    const invalid = {
      title: "",
      sport: "",
      year: "",
      team: "",
      gameType: "",
    };
    const parsed = videoFormSchema.safeParse(invalid);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const fields = parsed.error.issues.map((e) => e.path[0]);
      expect(fields).toContain("title");
      expect(fields).toContain("sport");
      expect(fields).toContain("year");
      expect(fields).toContain("team");
      expect(fields).toContain("gameType");
    }
  });
});
