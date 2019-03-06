declare module 'aws-xray-sdk' {
  export function captureAWSClient<T>(client: T): T;
  export function getSegment(): Segment;

  export class Segment {
    constructor(name: string)
    addNewSubsegment(name: string): Segment;
    addError(err: Error): void;
    close(): void;
  }
}