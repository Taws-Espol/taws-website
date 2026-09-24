import { beforeEach, describe, expect, it, vi } from "vitest";

import { submitApplication } from "@/features/recruitment/actions/submit-application";

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  isOpen: vi.fn(),
  consumeRateLimit: vi.fn(),
}));

vi.mock("@payload-config", () => ({ default: {} }));
vi.mock("payload", () => ({
  getPayload: async () => ({ create: mocks.create }),
}));
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));
vi.mock("@/features/recruitment/queries/get-recruitment-window", () => ({
  getRecruitmentWindow: async () => ({}),
}));
vi.mock("@/features/recruitment/utils/is-recruitment-open", () => ({
  isRecruitmentOpen: mocks.isOpen,
}));
vi.mock("@/features/recruitment/utils/consume-rate-limit", () => ({
  consumeRateLimit: mocks.consumeRateLimit,
}));

const application = {
  fullName: "Ana Pérez",
  email: "ana.perez@espol.edu.ec",
  major: "computacion",
  semester: 3,
  passedProgrammingFundamentals: "yes",
  interests: ["web"],
  website: "",
};

function formData(file?: File, data: unknown = application) {
  const form = new FormData();
  form.set("application", JSON.stringify(data));
  if (file) form.set("recommendationLetter", file);
  return form;
}

describe("submitApplication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.isOpen.mockReturnValue(true);
    mocks.consumeRateLimit.mockReturnValue(true);
    mocks.create.mockResolvedValue({ id: 1 });
  });

  it("stores a semester without requiring a letter", async () => {
    expect((await submitApplication(formData())).error).toBeNull();
    expect(mocks.create).toHaveBeenCalledWith({
      collection: "applications",
      data: {
        fullName: application.fullName,
        email: application.email,
        major: application.major,
        semester: 3,
        passedProgrammingFundamentals: "yes",
        interests: ["web"],
      },
      file: undefined,
      overrideAccess: false,
    });
  });

  it("stores the PDF with its application in one create operation", async () => {
    const file = new File(["%PDF-1.7\n%%EOF"], "letter.pdf", {
      type: "application/pdf",
    });
    expect((await submitApplication(formData(file))).error).toBeNull();
    expect(mocks.create).toHaveBeenCalledOnce();
    expect(mocks.create.mock.calls[0][0].file).toEqual({
      data: Buffer.from(await file.arrayBuffer()),
      name: file.name,
      mimetype: file.type,
      size: file.size,
    });
  });

  it("rejects a renamed non-PDF before persistence", async () => {
    const file = new File(["plain text"], "letter.pdf", {
      type: "application/pdf",
    });
    expect((await submitApplication(formData(file))).error?.code).toBe(
      "invalid-input",
    );
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("rejects a missing semester before persistence", async () => {
    expect(
      (
        await submitApplication(
          formData(undefined, { ...application, semester: undefined }),
        )
      ).error?.code,
    ).toBe("invalid-input");
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("rejects malformed form data", async () => {
    const form = new FormData();
    form.set("application", "not JSON");
    expect((await submitApplication(form)).error?.code).toBe("invalid-input");
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("preserves the recruitment window restriction", async () => {
    mocks.isOpen.mockReturnValue(false);
    expect((await submitApplication(formData())).error?.code).toBe(
      "window-closed",
    );
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("preserves rate limiting", async () => {
    mocks.consumeRateLimit.mockReturnValue(false);
    expect((await submitApplication(formData())).error?.code).toBe(
      "rate-limited",
    );
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("reports upload or database failure without claiming success", async () => {
    mocks.create.mockRejectedValue(new Error("Storage unavailable"));
    expect((await submitApplication(formData())).error?.code).toBe("unknown");
  });
});
