
export enum MessageRole {
  USER = 'user',
  AGENT = 'agent',
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
}
