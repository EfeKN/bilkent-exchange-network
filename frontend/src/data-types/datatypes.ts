export interface User {
  _id?: string;
  createdAt?: Date;
  username: string;
  bilkentId: string;
  image: string;
  email: string;
  password: string;
}
export interface OwnPost {
  id: string;
  typename: string;
  title: string;
  offeredCourse: string;
  offeredSection: string;
  desiredCourse: string;
  desiredSection: string;
}

export interface UserProfile {
  _id?: string;
  userID: string;
  username: string;
  email: string;
  image: string;
  description: string;
  reputation: number;
  ownPosts: OwnPost[];
  savedPosts: string[];
  createdAt?: Date;
}

export interface ContextUser {
  email: string;
  token: string;
  _id: string;
}

export interface State {
  type: string;
  payload: ContextUser;
}

/*
This is the old version of UserProfile. It is not used anymore.
export interface UserProfile {
  _id?: string;
  userID: string;
  username: string;
  email: string;
  image: string;
  description: string;
  reputation: number;
  ownPosts: [[string]];
  savedPosts: [string];
  createdAt?: Date;
}
*/

export interface Conversation {
  _id?: string;
  userIDs: string[];
  messages: Message[];
  createdAt?: Date;
  updatedAt?: Date;
  username: string; // username of the other user
}

export interface Message {
  _id?: string;
  userID: string;
  message: string;
  createdAt?: Date;
}

export interface ForumEntry {
  _id?: string;
  content: string;
  poster: string;
  createdAt?: string;
}

export interface FilterParams {
  categories: string[];
  prices: {
    min: number | undefined;
    max: number | undefined;
  };
  dates: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  status: string;
  desiredCourse: string;
  offeredCourse: string;
  desiredSection: number | undefined;
  offeredSection: number | undefined;
  page: number;
  limit: number;
}
