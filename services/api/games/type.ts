/**
 * Games module type definitions
 */

import type { QueryParams } from "../fetcher";

export interface Game {
  id: string;
  name: string;
  img?: string;
  minPlayers: number;
  maxPlayers: number;
  createdOn: string;
  rating: number;
  numberOfComments: number;
}

export interface GameRegistration {
  id: string;
  uniqueName: string;
  displayName: string;
  shortDescription: string;
  rule: string;
  imageUrl: string;
  minPlayers: number;
  maxPlayers: number;
  frontEndUrl: string;
  backEndUrl: string;
  createdOn: string;
  rating: number;
  numberOfComments: number;
}

export interface RegisterGameRequest {
  uniqueName: string;
  displayName: string;
  shortDescription: string;
  rule: string;
  imageUrl: string;
  minPlayers: number;
  maxPlayers: number;
  frontEndUrl: string;
  backEndUrl: string;
}

export interface UpdateGameRegistrationRequest {
  uniqueName?: string;
  displayName?: string;
  shortDescription?: string;
  rule?: string;
  imageUrl?: string;
  minPlayers?: number;
  maxPlayers?: number;
  frontEndUrl?: string;
  backEndUrl?: string;
}

export interface CommentGameRequest {
  gameId: string;
  rating: number;
  comment: string;
}

export interface UpdateGameCommentRequest {
  rating: number;
  comment: string;
}

export interface FindGameRegistrationsQuery extends QueryParams {
  sort_by?: string;
}
