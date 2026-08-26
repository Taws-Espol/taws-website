import Image from "next/image";

import type { getActiveMembers } from "@/shared/queries/get-active-members";

type BaseMember = Awaited<ReturnType<typeof getActiveMembers>>[number];

// Extensión segura por si los campos no están definidos aún en el esquema estricto
type Member = BaseMember & {
  github?: string | null;
  linkedin?: string | null;
};

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const photo = typeof member.photo === "object" ? member.photo : null;
  const imageUrl =
    photo && "url" in photo && typeof photo.url === "string" ? photo.url : null;

  return (
    <div className="bg-card flex flex-col items-center rounded-xl border p-6 text-center shadow-sm transition-all hover:shadow-md">
      <div className="bg-muted relative mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.fullName}
            fill
            className="object-cover"
          />
        ) : (
          <svg
            className="text-muted-foreground h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        )}
      </div>

      <h3 className="text-card-foreground text-lg font-bold">
        {member.fullName}
      </h3>

      {member.position && (
        <p className="text-primary text-sm font-medium">{member.position}</p>
      )}

      {member.major && (
        <p className="text-muted-foreground mt-1 text-xs">{member.major}</p>
      )}

      <div className="mt-4 flex gap-3">
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`GitHub de ${member.fullName}`}
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`LinkedIn de ${member.fullName}`}
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
