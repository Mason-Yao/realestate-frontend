export interface FileDetails {
  PK: string;
  id: string;
  path: string | File;
  isCover?: boolean;
  isPublic?: boolean;
  createdBy?: string;
  createdDate?: string; //ISO String
  tags?: string[];
}
