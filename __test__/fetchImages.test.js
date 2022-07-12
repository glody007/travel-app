// Import the js file to test
import { areAllFieldsFilled } from '../src/client/js/validation'

describe("Testing the fields are not empty functionality", () => {
  test("Testing the areAllFieldsFilled() function", () => {
    // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
    expect(areAllFieldsFilled).toBeDefined();
    expect(areAllFieldsFilled('', '', '')).toEqual(false)
    expect(areAllFieldsFilled('e', '', '')).toEqual(false)
    expect(areAllFieldsFilled('', 'e', '')).toEqual(false)
    expect(areAllFieldsFilled('', '', 'e')).toEqual(false)
    expect(areAllFieldsFilled('e', 'e', '')).toEqual(false)
    expect(areAllFieldsFilled('', 'e', 'e')).toEqual(false)
    expect(areAllFieldsFilled('e', '', 'e')).toEqual(false)
    expect(areAllFieldsFilled('e', 'e', 'e')).toEqual(true)
  })});