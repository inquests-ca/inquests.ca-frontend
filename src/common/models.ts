export interface Authority {
  authorityId?: number;
  isPrimary?: number;
  name: string;
  overview: string;
  synopsis: string;
  quotes: string | null;
  notes: string | null;
  remarks: string | null;
  inquests: Inquest[];
  authorityDocuments: AuthorityDocument[];
  authorityKeywords: AuthorityKeyword[];
  authorityCitations: Authority[];
  authorityCitedBy: Authority[];
  authorityRelated: Authority[];
  authorityRelatedBy: Authority[];
  authoritySuperceded: Authority[];
  authoritySupercededBy: Authority[];
}

export interface AuthorityCategory {
  authorityCategoryId: string;
  name: string;
  description: string | null;
  authorityKeywords: AuthorityKeyword[];
}

export interface AuthorityDocument {
  authorityDocumentId?: number;
  authorityId: number;
  authorityDocumentTypeId: string | null;
  sourceId: string;
  isPrimary?: number;
  name: string;
  citation: string | null;
  created: Date | null;
  source: Source;
  authority: Authority;
  authorityDocumentType: AuthorityDocumentType;
  authorityDocumentLinks: AuthorityDocumentLink[];
}

export interface AuthorityDocumentLink {
  authorityDocumentId: number;
  documentSourceId: string;
  link: string;
  documentSource: DocumentSource;
  authorityDocument: AuthorityDocument;
}

export interface AuthorityDocumentType {
  authorityDocumentTypeId: string;
  name: string;
  description: string | null;
}

export interface AuthorityKeyword {
  authorityKeywordId: string;
  authorityCategoryId: string;
  name: string;
  description: string | null;
  authorityCategory: AuthorityCategory;
}

export interface DeathManner {
  deathMannerId: string;
  name: string;
}

export interface Deceased {
  deceasedId?: number;
  inquestId: number;
  inquestTypeId: string;
  deathMannerId: string;
  deathCause: string;
  deathDate: Date;
  lastName: string | null;
  givenNames: string | null;
  age: number | null;
  sex: string | null;
  deathManner: DeathManner;
  inquest: Inquest;
  inquestType: InquestType;
}

export interface DocumentSource {
  documentSourceId: string;
  name: string;
  isFree?: number;
}

export interface Inquest {
  inquestId?: number;
  jurisdictionId: string;
  isPrimary?: number;
  name: string;
  overview: string | null;
  synopsis: string;
  notes: string | null;
  presidingOfficer: string;
  start: Date;
  end: Date | null;
  sittingDays: number | null;
  exhibits: number | null;
  remarks: string | null;
  deceased: Deceased[];
  jurisdiction: Jurisdiction;
  inquestDocuments: InquestDocument[];
  inquestKeywords: InquestKeyword[];
  authorities: Authority[];
}

export interface InquestCategory {
  inquestCategoryId: string;
  name: string;
  description: string | null;
  inquestKeywords: InquestKeyword[];
}

export interface InquestDocument {
  inquestDocumentId?: number;
  inquestId: number;
  inquestDocumentTypeId: string | null;
  name: string;
  created: Date;
  inquest: Inquest;
  inquestDocumentType: InquestDocumentType;
  inquestDocumentLinks: InquestDocumentLink[];
}

export interface InquestDocumentLink {
  inquestDocumentId: number;
  documentSourceId: string;
  link: string;
  documentSource: DocumentSource;
  inquestDocument: InquestDocument;
}

export interface InquestDocumentType {
  inquestDocumentTypeId: string;
  name: string;
  description: string | null;
}

export interface InquestKeyword {
  inquestKeywordId: string;
  inquestCategoryId: string | null;
  name: string;
  description: string | null;
  inquestCategory: InquestCategory;
}

export interface InquestType {
  inquestTypeId: string;
  name: string;
  isMandatory: number;
}

export interface Jurisdiction {
  jurisdictionId: string;
  jurisdictionCategoryId: string;
  name: string;
  code: string;
  isFederal?: number;
  jurisdictionCategory: JurisdictionCategory;
}

export interface JurisdictionCategory {
  jurisdictionCategoryId: string;
  name: string;
}

export interface Source {
  sourceId: string;
  jurisdictionId: string | null;
  name: string;
  code: string | null;
  rank: number;
  jurisdiction: Jurisdiction;
}
