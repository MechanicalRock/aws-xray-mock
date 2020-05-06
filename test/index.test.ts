import '../lib';
import * as utils from './utils';

describe('xray sdk mock', () => {

  beforeAll(() => {

    jest.spyOn(console, 'log')
      .mockImplementation(() => {
        throw 'new error';
      });
  });

  it('should call the addError method when creating initial Segment', async () => {

    const closeSpy = jest.spyOn(utils.segment, 'close');
    const addErrorSpy = jest.spyOn(utils.segment, 'addError');

    await utils.newParentSegment();

    expect(closeSpy).toHaveBeenCalled()
    expect(addErrorSpy).toHaveBeenCalled();
  });

  it('it should not blow up with a subsegment', async () => {

    const childSegmentSpy = jest.spyOn(utils, 'newChildSegment');

    await utils.newChildSegment();
    expect(childSegmentSpy).not.toThrowError();
  });

  describe("wrapped functions", () => {
    it("should return an object of the same type with captureAWSClient", () => {
      const testObj = new utils.TestInterface("bar", 1);
      const newObj = utils.wrapClient(testObj);

      expect(newObj).toBeInstanceOf(utils.TestInterface);
    });

    it("should return an object of the same type with captureAWS", () => {
      const testObj = new utils.TestInterface("bar", 1);
      const newObj = utils.wrapAWS(testObj);

      expect(newObj).toBeInstanceOf(utils.TestInterface);
    });

    it("should return an object of the same type with captureHTTPs", () => {
      const testObj = new utils.TestInterface("bar", 1);
      const newObj = utils.wrapHTTP(testObj);

      expect(newObj).toBeInstanceOf(utils.TestInterface);
    });

    it("should return an object of the same type with captureHTTPsGlobal", () => {
      const testObj = new utils.TestInterface("bar", 1);
      const newObj = utils.wrapHTTPsGlobal(testObj);

      expect(newObj).toBeInstanceOf(utils.TestInterface);
    });
  });

});
