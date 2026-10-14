import { publications } from "./research";

export const personalUrl = "https://donggyu-lee1.github.io/";
export const researchUrl = `${personalUrl}research/`;
const labUrl = "https://econai.kaist.ac.kr/";
const personId = `${personalUrl}#person`;

export const profileDescription =
  "Donggyu Lee (이동규) is a Ph.D. student at KAIST Graduate School of Data Science " +
  "and a member of econai@kaist. His research connects language-model reasoning, " +
  "economics, satellite imagery, and computational social science.";

function identityEntities(): Record<string, unknown>[] {
  return [
    {
      "@type": "Person",
      "@id": personId,
      name: "Donggyu Lee",
      alternateName: "이동규",
      url: personalUrl,
      description: profileDescription,
      jobTitle: "Ph.D. student in Data Science",
      image: `${personalUrl}assets/profile.jpg`,
      email: "mailto:donggyu.lee@kaist.ac.kr",
      sameAs: [
        "https://scholar.google.co.kr/citations?user=fp4h9-kAAAAJ&hl=en",
        "https://github.com/donggyu-lee1",
        "https://www.linkedin.com/in/donggyu-lee-65784b21b"
      ],
      affiliation: [
        { "@id": `${personalUrl}#kaist-gsds` },
        { "@id": `${labUrl}#organization` }
      ],
      knowsAbout: [
        "Large language models",
        "Economic causal reasoning",
        "Satellite imagery",
        "Computational social science"
      ]
    },
    {
      "@type": "CollegeOrUniversity",
      "@id": "https://www.kaist.ac.kr/#organization",
      name: "KAIST",
      url: "https://www.kaist.ac.kr/"
    },
    {
      "@type": "Organization",
      "@id": `${personalUrl}#kaist-gsds`,
      name: "KAIST Graduate School of Data Science",
      parentOrganization: { "@id": "https://www.kaist.ac.kr/#organization" }
    },
    {
      "@type": "Organization",
      "@id": `${labUrl}#organization`,
      name: "econai@kaist",
      alternateName: "Economic Progress and AI Research Group",
      url: labUrl,
      parentOrganization: { "@id": "https://www.kaist.ac.kr/#organization" }
    }
  ];
}

export function getProfileGraph(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...identityEntities(),
      {
        "@type": "ProfilePage",
        "@id": `${personalUrl}#webpage`,
        url: personalUrl,
        name: "Donggyu Lee (이동규) | AI, Economics & Society · KAIST",
        description: profileDescription,
        inLanguage: "en",
        mainEntity: { "@id": personId }
      }
    ]
  };
}

export function getResearchGraph(): Record<string, unknown> {
  const articles = publications.map((paper) => {
    const workshopVersion = paper.id === "02";
    const url = paper.projectUrl ?? paper.href;
    const id = `${url}${workshopVersion ? "#workshop-article" : "#article"}`;
    return {
      "@type": "ScholarlyArticle",
      "@id": id,
      name: paper.title,
      headline: paper.title,
      url,
      description: paper.summary,
      inLanguage: "en",
      author: paper.authors.split(", ").map((name) =>
        name === "Donggyu Lee"
          ? { "@id": personId }
          : { "@type": "Person", name }
      ),
      // The homepage's workshop title is a different version from the public
      // arXiv manuscript; do not merge their distinct titles with sameAs.
      ...(workshopVersion
        ? {
            version: "NeurIPS 2026 EconML Workshop listing",
            publication: { "@type": "PublicationEvent", name: paper.venue },
            isBasedOn: { "@type": "ScholarlyArticle", url: paper.href }
          }
        : { sameAs: paper.href })
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...identityEntities(),
      {
        "@type": "CollectionPage",
        "@id": `${researchUrl}#webpage`,
        url: researchUrl,
        name: "Research by Donggyu Lee (이동규)",
        description:
          "Research by Donggyu Lee at KAIST: language-model reasoning in economics, " +
          "EconCausal, ideological bias, satellite imagery, and socioeconomic measurement.",
        inLanguage: "en",
        about: { "@id": personId },
        mainEntity: { "@id": `${researchUrl}#papers` },
        breadcrumb: { "@id": `${researchUrl}#breadcrumb` }
      },
      ...articles,
      {
        "@type": "ItemList",
        "@id": `${researchUrl}#papers`,
        name: "Selected research by Donggyu Lee",
        itemListElement: articles.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@id": article["@id"] }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${researchUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Donggyu Lee", item: personalUrl },
          { "@type": "ListItem", position: 2, name: "Research", item: researchUrl }
        ]
      }
    ]
  };
}

export function serializeStructuredData(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
