export enum UserRole {
  ADMIN = 'admin',
  MATCHMAKER = 'matchmaker',
  CANDIDATE = 'candidate',
}

export enum ProposalStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  maritalStatus: string;
  gender: string;
  birthDate: string;
  age: number;
  yeshivaKtana?: string;
  yeshivaGdola?: string;
  highSchool?: string;
  seminary?: string;
}

export interface FamilyBackground {
  roots: string;
  parentsStatus: string;
  familyStyle: string;
  siblingsCount: number;
  additionalInfo: string;
  marriedSiblings: string[];
}
export interface Candidate {
    id: string,
        name: string,
        email: string,
        role: UserRole.CANDIDATE,
        profileImage: string,
        approved: boolean,
        isProfileVisible: boolean,
        personal: {
          age: number,
          gender: string,
          height: number,
          location: string,
          occupation: string,
          education: string,
          religion: string;
}
}

export interface Personality {
  traits: string[];
  hobbies: string[];
  aspirations: string[];
  dressStyle: string;
  bodyType: string;
  height: number;
  skinTone: string;
}

export interface PartnerPreferences {
  ageRange: { min: number; max: number };
  desiredTraits: string[];
  religiousLevel: string;
  familyStyle: string;
  ethnicBackground: string;
  workStudyPreference: string;
  headCovering?: string;
  desiredHomeVision: string;
}

export interface CandidateProfile {
  personalDetails: PersonalDetails;
  familyBackground: FamilyBackground;
  personality: Personality;
  partnerPreferences: PartnerPreferences;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage: string;
  approved: boolean;
  profile?: CandidateProfile;
}

export interface Proposal {
  id: string;
  matchmakerId: string;
  matchmakerName: string;
  candidateId: string;
  candidateName: string;
  status: ProposalStatus;
  message: string;
  createdAt: string;
  updatedAt: string;
}