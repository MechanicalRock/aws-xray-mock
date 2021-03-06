import AWSXray from 'aws-xray-sdk';

export let segment = AWSXray.getSegment();

export async function newParentSegment() {
  try {
    console.log('some async function invocation');
  } catch (error) {
    segment.addError(error);
  } finally {
    segment.close();
  }
}

export async function newChildSegment() {

  const subSegment = AWSXray.getSegment().addNewSubsegment('Child Segment');

  try {
    console.log('some async function invocatio  n');
  } catch (error) {
    subSegment.addError(error);
  } finally {
    subSegment.close();
  }
}

export class TestInterface {
  constructor(public foo: string, public bar: number) { }
}

export function wrapClient<T>(client: T): T {
  return AWSXray.captureAWSClient(client);
}