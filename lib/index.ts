let segment: MockSegment;

class MockSegment {
  constructor(public name: string) {
    segment = this;
  }

  addNewSubsegment(name: string): MockSegment {
    return new MockSegment(name);
  }

  addError(error: Error) { }

  close(): void { }
}

jest.mock('aws-xray-sdk', () => {

  return {
    Segment: MockSegment,
    getSegment: () => {
      if (!segment) {
        segment = new MockSegment('Parent Segment');
        return segment;
      }
      return segment;
    },
    captureAWSClient: <T>(client: T) => client
  };
});
