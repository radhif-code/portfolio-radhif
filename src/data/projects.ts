import yearbook from "@/assets/project-yearbook.jpg";
import feed from "@/assets/project-feed.jpg";
import competition from "@/assets/project-competition.jpg";
import video from "@/assets/project-video.jpg";
import infuguard from "@/assets/infuguard-device.jpg";

export type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

export type Project = {
  slug: string;
  img: string;
  tag: string;
  title: string;
  desc: string;
  year: string;
  span?: string;
  longDescription: string[];
  details: { label: string; value: string }[];
  media: MediaItem[];
  externalLink?: { label: string; href: string };
};

const yearbookPages: MediaItem[] = [
  ...[1, 2, 3].map((n) => ({ type: "image" as const, src: `/projects/yearbook/a-${n}.png` })),
  ...[1, 2, 3, 4].map((n) => ({ type: "image" as const, src: `/projects/yearbook/b-${n}.png` })),
];

const feedPages: MediaItem[] = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
  type: "image" as const,
  src: `/projects/feed/p-${n}.png`,
}));

const competitionPages: MediaItem[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
  type: "image" as const,
  src: `/projects/competition/p-${n}.png`,
}));

const videoClips: MediaItem[] = [1, 2, 3, 4].map((n) => ({
  type: "video",
  src: `/projects/video/clip${n}.mp4`,
}));

const infuguardMedia: MediaItem[] = [
  { type: "video", src: "/projects/infuguard/demo.mp4" },
  { type: "video", src: "/projects/infuguard/demo2.mp4" },
];

export const projects: Project[] = [
  {
    slug: "yearbook",
    img: yearbook,
    tag: "Editorial Design",
    title: "Yearbook Design Project",
    desc: "Full yearbook concept & layout for SMA Budi Utomo.",
    year: "2024",
    span: "lg:col-span-2",
    longDescription: [
      "A complete editorial system designed for the Ertianoba class of SMA Budi Utomo — from cover concept through typography pairing, modular grid, and photography art direction.",
      "The book balances a confident display typeface with quiet body text so portraits and candid spreads breathe. Custom dividers, page numbers, and color-coded sections give every chapter its own personality while keeping the publication unified.",
      "Output spans 120+ pages of layouts, illustrations, and curated photography, delivered print-ready with bleed and color profiles tuned for offset production.",
    ],
    details: [
      { label: "Role", value: "Art Director · Layout Designer" },
      { label: "Year", value: "2024" },
      { label: "Client", value: "SMA Budi Utomo — Ertianoba" },
      { label: "Tools", value: "Adobe InDesign · Illustrator · Photoshop" },
      { label: "Deliverable", value: "120+ page print yearbook" },
    ],
    media: yearbookPages,
  },
  {
    slug: "feed",
    img: feed,
    tag: "Brand & Feed",
    title: "Feed Design Projects",
    desc: "Instagram feed design.",
    year: "2026",
    longDescription: [
      "A full identity refresh for Muda-Mudi Sruni Al-Barokah — covering logomark philosophy, color theory, type system, and a recurring Instagram grid that keeps every announcement on-brand.",
      "The visual language pairs warm community tones with a disciplined typographic rhythm, so posters, event flyers, and daily content all feel like they belong to the same family.",
      "The deliverable includes brand guidelines, a poster template library, and a 30+ post Instagram feed scheduled across the year's program.",
    ],
    details: [
      { label: "Role", value: "Brand & Content Designer" },
      { label: "Year", value: "2026" },
      { label: "Client", value: "Muda-Mudi Sruni Al-Barokah" },
      { label: "Tools", value: "Adobe Illustrator · Photoshop · Figma" },
      { label: "Deliverable", value: "Brand guide + IG feed system" },
    ],
    media: feedPages,
  },
  {
    slug: "competition",
    img: competition,
    tag: "Poster Design",
    title: "Competition Design Series",
    desc: "Award winning poster designs across themes: cyber security, waste management, public service.",
    year: "2024–25",
    longDescription: [
      "A multi-year series of competition posters built around social and technical themes — cyber security awareness, waste management, and public service communication.",
      "Each poster builds a single bold concept supported by editorial typography and confident illustration. The series has been recognized in several national-level student competitions.",
      "Working under tight briefs and short turnarounds sharpened the discipline of translating dense subjects into a single image that reads in three seconds.",
    ],
    details: [
      { label: "Role", value: "Concept · Illustration · Layout" },
      { label: "Year", value: "2024 – 2025" },
      { label: "Context", value: "National student design competitions" },
      { label: "Tools", value: "Adobe Illustrator · Photoshop" },
      { label: "Output", value: "8+ poster campaigns" },
    ],
    media: competitionPages,
  },
  {
    slug: "video",
    img: video,
    tag: "Video Editing",
    title: "Video Editing Projects",
    desc: "Promotional video series.",
    year: "2024",
    longDescription: [
      "A recurring promotional video series for @MANGGA3_OFFICIAL covering their Astronight events — handling edit, color grade, motion graphics, and platform-specific cuts.",
      "Edits are tuned for vertical Reels and TikTok-first viewing, with hooks in the first second and rhythm tied tightly to music. A consistent color identity gives the series a recognizable nighttime palette.",
      "Output includes a library of trailers, recap edits, and short-form teasers used across the event's social channels.",
    ],
    details: [
      { label: "Role", value: "Editor · Colorist · Motion" },
      { label: "Year", value: "2024" },
      { label: "Client", value: "@MANGGA3_OFFICIAL" },
      { label: "Tools", value: "Final Cut Pro · Premiere Pro · After Effects" },
      { label: "Output", value: "Reels, trailers, recap edits" },
    ],
    media: videoClips,
  },
  {
    slug: "infuguard",
    img: infuguard,
    tag: "IoT · Hardware",
    title: "InfuGuard System",
    desc: "ESP32-based smart infusion monitor with Telegram alerts — featured in detail below.",
    year: "2025",
    span: "lg:col-span-2",
    longDescription: [
      "InfuGuard is a smart infusion monitor that helps hospital staff catch blockages and depleted bags before they become emergencies — built on an ESP32 microcontroller with an HX711 load cell.",
      "The device continuously measures the weight of an infusion bag with sub-gram precision, detects abnormal flow patterns, and pushes critical events straight to nurses through a Telegram bot.",
      "A local I2C LCD shows live weight and status at the bedside, while the Telegram channel acts as the remote dashboard — no extra app to install, no extra training required.",
    ],
    details: [
      { label: "Role", value: "Hardware + Firmware + Bot Integration" },
      { label: "Year", value: "2025" },
      { label: "Stack", value: "ESP32 · HX711 · Load Cell · LCD I2C · Telegram Bot · Arduino IDE" },
      { label: "Type", value: "IoT healthcare prototype" },
      { label: "Status", value: "Working prototype" },
    ],
    media: infuguardMedia,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
}
