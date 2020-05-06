declare module 'aws-xray-sdk' {
  export function captureAWSClient<T>(client: T): T;
  export function captureAWS<T>(aws: T): T;
  export function captureHTTPs<T>(http: T, enabled: Boolean): T;
  export function captureHTTPsGlobal<T>(httpGlobal: T, enabled: Boolean): T;
  export function getSegment(): Segment;

  export class Segment {
    constructor(name: string)
    addNewSubsegment(name: string): Segment;
    addError(err: Error): void;
    close(): void;
  }
}